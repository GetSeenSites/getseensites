
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/intake');
    } else {
      navigate('/auth');
    }
  };

  const handleSeeOurWork = () => {
    const workSection = document.getElementById('work');
    workSection?.scrollIntoView({ behavior: 'smooth' });
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
                You're Great at What You Do.
                <span className="text-gradient block mt-2">But Can People Find You?</span>
              </motion.h1>

              <motion.p 
                className="text-xl text-white/80 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                If your business isn't online—or worse, if it's online but invisible—you're leaving money on the table.
              </motion.p>

              <motion.div 
                className="text-white/70 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <p><strong className="text-white">🪪 You've built something real.</strong><br/>
                A local shop. A loyal base. Word of mouth that keeps you busy. But here's the truth:</p>
                
                <p className="font-semibold text-orange-300">Today's customer Googles before they visit.</p>
                <p>If you're not showing up—or your site looks outdated—they choose someone else.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">We Don't Just Build Websites. We Build Growth Machines.</h3>
                  <p className="text-white/80 mb-4">At GetSeenSites, we create websites that convert strangers into customers. Not just "look pretty"—but perform. From design to launch to automation, it's all done for you.</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-orange-300">Here's how we help you win:</h4>
                  {[
                    'A site that works on every device (mobile-first, always)',
                    'Fast loading + SEO baked in so customers actually find you',
                    'Clear calls to action that drive bookings, purchases, and messages',
                    'Follow-up tools to turn clicks into sales',
                    'Delivered in under 5 days—fully handled, no tech skills needed'
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
                  Start Your Site Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={handleSeeOurWork}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  See Our Work
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
                <h3 className="text-2xl font-bold text-white mb-6">💬 Real Results from Real Owners:</h3>
                
                {/* Testimonials */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src="Logo_barber.png" 
                      alt="RudeBoyBlendz Business" 
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <div className="text-white font-semibold">Rudy</div>
                      <div className="text-orange-300 text-sm">RudeBoyBlendz Barbershop</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-white/90 italic text-lg leading-relaxed">
                    "Now people are booking me online without a single phone call."
                  </blockquote>

                  <div className="mt-4 space-y-2 text-sm text-white/70">
                    <p>"The site looks clean, works great, and clients started showing up from Google within a week." — Connor, COFooty Soccer Training</p>
                    <p>"I didn't have to worry about a thing. They got it right the first time." — David, Photographer</p>
                  </div>
                </div>

                {/* Feature highlights */}
                <div className="mt-8 space-y-3">
                  <h4 className="text-lg font-semibold text-orange-300">💡 You Don't Need to Be a Tech Wizard.</h4>
                  <p className="text-white/80 text-sm mb-4">Just bring your vision—we'll do the rest.</p>
                  
                  {[
                    '🎯 Step 1: Tell us about your business',
                    '⚙️ Step 2: We build your high-converting site',
                    '🚀 Step 3: You go live in 5 days or less'
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
                <div className="text-2xl font-bold text-white">5 Days</div>
                <div className="text-white/90 text-xs font-medium">Or Less</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
