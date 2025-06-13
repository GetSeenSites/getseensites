
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ServicesSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAnnual, setIsAnnual] = useState(false);

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/intake');
  };

  const handleAddToProject = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/intake');
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      monthlyPrice: 49,
      setupFee: 149,
      features: [
        'Mobile-optimized 3-page site',
        'Hosted and secured',
        'Live in 3-5 days',
        '✅ Done-for-you launch, no tech headaches'
      ],
      description: 'For new businesses that need a clean, credible online presence.'
    },
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 99,
      setupFee: 249,
      features: [
        'All Basic features +',
        '5-page high-converting layout',
        'Booking setup (Calendly, Square, or custom)',
        'Stripe payments integration (2% Transaction Fee)',
        'Social media links + Instagram feed',
        '✅ Looks professional. Works like a sales tool.'
      ],
      description: 'For service businesses ready to take bookings and payments.',
      popular: true
    },
    {
      id: 'business',
      name: 'Business',
      monthlyPrice: 199,
      setupFee: 399,
      features: [
        'All Starter features +',
        'Full e-commerce store (unlimited products)',
        'Lead capture + email marketing',
        'Abandoned cart recovery',
        'CRM + Analytics dashboard',
        '✅ Real infrastructure for growth'
      ],
      description: 'For businesses that need to sell, automate, and track everything.'
    },
    {
      id: 'premium',
      name: 'Premium',
      monthlyPrice: 299,
      setupFee: 999,
      features: [
        'All Business features +',
        'Custom design tailored to brand',
        'Built-in AI chatbot',
        'Advanced SEO + fast load times',
        'Smart product recommendations, analytics',
        'Priority support',
        '✅ Your business, on autopilot.'
      ],
      description: 'For brands ready to dominate.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-black via-orange-900 to-orange-500 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Animated Stars */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Plans</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business needs and watch your online presence transform.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8">
            <div className="space-y-2 text-white/90">
              <p>✅ No bloated agency fees</p>
              <p>✅ No confusing platforms</p>
              <p>✅ No templates that look like everyone else</p>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 group ${
                plan.popular 
                  ? 'border-orange-500/50 bg-gradient-to-br from-orange-500/20 to-orange-600/10' 
                  : 'border-white/20 hover:border-orange-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/70 text-sm mb-4">{plan.description}</p>
                <div className="space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-500">
                    ${plan.monthlyPrice}
                    <span className="text-base sm:text-lg text-white/70">/month</span>
                  </div>
                  <div className="text-lg text-white/80">
                    + ${plan.setupFee} setup
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-white/80 text-sm">
                    <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleAddToProject}
                className={`w-full font-semibold py-3 px-4 rounded-xl transition-all text-sm group ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25'
                    : 'btn-primary'
                }`}
              >
                Choose Plan
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-orange-500/20"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Get Seen—and Get Sales?</span>
          </h3>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            We'll turn your ideas into a lead-generating, trust-building machine. Your business deserves to be found.
          </p>
          <button
            onClick={handleGetStarted}
            className="btn-primary text-lg px-8 py-4 group"
          >
            Start Your Site Now
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
