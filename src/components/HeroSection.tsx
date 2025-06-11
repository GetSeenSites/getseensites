import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Globe, CheckCircle } from 'lucide-react';
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
                Your Customers Are Online. 
                <span className="text-gradient block mt-2">Why Isn't Your Business?</span>
              </motion.h1>

              <motion.p 
                className="text-xl text-white/80 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                It's 2025. If your business doesn't have a website, you're invisible.
                <br/><br/>
                <strong className="text-white">You've Built a Business People Trust.</strong><br/>
                It's time to Get Seen.
              </motion.p>

              <motion.div 
                className="text-white/70 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <p>Most small businesses rely on word of mouth, referrals, or walk-ins. That's great—until it isn't. What happens when a potential customer Googles your business and finds… nothing? No site. No story. No reason to trust you.</p>
                
                <p className="font-semibold text-orange-300">You're losing leads daily.</p>
                <p>Not because you aren't good at what you do—but because no one can find you.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={handleGetStarted}
                  className="btn-primary group text-lg px-8 py-4"
                >
                  Get a Website
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={handleSeeOurWork}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  See Our Work
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex items-center space-x-6 pt-4"
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white/80 text-sm">Highly Rated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-orange-400" />
                  <span className="text-white/80 text-sm">50+ Happy Clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <span className="text-white/80 text-sm">Multiple Sites Built</span>
                </div>
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
                <h3 className="text-2xl font-bold text-white mb-6">Real Results for Real Business Owners</h3>
                
                {/* Testimonial with image */}
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
                    "Now customers are booking straight from our website. It changed everything!"
                  </blockquote>
                </div>

                {/* Feature highlights */}
                <div className="mt-8 space-y-3">
                  {[
                    'A modern, mobile-optimized site that looks amazing on every device',
                    'Fast turnaround—live in less than 2 weeks',
                    'Clear pricing, no surprises'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute -top-4 -right-4 bg-orange-gradient rounded-2xl p-4 text-center shadow-xl"
              >
                <div className="text-2xl font-bold text-white">2-3 Weeks</div>
                <div className="text-white/90 text-xs font-medium">Avg. Delivery</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, duration: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/20"
              >
                <div className="text-2xl font-bold text-white"></div>
                <div className="text-white/70 text-xs font-medium"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
