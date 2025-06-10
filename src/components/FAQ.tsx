
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleGetQuote = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
  };

  const faqItems = [
    {
      question: "What's included in the setup fee?",
      answer: "Your setup fee covers everything needed to get your website live: layout design, content integration, branding/styling, SEO setup, form configuration, and mobile responsiveness. You'll walk away with a custom-built site tailored to your business goals."
    },
    {
      question: "What does the monthly fee cover?",
      answer: "The monthly fee includes hosting, domain management, security updates, content backups, and priority support. You also get minor updates or tweaks each month depending on your plan — so your site stays fresh and functional without extra charges."
    },
    {
      question: "Is there a contract or can I cancel anytime?",
      answer: "You're never locked in. Our plans are month-to-month, and you can cancel anytime. If you do, we'll help you export your site or transfer ownership."
    },
    {
      question: "What if I want more pages or features than my plan includes?",
      answer: "No problem — you can always upgrade to the next tier or request add-ons à la carte (like extra pages, SEO audits, or integrations). Just reach out and we'll customize a solution for you."
    },
    {
      question: "Do I need to buy a domain separately?",
      answer: "Nope! We'll handle domain registration and connection for you. Already own one? We'll connect it to your new website free of charge."
    },
    {
      question: "Can I get a custom quote instead of choosing a plan?",
      answer: "Yes! If your project doesn't fit cleanly into one of the listed packages, just click \"Get a Custom Quote\" or book a free discovery call. We'll build a package just for you."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-black via-orange-900 to-orange-500 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Frequently Asked <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Questions</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Got questions? We've got answers. Here's everything you need to know about our services.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-semibold text-white">❓ {item.question}</span>
                <ChevronDown 
                  className={`w-6 h-6 text-orange-400 transition-transform duration-300 ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-white/80 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Get Quote CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-white/80 mb-6 text-lg">
            Still have questions or need a custom solution?
          </p>
          <button
            onClick={handleGetQuote}
            className="btn-primary text-lg px-8 py-4"
          >
            Get a Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
