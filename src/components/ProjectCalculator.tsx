
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface ProjectCalculatorProps {
  selectedPlan: 'starter' | 'business' | 'premium' ;
  pageCount: number;
  addOns: {
    logo: boolean;
    content: boolean;
    chatbot: boolean;
    maintenance: boolean;
  };
}

const ProjectCalculator = ({ selectedPlan, pageCount, addOns }: ProjectCalculatorProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const planPrices = {
    starter: 40,
    business: 85,
    premium: 170
  };

  const addOnPrices = {
    logo: 20,
    content: 25,
    chatbot: 275,
    maintenance: 20
  };

  const basePlanPrice = selectedPlan ? planPrices[selectedPlan] : 0;
  const logoPrice = addOns.logo ? addOnPrices.logo : 0;
  const contentPrice = addOns.content ? addOnPrices.content * pageCount : 0;
  const chatbotPrice = addOns.chatbot ? addOnPrices.chatbot : 0;
  const maintenancePrice = addOns.maintenance ? addOnPrices.maintenance : 0;

  const monthlyTotal = basePlanPrice + maintenancePrice;
  const oneTimeTotal = logoPrice + contentPrice + chatbotPrice;
  const totalProject = monthlyTotal + oneTimeTotal;

  if (!selectedPlan) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 20 
      }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 w-80"
    >
      <div className="bg-black/95 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Project Total</h3>
        
        <div className="space-y-3 mb-4">
          <div className="border-b border-orange-500/20 pb-2">
            <div className="flex justify-between text-white">
              <span className="capitalize">{selectedPlan} Plan</span>
              <span>${basePlanPrice}</span>
            </div>
          </div>
          
          {addOns.logo && (
            <div className="flex justify-between text-white/80">
              <span>Logo Design</span>
              <span>${logoPrice}</span>
            </div>
          )}
          
          {addOns.content && pageCount > 0 && (
            <div className="flex justify-between text-white/80">
              <span>Content Writing ({pageCount} pages)</span>
              <span>${contentPrice}</span>
            </div>
          )}
          
          {addOns.chatbot && (
            <div className="flex justify-between text-white/80">
              <span>AI Chatbot</span>
              <span>${chatbotPrice}</span>
            </div>
          )}
          
          {addOns.maintenance && (
            <div className="flex justify-between text-white/80">
              <span>Maintenance</span>
              <span>${maintenancePrice}/mo</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-orange-500/20 pt-4 space-y-2">
          <div className="flex justify-between text-white font-semibold">
            <span>Monthly:</span>
            <span>${monthlyTotal}</span>
          </div>
          {oneTimeTotal > 0 && (
            <div className="flex justify-between text-white font-semibold">
              <span>One-time:</span>
              <span>${oneTimeTotal}</span>
            </div>
          )}
          <div className="flex justify-between text-orange-500 font-bold text-lg border-t border-orange-500/20 pt-2">
            <span>Total:</span>
            <span>${totalProject}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCalculator;
