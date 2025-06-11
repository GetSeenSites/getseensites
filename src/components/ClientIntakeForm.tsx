
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
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [pageCount, setPageCount] = useState(5);
  const [addOns, setAddOns] = useState({
    logo: false,
    content: false,
    chatbot: false
  });

  const plans = {
    basic: { name: 'Basic', monthlyFee: 25, annualFee: 270, features: ['Basic website', 'Up to 5 pages'] },
    starter: { name: 'Starter', monthlyFee: 35, annualFee: 378, features: ['Standard website', 'Up to 10 pages', 'SEO optimization'] },
    business: { name: 'Business', monthlyFee: 69, annualFee: 745, features: ['Advanced website', 'Up to 20 pages', 'E-commerce ready', 'Priority support'] },
    premium: { name: 'Premium', monthlyFee: 159, annualFee: 1717, features: ['Custom website', 'Unlimited pages', 'Dedicated support', 'Marketing consultation'] }
  };

  const handlePlanSelect = (plan: 'basic' | 'starter' | 'business' | 'premium') => {
    setSelectedPlan(plan);
  };

  const handleBillingChange = (bill: 'monthly' | 'annual') => {
    setBilling(bill);
  };

  const handleAddOnChange = (addon: 'logo' | 'content' | 'chatbot') => {
    setAddOns(prev => ({ ...prev, [addon]: !prev[addon] }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Select Billing Cycle</h2>
        <div className="flex items-center space-x-4">
          <Button variant={billing === 'monthly' ? 'default' : 'outline'} onClick={() => handleBillingChange('monthly')}>
            Monthly
          </Button>
          <Button variant={billing === 'annual' ? 'default' : 'outline'} onClick={() => handleBillingChange('annual')}>
            Annual
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(plans).map(([key, plan]) => (
            <Card key={key} className={selectedPlan === key ? "border-2 border-primary" : ""}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                <CardDescription>
                  {billing === 'monthly' ? `$${plan.monthlyFee}/month` : `$${plan.annualFee}/year`}
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
        billing={billing}
        addOns={addOns}
      />
    </div>
  );
};

export default ClientIntakeForm;
