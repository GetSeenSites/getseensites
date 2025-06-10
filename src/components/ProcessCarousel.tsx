import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Target, Palette, Rocket, Pencil } from 'lucide-react';

const ProcessCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const processSteps = [
    {
      number: "01",
      title: "Fill Out Intake Form",
      description: "Tell us about your business, goals, and vision. Our detailed form helps us understand exactly what you need.",
      icon: Pencil
    },
    {
      number: "02",
      title: "Custom Proposal",
      description: "We create a tailored proposal with timeline, pricing, and mockups based on your specific requirements.",
      icon: Palette
    },
    {
      number: "03",
      title: "Review & Launch",
      description: "Review your website, request changes, and launch your professional online presence to the world.",
      icon: Rocket
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % processSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-black"></div>
      
      {/* Animated Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Proven <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Process</span>
          </h3>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            We follow a systematic approach to ensure your project is delivered on time, 
            on budget, and exceeds your expectations.
          </p>
        </div>
        
        {/* Main Card Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevStep}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextStep}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>

          {/* Card Container */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full text-center"
              >
                {/* Step Number */}
                <div className="text-8xl font-bold text-orange-500/20 mb-4">
                  {processSteps[currentStep].number}
                </div>
                
                {/* Icon */}
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-8"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {React.createElement(processSteps[currentStep].icon, {
                    className: "w-12 h-12 text-white"
                  })}
                </motion.div>
                
                {/* Content */}
                <h4 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  {processSteps[currentStep].title}
                </h4>
                <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                  {processSteps[currentStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessCarousel;
