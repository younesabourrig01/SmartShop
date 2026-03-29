import React from 'react';
import AdSlider from '../../components/Banner/AdSlider';
import Slider from './Slider';
import Us from './Us';
import Comments from './Comments';
import ContactUs from '../../components/ContactForm/ContactForm';
import FeaturedProducts from './FeaturedProducts';

const Home: React.FC = () => {
  return (
    <main className="w-full overflow-x-hidden bg-white dark:bg-slate-900">
      {/* Dynamic Ad Slider */}
      <AdSlider />

      {/* Hero */}
      <Us />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Category Slider */}
      <Slider />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Testimonials */}
      <Comments />

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Contact */}
      <section className="w-full py-16 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ContactUs />
        </div>
      </section>
    </main>
  );
};

export default Home;
