
import React from 'react';
import HeroSection from '../components/HeroSection';
import ProcessCarousel from '../components/ProcessCarousel';
import WhyUsSection from '../components/WhyUsSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyUsSection />
      <ProcessCarousel />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="work">
        <PortfolioSection />
      </div>
      <TestimonialsSection />
      <div id="contact">
        <ContactSection />
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
