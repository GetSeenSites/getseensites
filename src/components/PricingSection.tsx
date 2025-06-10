
import React, { useState } from 'react';
import { Check, ArrowRight, Star, Zap, Shield, Crown } from 'lucide-react';

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      description: "Perfect for small businesses getting started online",
      price: {
        monthly: 2999,
        annual: 2699
      },
      features: [
        "up to 3-page custom website",
        "Mobile-responsive design",
        "Contact form integration",
        "1 round of revisions",
        "2-4 week delivery"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Professional",
      icon: Star,
      description: "Most popular choice for growing businesses",
      price: {
        monthly: 4999,
        annual: 4499
      },
      features: [
        "up to 8-page custom website",
        "Advanced mobile optimization",
        "Multiple contact forms",
        "Analytics & conversion tracking",
        "1 month support",
        "3 rounds of revisions",
        "Social media integration",
        "Performance optimization",
        "1-2week delivery"
      ],
      popular: false,
      cta: "Start Your Project"
    },
    {
      name: "Enterprise",
      icon: Crown,
      description: "For businesses that need the complete solution",
      price: {
        monthly: 8999,
        annual: 7999
      },
      features: [
        "Unlimited pages",
        "Custom functionality",
        "Advanced e-commerce features",
        "Multi-language support",
        "Advanced analytics dashboard",
        "12 months support",
        "Unlimited revisions",
        "Priority development",
        "Custom integrations",
        "Advanced SEO strategy",
        "Performance monitoring",
        "Dedicated project manager",
        "3-5 day delivery"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const addOns = [
    {
      name: "Logo Design",
      price: 15,
      description: "Professional logo design with multiple concepts"
    },
    {
      name: "Content Writing",
      price: 10,
      description: "Per page professional copywriting"
    },
    {
      name: "AI Chatbot",
      price: 200,
      description: "24/7 AI Chatbot that deals with FAQs"
    },
    {
      name: "Maintenance",
      price: 30,
      description: "Monthly website maintenance and updates"
    }
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-black/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-width relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5 text-orange-500" />
            <span className="text-orange-600 font-semibold">Transparent Pricing</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-black mb-6">
            Simple Pricing,
            <br />
            <span className="text-gradient">Powerful Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Choose the perfect package for your business. All plans include everything you need 
            to succeed online with no hidden fees or surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`font-semibold ${billingPeriod === 'monthly' ? 'text-orange-500' : 'text-gray-500'}`}>
              One-time Payment
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                billingPeriod === 'annual' ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
                billingPeriod === 'annual' ? 'translate-x-9' : 'translate-x-1'
              }`}></div>
            </button>
            <span className={`font-semibold ${billingPeriod === 'annual' ? 'text-orange-500' : 'text-gray-500'}`}>
              Package Deal
              <span className="ml-2 bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                Save 10%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-500 animate-slide-up ${
                plan.popular
                  ? 'bg-black text-white shadow-2xl shadow-black/20 scale-105'
                  : 'bg-white border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-orange-gradient text-white px-6 py-2 rounded-full font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  plan.popular ? 'bg-orange-gradient' : 'bg-orange-50'
                }`}>
                  <plan.icon className={`w-8 h-8 ${
                    plan.popular ? 'text-white' : 'text-orange-500'
                  }`} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.popular ? 'text-white' : 'text-black'
                }`}>
                  {plan.name}
                </h3>
                <p className={`${
                  plan.popular ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-end justify-center">
                  <span className={`text-5xl font-bold ${
                    plan.popular ? 'text-white' : 'text-black'
                  }`}>
                    ${plan.price[billingPeriod].toLocaleString()}
                  </span>
                </div>
                {billingPeriod === 'annual' && (
                  <div className="text-green-500 text-sm font-semibold mt-2">
                    Save ${(plan.price.monthly - plan.price.annual).toLocaleString()}
                  </div>
                )}
                <div className={`text-sm mt-2 ${
                  plan.popular ? 'text-white/60' : 'text-gray-500'
                }`}>
                  One-time payment
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      plan.popular ? 'bg-orange-500' : 'bg-green-500'
                    }`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className={`${
                      plan.popular ? 'text-white' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-4 rounded-xl font-semibold transition-all group ${
                plan.popular
                  ? 'bg-orange-gradient text-white hover:shadow-lg hover:shadow-orange-500/25'
                  : 'bg-black text-white hover:bg-gray-900'
              }`}>
                {plan.cta}
                <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-black mb-4">Popular Add-ons</h3>
            <p className="text-gray-600">Enhance your website with these professional services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={addon.name}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-black mb-2">{addon.name}</h4>
                <div className="text-2xl font-bold text-orange-500 mb-3">
                  ${addon.price}
                </div>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <button className="w-full bg-orange-50 text-orange-600 font-semibold py-3 rounded-lg hover:bg-orange-100 transition-colors">
                  Add to Project
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 bg-green-50 px-6 py-4 rounded-2xl">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
              <div className="font-bold text-green-800">30-Day Money Back Guarantee</div>
              <div className="text-green-600 text-sm">Not satisfied? Get a full refund, no questions asked.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
