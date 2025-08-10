import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResourcesPage: React.FC = () => {
  const navigate = useNavigate();

  const resources = [
    {
      id: 'traffic-acceleration',
      title: 'Traffic Acceleration Framework',
      summary: 'A systematic 7-day execution framework that broke through content saturation to achieve 875% traffic growth. Learn the exact distribution strategy and on-page optimization techniques that generated explosive organic reach.',
      readTime: '12 min read',
      author: 'Jared Edge',
      route: '/traffic-acceleration-framework',
      testId: 'resources-card-traffic'
    },
    {
      id: 'revenue-bridge',
      title: 'Revenue Bridge Method',
      summary: 'Our proven consulting methodology for connecting website user experience, AI-powered lead capture, and sales processes into a unified conversion system that consistently generates revenue for service businesses.',
      readTime: '8 min read', 
      author: 'Jared Edge',
      route: '/revenue-bridge-method',
      testId: 'resources-card-revenue'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-500 to-black relative overflow-hidden">
      {/* Background Effects - Oracle Blogs inspired */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Growth <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Resources</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Proven frameworks and real case studies showing how we engineer traffic growth and revenue conversions for small businesses through strategic website development.
          </p>
        </motion.header>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <motion.article
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-8 hover:bg-white/15 transition-all duration-300 group"
              data-testid={resource.testId}
            >
              {/* Meta Information */}
              <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{resource.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{resource.readTime}</span>
                </div>
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">
                {resource.title}
              </h2>
              
              <p className="text-white/80 leading-relaxed mb-6 text-lg">
                {resource.summary}
              </p>

              {/* CTA */}
              <button
                onClick={() => navigate(resource.route)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 group-hover:translate-x-1"
              >
                Read Case Study
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.article>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Apply These Frameworks?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto text-lg">
              Get a custom implementation strategy based on these proven frameworks. Start with a free consultation to see how these methods can transform your business.
            </p>
            <button
              onClick={() => navigate('/intake')}
              className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center gap-2 group"
            >
              Get Your Strategy
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default ResourcesPage;
