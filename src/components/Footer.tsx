import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black via-orange-900 to-orange-500 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Animated Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/Logo.png" 
                alt="GetSeenSites Logo" 
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">
                GetSeenSites
              </span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Professional websites for small businesses. We help you get seen, get leads, and grow your business online.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61577312487408&sk=grid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-orange-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/getseensites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-orange-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/getseensitess/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-orange-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/getseensites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-orange-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-white/80 hover:text-orange-400 transition-colors">Website Design</a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-orange-400 transition-colors">SEO Optimization</a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-orange-400 transition-colors">E-commerce Solutions</a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-orange-400 transition-colors">Content Creation</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-orange-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#work" className="text-white/80 hover:text-orange-400 transition-colors">Portfolio</a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-orange-400 transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-orange-400 transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Subscribe</h4>
            <p className="text-white/80">
              Stay up to date with our latest news and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-white/10 border border-white/20 rounded-l-md py-2 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-r-md px-4 py-2 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/60 text-sm">
            © 2025 GetSeenSites. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-white/60">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
