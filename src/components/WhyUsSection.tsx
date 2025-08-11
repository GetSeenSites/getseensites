
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const WhyUsSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/intake');
  };

  const features = [
    "A modern, mobile-optimized site that looks amazing on every device",
    "Built-in SEO so people actually find you",
    "Fast turnaround—live weeks",
    "Clear pricing, no surprises",
    "Real human support"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-black via-orange-900 to-orange-500 relative overflow-hidden">
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

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Main Problem Statement */}
          <div className="space-y-6 mb-16">
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Most small businesses rely on word of mouth, referrals, or walk-ins. That's great—until it isn't. What happens when a potential customer Googles your business and finds… nothing? No site. No story. No reason to trust you.
            </p>
            
            <div className="space-y-4">
              <p className="text-2xl lg:text-3xl font-bold text-orange-300">You're losing leads daily.</p>
              <p className="text-xl text-white/80">
                Not because you aren't good at what you do—<br />
                but because no one can find you.
              </p>
            </div>
          </div>

          {/* Solution Section */}
          <div className="space-y-8 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              You Don't Need a <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">$5,000 Agency Site</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              You need a clean, powerful website built to convert—and you need it done for you.
            </p>
            
            <p className="text-xl text-orange-300 font-semibold">
              That's where we come in.
            </p>
            
            <p className="text-lg lg:text-xl text-white/80 max-w-4xl mx-auto">
              At GetSeenSites, we build stunning, professional websites tailored for small businesses—without the agency price tag. No bloat. No BS. Just websites that make you money.
            </p>
          </div>

          {/* Features List */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-8">
              Here's What You Get:
            </h3>
            
            <div className="space-y-4 text-left max-w-3xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <Check className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Urgency Section */}
          <div className="space-y-6 mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-white">
              This Isn't a <span className="text-orange-300">Luxury.</span>
            </h3>
            <p className="text-xl lg:text-2xl text-white/90">
              It's the new cost of doing business.
            </p>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              If your competition shows up online and you don't, guess who wins?
            </p>
          </div>

          {/* Final CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-2xl lg:text-3xl font-bold text-white">
                Stop letting potential customers pass you by.
              </h4>
              <p className="text-xl text-orange-300 font-semibold">
                Let's build your site—and your future.
              </p>
            </div>
            
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-12 py-6 text-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 group"
            >
              Get a Website That Brings You Leads, Not Headaches
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-white/70 max-w-2xl mx-auto">
              No tech skills needed. Just your business and your goals. We'll handle the rest.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
