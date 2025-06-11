
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const { formData } = await req.json();
    logStep("Form data received", { 
      plan: formData.selectedPlan, 
      addons: Object.entries(formData.addOns || {}).filter(([_, value]) => value).map(([key, _]) => key),
      billing: formData.billing,
      email: formData.email
    });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: formData.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: formData.email,
        name: formData.companyName
      });
      customerId = customer.id;
      logStep("New customer created", { customerId });
    }

    // Updated package pricing with no setup fees
    const packagePricing = {
      'basic': { monthlyFee: 25, annualFee: 270 },
      'starter': { monthlyFee: 35, annualFee: 378 },
      'business': { monthlyFee: 69, annualFee: 745 },
      'premium': { monthlyFee: 159, annualFee: 1717 }
    };

    // Add-on pricing
    const addonPricing = {
      'logo': { price: 20, type: 'one-time' },
      'chatbot': { price: 275, type: 'one-time' },
      'content': { price: 25, type: 'one-time' },
      'maintenance': { price: 20, type: 'monthly' }
    };

    const selectedPlan = packagePricing[formData.selectedPlan];
    if (!selectedPlan) {
      logStep("Invalid package", { selectedPlan: formData.selectedPlan, availablePackages: Object.keys(packagePricing) });
      throw new Error(`Invalid package selected: ${formData.selectedPlan}`);
    }

    const isAnnual = formData.billing === 'annual';
    const planFee = isAnnual ? selectedPlan.annualFee : selectedPlan.monthlyFee;

    // Calculate totals
    let oneTimeTotal = 0;
    let monthlyTotal = isAnnual ? 0 : selectedPlan.monthlyFee;

    // Add one-time add-ons and monthly add-ons
    Object.entries(formData.addOns || {}).forEach(([addon, enabled]) => {
      if (enabled && addonPricing[addon]) {
        const addonDetails = addonPricing[addon];
        if (addonDetails.type === 'one-time') {
          if (addon === 'content') {
            oneTimeTotal += addonDetails.price * (formData.pageCount || 1);
          } else {
            oneTimeTotal += addonDetails.price;
          }
        } else if (addonDetails.type === 'monthly' && !isAnnual) {
          monthlyTotal += addonDetails.price;
        }
      }
    });

    logStep("Calculated totals", { oneTimeTotal, monthlyTotal, planFee, isAnnual });

    // Create line items
    const lineItems = [];

    // Add one-time add-ons if any
    if (oneTimeTotal > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `One-time Add-ons`,
            description: `Add-ons for ${formData.selectedPlan} plan`
          },
          unit_amount: oneTimeTotal * 100, // Convert to cents
        },
        quantity: 1,
      });
    }

    // Add subscription (monthly or annual)
    if (isAnnual) {
      // Annual billing - add as one-time payment for the year
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${formData.selectedPlan.charAt(0).toUpperCase() + formData.selectedPlan.slice(1)} Plan - Annual`,
            description: `Annual subscription for ${formData.selectedPlan} plan`
          },
          unit_amount: planFee * 100,
        },
        quantity: 1,
      });
    } else {
      // Monthly billing - add as recurring subscription
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${formData.selectedPlan.charAt(0).toUpperCase() + formData.selectedPlan.slice(1)} Plan - Monthly`,
            description: `Monthly subscription for ${formData.selectedPlan} plan including monthly add-ons`
          },
          unit_amount: monthlyTotal * 100,
          recurring: { interval: "month" },
        },
        quantity: 1,
      });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: lineItems,
      mode: isAnnual ? "payment" : "subscription",
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/intake?canceled=true`,
      metadata: {
        submission_id: formData.submissionId,
        selected_plan: formData.selectedPlan,
        billing_type: formData.billing || 'monthly',
        company_name: formData.companyName
      }
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    // Update intake submission with Stripe session ID
    if (formData.submissionId) {
      const { error: updateError } = await supabaseClient
        .from('intake_submissions')
        .update({
          stripe_session_id: session.id,
          payment_status: 'pending'
        })
        .eq('id', formData.submissionId);

      if (updateError) {
        logStep("Error updating submission", updateError);
      } else {
        logStep("Updated submission with session ID");
      }
    }

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
