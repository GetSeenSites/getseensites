import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, BarChart3, Target, TrendingUp, CheckCircle, Linkedin, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useInternalNavigation } from '@/hooks/useInternalNavigation';

const RevenueBridgeMethod = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { navigateWithScrollToTop } = useInternalNavigation();

  useEffect(() => {
    // Add meta tags for social sharing
    const metaTags = [
      { property: 'og:title', content: 'How The Revenue Bridge Method Increased Website Traffic by 150% in 3 Days' },
      { property: 'og:description', content: 'A real case study showing how GetSeenSites applied the Revenue Bridge Method to grow traffic fast. Learn the 3-step system.' },
      { property: 'og:image', content: `${window.location.origin}/Screenshot (282).png` },
      { property: 'og:url', content: `${window.location.origin}/revenue-bridge-method` },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'How The Revenue Bridge Method Increased Website Traffic by 150% in 3 Days' },
      { name: 'twitter:description', content: 'A real case study showing how GetSeenSites applied the Revenue Bridge Method to grow traffic fast. Learn the 3-step system.' },
      { name: 'twitter:image', content: `${window.location.origin}/Screenshot (282).png` }
    ];

    metaTags.forEach(tag => {
      const existingTag = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const newTag = document.createElement('meta');
        if (tag.property) newTag.setAttribute('property', tag.property);
        if (tag.name) newTag.setAttribute('name', tag.name);
        newTag.setAttribute('content', tag.content);
        document.head.appendChild(newTag);
      }
    });

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      metaTags.forEach(tag => {
        const existingTag = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
        if (existingTag) {
          existingTag.remove();
        }
      });
    };
  }, []);

  const handleScheduleAudit = () => {
    window.location.href = '/#contact';
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInternalNavigation = (path: string) => {
    navigateWithScrollToTop(path);
  };

 const shareOnLinkedIn = () => {
  const url = encodeURIComponent(`${window.location.origin}/revenue-bridge-method`);
  // LinkedIn only uses the url parameter now
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
};

  const shareOnTwitter = () => {
    const url = encodeURIComponent(`${window.location.origin}/revenue-bridge-method`);
    const text = encodeURIComponent('How The Revenue Bridge Method Increased Website Traffic by 150% in 3 Days - A real case study by @getseensites');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const tableOfContents = [
    { id: 'transformation', title: 'How The Revenue Bridge Method Transformed GetSeenSites Traffic' },
    { id: 'real-data', title: 'Real Data: Google Analytics Proof' },
    { id: 'foundation-audit', title: 'Step 1: The Foundation Audit' },
    { id: 'content-bridge', title: 'Step 2: The Content Bridge' },
    { id: 'authority-amplifier', title: 'Step 3: The Authority Amplifier' },
    { id: 'complete-framework', title: 'The Complete Revenue Bridge Method Framework' },
    { id: 'results-analysis', title: 'Results Analysis & Future Implications' },
    { id: 'why-it-works', title: 'Why The Revenue Bridge Method Works' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-900 to-orange-500 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Social Share Buttons - Desktop Only */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden xl:flex flex-col space-y-4"
      >
        <button
          onClick={shareOnLinkedIn}
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <button
          onClick={shareOnTwitter}
          className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Table of Contents - Mobile/Tablet */}
      <div className="lg:hidden sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-orange-500/20 p-4">
        <details className="text-white">
          <summary className="cursor-pointer font-semibold text-orange-300 mb-2">Table of Contents</summary>
          <nav className="space-y-2 max-h-64 overflow-y-auto">
            {tableOfContents.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block text-left text-sm text-white/80 hover:text-orange-300 transition-colors"
              >
                {item.title}
              </button>
            ))}
          </nav>
        </details>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Table of Contents - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <nav className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                <h3 className="text-lg font-bold text-white mb-4">Table of Contents</h3>
                <ul className="space-y-3">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="text-left text-sm text-white/80 hover:text-orange-300 transition-colors"
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Mobile Social Share */}
                <div className="mt-8 lg:hidden">
                  <h4 className="text-white font-semibold mb-3">Share this case study:</h4>
                  <div className="flex space-x-3">
                    <button
                      onClick={shareOnLinkedIn}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm">LinkedIn</span>
                    </button>
                    <button
                      onClick={shareOnTwitter}
                      className="flex items-center space-x-2 bg-blue-400 text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                      <span className="text-sm">Twitter</span>
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-invert prose-orange max-w-none">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  How The <span className="text-transparent bg-gradient-to-r from-orange-300 to-white bg-clip-text">Revenue Bridge Method</span> Increased My Website Traffic by 150% in 3 Days
                </h1>
                
                {/* Key Stats */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                    <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white">150%</div>
                    <div className="text-white/80">Traffic Increase</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                    <BarChart3 className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white">300%</div>
                    <div className="text-white/80">Engagement Up</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                    <Target className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white">3</div>
                    <div className="text-white/80">Days to Results</div>
                  </div>
                </div>

                {/* Share Buttons - Mobile */}
                <div className="lg:hidden mt-8">
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={shareOnLinkedIn}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>Share on LinkedIn</span>
                    </button>
                    <button
                      onClick={shareOnTwitter}
                      className="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>Share on Twitter</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg text-white/90 leading-relaxed mb-12"
              >
                <p>
                  Today I'm going to share exactly how I used a systematic approach to transform my own GetSeenSites website from struggling with minimal traffic to achieving consistent daily growth. Just one week ago, my site was getting only 4 active users and barely any engagement. The website looked professional, but it wasn't converting visitors into actual business inquiries.
                </p>
                <p>
                  How did I bridge the gap between having a beautiful website and generating real traffic that leads to customers? The Revenue Bridge Method. And in this case study, I'm going to show you exactly how I implemented this three-step system, step-by-step, so you can apply the same strategy to any small business website.
                </p>
              </motion.div>

              {/* Transformation Section */}
              <section id="transformation" className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-8"
                >
                  How The Revenue Bridge Method Transformed GetSeenSites Traffic
                </motion.h2>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/20 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Before vs After Results</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-red-400 mb-4">Before Implementation:</h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• Daily active users: Just 4 visitors</li>
                        <li>• Bounce rate: 78% (industry average is 47%)</li>
                        <li>• Average session duration: 47 seconds</li>
                        <li>• Business inquiries: 0 per week</li>
                        <li>• Google Search Console impressions: Barely registering</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold text-green-400 mb-4">After 3 Days:</h4>
                      <ul className="space-y-2 text-white/80">
                        <li>• Daily active users jumped to 10 (150% increase)</li>
                        <li>• Total events increased to 180 (engagement up 300%)</li>
                        <li>• New users grew to 12 in the final measurement period</li>
                        <li>• Page view events increased by 65%</li>
                        <li>• LinkedIn organic reach grew to 33 impressions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-white/90 leading-relaxed">
                  According to <a href="https://www.growandconvert.com/conversion-rate-optimization/average-seo-conversion-rate/" target="_blank" rel="nofollow" className="text-orange-300 hover:text-orange-200 underline">research from Grow and Convert</a>, the average small business website conversion rate is only 2.35%, with most struggling to generate consistent traffic. The Revenue Bridge Method addresses the fundamental disconnect between website aesthetics and business results that keeps small businesses invisible online.
                </p>
              </section>

              {/* Real Data Section */}
              <section id="real-data" className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-8"
                >
                  Real Data: Google Analytics Proof
                </motion.h2>

                <p className="text-white/90 leading-relaxed mb-8">
                  Here's the actual Google Analytics data showing the transformation. These screenshots were taken directly from our analytics dashboard, proving the results are real and measurable.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/20">
                      <img
                        src="/Screenshot (272).png"
                        alt="Google Analytics showing 4 daily active users before implementing Revenue Bridge Method"
                        className="w-full rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-bold text-red-400 mb-2">Before: 4 Daily Active Users</h3>
                      <p className="text-white/80 text-sm">Baseline performance with minimal traffic and engagement</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/20">
                      <img
                        src="/Screenshot (282).png"
                        alt="Google Analytics showing 10 daily active users after implementing Revenue Bridge Method"
                        className="w-full rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-bold text-green-400 mb-2">After: 10 Daily Active Users</h3>
                      <p className="text-white/80 text-sm">150% increase in just 3 days using the systematic approach</p>
                    </div>
                  </motion.div>
                </div>

                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold text-green-400 mb-4">What This Data Means:</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• <strong>Consistent Growth Pattern:</strong> Traffic increased steadily throughout the 3-day period</li>
                    <li>• <strong>Quality Engagement:</strong> Not just more visitors, but more engaged users</li>
                    <li>• <strong>Sustainable Results:</strong> Growth maintained beyond the initial implementation</li>
                    <li>• <strong>Measurable ROI:</strong> Clear before/after comparison shows real business impact</li>
                  </ul>
                </div>
              </section>

              {/* Step 1: Foundation Audit */}
              <section id="foundation-audit" className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-8"
                >
                  Step 1: The Foundation Audit
                </motion.h2>

                <p className="text-white/90 leading-relaxed mb-6">
                  The first step in the Revenue Bridge Method is conducting what I call a "Foundation Audit" - identifying the gaps between your current website performance and industry benchmarks.
                </p>

                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/20 max-w-2xl mx-auto">
                      <img
                        src="/Screenshot (272).png"
                        alt="Foundation Audit baseline analytics showing low performance metrics"
                        className="w-full rounded-lg mb-4"
                      />
                      <h4 className="text-lg font-semibold text-orange-300 mb-2">Foundation Audit Baseline</h4>
                      <p className="text-white/80 text-sm">Starting point analytics revealing critical performance gaps</p>
                    </div>
                  </motion.div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/20 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">What I Discovered About GetSeenSites:</h3>
                  <ul className="space-y-3 text-white/80">
                    <li>• <strong>SEO optimization score:</strong> 23% (industry standard is 70%+)</li>
                    <li>• <strong>Mobile page speed:</strong> 3.2 seconds (Google recommends under 2.5 seconds)</li>
                    <li>• <strong>Missing meta descriptions</strong> on 60% of pages</li>
                    <li>• <strong>No internal linking strategy</strong> connecting service pages</li>
                    <li>• <strong>Zero content targeting</strong> medium-tail keywords like "website conversion rate optimization"</li>
                  </ul>
                </div>

                <p className="text-white/90 leading-relaxed mb-6">
                  <strong>Industry Context:</strong> According to <a href="https://frontiermarketingllc.com/small-business-web-design-guide/" target="_blank" rel="nofollow" className="text-orange-300 hover:text-orange-200 underline">Frontiermarketingllc research</a>, 68% of small business websites fail basic SEO requirements, while successful sites following conversion optimization best practices see 3x higher traffic growth within the first month.
                </p>

                <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 mb-6">
                  <h4 className="text-xl font-semibold text-green-400 mb-4">How I Fixed The Foundation:</h4>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Optimized all meta titles and descriptions for target keywords</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Implemented strategic internal linking between service pages</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Added schema markup for local business visibility</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Created content calendar targeting "small business website design" and related terms</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Optimized images and improved page speed to 2.1 seconds</span>
                    </li>
                  </ul>
                </div>

                <p className="text-white/90 leading-relaxed mb-6">
                  <strong>The Foundation Result:</strong> Within 48 hours, Google Search Console showed the first uptick in impressions, and by day 3, I could see the beginnings of organic traffic growth in Google Analytics.
                </p>
              </section>

              {/* Step 2: Content Bridge */}
              <section id="content-bridge" className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-8"
                >
                  Step 2: The Content Bridge
                </motion.h2>

                <p className="text-white/90 leading-relaxed mb-6">
                  Step two involves creating what I call a "Content Bridge" - strategic content that connects your services to the problems your ideal customers are actively searching for online.
                </p>

                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/20 max-w-2xl mx-auto">
                      <img
                        src="/Screenshot (277).png"
                        alt="Content Bridge implementation showing mid-stage traffic improvement"
                        className="w-full rounded-lg mb-4"
                      />
                      <h4 className="text-lg font-semibold text-orange-300 mb-2">Content Bridge Progress</h4>
                      <p className="text-white/80 text-sm">Mid-stage analytics showing content strategy taking effect</p>
                    </div>
                  </motion.div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/20 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">The Content Strategy Implementation:</h3>
                  <p className="text-white/90 mb-4">
                    Based on keyword research showing "website conversion rate optimization" gets 1,200+ monthly searches with manageable competition, I created targeted content addressing this exact need.
                  </p>
                  
                  <h4 className="text-xl font-semibold text-orange-300 mb-4">Content Created:</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• Homepage optimization around "professional websites that convert visitors into customers"</li>
                    <li>• Service page restructuring to target "small business website design" (2,800 monthly searches)</li>
                    <li>• About page enhancement with "Bear Delaware web design" for local SEO</li>
                  </ul>
                </div>

                <p className="text-white/90 leading-relaxed mb-6">
                  <strong>The Psychology Behind It:</strong> Small business owners don't just want websites - they want websites that generate business. The Content Bridge connects aesthetic design services to revenue outcomes, using the exact language prospects use when searching for solutions.
                </p>

                <p className="text-white/90 leading-relaxed font-semibold">
                  <strong>The Content Result:</strong> The strategic content approach led to a 300% increase in total user engagement events and improved time-on-page metrics that signal quality to Google's algorithm.
                </p>
              </section>

              {/* Step 3: Authority Amplifier */}
              <section id="authority-amplifier" className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-8"
                >
                  Step 3: The Authority Amplifier
                </motion.h2>

                <p className="text-white/90 leading-relaxed mb-6">
                  The final step involves what I call the "Authority Amplifier" - building credibility signals that establish your expertise while creating opportunities for industry recognition and backlinks.
                </p>

                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/20 max-w-2xl mx-auto">
                      <img
                        src="/Screenshot (282).png"
                        alt="Authority Amplifier results showing final traffic metrics and growth"
                        className="w-full rounded-lg mb-4"
                      />
                      <h4 className="text-lg font-semibold text-orange-300 mb-2">Authority Amplifier Results</h4>
                      <p className="text-white/80 text-sm">Final metrics demonstrating successful authority building and traffic growth</p>
                    </div>
                  </motion.div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/20 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Authority Building Implementation:</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Case study documentation with real Google Analytics screenshots</li>
                    <li>• Industry methodology creation (The Revenue Bridge Method)</li>
                    <li>• Professional social media presence on LinkedIn with consistent posting</li>
                    <li>• Strategic content distribution targeting web design blogger communities</li>
                  </ul>
                </div>

                <p className="text-white/90 leading-relaxed mb-6">
                  <strong>Industry Recognition Strategy:</strong> Following successful methodologies like those from <a href="https://conversion-rate-experts.com/" target="_blank" rel="nofollow" className="text-orange-300 hover:text-orange-200 underline">Conversion Rate Experts</a> and <a href="https://neilpatel.com/blog/the-complete-guide-to-internal-linking/" target="_blank" rel="nofollow" className="text-orange-300 hover:text-orange-200 underline">Neil Patel Digital</a>, I positioned the Revenue Bridge Method as a systematic approach that other professionals could reference and implement.
                </p>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6 mb-6">
                  <h4 className="text-xl font-semibold text-blue-400 mb-4">LinkedIn Authority Building:</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• Organic reach grew to 33 impressions in first week</li>
                    <li>• Engagement rate tracking showed steady improvement</li>
                    <li>• Professional network expansion through industry-relevant content</li>
                    <li>• Thought leadership positioning around conversion optimization</li>
                  </ul>
                </div>

                <p className="text-white/90 leading-relaxed font-semibold">
                  <strong>The Authority Results:</strong> The combination of documented methodology, real data, and strategic positioning created the foundation for industry recognition while improving search engine authority signals.
                </p>
              </section>

              {/* Complete Framework */}
              <section id="complete-framework" className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-8"
                >
                  The Complete Revenue Bridge Method Framework
                </motion.h2>

                <p className="text-white/90 leading-relaxed mb-6">
                  Here's the complete system you can apply to any small business website:
                </p>

                <div className="space-y-8">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/20">
                    <h3 className="text-2xl font-bold text-orange-300 mb-4">Phase 1: Foundation Audit (Days 1-2)</h3>
                    <ol className="list-decimal list-inside space-y-2 text-white/80">
                      <li>Run comprehensive SEO analysis using free tools</li>
                      <li>Identify keyword opportunities in your market</li>
                      <li>Audit current conversion funnel gaps</li>
                      <li>Benchmark against industry performance standards</li>
                      <li>Create optimization priority list</li>
                    </ol>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/20">
                    <h3 className="text-2xl font-bold text-orange-300 mb-4">Phase 2: Content Bridge (Days 2-3)</h3>
                    <ol className="list-decimal list-inside space-y-2 text-white/80">
                      <li>Research target customer search behavior</li>
                      <li>Create content targeting medium-tail keywords</li>
                      <li>Optimize existing pages for conversion intent</li>
                      <li>Implement strategic internal linking architecture</li>
                      <li>Deploy social media content calendar</li>
                    </ol>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/20">
                    <h3 className="text-2xl font-bold text-orange-300 mb-4">Phase 3: Authority Amplifier (Day 3)</h3>
                    <ol className="list-decimal list-inside space-y-2 text-white/80">
                      <li>Document methodology and results</li>
                      <li>Create shareable case study content</li>
                      <li>Build industry professional network</li>
                      <li>Submit optimized content to search engines</li>
                      <li>Monitor and iterate based on early data</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Results Analysis */}
              <section id="results-analysis" className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-8"
                >
                  Results Analysis & Future Implications
                </motion.h2>

                {/* Complete Visual Timeline */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Complete Visual Timeline: 3-Day Transformation</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-center"
                    >
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/30">
                        <img
                          src="/Screenshot (272).png"
                          alt="Before implementation baseline metrics"
                          className="w-full rounded-lg mb-3"
                        />
                        <h4 className="text-lg font-semibold text-red-400 mb-1">Before</h4>
                        <p className="text-white/70 text-sm">Baseline: 4 daily users</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-center"
                    >
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/30">
                        <img
                          src="/Screenshot (277).png"
                          alt="During implementation showing progress"
                          className="w-full rounded-lg mb-3"
                        />
                        <h4 className="text-lg font-semibold text-yellow-400 mb-1">During</h4>
                        <p className="text-white/70 text-sm">Mid-stage improvement</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-center"
                    >
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/30">
                        <img
                          src="/Screenshot (282).png"
                          alt="After implementation final results"
                          className="w-full rounded-lg mb-3"
                        />
                        <h4 className="text-lg font-semibold text-green-400 mb-1">After</h4>
                        <p className="text-white/70 text-sm">Final: 10 daily users</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-center"
                    >
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/30">
                        <img
                          src="/Screenshot (312).png"
                          alt="LinkedIn analytics showing social media growth"
                          className="w-full rounded-lg mb-3"
                        />
                        <h4 className="text-lg font-semibold text-blue-400 mb-1">Social Proof</h4>
                        <p className="text-white/70 text-sm">LinkedIn: 33 impressions</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-2xl p-8 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">3-Day Performance Summary:</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• <strong>Traffic Growth:</strong> 4 to 10 daily active users (150% increase)</li>
                    <li>• <strong>Engagement Improvement:</strong> 300% increase in total events</li>
                    <li>• <strong>Social Media Growth:</strong> 33 LinkedIn impressions from zero baseline</li>
                    <li>• <strong>Search Visibility:</strong> First-time appearance in Google Search Console data</li>
                    <li>• <strong>Foundation Metrics:</strong> All technical SEO scores moved into acceptable ranges</li>
                  </ul>
                </div>

                <p className="text-white/90 leading-relaxed mb-6">
                  <strong>Industry Context:</strong> According to conversion optimization benchmarks, websites implementing systematic optimization approaches typically see 15-50% improvement in key metrics within the first month. The 150% traffic increase achieved with the Revenue Bridge Method represents strong early performance that positions GetSeenSites for continued growth.
                </p>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-orange-500/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Projected Growth Trajectory:</h3>
                  <p className="text-white/90 mb-4">Based on small business website performance data, consistent application of the Revenue Bridge Method should yield:</p>
                  <ul className="space-y-2 text-white/80">
                    <li>• <strong>Month 1:</strong> 500-1,000 monthly visitors</li>
                    <li>• <strong>Month 3:</strong> 2,000-3,000 monthly visitors</li>
                    <li>• <strong>Month 6:</strong> 5,000+ monthly visitors with qualified lead generation</li>
                  </ul>
                </div>
              </section>

              {/* Why It Works */}
              <section id="why-it-works" className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-8"
                >
                  Why The Revenue Bridge Method Works
                </motion.h2>

                <p className="text-white/90 leading-relaxed mb-6">
                  This system succeeds because it addresses the three fundamental reasons small business websites fail to generate results:
                </p>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                    <h3 className="text-xl font-bold text-orange-300 mb-3">1. Technical Foundation Gaps</h3>
                    <p className="text-white/80">Most small business websites have basic SEO and performance issues that prevent search engine visibility</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                    <h3 className="text-xl font-bold text-orange-300 mb-3">2. Content-Customer Disconnect</h3>
                    <p className="text-white/80">Beautiful websites often fail to speak the language customers use when searching for solutions</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                    <h3 className="text-xl font-bold text-orange-300 mb-3">3. Authority Signal Absence</h3>
                    <p className="text-white/80">Without credibility indicators, even optimized websites struggle to convert visitors into customers</p>
                  </div>
                </div>

                <p className="text-white/90 leading-relaxed mt-6">
                  The Revenue Bridge Method works regardless of industry because it focuses on the universal challenge of connecting marketing investments to measurable business outcomes - something every small business owner understands and values.
                </p>
              </section>

              {/* Implementation Resources */}
              <section className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-8"
                >
                  Implementation Resources
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                    <h3 className="text-xl font-bold text-orange-300 mb-4">Free Tools for Foundation Audit:</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Google Search Console (search performance tracking)</li>
                      <li>• Google PageSpeed Insights (technical optimization)</li>
                      <li>• Google Analytics (traffic and engagement analysis)</li>
                      <li>• Ubersuggest (basic keyword research)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                    <h3 className="text-xl font-bold text-orange-300 mb-4">Content Creation Framework:</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Target medium-tail keywords with commercial intent</li>
                      <li>• Create hub and spoke content architecture</li>
                      <li>• Implement strategic internal linking between service pages</li>
                      <li>• Develop local SEO content for geographic targeting</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20">
                    <h3 className="text-xl font-bold text-orange-300 mb-4">Authority Building Checklist:</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Document your methodology and results</li>
                      <li>• Create case studies with real data</li>
                      <li>• Build professional social media presence</li>
                      <li>• Engage with industry communities and discussions</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Conclusion & CTA */}
              <section className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-3xl p-8"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                    Ready to Bridge the Gap?
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                    That's how you can use the Revenue Bridge Method to transform any small business website from a digital brochure into a customer-generating asset. The three-step system—Foundation Audit, Content Bridge, and Authority Amplifier—addresses the core problems that prevent websites from achieving their business potential.
                  </p>
                  
                  <div className="space-y-4">
                    <p className="text-lg text-white/80 mb-6">
                      Ready to bridge the gap between your current website performance and actual revenue generation? The Revenue Bridge Method provides a systematic, measurable approach to website optimization that delivers results within the first week of implementation.
                    </p>
                    
                    <button
                      onClick={handleScheduleAudit}
                      className="btn-primary text-xl px-8 py-4 group"
                    >
                      Schedule Your Free Foundation Audit
                      <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Additional Share Section */}
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <h3 className="text-xl font-semibold text-white mb-4">Share This Case Study</h3>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={shareOnLinkedIn}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                          <span>Share on LinkedIn</span>
                        </button>
                        <button
                          onClick={shareOnTwitter}
                          className="flex items-center space-x-2 bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                          <span>Share on Twitter</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* About GetSeenSites */}
              <section className="mt-16 pt-8 border-t border-white/20">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">About GetSeenSites</h3>
                  <p className="text-white/80 mb-6">
                    We specialize in creating websites that don't just look professional—they generate business results. Every GetSeenSites project includes the complete Revenue Bridge Method framework because we believe small businesses deserve websites that actually work, not just impress visitors.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://www.getseensites.com"
                      target="_blank"
                      rel="nofollow"
                      className="text-orange-300 hover:text-orange-200 transition-colors"
                    >
                      View Our Website Packages
                    </a>
                    <span className="text-white/40">|</span>
                    <a
                      href="https://www.getseensites.com"
                      target="_blank"
                      rel="nofollow"
                      className="text-orange-300 hover:text-orange-200 transition-colors"
                    >
                      Schedule Free Foundation Audit
                    </a>
                    <span className="text-white/40">|</span>
                    <a
                      href="https://www.getseensites.com"
                      target="_blank"
                      rel="nofollow"
                      className="text-orange-300 hover:text-orange-200 transition-colors"
                    >
                      Learn More About Our Process
                    </a>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueBridgeMethod;
