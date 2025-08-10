import React from 'react';
import ConsultingServicesSection from '../components/ConsultingServicesSection';
import ContactSection from '../components/ContactSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const ServicesPage = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <ConsultingServicesSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};

export default ServicesPage;
