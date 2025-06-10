
import React, { useState } from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import FormQuestion from './forms/FormQuestion';
import FileUpload from './forms/FileUpload';
import QuestionCheckboxGrid from './forms/QuestionCheckboxGrid';
import QuestionRadioGroup from './forms/QuestionRadioGroup';
import ProjectCalculator from './ProjectCalculator';

interface FormData {
  websiteType: string[];
  primaryGoal: string;
  targetAudience: string;
  pages: string;
  textReady: boolean;
  imagesReady: boolean;
  downloads: string;
  colorPalette: string;
  fonts: string;
  designInspiration: { url: string; notes: string }[];
  hasLogo: boolean;
  animations: string[];
  layoutPreference: string;
  pagesBehavior: string;
  contactForms: string[];
  contactDestination: string;
  autoresponders: boolean;
  socialPlatforms: string;
  socialIntegrations: string[];
  excludeFeatures: string;
  email: string;
  files: File[];
  selectedPackage: string;
  selectedAddons: string[];
}

const ClientIntakeForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState<FormData>({
    websiteType: [],
    primaryGoal: '',
    targetAudience: '',
    pages: '',
    textReady: false,
    imagesReady: false,
    downloads: '',
    colorPalette: '',
    fonts: '',
    designInspiration: [{ url: '', notes: '' }],
    hasLogo: false,
    animations: [],
    layoutPreference: '',
    pagesBehavior: '',
    contactForms: [],
    contactDestination: '',
    autoresponders: false,
    socialPlatforms: '',
    socialIntegrations: [],
    excludeFeatures: '',
    email: user?.email || '',
    files: [],
    selectedPackage: '',
    selectedAddons: []
  });

  const packages = [
    { name: 'Starter', setupFee: 299, monthlyFee: 25 },
    { name: 'Business', setupFee: 599, monthlyFee: 39 },
    { name: 'Premium', setupFee: 899, monthlyFee: 85 }
  ];

  const addons = [
    { name: 'Logo Design', price: 15, type: 'one-time' },
    { name: 'User Authentication & Login', price: 75, type: 'one-time' },
    { name: 'Database Integration ', price: 75, type: 'one-time' },
    { name: 'Booking/Calendar', price: 50, type: 'one-time' },
    { name: 'Payments/Transactions', price: 60, type: 'one-time' },
    { name: 'Content Writing', price: 10, type: 'one-time' },
    { name: 'AI Chatbot', price: 225, type: 'one-time' },
    { name: 'Maintenance', price: 25, type: 'monthly' }
  ];

  // Count pages from the pages field
  const getPageCount = () => {
    if (!formData.pages) return 0;
    const lowerPages = formData.pages.toLowerCase();
    if (lowerPages.includes('single') || lowerPages.includes('one page')) return 1;
    
    const pageList = formData.pages.split(/[,\n]/).filter(page => page.trim().length > 0);
    return pageList.length;
  };

  const calculateTotal = () => {
    let setupFee = 0;
    let monthlyPlanFee = 0;
    let oneTimeTotal = 0;
    let monthlyAddons = 0;
    
    // Add package fees
    const selectedPkg = packages.find(pkg => pkg.name === formData.selectedPackage);
    if (selectedPkg) {
      setupFee = selectedPkg.setupFee;
      monthlyPlanFee = selectedPkg.monthlyFee;
    }
    
    // Add addon prices
    formData.selectedAddons.forEach(addonName => {
      const addon = addons.find(a => a.name === addonName);
      if (addon) {
        if (addon.type === 'monthly') {
          monthlyAddons += addon.price;
        } else {
          oneTimeTotal += addon.price;
        }
      }
    });

    const firstMonth = monthlyPlanFee + monthlyAddons;
    const grandTotal = setupFee + oneTimeTotal + firstMonth;
    const monthlyRecurring = monthlyPlanFee + monthlyAddons;
    
    return { setupFee, oneTimeTotal, firstMonth, monthlyRecurring, grandTotal };
  };

  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field]) 
        ? (prev[field] as string[]).includes(value)
          ? (prev[field] as string[]).filter(item => item !== value)
          : [...(prev[field] as string[]), value]
        : [value]
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (formData.websiteType.length === 0) {
      newErrors.push('Please select what the website is for');
    }
    
    if (!formData.primaryGoal) {
      newErrors.push('Please select the primary goal');
    }
    
    if (!formData.targetAudience) {
      newErrors.push('Please select your target audience');
    }
    
    if (!formData.pages.trim()) {
      newErrors.push('Please specify the pages you want');
    }
    
    if (!formData.selectedPackage) {
      newErrors.push('Please select a package');
    }

    // Check page count restriction for Starter plan
    const pageCount = getPageCount();
    if (formData.selectedPackage === 'Starter' && pageCount > 3) {
      newErrors.push('Must select the Business Plan in order to have more than 3 pages');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    try {
      const totals = calculateTotal();
      const submissionData = {
        ...formData,
        setupFee: totals.setupFee,
        oneTimeTotal: totals.oneTimeTotal,
        firstMonth: totals.firstMonth,
        monthlyRecurring: totals.monthlyRecurring,
        grandTotal: totals.grandTotal,
        submittedAt: new Date().toISOString()
      };

      // Create mailto link with project data
      const subject = encodeURIComponent('New Website Project Inquiry - GetSeenSites');
      const body = encodeURIComponent(`New project submission:

Selected Package: ${formData.selectedPackage}
Selected Add-ons: ${formData.selectedAddons.join(', ') || 'None'}
Setup Fee: $${totals.setupFee}
One-time Add-ons: $${totals.oneTimeTotal}
First Month: $${totals.firstMonth}
Grand Total Today: $${totals.grandTotal}
Monthly Recurring: $${totals.monthlyRecurring}

Project Details:
${JSON.stringify(submissionData, null, 2)}`);
      
      const mailtoLink = `mailto:contactgetseensites@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      
      alert('Form submitted successfully! Please check your email client.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const totals = calculateTotal();

  // Helper function to get the correct plan type for ProjectCalculator
  const getProjectCalculatorPlan = (): 'starter' | 'business' | null => {
    if (formData.selectedPackage === 'Starter') return 'starter';
    if (formData.selectedPackage === 'Business') return 'business';
    return null; // For Premium or any other value, return null
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Project Calculator */}
      <ProjectCalculator
        selectedPlan={getProjectCalculatorPlan()}
        pageCount={getPageCount()}
        addOns={{
          logo: formData.selectedAddons.includes('Logo Design'),
          content: formData.selectedAddons.includes('Content Writing'),
          chatbot: formData.selectedAddons.includes('AI Chatbot'),
          maintenance: formData.selectedAddons.includes('Maintenance')
        }}
      />

      <div className="relative z-40 pt-32 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-black/90 backdrop-blur-xl border border-orange-500/20 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Let's Build Your <span className="text-gradient">Perfect Website</span>
              </h1>
              <p className="text-xl text-white/80">
                Tell us about your project so we can create something amazing together
              </p>
            </div>

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <h3 className="text-red-300 font-semibold mb-2">Please fix the following errors:</h3>
                <ul className="list-disc list-inside text-red-200">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Package Selection */}
              <FormQuestion number="1" title="Choose Your Package *">
                <QuestionRadioGroup
                  name="selectedPackage"
                  options={packages.map(pkg => `${pkg.name} - $${pkg.setupFee} setup + $${pkg.monthlyFee}/mo`)}
                  selectedValue={formData.selectedPackage ? `${formData.selectedPackage} - $${packages.find(p => p.name === formData.selectedPackage)?.setupFee} setup + $${packages.find(p => p.name === formData.selectedPackage)?.monthlyFee}/mo` : ''}
                  onChange={(value) => {
                    const packageName = value.split(' - ')[0];
                    setFormData(prev => ({ ...prev, selectedPackage: packageName }));
                  }}
                  columns={1}
                />
              </FormQuestion>

              {/* Add-ons Selection */}
              <FormQuestion number="2" title="Select Add-ons (Optional)">
                <QuestionCheckboxGrid
                  options={addons.map(addon => `${addon.name} - $${addon.price}${addon.type === 'monthly' ? '/mo' : ''}`)}
                  selectedValues={formData.selectedAddons.map(name => {
                    const addon = addons.find(a => a.name === name);
                    return addon ? `${addon.name} - $${addon.price}${addon.type === 'monthly' ? '/mo' : ''}` : name;
                  })}
                  onChange={(value) => {
                    const addonName = value.split(' - ')[0];
                    handleCheckboxChange('selectedAddons', addonName);
                  }}
                  columns={2}
                />
              </FormQuestion>

              {/* Website Type */}
              <FormQuestion number="3" title="What is the website for? *">
                <QuestionCheckboxGrid
                  options={['Business', 'Portfolio', 'E-commerce', 'Blog', 'SaaS Landing Page', 'Other']}
                  selectedValues={formData.websiteType}
                  onChange={(value) => handleCheckboxChange('websiteType', value)}
                />
              </FormQuestion>

              {/* Primary Goal */}
              <FormQuestion number="4" title="What's the primary goal? *">
                <QuestionRadioGroup
                  name="primaryGoal"
                  options={['Generate leads', 'Sell products', 'Showcase work', 'Book appointments', 'Other']}
                  selectedValue={formData.primaryGoal}
                  onChange={(value) => setFormData(prev => ({ ...prev, primaryGoal: value }))}
                />
              </FormQuestion>

              {/* Target Audience */}
              <FormQuestion number="5" title="Who is your target audience? *">
                <QuestionRadioGroup
                  name="targetAudience"
                  options={['Local customers', 'Teens', 'Small business owners', 'B2B clients', 'Tech audience', 'Other']}
                  selectedValue={formData.targetAudience}
                  onChange={(value) => setFormData(prev => ({ ...prev, targetAudience: value }))}
                  columns={3}
                />
              </FormQuestion>

              {/* Pages */}
              <FormQuestion number="6" title="How many pages? *">
                <textarea
                  value={formData.pages}
                  onChange={(e) => setFormData(prev => ({ ...prev, pages: e.target.value }))}
                  placeholder="List the pages you want (e.g., Home, About, Services, Gallery, Contact) or write 'Single scroll page'"
                  className="w-full p-4 bg-white/10 border border-orange-500/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm"
                  rows={3}
                />
                {formData.selectedPackage === 'Starter' && getPageCount() > 3 && (
                  <div className="text-red-400 text-sm mt-2">
                    ⚠️ Starter plan is limited to 3 pages. Please select the Business plan for more pages.
                  </div>
                )}
              </FormQuestion>

              {/* Content Readiness */}
              <FormQuestion number="7" title="Content readiness">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.textReady}
                      onChange={(e) => setFormData(prev => ({ ...prev, textReady: e.target.checked }))}
                      className="w-5 h-5 text-orange-500 bg-white/10 border-orange-500/30 rounded focus:ring-orange-500"
                    />
                    <span className="text-white">Do you have your text ready?</span>
                    <span className="text-white/50 text-sm">(If not, we'll write it for you)</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.imagesReady}
                      onChange={(e) => setFormData(prev => ({ ...prev, imagesReady: e.target.checked }))}
                      className="w-5 h-5 text-orange-500 bg-white/10 border-orange-500/30 rounded focus:ring-orange-500"
                    />
                    <span className="text-white">Do you have images?</span>
                    <span className="text-white/50 text-sm">(If not, we'll provide or generate them)</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.downloads}
                  onChange={(e) => setFormData(prev => ({ ...prev, downloads: e.target.value }))}
                  placeholder="Any downloads to include? (PDFs, menus, resumes)"
                  className="w-full p-4 bg-white/10 border border-orange-500/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm"
                />
              </FormQuestion>

              {/* File Upload Section */}
              <FileUpload
                files={formData.files}
                onFilesChange={(files) => setFormData(prev => ({ ...prev, files }))}
              />

              {/* Color Palette */}
              <FormQuestion number="8" title="Color palette">
                <input
                  type="text"
                  value={formData.colorPalette}
                  onChange={(e) => setFormData(prev => ({ ...prev, colorPalette: e.target.value }))}
                  placeholder="List hex codes (e.g., #3498db and #e67e22) or write 'black and orange theme'"
                  className="w-full p-4 bg-white/10 border border-orange-500/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm"
                />
              </FormQuestion>

              {/* Animations */}
              <FormQuestion number="9" title="Do you want animations?">
                <QuestionCheckboxGrid
                  options={['Scroll effects', 'Hover animations', 'Page transitions', 'None']}
                  selectedValues={formData.animations}
                  onChange={(value) => handleCheckboxChange('animations', value)}
                  columns={2}
                />
              </FormQuestion>

              {/* Social Media */}
              <FormQuestion number="10" title="Social media integrations">
                <input
                  type="text"
                  value={formData.socialPlatforms}
                  onChange={(e) => setFormData(prev => ({ ...prev, socialPlatforms: e.target.value }))}
                  placeholder="List platforms (e.g., Instagram, LinkedIn, Facebook)"
                  className="w-full p-4 bg-white/10 border border-orange-500/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm mb-4"
                />
                <QuestionCheckboxGrid
                  options={['Buttons', 'Widgets', 'Embedded feeds']}
                  selectedValues={formData.socialIntegrations}
                  onChange={(value) => handleCheckboxChange('socialIntegrations', value)}
                  columns={3}
                />
              </FormQuestion>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full btn-primary group text-lg py-4"
                >
                  Submit Project Request
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientIntakeForm;
