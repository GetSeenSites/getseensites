
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Globe, Briefcase, Phone, User, LogOut, LogIn } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

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
    } else if (path === '/dashboard' && !user) {
      navigate('/auth');
    } else {
      navigate(path);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Briefcase, label: 'Services', path: '/#services' },
    { icon: Globe, label: 'Websites', path: '/#work' },
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
                    className="w-full flex items-center space-x-4 p-4 text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </motion.button>
                ))}
                
                {/* Profile/Dashboard */}
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => handleNavigation(user ? '/dashboard' : '/auth')}
                  className="w-full flex items-center space-x-4 p-4 text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-lg font-medium">{user ? 'Dashboard' : 'Profile'}</span>
                </motion.button>

                {/* Auth Section */}
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={user ? handleSignOut : () => handleNavigation('/auth')}
                  className="w-full flex items-center space-x-4 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors border-t border-orange-500/20 mt-6 pt-6"
                >
                  {user ? <LogOut className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                  <span className="text-lg font-medium">{user ? 'Sign Out' : 'Sign In'}</span>
                </motion.button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
