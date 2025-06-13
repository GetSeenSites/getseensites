
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import ProjectCalculator from './ProjectCalculator';

interface ClientIntakeFormProps {
  onSubmit: (formData: any) => void;
}

const ClientIntakeForm = ({ onSubmit }: ClientIntakeFormProps) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'starter' | 'business' | 'premium'>('starter');
  const [pageCount, setPageCount] = useState(5);
  const [addOns, setAddOns] = useState({
    logo: false,
    content: false,
    chatbot: false
  });

  // Updated plans to match homepage pricing exactly - monthly only
  const plans = {
    basic: { 
      name: 'Basic', 
      monthlyFee: 49,
      setupFee: 149,
      features: [
        'Mobile-optimized 3-page site',
        'Hosted and secured', 
        'Live in 3-5 days',
        ' Done-for-you launch, no tech headaches'
      ] 
    },
    starter: { 
      name: 'Starter', 
      monthlyFee: 99,
      setupFee: 249,
      features: [
        'All Basic features +',
        '5-page high-converting layout',
        'Booking setup (Calendly, Square, or custom)',
        'Stripe payments integration (2% Transaction Fee)',
        'Social media links + Instagram feed',
        ' Looks professional. Works like a sales tool.'
      ] 
    },
    business: { 
      name: 'Business', 
      monthlyFee: 199,
      setupFee: 399,
      features: [
        'All Starter features +',
        'Full e-commerce store (unlimited products)',
        'Lead capture + email marketing',
        'Abandoned cart recovery',
        'CRM + Analytics dashboard',
        ' Real infrastructure for growth'
      ] 
    },
    premium: { 
      name: 'Premium', 
      monthlyFee: 299,
      setupFee: 999,
      features: [
        'All Business features +',
        'Custom design tailored to brand',
        'Built-in AI chatbot',
        'Advanced SEO + fast load times',
        'Smart product recommendations, analytics',
        'Priority support',
        ' Your business, on autopilot.'
      ] 
    }
  };

  const handlePlanSelect = (plan: 'basic' | 'starter' | 'business' | 'premium') => {
    setSelectedPlan(plan);
  };

  const handleAddOnChange = (addon: 'logo' | 'content' | 'chatbot') => {
    setAddOns(prev => ({ ...prev, [addon]: !prev[addon] }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(plans).map(([key, plan]) => (
            <Card key={key} className={selectedPlan === key ? "border-2 border-primary" : ""}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                <CardDescription>
                  <div className="text-lg font-bold text-primary">
                    ${plan.monthlyFee}/mo
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    + ${plan.setupFee} setup fee
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4" onClick={() => handlePlanSelect(key as 'basic' | 'starter' | 'business' | 'premium')}>
                  {selectedPlan === key ? "Selected" : "Select Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <ProjectCalculator 
        selectedPlan={selectedPlan}
        pageCount={pageCount}
        addOns={addOns}
      />
    </div>
  );
};

export default ClientIntakeForm;
