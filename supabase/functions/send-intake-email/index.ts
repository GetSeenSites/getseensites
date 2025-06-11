
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface IntakeEmailRequest {
  formData: any;
  files: Array<{
    name: string;
    content: string; // base64 encoded
    type: string;
  }>;
}

const formatFormData = (data: any) => {
  const sections = [
    {
      title: "👤 Company Information",
      fields: [
        { label: "Email", value: data.email },
        { label: "Company Name", value: data.companyName },
        { label: "Current Website", value: data.websiteUrl || "None" },
        { label: "Industry", value: data.industry },
      ]
    },
    {
      title: "🏢 Business Details",
      fields: [
        { label: "Business Description", value: data.businessDescription },
        { label: "Target Audience", value: data.targetAudience },
        { label: "Website Goals", value: data.goals || "Not specified" },
      ]
    },
    {
      title: "🎨 Design Preferences",
      fields: [
        { label: "Style Preferences", value: data.stylePreferences || "Not specified" },
        { label: "Color Preferences", value: data.colorPreferences || "Not specified" },
        { label: "Inspiration Websites", value: data.exampleWebsites || "None provided" },
      ]
    },
    {
      title: "📋 Project Requirements",
      fields: [
        { label: "Page Count", value: data.pageCount },
        { label: "Selected Plan", value: data.selectedPlan?.charAt(0).toUpperCase() + data.selectedPlan?.slice(1) },
        { label: "Billing", value: data.billing?.charAt(0).toUpperCase() + data.billing?.slice(1) },
        { label: "Add-ons", value: formatAddOns(data.addOns) },
      ]
    },
    {
      title: "💰 Pricing Summary",
      fields: [
        { label: "One-time Add-ons", value: `$${data.pricing?.oneTimeAddOns || 0}` },
        { label: "Plan Fee", value: `$${data.pricing?.firstPayment - (data.pricing?.oneTimeAddOns || 0) || 0}` },
        { label: "Monthly Recurring", value: `$${data.pricing?.monthlyRecurring || 0}` },
        { label: "Total Today", value: `$${data.pricing?.today || 0}` },
      ]
    }
  ];

  return sections.map(section => 
    `<div style="margin-bottom: 30px;">
      <h3 style="color: #f97316; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #fed7aa; padding-bottom: 5px;">${section.title}</h3>
      ${section.fields.map(field => 
        `<p style="margin: 8px 0; padding: 8px; background-color: #fef3c7; border-radius: 4px;">
          <strong>${field.label}:</strong> ${field.value || "Not provided"}
        </p>`
      ).join("")}
    </div>`
  ).join("");
};

const formatAddOns = (addOns: any) => {
  if (!addOns) return "None selected";
  
  if (typeof addOns === "object") {
    const selected = Object.entries(addOns)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => key.charAt(0).toUpperCase() + key.slice(1));
    return selected.length > 0 ? selected.join(", ") : "None selected";
  }
  
  return String(addOns);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData, files }: IntakeEmailRequest = await req.json();

    // Prepare attachments
    const attachments = files.map(file => ({
      filename: file.name,
      content: file.content,
      type: file.type,
    }));

    const emailHtml = `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #fff;">
        <div style="text-align: center; margin-bottom: 40px; padding: 20px; background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 12px;">
          <h1 style="color: white; font-size: 32px; margin: 0; font-weight: 600;">🎉 New Website Project Submission</h1>
          <p style="color: #fed7aa; font-size: 16px; margin: 10px 0 0 0;">GetSeenSites - Project Intake</p>
        </div>

        ${formatFormData(formData)}

        ${files.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #f97316; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #fed7aa; padding-bottom: 5px;">📸 Uploaded Files</h3>
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px;">
            ${files.map(file => 
              `<p style="margin: 5px 0; padding: 8px; background-color: white; border-radius: 4px; border-left: 4px solid #f97316;">
                📎 <strong>${file.name}</strong> (${file.type})
              </p>`
            ).join("")}
            <p style="margin-top: 10px; font-size: 14px; color: #92400e;">
              <em>Files are attached to this email for download.</em>
            </p>
          </div>
        </div>
        ` : ""}

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 12px; border-left: 4px solid #22c55e; margin-top: 30px;">
          <h3 style="color: #15803d; margin: 0 0 10px 0;">✅ Next Steps</h3>
          <p style="color: #166534; margin: 5px 0;">1. Review all project details above</p>
          <p style="color: #166534; margin: 5px 0;">2. Download and review uploaded files</p>
          <p style="color: #166534; margin: 5px 0;">3. Contact client to schedule project kickoff</p>
          <p style="color: #166534; margin: 5px 0;">4. Payment will be processed automatically via Stripe</p>
        </div>

        <div style="text-align: center; margin-top: 40px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            This email was sent automatically from the GetSeenSites intake form.<br>
            Submission time: ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "GetSeenSites <onboarding@resend.dev>",
      to: ["contactgetseensites@gmail.com"],
      subject: `🚀 New Project: ${formData.companyName} - ${formData.selectedPlan?.charAt(0).toUpperCase() + formData.selectedPlan?.slice(1)} Plan`,
      html: emailHtml,
      attachments: attachments,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-intake-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
