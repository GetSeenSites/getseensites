import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Rocket, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAnalytics } from '@/hooks/useAnalytics';

const ConsultingServicesSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trackGetStarted, trackNavigation } = useAnalytics();

  const handleGetStrategy = () => {
    trackGetStarted('consulting_services_cta');
    navigate('/intake');
  };

  const handleViewCaseStudy = () => {
    trackNavigation('case_study_from_services');
    navigate('/traffic-acceleration-framework');
  };

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "24/7 AI Chatbot",
      description: "Capture leads while you sleep with intelligent conversations that qualify prospects automatically and guides users."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "SEO-Optimized Design",
      description: "Built to rank from day one with proven on-page optimization strategies."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Conversion-Focused",
      description: "Every element designed to turn visitors into customers with clear calls-to-action."
    }
  ];

  const industries = [
    "Luxury Rentals",
    "Consultants", 
    "Local Businesses",
    "Professional Services",
    "E-commerce",
    "Healthcare"
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
            Custom Website <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Strategy</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            No cookie-cutter templates. We design for your business goals with a strategy-first approach.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8">
            <div className="space-y-2 text-white/90">
              <p>✅ On-page SEO best practices</p>
              <p>✅ AI chatbot for capturing leads 24/7</p>
              <p>✅ Pricing based on scope—get tailored quote</p>
              <p>✅ <span className="text-orange-300">Strategy call included</span> to plan your success</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-white/80 mb-4">
              See how we achieved 875% traffic growth in 7 days:{' '}
              <button 
                onClick={handleViewCaseStudy}
                className="text-orange-300 hover:text-orange-200 underline transition-colors font-semibold"
              >
                View Case Study
              </button>
            </p>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="text-orange-300 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-white/80">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Industries Served */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Industries We Serve</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <motion.span
                key={industry}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 border border-white/20"
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-16 border border-orange-500/20"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Intake Form", desc: "Tell us about your business goals and requirements" },
              { step: "2", title: "Strategy Call", desc: "Free consultation to plan your custom solution" },
              { step: "3", title: "Custom Build", desc: "We design and develop your high-impact website" },
              { step: "4", title: "Launch", desc: "Go live with SEO optimization and AI chatbot" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-orange-500/20"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Let's Build Your High-Impact Website</span>
          </h3>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Start with a free strategy plan. We'll analyze your business and create a custom roadmap for online success.
          </p>
          <button
            onClick={handleGetStrategy}
            className="btn-primary text-lg px-8 py-4 group"
          >
            Get a Custom Website Strategy
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-white/60 text-sm mt-4">
            Free strategy consultation • No obligation • Tailored pricing based on your needs
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultingServicesSection;
