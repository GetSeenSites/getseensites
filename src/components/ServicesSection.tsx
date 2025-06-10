
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ServicesSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
      id: 'starter',
      name: 'Starter',
      setupFee: 149,
      monthlyFee: 40,
      features: [
        'Up to 3 pages',
        'Mobile responsive design',
        'Basic SEO setup',
        'Contact form integration',
        'Social media links',
      ]
    },
    {
      id: 'business',
      name: 'Business',
      setupFee: 249,
      monthlyFee: 85,
      popular: true,
      features: [
        'Starter Plan +',
        'Up to 6 pages',
        'Animations + Effects',
        'Shipping/Booking',
        'Advanced SEO optimization',
        'Advanced contact forms',
        'E-commerce ready',
        '30-day priority support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      setupFee: 650,
      monthlyFee: 170,
      startingAt: true,
      features: [
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Services</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business needs and watch your online presence transform.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-300 group ${
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

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-orange-500">
                    {plan.startingAt ? 'Starting at ' : ''}${plan.setupFee}
                    <span className="text-lg text-white/70"> setup</span>
                  </div>
                  <div className="text-2xl font-semibold text-orange-400">
                    + ${plan.monthlyFee}<span className="text-lg text-white/70">/month</span>
                  </div>
                  {plan.startingAt && (
                    <div className="text-sm text-white/60">
                      Custom features available
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleAddToProject}
                className={`w-full font-semibold py-4 px-6 rounded-xl transition-all group ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25'
                    : 'btn-primary'
                }`}
              >
                Add to Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Get Started?</span>
          </h3>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Let's discuss your project and create something amazing together.
          </p>
          <button
            onClick={handleGetStarted}
            className="btn-primary text-lg px-8 py-4 group"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
