
import React from 'react';
import ClientIntakeForm from '../components/ClientIntakeForm';

const GetStarted = () => {
  const handleSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
  };

  return <ClientIntakeForm onSubmit={handleSubmit} />;
};

export default GetStarted;
