import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ContactForm from '../../components/ContactForm/ContactForm';
import { BookOpen, MapPin, Building2, Users2, Award } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 pt-8">
      {/* Our Story Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm gap-2">
              <BookOpen className="w-4 h-4" />
              {t('contact.our_story_title')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {t('contact.who_are_we')}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('contact.our_story_desc')}
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                <Users2 className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-slate-900">12,000+</h3>
                <p className="text-sm text-slate-500">{t('testimonials.joined', 'Happy Customers')}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                <Award className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-slate-900">Premium</h3>
                <p className="text-sm text-slate-500">{t('features.quality', 'Quality Products')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                alt="Our Office" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-8 bg-white rounded-3xl shadow-xl hidden md:block max-w-xs border border-slate-100">
              <Building2 className="w-10 h-10 text-blue-600 mb-4" />
              <p className="text-sm text-slate-600 italic">
                "{t('contact.description')}"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Organization Info / Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">{t('contact.find_us')}</h2>
            <p className="text-slate-600 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              {t('contact.visit_us')}
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[450px] relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110051.2721867113!2d-9.66444!3d30.42775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6e94119747d%3A0x867373f1f31f9d44!2sAgadir%2080000%2C%20Morocco!5e0!3m2!1sen!2sus!4v1710426342123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Contact;
