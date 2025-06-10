
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PortfolioSection = () => {
  const navigate = useNavigate();

  const portfolioItems = [
    {
      title: "RUDEBOYBLENDZ",
      description: "A bold, yet modern booking site for a solo barber.",
      tags: ["eCommerce", "Booking", "Haircare"],
      url: "https://rudeboyblendz.com",
      image: "Web_barber.png"
    },
    {
      title: "COFooty",
      description: "Soccer Personal Trainer",
      tags: ["Train", "Booking", "Sports"],
      url: "https://bellavista-restaurant.com",
      image: "Web_train.png"
    },
    {
      title: "SkylineBuild ",
      description: "Clean, corporate website showcasing construction services.",
      tags: ["Construction", "Roofing", "Business"],
      url: "https://techflow-solutions.com",
      image: "Web_construction.png"
    },
    {
      title: "Ramen Numerals",
      description: "Small Japanese ramen shop.",
      tags: ["Food", "Japan", "Restaurant"],
      url: "https://artisan-jewelry.com",
      image: "Web_rest.png"
    },
    {
      title: "On The Edge Photography",
      description: "Professional portfolio showcasing creative work.",
      tags: ["Portfolio", "Photography", "Creative"],
      url: "https://davidpark-photo.com",
      image: "Web_photo.png"
    },
    {
      title: "GREEN VALLEY LANDSCAPING",
      description: "Service-based website with project galleries.",
      tags: ["Services", "Landscaping", "Calculator"],
      url: "https://greenvalley-landscape.com",
      image: "Web_land.png"
    }
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Work</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover how we've transformed businesses across industries with our custom web solutions.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="rounded-md bg-black/10 backdrop-blur-md"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-orange-500/50 transition-all duration-300 group">
                {/* Homepage Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title} homepage`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold transition-colors group"
                  >
                    View Website
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/websites')}
            className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-orange-500/50 text-white font-semibold rounded-xl transition-all duration-300 group backdrop-blur-sm"
          >
            View All Work
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
