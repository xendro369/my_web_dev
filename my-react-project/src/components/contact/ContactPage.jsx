import React from 'react';
import CallUsInfo from './CallUsInfo';
import ContactForm from './ContactForm';

const ContactPage = () => {
  return (
    <div className='flex justify-between' >
      <CallUsInfo />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
