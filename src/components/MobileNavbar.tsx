
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Globe, Briefcase, Phone, FileText } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    
    if (path === '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else if (path === '/#services') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const servicesSection = document.getElementById('services');
          servicesSection?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const servicesSection = document.getElementById('services');
        servicesSection?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path === '/#work') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const workSection = document.getElementById('work');
          workSection?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const workSection = document.getElementById('work');
        workSection?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path === '/#contact') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          contactSection?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };


  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Briefcase, label: 'Services', path: '/services' },
    { icon: Globe, label: 'Websites', path: '/websites' },
    { icon: FileText, label: 'Resources', path: '/resources-page' },
    { icon: Phone, label: 'Contact', path: '/#contact' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-orange-500/20 z-50 h-16">
        <div className="flex items-center justify-between px-4 h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-bold text-lg">GetSeenSites</span>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 pt-16"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="px-4 py-6"
            >
              <nav className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() => handleNavigation(item.path)}
                    data-testid={item.path === '/resources-page' ? 'nav-resources' : undefined}
                    className="w-full flex items-center space-x-4 p-4 text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </motion.button>
                ))}
                
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
