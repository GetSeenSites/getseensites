import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Globe, Briefcase, Phone, User, LogOut, LogIn } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const CosmicSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Scrollspy effect
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['services', 'work', 'contact'];
    const observers = [];

    const observerOptions = {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        }, observerOptions);
        
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    if (path === '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('');
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
    } else if (path === '/auth') {
      navigate('/auth');
    } else {
      navigate(path);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/', sectionId: null },
    { icon: Briefcase, label: 'Services', path: '/#services', sectionId: 'services' },
    { icon: Globe, label: 'Websites', path: '/#work', sectionId: 'work' },
    { icon: Phone, label: 'Contact', path: '/#contact', sectionId: 'contact' },
  ];

  return (
    <motion.div
      className="fixed left-0 top-0 h-screen bg-black/90 backdrop-blur-xl border-r border-orange-500/20 z-50 flex flex-col"
      initial={{ width: 64 }}
      animate={{ width: isExpanded ? 240 : 64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="p-4 border-b border-orange-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="text-white font-bold text-lg whitespace-nowrap"
              >
                GetSeenSites
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === '/' && activeSection === item.sectionId ||
              location.pathname === item.path ||
              (item.path === '/' && location.pathname === '/' && !activeSection);
            
            return (
              <li key={item.path}>
                <motion.button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="whitespace-nowrap font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </li>
            );
          })}
          
          {/* Profile/Dashboard */}
          <li>
            <motion.button
              onClick={() => handleNavigation(user ? '/dashboard' : '/auth')}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all group ${
                location.pathname === '/dashboard' 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <User className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap font-medium"
                  >
                    {user ? 'Dashboard' : 'Profile'}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </li>
        </ul>
      </nav>

      {/* Auth Section */}
      <div className="p-4 border-t border-orange-500/20">
        <motion.button
          onClick={user ? handleSignOut : () => handleNavigation('/auth')}
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {user ? <LogOut className="w-5 h-5 flex-shrink-0" /> : <LogIn className="w-5 h-5 flex-shrink-0" />}
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap font-medium"
              >
                {user ? 'Sign Out' : 'Sign In'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CosmicSidebar;
