import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Upload, X, Star, Sparkles, Building2, Target, Palette, Camera, CreditCard, FileText, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import FormQuestion from '../components/forms/FormQuestion';
import QuestionRadioGroup from '../components/forms/QuestionRadioGroup';
import QuestionCheckboxGrid from '../components/forms/QuestionCheckboxGrid';
import ImageUpload from '../components/forms/ImageUpload';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  step: number;
  email: string;
  companyName: string;
  websiteUrl: string;
  industry: string;
  businessDescription: string;
  targetAudience: string;
  goals: string;
  stylePreferences: string;
  colorPreferences: string;
  logoFiles: File[];
  exampleWebsites: string;
  selectedPlan: 'basic' | 'starter' | 'business' | 'premium';
  pageCount: number;
  addOns: {
    logo: boolean;
    content: boolean;
    chatbot: boolean;
  };
}

// Updated pricing to match Services section exactly - monthly only
const plans = {
  basic: { 
    name: 'Basic', 
    monthlyFee: 49,
    setupFee: 149,
    maxPages: 3,
    features: [
      'Mobile-optimized 3-page site',
      'Hosted and secured',
      'Live in 3-5 days',
      '✅ Done-for-you launch, no tech headaches'
    ] 
  },
  starter: { 
    name: 'Starter', 
    monthlyFee: 99,
    setupFee: 249,
    maxPages: 5,
    features: [
      'All Basic features +',
      '5-page high-converting layout',
      'Booking setup (Calendly, Square, or custom)',
      'Stripe payments integration (2% Transaction Fee)',
      'Social media links + Instagram feed',
      '✅ Looks professional. Works like a sales tool.'
    ] 
  },
  business: { 
    name: 'Business', 
    monthlyFee: 199,
    setupFee: 399,
    maxPages: 10,
    features: [
      'All Starter features +',
      'Full e-commerce store (unlimited products)',
      'Lead capture + email marketing',
      'Abandoned cart recovery',
      'CRM + Analytics dashboard',
      '✅ Real infrastructure for growth'
    ] 
  },
  premium: { 
    name: 'Premium', 
    monthlyFee: 299,
    setupFee: 999,
    maxPages: Infinity,
    features: [
      'All Business features +',
      'Custom design tailored to brand',
      'Built-in AI chatbot',
      'Advanced SEO + fast load times',
      'Smart product recommendations, analytics',
      'Priority support',
      '✅ Your business, on autopilot.'
    ] 
  }
};

const addOnPrices = {
  logo: 150,
  content: 50,
  chatbot: 299
};

const IntakePage = () => {
  const [formData, setFormData] = useState<FormData>({
    step: 1,
    email: '',
    companyName: '',
    websiteUrl: '',
    industry: '',
    businessDescription: '',
    targetAudience: '',
    goals: '',
    stylePreferences: '',
    colorPreferences: '',
    logoFiles: [],
    exampleWebsites: '',
    selectedPlan: 'starter',
    pageCount: 5,
    addOns: {
      logo: false,
      content: false,
      chatbot: false
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePageCount = (pageCount: number, selectedPlan: string) => {
    const plan = plans[selectedPlan as keyof typeof plans];
    if (plan && plan.maxPages !== Infinity && pageCount > plan.maxPages) {
      return `You can only select up to ${plan.maxPages} pages on the ${plan.name} plan.`;
    }
    return '';
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
        break;
      case 2:
        if (!formData.businessDescription.trim()) newErrors.businessDescription = 'Business description is required';
        if (!formData.targetAudience.trim()) newErrors.targetAudience = 'Target audience is required';
        break;
      case 5:
        // Validate page count for step 5 (plan selection)
        const pageCountError = validatePageCount(formData.pageCount, formData.selectedPlan);
        if (pageCountError) newErrors.pageCount = pageCountError;
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePricing = () => {
    const plan = plans[formData.selectedPlan];
    
    let oneTimeAddOns = 0;
    if (formData.addOns.logo) oneTimeAddOns += addOnPrices.logo;
    if (formData.addOns.content) oneTimeAddOns += formData.pageCount * addOnPrices.content;
    if (formData.addOns.chatbot) oneTimeAddOns += addOnPrices.chatbot;
    
    const setupFee = plan.setupFee;
    const monthlyFee = plan.monthlyFee;
    const firstPayment = setupFee + oneTimeAddOns + monthlyFee;
    
    return {
      setupFee,
      oneTimeAddOns,
      firstPayment,
      monthlyRecurring: monthlyFee,
      today: firstPayment
    };
  };

  const nextStep = () => {
    if (validateStep(formData.step)) {
      setFormData(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    setFormData(prev => ({ ...prev, step: prev.step - 1 }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePageCountChange = (value: number) => {
    setFormData(prev => ({ ...prev, pageCount: isNaN(value) ? 0 : value }));
    
    // Validate page count immediately
    const pageCountError = validatePageCount(value, formData.selectedPlan);
    if (pageCountError) {
      setErrors(prev => ({ ...prev, pageCount: pageCountError }));
    } else {
      setErrors(prev => ({ ...prev, pageCount: '' }));
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // If changing plan, re-validate page count
    if (name === 'selectedPlan') {
      const pageCountError = validatePageCount(formData.pageCount, value);
      if (pageCountError) {
        setErrors(prev => ({ ...prev, pageCount: pageCountError }));
      } else {
        setErrors(prev => ({ ...prev, pageCount: '' }));
      }
    }
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [name]: value,
      },
    }));
  };

  const handleLogoUpload = (files: File[]) => {
    setFormData(prev => ({ ...prev, logoFiles: files }));
  };

  const handleSubmit = async () => {
    // Validate before submission
    if (!validateStep(formData.step)) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Starting form submission process...");
      
      // Upload files to Supabase storage
      const uploadedFiles = [];
      for (const file of formData.logoFiles) {
        try {
          // Sanitize filename
          const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const filePath = `${Date.now()}-${sanitizedName}`;
          
          const { data, error } = await supabase.storage
            .from('intake-uploads')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (error) {
            console.error('Error uploading file:', error);
            toast.error(`Error uploading ${file.name}`);
            setIsSubmitting(false);
            return;
          }

          uploadedFiles.push({
            name: file.name,
            path: data.path,
            size: file.size,
            type: file.type
          });
        } catch (uploadError) {
          console.error('File upload exception:', uploadError);
          toast.error(`Failed to upload ${file.name}`);
          setIsSubmitting(false);
          return;
        }
      }

      console.log("Files uploaded successfully:", uploadedFiles.length);

      // Get current user (may be null for guest submissions)
      const { data: { user } } = await supabase.auth.getUser();

      // Store form submission in database
      const { data: submission, error: insertError } = await supabase
        .from('intake_submissions')
        .insert({
          user_id: user?.id || null, // Allow null for guest submissions
          email: formData.email,
          company_name: formData.companyName,
          website_url: formData.websiteUrl,
          industry: formData.industry,
          business_description: formData.businessDescription,
          target_audience: formData.targetAudience,
          goals: formData.goals,
          style_preferences: formData.stylePreferences,
          color_preferences: formData.colorPreferences,
          example_websites: formData.exampleWebsites,
          selected_plan: formData.selectedPlan,
          page_count: formData.pageCount,
          billing: 'monthly', // Always monthly now
          add_ons: formData.addOns,
          uploaded_files: uploadedFiles,
          payment_status: 'pending'
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error saving submission:', insertError);
        toast.error('Error saving form data. Please try again.');
        setIsSubmitting(false);
        return;
      }

      console.log("Form submission saved to database:", submission.id);

      // Send email notification first
      try {
        const emailFiles = await Promise.all(
          uploadedFiles.map(async (file) => {
            try {
              const { data } = await supabase.storage
                .from('intake-uploads')
                .download(file.path);
              
              if (data) {
                const arrayBuffer = await data.arrayBuffer();
                const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
                return {
                  name: file.name,
                  content: base64,
                  type: file.type
                };
              }
              return null;
            } catch (error) {
              console.error('Error processing file for email:', error);
              return null;
            }
          })
        );

        const validEmailFiles = emailFiles.filter(file => file !== null);

        const { error: emailError } = await supabase.functions.invoke('send-intake-email', {
          body: {
            formData: {
              ...formData,
              submissionId: submission.id,
              pricing: calculatePricing()
            },
            files: validEmailFiles
          }
        });

        if (emailError) {
          console.error('Email sending error:', emailError);
          // Don't stop the process for email errors, just log it
        } else {
          console.log("Email sent successfully");
        }
      } catch (emailError) {
        console.error('Email process error:', emailError);
        // Continue with checkout even if email fails
      }

      // Create Stripe checkout session
      console.log("Creating Stripe checkout session...");
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
        body: {
          formData: {
            ...formData,
            submissionId: submission.id
          }
        }
      });

      if (checkoutError) {
        console.error('Error creating checkout:', checkoutError);
        toast.error(`Payment setup failed: ${checkoutError.message || 'Unknown error'}`);
        setIsSubmitting(false);
        return;
      }

      if (!checkoutData?.url) {
        console.error('No checkout URL received:', checkoutData);
        toast.error('Payment setup failed: No checkout URL received');
        setIsSubmitting(false);
        return;
      }

      console.log("Checkout session created successfully:", checkoutData.sessionId);

      // Update submission with Stripe session ID
      if (checkoutData.sessionId) {
        await supabase
          .from('intake_submissions')
          .update({ stripe_session_id: checkoutData.sessionId })
          .eq('id', submission.id);
      }

      toast.success("Form submitted successfully! Redirecting to payment...");
      
      // Redirect to Stripe checkout
      console.log("Redirecting to Stripe checkout:", checkoutData.url);
      window.location.href = checkoutData.url;

    } catch (error) {
      console.error("Submission error:", error);
      toast.error(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsSubmitting(false);
    }
  };

  const stepIcons = [Building2, Target, Palette, Camera, CreditCard, FileText];
  const stepTitles = ['Company Info', 'Business Details', 'Design Preferences', 'Photo Upload', 'Plan Selection', 'Order Summary'];

  const renderStep = () => {
    const StepIcon = stepIcons[formData.step - 1];

    switch (formData.step) {
      case 1:
        return (
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Company Information</h2>
              <p className="text-xl text-orange-200">Tell us about your business</p>
            </motion.div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white text-lg font-medium flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Address <span className="text-orange-400 text-xl">*</span>
                </Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg py-4 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm font-medium"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="companyName" className="text-white text-lg font-medium flex items-center gap-2">
                    Company Name <span className="text-orange-400 text-xl">*</span>
                  </Label>
                  <Input 
                    type="text" 
                    id="companyName" 
                    name="companyName" 
                    value={formData.companyName} 
                    onChange={handleChange}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg py-4 focus:border-orange-400 focus:ring-orange-400/20"
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm font-medium"
                    >
                      {errors.companyName}
                    </motion.p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="websiteUrl" className="text-white text-lg font-medium">
                    Current Website URL
                  </Label>
                  <Input 
                    type="text" 
                    id="websiteUrl" 
                    name="websiteUrl" 
                    value={formData.websiteUrl} 
                    onChange={handleChange}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg py-4 focus:border-orange-400 focus:ring-orange-400/20"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="industry" className="text-white text-lg font-medium flex items-center gap-2">
                  Industry <span className="text-orange-400 text-xl">*</span>
                </Label>
                <Input 
                  type="text" 
                  id="industry" 
                  name="industry" 
                  value={formData.industry} 
                  onChange={handleChange}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg py-4 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="e.g., Healthcare, Technology, Retail"
                />
                {errors.industry && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm font-medium"
                  >
                    {errors.industry}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Business Details</h2>
              <p className="text-xl text-orange-200">Help us understand your business better</p>
            </motion.div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="businessDescription" className="text-white text-lg font-medium flex items-center gap-2">
                  Business Description <span className="text-orange-400 text-xl">*</span>
                </Label>
                <Textarea 
                  id="businessDescription" 
                  name="businessDescription" 
                  value={formData.businessDescription} 
                  onChange={handleChange}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg min-h-32 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="Describe what your business does..."
                />
                {errors.businessDescription && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm font-medium"
                  >
                    {errors.businessDescription}
                  </motion.p>
                )}
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="targetAudience" className="text-white text-lg font-medium flex items-center gap-2">
                  Target Audience <span className="text-orange-400 text-xl">*</span>
                </Label>
                <Textarea 
                  id="targetAudience" 
                  name="targetAudience" 
                  value={formData.targetAudience} 
                  onChange={handleChange}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg min-h-32 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="Who are your ideal customers?"
                />
                {errors.targetAudience && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm font-medium"
                  >
                    {errors.targetAudience}
                  </motion.p>
                )}
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="goals" className="text-white text-lg font-medium">
                  Website Goals
                </Label>
                <Textarea 
                  id="goals" 
                  name="goals" 
                  value={formData.goals} 
                  onChange={handleChange}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg min-h-32 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="What do you want to achieve with your new website?"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Design Preferences</h2>
              <p className="text-xl text-orange-200">Share your vision with us</p>
            </motion.div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="stylePreferences" className="text-white text-lg font-medium">
                  Style Preferences
                </Label>
                <Textarea 
                  id="stylePreferences" 
                  name="stylePreferences" 
                  value={formData.stylePreferences} 
                  onChange={handleChange}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg min-h-32 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="Modern, classic, minimalist, bold, etc."
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="colorPreferences" className="text-white text-lg font-medium">
                  Color Preferences
                </Label>
                <Textarea 
                  id="colorPreferences" 
                  name="colorPreferences" 
                  value={formData.colorPreferences} 
                  onChange={handleChange}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg min-h-32 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="Preferred colors, brand colors, colors to avoid..."
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="exampleWebsites" className="text-white text-lg font-medium">
                  Inspiration Websites
                </Label>
                <Input 
                  type="text" 
                  id="exampleWebsites" 
                  name="exampleWebsites" 
                  value={formData.exampleWebsites} 
                  onChange={handleChange}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg py-4 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="URLs of websites you like (separate with commas)"
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Photo Upload</h2>
              <p className="text-xl text-orange-200">Share images for your new website</p>
            </motion.div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <ImageUpload onFilesChange={handleLogoUpload} />
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Plan</h2>
              <p className="text-xl text-orange-200">Select the perfect plan for your business</p>
            </motion.div>
            
            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {Object.entries(plans).map(([key, plan]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * Object.keys(plans).indexOf(key) }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 h-full ${
                      formData.selectedPlan === key 
                        ? 'ring-2 ring-orange-500 shadow-2xl shadow-orange-500/25 bg-white/10 border-orange-500' 
                        : 'bg-white/5 hover:bg-white/10 border-white/20'
                    } backdrop-blur-sm`}
                    onClick={() => handleRadioChange('selectedPlan', key)}
                  >
                    <CardHeader className="text-center pb-4">
                      <CardTitle className={`text-2xl font-bold mb-2 ${
                        formData.selectedPlan === key ? 'text-orange-300' : 'text-white'
                      }`}>{plan.name}</CardTitle>
                      <div className="space-y-2">
                        <div className={`text-3xl font-bold ${
                          formData.selectedPlan === key ? 'text-orange-300' : 'text-orange-400'
                        }`}>
                          ${plan.monthlyFee}/mo
                        </div>
                        <div className={`text-lg font-medium ${
                          formData.selectedPlan === key ? 'text-orange-200' : 'text-orange-200'
                        }`}>
                          + ${plan.setupFee} setup fee
                        </div>
                        <div className={`text-sm ${
                          formData.selectedPlan === key ? 'text-orange-200' : 'text-orange-300'
                        }`}>
                          {plan.maxPages === Infinity ? 'Unlimited pages' : `Up to ${plan.maxPages} pages`}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className={`flex items-center space-x-3 ${
                            formData.selectedPlan === key ? 'text-white' : 'text-white/90'
                          }`}>
                            <Check className={`h-4 w-4 flex-shrink-0 ${
                              formData.selectedPlan === key ? 'text-orange-300' : 'text-orange-400'
                            }`} />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {formData.selectedPlan === key && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-center space-x-2 text-orange-300 bg-orange-500/20 rounded-lg py-2"
                        >
                          <Check className="h-5 w-5" />
                          <span className="font-semibold">Selected</span>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Page Count */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl mb-8 border border-white/10">
              <Label htmlFor="pageCount" className="text-white text-lg font-medium block mb-3">
                Number of Pages
              </Label>
              <Input
                type="number"
                id="pageCount"
                name="pageCount"
                value={formData.pageCount}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  handlePageCountChange(value);
                }}
                className={`bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 text-lg py-4 focus:border-orange-400 focus:ring-orange-400/20 ${
                  errors.pageCount ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                }`}
                min="1"
                max={plans[formData.selectedPlan].maxPages === Infinity ? "999" : plans[formData.selectedPlan].maxPages.toString()}
              />
              {errors.pageCount && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-medium mt-2"
                >
                  {errors.pageCount}
                </motion.p>
              )}
              <div className="text-sm text-orange-200 mt-2">
                {plans[formData.selectedPlan].maxPages === Infinity 
                  ? 'No page limit on Premium plan' 
                  : `Maximum ${plans[formData.selectedPlan].maxPages} pages allowed for ${plans[formData.selectedPlan].name} plan`
                }
              </div>
            </div>

            {/* Add-ons */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Add-ons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'logo', label: 'Logo Design', price: addOnPrices.logo, type: 'one-time' },
                  { key: 'content', label: 'Content Writing', price: addOnPrices.content, type: 'per-page' },
                  { key: 'chatbot', label: 'AI Chatbot', price: addOnPrices.chatbot, type: 'one-time' }
                ].map((addon) => (
                  <motion.label 
                    key={addon.key} 
                    className="flex items-center justify-between p-4 border border-orange-500/30 rounded-xl cursor-pointer hover:bg-orange-500/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.addOns[addon.key as keyof typeof formData.addOns]}
                        onChange={(e) => handleCheckboxChange(addon.key, e.target.checked)}
                        className="w-5 h-5 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <span className="text-white font-medium group-hover:text-orange-200 transition-colors">{addon.label}</span>
                    </div>
                    <span className="text-orange-400 font-bold">
                      ${addon.price}{addon.type === 'per-page' ? '/page' : ''}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 6:
        const pricing = calculatePricing();
        return (
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Order Summary</h2>
              <p className="text-xl text-orange-200">Review your order details</p>
            </motion.div>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span className="text-white/80 font-medium">Plan</span>
                    <span className="text-white font-semibold capitalize">{formData.selectedPlan}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span className="text-white/80 font-medium">Pages</span>
                    <span className="text-white font-semibold">{formData.pageCount}</span>
                  </div>
                  
                  {pricing.oneTimeAddOns > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/80 font-medium">One-time Add-ons</span>
                      <span className="text-white font-semibold">${pricing.oneTimeAddOns}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span className="text-white/80 font-medium">Monthly Fee</span>
                    <span className="text-white font-semibold">${pricing.monthlyRecurring}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <span className="text-white/80 font-medium">Setup Fee</span>
                    <span className="text-white font-semibold">${pricing.setupFee}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-6 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl px-6 border border-orange-500/30">
                  <span className="text-xl font-bold text-white">Total Today</span>
                  <span className="text-3xl font-bold text-orange-400">${pricing.today}</span>
                </div>

                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm and Submit
                      <Sparkles className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 via-black to-black relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-orange-300/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-400/70 rounded-full animate-pulse"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Exit Button */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-orange-400" />
            <span className="text-2xl font-bold text-white">GetSeenSites</span>
          </div>
          <Button 
            variant="outline" 
            className="border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white backdrop-blur-sm bg-white/5"
            onClick={() => window.location.href = '/'}
          >
            <X className="mr-2 h-4 w-4" />
            Exit
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 mb-8">
          <div className="w-full bg-black/50 rounded-full h-4 backdrop-blur-sm border border-white/10">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full flex items-center justify-end pr-2"
              style={{ width: `${(formData.step / 6) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(formData.step / 6) * 100}%` }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-2 h-2 bg-white rounded-full shadow-lg"></div>
            </motion.div>
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <span className="text-orange-200 font-medium">Step {formData.step} of 6</span>
            <span className="text-orange-200 font-medium">{Math.round((formData.step / 6) * 100)}% Complete</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="px-6 mb-8">
          <div className="flex justify-center space-x-8 overflow-x-auto">
            {stepTitles.map((title, index) => {
              const StepIcon = stepIcons[index];
              const isActive = index + 1 === formData.step;
              const isCompleted = index + 1 < formData.step;
              
              return (
                <div key={index} className="flex flex-col items-center min-w-0 flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 scale-110' 
                      : isCompleted
                      ? 'bg-orange-500/50'
                      : 'bg-white/10'
                  }`}>
                    <StepIcon className={`w-6 h-6 ${
                      isActive || isCompleted ? 'text-white' : 'text-white/60'
                    }`} />
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    isActive ? 'text-white' : isCompleted ? 'text-orange-300' : 'text-white/60'
                  }`}>
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 pb-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={formData.step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center p-6 bg-black/40 backdrop-blur-sm border-t border-white/10">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={formData.step === 1}
            className="border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm bg-white/5"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  step === formData.step
                    ? 'bg-orange-400 scale-125 shadow-lg shadow-orange-400/50'
                    : step < formData.step
                    ? 'bg-orange-600'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          
          <Button 
            onClick={nextStep} 
            disabled={formData.step === 6}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntakePage;
