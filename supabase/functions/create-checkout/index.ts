
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

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { formData } = await req.json();
    logStep("Form data received", { package: formData.selectedPackage, addons: formData.selectedAddons });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.user_metadata?.full_name || formData.fullName || formData.email
      });
      customerId = customer.id;
      logStep("New customer created", { customerId });
    }

    // Package pricing - match the exact names from IntakePage
    const packagePricing = {
      'Starter': { setupFee: 149, monthlyFee: 40 },
      'Business': { setupFee: 249, monthlyFee: 85 },
      'Premium': { setupFee: 649, monthlyFee: 170 }
    };

    // Add-on pricing - match the exact names from IntakePage  
    const addonPricing = {
      'Logo Design': { price: 20, type: 'one-time' },
      'AI Chatbot': { price: 275, type: 'one-time' },
      'Content Writing': { price: 25, type: 'one-time' },
      'Maintenance': { price: 20, type: 'monthly' }
    };

    const selectedPlan = packagePricing[formData.selectedPackage];
    if (!selectedPlan) {
      logStep("Invalid package", { selectedPackage: formData.selectedPackage, availablePackages: Object.keys(packagePricing) });
      throw new Error(`Invalid package selected: ${formData.selectedPackage}`);
    }

    // Calculate totals
    let oneTimeTotal = selectedPlan.setupFee;
    let monthlyTotal = selectedPlan.monthlyFee;

    // Add one-time add-ons to setup fee
    formData.selectedAddons?.forEach(addon => {
      const addonDetails = addonPricing[addon];
      if (addonDetails) {
        if (addonDetails.type === 'one-time') {
          oneTimeTotal += addonDetails.price;
        } else if (addonDetails.type === 'monthly') {
          monthlyTotal += addonDetails.price;
        }
      }
    });

    logStep("Calculated totals", { oneTimeTotal, monthlyTotal });

    // Create line items
    const lineItems = [];

    // Add setup fee and one-time add-ons as a single line item
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${formData.selectedPackage} Plan Setup + Add-ons`,
          description: `Setup fee and one-time add-ons for ${formData.selectedPackage} plan`
        },
        unit_amount: oneTimeTotal * 100, // Convert to cents
      },
      quantity: 1,
    });

    // Add monthly subscription
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${formData.selectedPackage} Plan - Monthly`,
          description: `Monthly subscription for ${formData.selectedPackage} plan including monthly add-ons`
        },
        unit_amount: monthlyTotal * 100, // Convert to cents
        recurring: { interval: "month" },
      },
      quantity: 1,
    });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: lineItems,
      mode: "subscription",
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/intake?canceled=true`,
      metadata: {
        user_id: user.id,
        selected_package: formData.selectedPackage,
        selected_addons: JSON.stringify(formData.selectedAddons || [])
      }
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    // Store project submission in database
    const { error: insertError } = await supabaseClient
      .from('project_submissions')
      .insert({
        user_id: user.id,
        email: user.email,
        selected_package: formData.selectedPackage,
        selected_addons: formData.selectedAddons,
        website_type: formData.projectType, // Map projectType to website_type
        primary_goal: formData.primaryGoal || null,
        target_audience: formData.targetAudience || null,
        pages: formData.pageCount?.toString() || null,
        text_ready: false,
        images_ready: false,
        downloads: null,
        color_palette: null,
        fonts: null,
        design_inspiration: null,
        has_logo: false,
        animations: null,
        layout_preference: null,
        pages_behavior: null,
        contact_forms: null,
        contact_destination: null,
        autoresponders: false,
        social_platforms: null,
        social_integrations: null,
        exclude_features: null,
        stripe_session_id: session.id,
        stripe_customer_id: customerId,
        payment_status: 'pending',
        one_time_total: oneTimeTotal,
        monthly_total: monthlyTotal,
        grand_total: oneTimeTotal + monthlyTotal
      });

    if (insertError) {
      logStep("Error inserting project submission", insertError);
      throw new Error(`Database error: ${insertError.message}`);
    }

    logStep("Project submission stored in database");

    return new Response(JSON.stringify({ url: session.url }), {
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
