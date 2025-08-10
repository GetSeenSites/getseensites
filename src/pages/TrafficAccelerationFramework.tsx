import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, BarChart3, Target, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const TrafficAccelerationFramework = () => {
  const navigate = useNavigate();

  const navigationSections = [
    { id: 'hero', title: 'Overview' },
    { id: 'problem', title: 'The Problem' },
    { id: 'case-study', title: 'Case Study' },
    { id: 'timeline', title: 'Timeline' },
    { id: 'obstacles', title: 'Obstacles' },
    { id: 'framework', title: 'Framework' },
    { id: 'results', title: 'Results' },
    { id: 'action-plan', title: 'Action Plan' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStrategy = () => {
    navigate('/intake');
  };

  useEffect(() => {
    document.title = '875% Traffic Case Study | Traffic Acceleration Framework';
    const description = 'See how our Traffic Acceleration Framework drove 875% traffic growth in 7 days. Custom website strategy + AI chatbot.';
    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    setMeta('description', description);
  }, []);

  const CaseStudyTimeline = () => {
    const timelineData = [
      {
        day: "Day 1",
        users: "4 active users",
        events: "106 page events",
        new: "3 new users",
        description: "Starting baseline - minimal organic traffic"
      },
      {
        day: "Day 2",
        users: "7 active users",
        events: "140 events",
        new: "5 new users",
        description: "Initial content research and competitor analysis"
      },
      {
        day: "Day 3",
        users: "10 active users",
        events: "180 events",
        new: "12 new users",
        description: "Framework development and content architecture"
      },
      {
        day: "Day 4",
        users: "11 active users",
        events: "212 events",
        new: "14 new users",
        description: "Content creation and optimization"
      },
      {
        day: "Day 5",
        users: "19 active users",
        events: "423 events",
        new: "32 new users",
        highlight: "73% overnight increase",
        description: "Strategic amplification begins - major breakthrough"
      },
      {
        day: "Day 6",
        users: "35 active users",
        events: "503 events",
        new: "42 new users",
        description: "Multi-vector distribution in full effect"
      },
      {
        day: "Day 7",
        users: "39 active users",
        events: "531 events",
        new: "48 new users",
        description: "Final results: 875% traffic growth achieved"
      }
    ];

    return (
      <div className="space-y-6">
        {timelineData.map((data, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex gap-6 p-6 rounded-2xl ${data.highlight ? 'bg-primary/10 border border-primary/20' : 'bg-white shadow-light-blue-sm'}`}
          >
            <div className="flex-shrink-0">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white ${data.highlight ? 'bg-primary' : 'bg-secondary'}`}>
                {data.day.split(' ')[1]}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-secondary">{data.day}</h3>
                <div className="text-right">
                  <div className="font-semibold text-secondary">{data.users}</div>
                  {data.highlight && (
                    <div className="text-primary font-medium text-sm">({data.highlight})</div>
                  )}
                </div>
              </div>
              <p className="text-secondary/80 mb-3">{data.description}</p>
              <div className="text-sm text-secondary/60">
                {data.events} • {data.new}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white taf-page">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="text-primary hover:text-primary/80 font-semibold"
            >
              ← Back to GetSeenSites
            </button>
            <div className="hidden md:flex space-x-6">
              {navigationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-secondary/60 hover:text-primary transition-colors text-sm"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section id="hero" className="pt-16 pb-16 bg-gradient-to-br from-white via-blue-50/50 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>875% Traffic Growth Case Study</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary leading-tight">
              How the Traffic Acceleration Framework Increased Website Traffic by{' '}
              <span className="text-primary">875% in 7 Days</span>
            </h1>
            
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto leading-relaxed">
              The exact 7-day system that digital marketing agencies are using to break through content saturation and generate explosive traffic growth
            </p>

            {/* Visual Proof Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white rounded-2xl p-4 shadow-light-blue-sm border border-primary/20">
                <div className="text-sm font-semibold text-primary mb-2">Before (Day 1)</div>
                <img 
                  src="/Screenshot (272).png" 
                  alt="Before - Day 1 Analytics" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-2 text-center">
                  <div className="text-2xl font-bold text-secondary">4 Users</div>
                  <div className="text-sm text-secondary/60">Starting Point</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-light-blue-sm border border-destructive/20">
                <div className="text-sm font-semibold text-destructive mb-2">After (Day 7)</div>
                <img 
                  src="/Screenshot (312).png" 
                  alt="After - Day 7 Analytics" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-2 text-center">
                  <div className="text-2xl font-bold text-destructive">39 Users</div>
                  <div className="text-sm text-destructive/60">875% Growth</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStrategy}
                className="bg-destructive hover:bg-destructive/90 text-white px-8 py-4 rounded-xl text-lg font-semibold ios-button shadow-light-blue-sm flex items-center justify-center space-x-2 group"
              >
                <span>Get Your Custom Website Strategy</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Problem Section */}
        <section id="problem" className="space-y-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              The #1 Problem Killing Digital Marketing Agencies in 2025
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-secondary/80 leading-relaxed">
              If you run a digital marketing agency or create content for businesses, you're facing the biggest challenge in our industry's history:
            </p>
            
            <div className="bg-destructive/5 border-l-4 border-destructive p-6 rounded-r-lg my-8">
              <p className="text-lg font-semibold text-secondary mb-4">
                <strong>Content saturation is making it impossible to get noticed.</strong>
              </p>
              <p className="text-secondary/80">
                According to WordStream's 2025 Content Marketing Report, <strong>89% of marketers say standing out from content saturation is their biggest challenge</strong>. Meanwhile, Smart Insights reports that <strong>organic reach has dropped by 67% across all platforms</strong> due to algorithm changes and content oversaturation.
              </p>
            </div>

            <p className="text-lg text-secondary/80">The result? Digital marketing agencies are struggling to:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              {[
                "Generate consistent traffic for their own websites (let alone clients)",
                "Prove ROI to clients when traditional content strategies fail", 
                "Stand out in a sea of AI-generated, generic content",
                "Scale traffic growth beyond 2-5% monthly increases"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                  <div className="text-red-500 mt-1">❌</div>
                  <span className="text-secondary">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-xl text-secondary font-medium">
              But what if I told you there's a systematic approach that can cut through content saturation and generate <strong>explosive traffic growth in days, not months</strong>?
            </p>
          </div>
        </section>

        {/* Case Study Results */}
        <section id="case-study" className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              The GetSeenSites Case Study: 875% Traffic Growth in 7 Days
            </h2>
            <p className="text-lg text-secondary/80">
              Last month, I decided to test a radical hypothesis with our web design agency, GetSeenSites.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
            <div className="space-y-6">
              <p className="text-secondary/80">
                Instead of following traditional content marketing advice (publish consistently, optimize for SEO, hope for the best), I implemented what I call the <strong>"Traffic Acceleration Framework"</strong>—a systematic approach designed specifically to overcome content saturation.
              </p>
              
              <div className="bg-white rounded-2xl p-6 shadow-light-blue-sm">
                <h3 className="text-xl font-bold text-primary mb-4">The results shocked everyone:</h3>
                <div className="space-y-3">
                  {[
                    { day: "Day 1", users: "4 active users", events: "106 page events", new: "3 new users" },
                    { day: "Day 2", users: "7 active users", events: "140 events", new: "5 new users" },
                    { day: "Day 3", users: "10 active users", events: "180 events", new: "12 new users" },
                    { day: "Day 4", users: "11 active users", events: "212 events", new: "14 new users" },
                    { day: "Day 5", users: "19 active users", events: "423 events", new: "32 new users", highlight: "73% overnight increase" },
                    { day: "Day 6", users: "35 active users", events: "503 events", new: "42 new users" },
                    { day: "Day 7", users: "39 active users", events: "531 events", new: "48 new users" }
                  ].map((data, index) => (
                    <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${data.highlight ? 'bg-primary/10 border border-primary/20' : 'bg-gray-50'}`}>
                      <span className="font-semibold text-secondary">{data.day}:</span>
                      <div className="text-sm text-secondary/80">
                        {data.users}, {data.events}, {data.new}
                        {data.highlight && <span className="text-primary font-medium ml-2">({data.highlight})</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-light-blue-sm">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">875%</div>
                  <div className="text-lg text-secondary font-medium">Traffic Increase</div>
                  <div className="text-sm text-secondary/60">In Just 7 Days</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-light-blue-sm">
                <h4 className="font-bold text-secondary mb-4">Overnight Results (Day 4 to Day 5):</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-secondary/80">Active users:</span>
                    <span className="font-semibold text-primary">+73% (11 to 19)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary/80">Page events:</span>
                    <span className="font-semibold text-primary">+99% (212 to 423)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary/80">New users:</span>
                    <span className="font-semibold text-primary">+128% (14 to 32)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
            <p className="text-lg text-secondary font-medium text-center">
              That single day proved something revolutionary: <strong>The right content, distributed strategically, can break through content saturation and create exponential traffic growth in hours.</strong>
            </p>
          </div>
        </section>

        {/* Case Study Timeline */}
        <section id="timeline" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              Day-by-Day Breakdown: The 7-Day Journey
            </h2>
            <p className="text-lg text-secondary/80">
              See exactly how traffic accelerated each day with real analytics data
            </p>
          </div>
          
          <CaseStudyTimeline />
        </section>

        {/* Three Fatal Obstacles */}
        <section id="obstacles" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              The Three Fatal Obstacles Blocking Agency Traffic Growth
            </h2>
            <p className="text-lg text-secondary/80 max-w-3xl mx-auto">
              After analyzing why most digital marketing agencies struggle with traffic growth, I identified three critical obstacles that the Traffic Acceleration Framework specifically addresses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The \"Content Graveyard\" Problem",
                icon: <Target className="h-8 w-8 text-destructive" />,
                challenge: "94% of content gets zero organic traffic because it's competing with 4.4 million blog posts published daily.",
                traditional: "Most agencies create content optimized for keywords that thousands of others are also targeting. The result? Your content gets buried on page 47 of Google.",
                solution: "Instead of competing for saturated keywords, the framework identifies \"content gaps\"—specific problems your audience has that nobody else is comprehensively addressing."
              },
              {
                title: "The \"Invisible Content\" Problem",
                icon: <Users className="h-8 w-8 text-destructive" />,
                challenge: "Even great content goes unnoticed because organic reach on social media has dropped 67% since 2023.",
                traditional: "Most agencies post content once on their social channels and hope for organic sharing. With algorithms favoring paid content, this approach is dead.",
                solution: "The framework uses \"multi-vector amplification\"—a systematic approach to distribute content across 7+ channels simultaneously, with specific timing optimized for each platform."
              },
              {
                title: "The \"Conversion Desert\" Problem",
                icon: <Zap className="h-8 w-8 text-destructive" />,
                challenge: "Traffic doesn't convert because most content focuses on awareness, not action.",
                traditional: "Agencies create blog posts that inform but don't inspire action. Readers consume the content and leave without engaging further.",
                solution: "Every piece of content is architected using the \"Linkreator Focus Method\"—content specifically designed to make industry influencers want to share it."
              }
            ].map((obstacle, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-light-blue-sm space-y-6">
                <div className="flex items-center space-x-3">
                  {obstacle.icon}
                  <h3 className="text-xl font-bold text-secondary">{obstacle.title}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-destructive mb-2">The Challenge:</h4>
                    <p className="text-sm text-secondary/80">{obstacle.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-destructive mb-2">Why Traditional Methods Fail:</h4>
                    <p className="text-sm text-secondary/80">{obstacle.traditional}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">How Traffic Acceleration Framework Solves This:</h4>
                    <p className="text-sm text-secondary/80">{obstacle.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Framework Overview */}
        <section id="framework" className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-3xl p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              The Traffic Acceleration Framework: A 7-Day System
            </h2>
            <p className="text-lg text-secondary/80">
              After documenting our GetSeenSites success, I reverse-engineered the exact system that created 875% growth in 7 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                phase: "Phase 1",
                days: "Days 1-2",
                title: "Foundation & Research",
                icon: <BarChart3 className="h-6 w-6" />,
                focus: "Problem identification and linkreator research",
                time: "7 hours total"
              },
              {
                phase: "Phase 2", 
                days: "Day 3",
                title: "Framework Development",
                icon: <Target className="h-6 w-6" />,
                focus: "Creating systematic approach and content architecture",
                time: "6 hours"
              },
              {
                phase: "Phase 3",
                days: "Day 4",
                title: "Content Creation",
                icon: <Zap className="h-6 w-6" />,
                focus: "Comprehensive resource development and optimization",
                time: "2 hours"
              },
              {
                phase: "Phase 4",
                days: "Days 5-7",
                title: "Strategic Amplification",
                icon: <Rocket className="h-6 w-6" />,
                focus: "Multi-vector distribution and momentum building",
                time: "6 hours total"
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-light-blue-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    {phase.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-primary text-sm">{phase.phase}</div>
                    <div className="text-xs text-secondary/60">{phase.days}</div>
                  </div>
                </div>
                
                <h3 className="font-bold text-secondary mb-2">{phase.title}</h3>
                <p className="text-sm text-secondary/80 mb-3">{phase.focus}</p>
                <div className="text-xs text-primary font-medium">{phase.time}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Results from Other Agencies */}
       

        {/* CTA Section */}
        <section id="action-plan" className="bg-gradient-to-br from-destructive/5 to-primary/5 rounded-3xl p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            Ready to Transform Your Business with a Custom Website Strategy?
          </h2>
          <p className="text-lg text-secondary/80 mb-8 max-w-2xl mx-auto">
            Just like these agencies achieved explosive growth, GetSeenSites can help you build a website that converts visitors into customers. No cookie-cutter templates - we design for your business goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStrategy}
              className="bg-destructive hover:bg-destructive/90 text-white px-8 py-4 rounded-xl text-lg font-semibold ios-button shadow-light-blue-sm flex items-center justify-center space-x-2 group"
            >
              <span>Get Your Custom Website Strategy</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <p className="text-sm text-secondary/60 mt-6">
            Includes SEO optimization + 24/7 AI chatbot • Built to rank and convert
          </p>
        </section>

      </article>

      <div className="text-white">
        <Footer />
      </div>
    </div>
  );
};

export default TrafficAccelerationFramework;
