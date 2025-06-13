
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProjectCalculatorProps {
  selectedPlan: 'basic' | 'starter' | 'business' | 'premium';
  pageCount: number;
  addOns: {
    logo: boolean;
    content: boolean;
    chatbot: boolean;
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

  // Updated pricing to match homepage exactly - monthly only
  const planPrices = {
    basic: { setupFee: 149, monthlyFee: 49 },
    starter: { setupFee: 249, monthlyFee: 99 },
    business: { setupFee: 399, monthlyFee: 199 },
    premium: { setupFee: 999, monthlyFee: 299 }
  };

  const addOnPrices = {
    logo: 150,
    content: 50,
    chatbot: 299
  };

  const selectedPlanDetails = planPrices[selectedPlan];
  const setupFee = selectedPlanDetails.setupFee;
  const monthlyFee = selectedPlanDetails.monthlyFee;
  
  const logoPrice = addOns.logo ? addOnPrices.logo : 0;
  const contentPrice = addOns.content ? addOnPrices.content * pageCount : 0;
  const chatbotPrice = addOns.chatbot ? addOnPrices.chatbot : 0;

  const oneTimeTotal = setupFee + logoPrice + contentPrice + chatbotPrice;
  const totalToday = oneTimeTotal + monthlyFee;

  if (!selectedPlan) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 20 
      }}
      className="fixed right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-40 w-72 sm:w-80"
    >
      <div className="bg-black/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-orange-500/20 shadow-2xl">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Project Total</h3>
        
        <div className="space-y-3 mb-4">
          <div className="border-b border-orange-500/20 pb-2">
            <div className="flex justify-between text-white text-sm sm:text-base">
              <span className="capitalize">{selectedPlan} Plan</span>
              <span>${monthlyFee}/mo</span>
            </div>
          </div>
          
          <div className="flex justify-between text-white text-sm sm:text-base">
            <span>Setup Fee:</span>
            <span>${setupFee}</span>
          </div>
          
          {addOns.logo && (
            <div className="flex justify-between text-white/80 text-sm">
              <span>Logo Design</span>
              <span>${logoPrice}</span>
            </div>
          )}
          
          {addOns.content && pageCount > 0 && (
            <div className="flex justify-between text-white/80 text-sm">
              <span>Content Writing ({pageCount} pages)</span>
              <span>${contentPrice}</span>
            </div>
          )}
          
          {addOns.chatbot && (
            <div className="flex justify-between text-white/80 text-sm">
              <span>AI Chatbot</span>
              <span>${chatbotPrice}</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-orange-500/20 pt-4 space-y-2">
          <div className="flex justify-between text-white font-semibold text-sm sm:text-base">
            <span>Monthly:</span>
            <span>${monthlyFee}</span>
          </div>
          <div className="flex justify-between text-white font-semibold text-sm sm:text-base">
            <span>Setup + Add-ons:</span>
            <span>${oneTimeTotal}</span>
          </div>
          <div className="flex justify-between text-orange-500 font-bold text-base sm:text-lg border-t border-orange-500/20 pt-2">
            <span>Total Today:</span>
            <span>${totalToday}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCalculator;
