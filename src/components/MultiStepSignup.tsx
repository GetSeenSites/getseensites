
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, User, Building, Users, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SignupData {
  fullName: string;
  email: string;
  businessName: string;
  businessDescription: string;
  businessSize: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const MultiStepSignup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupData>({
    fullName: '',
    email: '',
    businessName: '',
    businessDescription: '',
    businessSize: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const steps = [
    {
      title: 'Personal Information',
      icon: User,
      fields: ['fullName', 'email']
    },
    {
      title: 'Business Details',
      icon: Building,
      fields: ['businessName', 'businessDescription']
    },
    {
      title: 'Business Size',
      icon: Users,
      fields: ['businessSize']
    },
    {
      title: 'Account Security',
      icon: Lock,
      fields: ['username', 'password', 'confirmPassword']
    }
  ];

  const businessSizes = [
    'Just me (1 person)',
    'Small team (2-10 people)',
    'Medium business (11-50 people)',
    'Large business (50+ people)'
  ];

  const handleInputChange = (field: keyof SignupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = (step: number) => {
    const stepFields = steps[step].fields;
    const missingFields = stepFields.filter(field => !formData[field as keyof SignupData]);
    
    if (missingFields.length > 0) {
      setError('Please fill in all required fields');
      return false;
    }

    if (step === 3) {
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      if (error) {
        setError(error.message);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className="apple-input-dark"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className="apple-input-dark"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Business Name *</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Enter your business name"
                className="apple-input-dark"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Business Description *</label>
              <textarea
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                placeholder="Briefly describe what your business does"
                rows={3}
                className="apple-input-dark resize-none"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-white font-semibold mb-4">Business Size *</label>
            {businessSizes.map((size) => (
              <label key={size} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="businessSize"
                  value={size}
                  checked={formData.businessSize === size}
                  onChange={(e) => handleInputChange('businessSize', e.target.value)}
                  className="w-5 h-5 text-orange-500"
                />
                <span className="text-white">{size}</span>
              </label>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Username *</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Choose a username"
                className="apple-input-dark"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a password (6+ characters)"
                className="apple-input-dark"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Confirm Password *</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className="apple-input-dark"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 stars-bg opacity-30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl mx-4"
      >
        <div className="apple-card-dark p-8 lg:p-12">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-orange-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-3xl">G</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Join GetSeenSites
            </h1>
            <p className="text-white/60">
              Create your account to get started with your website project
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                  index <= currentStep 
                    ? 'bg-orange-gradient text-white' 
                    : 'bg-white/10 text-white/50'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  index <= currentStep ? 'text-white' : 'text-white/50'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                currentStep === 0
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 btn-primary"
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center space-x-2 btn-primary disabled:opacity-50"
              >
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MultiStepSignup;
