import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ImageUpload from '@/components/forms/ImageUpload';

const IntakePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    businessDescription: '',
    pageCount: 1,
    pages: 1,
    projectType: [],
    referenceUrl: '',
    uploadedImages: [] as File[],
    addOns: {
      logo: false,
      chatbot: false,
      content: false,
      maintenance: false
    },
    plan: 'starter',
    billing: 'monthly'
  });

  const navigate = useNavigate();
  const totalSteps = 7; // Updated to 7 steps

  const plans = {
    starter: { setupFee: 149, monthlyFee: 40, maxPages: 3 },
    business: { setupFee: 249, monthlyFee: 85, maxPages: 6 },
    premium: { setupFee: 649, monthlyFee: 170, maxPages: 10 }
  };

  const planFeatures = {
    starter: [
      'Up to 3 pages',
        'Mobile responsive design',
        'Basic SEO setup',
        'Contact form integration',
        'Social media links',
    ],
    business: [
      'Starter Plan +',
        'Up to 6 pages',
        'Animations + Effects',
        'Shipping/Booking',
        'Advanced SEO optimization',
        'Advanced contact forms',
        'E-commerce ready',
        '30-day priority support'
    ],
    premium: [
     'Business Plan +',
        'Up to 10 pages',
        'Advanced custom features',
        'Premium SEO package',
        'Advanced integrations',
        'Anaylitics',
        'Custom design elements',
        'Priority development',
        '3 revisions',
        'Custom functionality'
    ]
  };

  const validateStep = (step: number) => {
    const newErrors: string[] = [];
    
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.push('Full name is required');
        if (!formData.email.trim()) newErrors.push('Email is required');
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.push('Please enter a valid email address');
        }
        break;
      case 2:
        if (!formData.businessName.trim()) newErrors.push('Business name is required');
        if (!formData.businessDescription.trim()) newErrors.push('Business description is required');
        break;
      case 3:
        if (!formData.pageCount || formData.pageCount < 1) newErrors.push('Page count is required');
        if (formData.projectType.length === 0) newErrors.push('Please select at least one project type');
        break;
      case 6:
        if (!formData.plan) newErrors.push('Please select a plan');
        if (formData.pageCount > plans[formData.plan].maxPages) {
          if (formData.plan === 'starter') {
            newErrors.push('You need the Business plan for more than 3 pages');
          } else if (formData.plan === 'business') {
            newErrors.push('You need the Premium plan for more than 5 pages');
          }
        }
        break;
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setErrors([]);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors([]);
    }
  };

  const handleExit = () => {
    navigate('/');
  };

  const convertFilesToBase64 = async (files: File[]): Promise<Array<{name: string, content: string, type: string}>> => {
    const convertedFiles = await Promise.all(
      files.map(file => {
        return new Promise<{name: string, content: string, type: string}>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve({
              name: file.name,
              content: base64String,
              type: file.type
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );
    return convertedFiles;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      const totals = calculateTotal();
      
      const submissionData = {
        selectedPackage: formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1),
        selectedAddons: [],
        fullName: formData.fullName,
        email: formData.email,
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        pageCount: formData.pageCount,
        projectType: formData.projectType,
        referenceUrl: formData.referenceUrl,
        uploadedImagesCount: formData.uploadedImages.length,
        setupFee: totals.setupFee,
        oneTimeAddOns: totals.oneTimeAddOns,
        firstMonth: totals.firstMonth,
        monthlyRecurring: totals.monthlyRecurring,
        today: totals.today,
        submittedAt: new Date().toISOString()
      };

      if (formData.addOns.logo) submissionData.selectedAddons.push('Logo Design');
      if (formData.addOns.chatbot) submissionData.selectedAddons.push('AI Chatbot');
      if (formData.addOns.content) submissionData.selectedAddons.push('Content Writing');
      if (formData.addOns.maintenance) submissionData.selectedAddons.push('Maintenance');

      console.log('Starting parallel submission process...');

      // Convert uploaded images to base64
      const convertedFiles = await convertFilesToBase64(formData.uploadedImages);

      // Start both processes in parallel
      const stripePromise = supabase.functions.invoke('create-checkout', {
        body: { formData: submissionData }
      });

      const emailPromise = supabase.functions.invoke('send-intake-email', {
        body: { 
          formData: submissionData,
          files: convertedFiles
        }
      });

      // Wait for both to complete
      const [stripeResult, emailResult] = await Promise.all([stripePromise, emailPromise]);

      // Check for errors
      if (stripeResult.error) {
        console.error('Stripe error:', stripeResult.error);
        alert('There was an error processing your payment. Please try again.');
        return;
      }

      if (emailResult.error) {
        console.error('Email error:', emailResult.error);
        // Don't block the process for email errors, just log
        console.warn('Email notification failed, but payment processing will continue');
      } else {
        console.log('Email sent successfully');
      }

      // Redirect to Stripe checkout
      if (stripeResult.data?.url) {
        window.location.href = stripeResult.data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  const calculateTotal = () => {
    const selectedPlan = plans[formData.plan];
    const setupFee = selectedPlan.setupFee;
    const monthlyPlanFee = selectedPlan.monthlyFee;

    const addOnPrices = {
      logo: 20,
      chatbot: 275, 
      content: 25,
      maintenance: 20
    };

    let oneTimeAddOns = 0;
    let monthlyAddOns = 0;

    if (formData.addOns.logo) oneTimeAddOns += addOnPrices.logo;
    if (formData.addOns.chatbot) oneTimeAddOns += addOnPrices.chatbot;
    if (formData.addOns.content) oneTimeAddOns += addOnPrices.content;
    if (formData.addOns.maintenance) monthlyAddOns += addOnPrices.maintenance;

    const firstMonth = monthlyPlanFee + monthlyAddOns;
    const today = setupFee + oneTimeAddOns + firstMonth;
    const monthlyRecurring = monthlyPlanFee + monthlyAddOns;

    return { 
      setupFee,
      oneTimeAddOns, 
      firstMonth,
      monthlyRecurring,
      today 
    };
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-8">Let's Get Started.</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Tell us about your brand.</h2>
              <p className="text-white/70 text-lg">We love to hear your story.</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Business Name *"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                placeholder="Tell us what your business does in a few lines. *"
                rows={4}
                value={formData.businessDescription}
                onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-8">What are we building together?</h2>
            <div className="space-y-4">
              <input
                type="number"
                min="1"
                placeholder="Page Count *"
                value={formData.pageCount}
                onChange={(e) => setFormData({...formData, pageCount: parseInt(e.target.value) || 1})}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="url"
                placeholder="Reference Website URL (optional)"
                value={formData.referenceUrl}
                onChange={(e) => setFormData({...formData, referenceUrl: e.target.value})}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="grid grid-cols-2 gap-4">
                {['Portfolio', 'Blog', 'Business', 'E-Commerce'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      const updated = formData.projectType.includes(type)
                        ? formData.projectType.filter(t => t !== type)
                        : [...formData.projectType, type];
                      setFormData({...formData, projectType: updated});
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.projectType.includes(type)
                        ? 'border-orange-500 bg-orange-500/20 text-white'
                        : 'border-white/20 bg-white/10 text-white/70 hover:border-orange-500/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <ImageUpload
              files={formData.uploadedImages}
              onFilesChange={(files) => setFormData({...formData, uploadedImages: files})}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-8">Add-Ons</h2>
            <div className="space-y-4">
              {[
                { key: 'logo', name: 'Logo Design', price: '$20 (one-time)' },
                { key: 'chatbot', name: 'AI Chatbot', price: '$275 (one-time)' },
                { key: 'content', name: 'Content Writing', price: '$25 (one-time)' },
                { key: 'maintenance', name: 'Maintenance', price: '$20/month' }
              ].map((addon) => (
                <label key={addon.key} className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
                  <div>
                    <span className="text-white font-semibold">{addon.name}</span>
                    <span className="text-orange-300 ml-2">{addon.price}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.addOns[addon.key]}
                    onChange={(e) => setFormData({
                      ...formData,
                      addOns: { ...formData.addOns, [addon.key]: e.target.checked }
                    })}
                    className="w-5 h-5 text-orange-500 bg-transparent border-2 border-white/40 rounded focus:ring-orange-500"
                  />
                </label>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-8">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  id: 'starter', 
                  name: 'Starter', 
                  setupFee: 149,
                  monthlyFee: 40,
                  features: planFeatures.starter
                },
                { 
                  id: 'business', 
                  name: 'Business', 
                  setupFee: 249,
                  monthlyFee: 85,
                  features: planFeatures.business
                },
                { 
                  id: 'premium', 
                  name: 'Premium', 
                  setupFee: 649,
                  monthlyFee: 170,
                  startingAt: true,
                  features: planFeatures.premium
                }
              ].map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setFormData({...formData, plan: plan.id})}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    formData.plan === plan.id
                      ? 'border-orange-500 bg-orange-500/20'
                      : 'border-white/20 bg-white/10 hover:border-orange-500/50'
                  }`}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-orange-300">
                      {plan.startingAt ? 'Starting at ' : ''}${plan.setupFee}
                      <span className="text-lg text-white/70"> setup</span>
                    </div>
                    <div className="text-xl font-semibold text-orange-400">
                      + ${plan.monthlyFee}<span className="text-lg text-white/70">/month</span>
                    </div>
                    {plan.startingAt && (
                      <div className="text-sm text-white/50 mt-1">
                        Custom features available
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-white/80">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            {formData.pageCount > plans[formData.plan].maxPages && (
              <div className="text-red-400 text-sm mt-4 p-3 bg-red-500/20 rounded-lg">
                ⚠️ Your selected plan allows up to {plans[formData.plan].maxPages} pages. You need {formData.plan === 'starter' ? 'the Business plan' : 'the Premium plan'} for {formData.pageCount} pages.
              </div>
            )}
          </div>
        );

      case 7:
        const totals = calculateTotal();
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-8">Review & Confirmation</h2>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20 space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Project Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>Plan:</span>
                  <span className="text-orange-300 capitalize">{formData.plan}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Pages:</span>
                  <span>{formData.pageCount}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Uploaded Images:</span>
                  <span>{formData.uploadedImages.length} files</span>
                </div>
              </div>

              {totals.monthlyRecurring > 0 && (
                <div className="border-t border-white/20 pt-4">
                  <h4 className="text-white font-bold text-lg mb-2">📆 Monthly Subscription After Today:</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-white/80">
                      <span>- {formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1)} Plan:</span>
                      <span>${plans[formData.plan].monthlyFee}</span>
                    </div>
                    {formData.addOns.maintenance && (
                      <div className="flex justify-between text-white/80">
                        <span>- Maintenance:</span>
                        <span>$20</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <div className="flex justify-between text-orange-300 font-bold text-lg">
                      <span>➡️ Total Monthly (starts in 30 days):</span>
                      <span>${totals.monthlyRecurring}/month</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-white/20 pt-4 bg-orange-500/10 rounded-lg p-4">
                <h4 className="text-white font-bold text-lg mb-3">💰 Charges Today:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-white">
                    <span>- Setup Fee:</span>
                    <span>${totals.setupFee}</span>
                  </div>
                  {totals.oneTimeAddOns > 0 && (
                    <div className="space-y-1">
                      {formData.addOns.logo && (
                        <div className="flex justify-between text-white/80">
                          <span>- Logo Design:</span>
                          <span>$20</span>
                        </div>
                      )}
                      {formData.addOns.chatbot && (
                        <div className="flex justify-between text-white/80">
                          <span>- AI Chatbot:</span>
                          <span>$275</span>
                        </div>
                      )}
                      {formData.addOns.content && (
                        <div className="flex justify-between text-white/80">
                          <span>- Content Writing:</span>
                          <span>$25</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between text-white">
                    <span>- First Month Service:</span>
                    <span>${totals.firstMonth}</span>
                  </div>
                  <div className="border-t border-orange-500/30 pt-2">
                    <div className="flex justify-between text-orange-300 font-bold text-xl">
                      <span>➡️ Grand Total Today:</span>
                      <span>${totals.today}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header with Exit Button */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Project Intake</h1>
            <button
              onClick={handleExit}
              className="flex items-center px-4 py-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5 mr-2" />
              Exit
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i + 1 <= currentStep ? 'bg-orange-500' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <div className="text-center text-white/70">
              Step {currentStep} of {totalSteps}
            </div>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <h3 className="text-red-300 font-semibold mb-2">Please fix the following:</h3>
              <ul className="list-disc list-inside text-red-200">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="inline-flex items-center px-6 py-3 text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all group"
              >
                Confirm and Submit
                <Check className="ml-2 w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all group"
              >
                Next
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakePage;
