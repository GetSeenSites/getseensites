
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Connor O'Brien",
      business: "COFooty",
      text: "Everything before GetSeenSites was done in person. Now its so much easier to keep track on how many players are planning on attending my sessions",
      rating: 5,
      image: "Web_train.png"
    },
    {
      name: "Rudy Martinez",
      business: "RudeBoyBlendz",
      text: "The website was created and delivered quickly. The booking system they integrated into the wensite was a gamechanger.",
      rating: 5,
      image: "/Screenshot (191).png"
    },
    {
      name: "David Park",
      business: "Photography Studio",
      text: "My portfolio has never looked better. The cosmic design perfectly captures the essence of my creative work.",
      rating: 5,
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-black via-orange-900 to-orange-500 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
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
            Client Success <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Stories</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            See how we've helped businesses across industries achieve their digital transformation goals.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-orange-500/50 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-white/90 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-white/70 text-sm">{testimonial.business}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white/70 mb-8">Trusted by businesses worldwide</h3>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
