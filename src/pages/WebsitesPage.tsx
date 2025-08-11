
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const WebsitesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('websites');

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/intake');
  };

  const portfolioItems = [
   {
      title: "Executive Exotics",
      description: "A bold, yet modern booking site for a car renal company.",
      tags: ["Inventory", "Booking", "Cars"],
      url: "http://executiveexoticstpa.com/",
      image: "Ex_Logo.PNG"
    },
    {
      title: "COFooty",
      description: "Soccer Personal Trainer",
      tags: ["Train", "Booking", "Sports"],
      url: "https://www.cofooty.com/",
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
      description: "Professional portfolio showcasing creative photography work.",
      tags: ["Portfolio", "Photography", "Creative"],
      url: "https://davidpark-photo.com",
      image: "Web_photo.png"
    },
    {
      title: "GREEN VALLEY LANDSCAPING",
      description: "Service-based website with project galleries and quote calculator.",
      tags: ["Services", "Landscaping", "Calculator"],
      url: "https://greenvalley-landscape.com",
      image: "Web_land.png"
    },
    {
      title: "URBAN FITNESS STUDIO",
      description: "Modern fitness studio with class scheduling and membership management.",
      tags: ["Fitness", "Booking", "Membership"],
      url: "https://urban-fitness.com",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&h=600"
    },
    {
      title: "COASTAL REAL ESTATE",
      description: "Premium real estate platform with property listings and virtual tours.",
      tags: ["Real Estate", "Listings", "Virtual Tours"],
      url: "https://coastal-realestate.com",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&h=600"
    }
  ];

  const logoItems = [
    {
      title: "CodRod",
      description: "Bold, modern logo matches aquatic theme.",
      image: "Fish_logo.png",
      tags: ["Tech", "Corporate", "Modern"]
    },
    {
      title: "Vintage Wears",
      description: "Organic, naturual, 70's style logo for vintage clothing brand.",
      image: "Vintage_logo.png",
      tags: ["Organic", "Beauty", "Vinatage"]
    },
    {
      title: "Wake n' Bake",
      description: "Dynamic logo, combining baked goods into design.",
      image: "Bakery_logo.png",
      tags: ["Cake", "Bakery", "Dynamic"]
    },
    {
      title: "RAMEN NUMERALS",
      description: "Colferful, dottoed logo for a ramen shop",
      image: "Ramen_logo.png",
      tags: ["Food", "Japan", "Ramen"]
    },
    {
      title: "DIGITAL FORGE STUDIO",
      description: "Creative, tech-inspired logo for a digital design agency.",
      image: "Mouse_logo.png",
      tags: ["Digital", "Creative", "Agency"]
    },
    {
      title: "RUDEBOYBLENDZ",
      description: "Calm, minimalist logo representing barber services.",
      image: "Logo_barber.png",
      tags: ["Simple", "Barber", "Minimalist"]
    }
  ];

  const contentItems = [
    {
      title: "TECHFLOW SOLUTIONS",
      content: "Transform your business with cutting-edge technology solutions that drive growth and innovation. Our team of experts specializes in creating custom software solutions tailored to your unique needs, ensuring your business stays ahead of the competition in today's digital landscape.",
      source: "Hero Section",
      tags: ["B2B", "Technology", "Professional"]
    },
    {
      title: "BELLA VISTA RESTAURANT",
      content: "Indulge in an unforgettable culinary journey where traditional Italian flavors meet modern artistry. Our passionate chefs craft each dish using the finest locally-sourced ingredients, creating a dining experience that celebrates both heritage and innovation.",
      source: "About Us",
      tags: ["Restaurant", "Culinary", "Elegant"]
    },
    {
      title: "GREEN VALLEY LANDSCAPING",
      content: "Your outdoor space is more than just a yard—it's an extension of your home and a reflection of your style. We believe in creating landscapes that not only enhance your property's beauty but also provide functional spaces for relaxation, entertainment, and connection with nature.",
      source: "Services Overview",
      tags: ["Landscaping", "Outdoor", "Design"]
    },
    {
      title: "DAVID PARK PHOTOGRAPHY",
      content: "Every moment tells a story, and every story deserves to be captured with authenticity and artistry. Through my lens, I aim to freeze time and preserve the genuine emotions, fleeting expressions, and precious memories that make life extraordinary.",
      source: "Artist Statement",
      tags: ["Photography", "Creative", "Artistic"]
    },
    {
      title: "URBAN FITNESS STUDIO",
      content: "Fitness isn't just about physical transformation—it's about discovering your inner strength, building confidence, and creating a lifestyle that empowers you to live your best life. Join our community of like-minded individuals who are committed to growth, both inside and out.",
      source: "Welcome Message",
      tags: ["Fitness", "Community", "Wellness"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Animated Stars */}
      {[...Array(30)].map((_, i) => (
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Work</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Explore our portfolio of websites, logos, and content created for businesses across various industries.
          </p>
          <button onClick={handleGetStarted} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all group">
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2">
              <TabsTrigger 
                value="websites" 
                className="px-8 py-3 rounded-lg text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all"
              >
                Websites
              </TabsTrigger>
              <TabsTrigger 
                value="logos" 
                className="px-8 py-3 rounded-lg text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all"
              >
                Logos
              </TabsTrigger>
              <TabsTrigger 
                value="content" 
                className="px-8 py-3 rounded-lg text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all"
              >
                Content
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Websites Tab */}
          <TabsContent value="websites">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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
          </TabsContent>

          {/* Logos Tab */}
          <TabsContent value="logos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {logoItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-md bg-black/10 backdrop-blur-md"
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-orange-500/50 transition-all duration-300 group">
                    {/* Logo Image */}
                    <div className="aspect-square overflow-hidden bg-white/5 flex items-center justify-center p-8">
                      <img
                        src={item.image}
                        alt={`${item.title} logo`}
                        loading="lazy"
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
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
                      
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="grid lg:grid-cols-2 gap-8">
              {contentItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-md bg-black/10 backdrop-blur-md"
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-orange-500/50 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-orange-400 text-sm font-medium px-3 py-1 bg-orange-500/20 rounded-full border border-orange-500/30">
                        {item.source}
                      </span>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 mb-6">
                      <p className="text-white/80 leading-relaxed text-lg italic">
                        "{item.content}"
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Join Our <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Success Stories?</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Transform your business with a custom website that converts visitors into customers.
          </p>
          <button onClick={handleGetStarted} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all group">
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WebsitesPage;
