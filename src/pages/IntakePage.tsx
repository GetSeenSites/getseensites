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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      // Step 5 is review; no validation needed
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

      // Finalize: Email already attempted above. No payment step in consulting model.
      toast.success("Thanks! Your intake was submitted. We'll email you shortly.");
      setIsSubmitting(false);
      setShowConfirmation(true);

    } catch (error) {
      console.error("Submission error:", error);
      toast.error(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsSubmitting(false);
    }
  };

  const stepIcons = [Building2, Target, Palette, Camera, FileText];
  const stepTitles = ['Company Info', 'Business Details', 'Design Preferences', 'Photo Upload', 'Review & Submit'];

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
        if (showConfirmation) {
          return (
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10" data-testid="intake-review">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Check className="h-6 w-6 mr-2 text-green-400" /> Submission received
                  </CardTitle>
                  <CardDescription className="text-white/70">Thanks! We’ll review your details and reach out shortly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => window.location.href = '/'} className="mt-2">
                    Return to Home
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        }

        return (
          <div className="max-w-3xl mx-auto" data-testid="intake-review">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Review & Submit</h2>
              <p className="text-xl text-orange-200">Review your details before submitting</p>
            </motion.div>

            <div className="space-y-6">
              {/* Contact & Company */}
              <Card className="bg-black/50 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Contact & Company</CardTitle>
                    <CardDescription className="text-orange-200">Basic information</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setFormData(prev => ({ ...prev, step: 1 }))}
                    className="border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white"
                  >
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-orange-200 text-sm">Email</dt>
                      <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white break-words">{formData.email || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-orange-200 text-sm">Company</dt>
                      <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white break-words">{formData.companyName || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-orange-200 text-sm">Website URL</dt>
                      <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white break-words">{formData.websiteUrl || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-orange-200 text-sm">Industry</dt>
                      <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white break-words">{formData.industry || '—'}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Business Details */}
              <Card className="bg-black/50 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Business Details</CardTitle>
                    <CardDescription className="text-orange-200">Context & goals</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setFormData(prev => ({ ...prev, step: 2 }))}
                    className="border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white"
                  >
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-orange-200 text-sm">Business Description</dt>
                      <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white break-words whitespace-pre-wrap">{formData.businessDescription || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-orange-200 text-sm">Target Audience</dt>
                      <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white break-words whitespace-pre-wrap">{formData.targetAudience || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-orange-200 text-sm">Goals</dt>
                      <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white break-words whitespace-pre-wrap">{formData.goals || '—'}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Design Preferences */}
              <Card className="bg-black/50 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Design Preferences</CardTitle>
                    <CardDescription className="text-orange-200">Style, color, inspiration</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setFormData(prev => ({ ...prev, step: 3 }))}
                    className="border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white"
                  >
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-orange-200 text-sm">Style Preferences</dt>
                      <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white break-words whitespace-pre-wrap">{formData.stylePreferences || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-orange-200 text-sm">Color Preferences</dt>
                      <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white break-words whitespace-pre-wrap">{formData.colorPreferences || '—'}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-orange-200 text-sm">Inspiration Websites</dt>
                      <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white break-words">{formData.exampleWebsites || '—'}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Uploads */}
              <Card className="bg-black/50 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Uploads</CardTitle>
                    <CardDescription className="text-orange-200">Files provided</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setFormData(prev => ({ ...prev, step: 4 }))}
                    className="border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white"
                  >
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  <div>
                    <dt className="text-orange-200 text-sm">Logo Files</dt>
                    <dd className="bg-black/70 border border-white/20 p-3 rounded-lg text-white">{formData.logoFiles.length ? `${formData.logoFiles.length} file(s)` : 'None'}</dd>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleSubmit}
                data-testid="intake-submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
            </div>
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
              style={{ width: `${(formData.step / 5) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(formData.step / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-2 h-2 bg-white rounded-full shadow-lg"></div>
            </motion.div>
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <span className="text-orange-200 font-medium">Step {formData.step} of 5</span>
            <span className="text-orange-200 font-medium">{Math.round((formData.step / 5) * 100)}% Complete</span>
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
            {[1, 2, 3, 4, 5].map((step) => (
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
            disabled={formData.step === 5}
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
