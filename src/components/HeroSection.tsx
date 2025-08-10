import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  const { trackGetStarted, trackNavigation } = useAnalytics();

  const handleGetStarted = () => {
    trackGetStarted('hero_cta');
    navigate('/intake');
  };

  const handleSeeOurWork = () => {
    trackNavigation('portfolio_from_hero');
    const workSection = document.getElementById('work');
    workSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigateToServices = () => {
    trackNavigation('services_from_hero');
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-hero-gradient relative overflow-hidden">
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

      <div className="relative z-10 container-width py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center lg:justify-start mb-8"
              >
                <img 
                  src="/Logo.png" 
                  alt="GetSeenSites Logo" 
                  className="h-16 w-auto"
                />
              </motion.div>

              <motion.h1 
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Custom Websites + AI Chatbots
                <span className="text-gradient block mt-2">That Convert</span>
              </motion.h1>

              <motion.p 
                className="text-xl text-white/80 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <strong>Tailored Websites + 24/7 AI Chatbots. Designed to Rank. Built to Convert.</strong><br/>
                No cookie-cutter templates. We design for your business goals.
              </motion.p>

              <motion.div 
                className="text-white/70 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <p><strong className="text-white">Every project includes on-page SEO practices for ranking in searches.</strong></p>
                
                <p className="font-semibold text-orange-300">Pricing is based on scope—book a free strategy call to get a tailored quote.</p>
                <p>Industries served: luxury rentals, consultants, local businesses.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">How It Works</h3>
                  <p className="text-white/80 mb-4">Simple 4-step process: Intake form → Strategy call → Custom build → Launch. We handle everything while you focus on running your business.</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-orange-300">What You Get:</h4>
                  {[
                    'Custom website designed for your industry and goals',
                    '24/7 AI chatbot that captures leads while you sleep',
                    'SEO optimization built-in for better Google rankings',
                    'Mobile-responsive design that converts on all devices',
                    'Strategy-first approach with free consultation call'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80 text-sm">✅ {feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={handleGetStarted}
                  className="btn-primary group text-lg px-8 py-4"
                >
                  Get a Custom Website Strategy
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={handleSeeOurWork}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  See Our Work
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.6 }}
              >
                <button
                  onClick={() => navigate('/traffic-acceleration-framework')}
                  aria-label="See our 875% traffic case study"
                  className="mt-2 underline text-white/80 hover:text-white"
                >
                  See our 875% traffic case study
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              {/* Main showcase card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-orange-500/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">🚀 Case Study: 875% Traffic Growth</h3>
                
                {/* Case Study Preview */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src="/Logo.png" 
                      alt="GetSeenSites Case Study" 
                      className="w-16 h-16 rounded-xl object-cover bg-white/10 p-2"
                    />
                    <div>
                      <div className="text-white font-semibold">GetSeenSites</div>
                      <div className="text-orange-300 text-sm">Case Study</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-white/90 italic text-lg leading-relaxed">
                    "Traffic increased by 875% in just 7 days using our proven framework."
                  </blockquote>

                  <div className="mt-4 space-y-2 text-sm text-white/70">
                    <p>"We love the responsiveness of the site, it's really solid" — Executive Exotics</p>
                    <p>"The website is so good, thanks a million." — CoFooty</p>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/traffic-acceleration-framework')}
                    className="text-orange-300 hover:text-orange-200 underline transition-colors text-sm font-medium"
                  >
                    → Read the full case study
                  </button>
                </div>

                {/* Feature highlights */}
                <div className="mt-8 space-y-3">
                  <h4 className="text-lg font-semibold text-orange-300">💡 Simple Process, Powerful Results</h4>
                  <p className="text-white/80 text-sm mb-4">Strategy-first approach with transparent pricing.</p>
                  
                  {[
                    '🎯 Step 1: Complete intake form about your business',
                    '⚙️ Step 2: Free strategy call to plan your custom solution',
                    '🚀 Step 3: We build and launch your high-impact website'
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3"
                    >
                      <span className="text-white/80 text-sm">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="absolute -top-4 -right-4 bg-orange-gradient rounded-2xl p-4 text-center shadow-xl"
              >
                <div className="text-2xl font-bold text-white">875%</div>
                <div className="text-white/90 text-xs font-medium">Growth</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
