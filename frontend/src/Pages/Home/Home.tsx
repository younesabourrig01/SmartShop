import React from 'react';
import Slider from './Slider';
import Us from './Us';
import Commantes from './Commantes';
import ContactUs from '../../components/ContactForm/ContactForm';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#f0f2f5] pt-12 md:pt-16 pb-24">
      <div className="max-w-[1440px] px-4 md:px-8 lg:px-16 mx-auto space-y-12">
        <Us />
        <Slider />
        <Commantes />
        <ContactUs />
      </div>
    </main>
  );
};

export default Home;
