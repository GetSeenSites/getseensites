
import React from 'react';
import HeroSection from '../components/HeroSection';
import ProcessCarousel from '../components/ProcessCarousel';
import WhyUsSection from '../components/WhyUsSection';
import ConsultingServicesSection from '../components/ConsultingServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

// Comment out original pricing-based components for potential rollback
// import ServicesSection from '../components/ServicesSection';
// import PricingSection from '../components/PricingSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />


      <WhyUsSection />
      <ProcessCarousel />
      <TestimonialsSection />
      <div id="contact">
        <ContactSection />
      </div>
      <FAQ />
      <Footer />
      
      {/* Commented out for potential rollback to pricing model */}
      {/* <ServicesSection /> */}
    </div>
  );
};

export default Index;
