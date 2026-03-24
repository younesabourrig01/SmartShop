import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactUs: React.FC = () => {
  const { t } = useTranslation();
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(t('contact.sending'));
    const formData = new FormData(event.target);
    formData.append("access_key", "575e3bd3-3353-4ef0-b698-e90a605d9304");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult(t('contact.success'));
        event.target.reset();
      } else {
        setResult(data.message || "Error");
      }
    } catch (error) {
      setResult("Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="">
      {/* Section header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
          <Mail size={13} className="text-blue-500" />
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-blue-600">
            {t('nav.contact')}
          </span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          {t('contact.who_are_we')}
        </h2>
        <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          {t('contact.description')}
        </p>
      </div>

      <div className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col lg:flex-row min-h-[580px]">
        
        {/* LEFT PART: Info & Branding */}
        <div className="w-full lg:w-1/2 bg-[#0046be] p-8 md:p-12 lg:p-16 text-white flex flex-col justify-center relative overflow-hidden text-start rtl:text-right">
          {/* Decorative background elements */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#01b0d3]/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
          
          <div className="relative z-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3">
                {t('contact.get_in_touch')}
              </h3>
              <p className="text-base text-slate-900 dark:text-white/75 font-medium leading-relaxed max-w-sm">
                {t('contact.form_description')}
              </p>
            </motion.div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900/10 flex items-center justify-center border border-white dark:border-slate-800/20 group-hover:bg-white dark:bg-slate-900/20 transition-colors">
                  <MapPin size={24} className="text-[#43dabb]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-900/60 dark:text-white/60 font-bold">{t('contact.location')}</p>
                  <p className="font-bold text-white">123 Tech Avenue, Silicon Valley, CA</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900/10 flex items-center justify-center border border-white dark:border-slate-800/20 group-hover:bg-white dark:bg-slate-900/20 transition-colors">
                  <Phone size={24} className="text-[#43dabb]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-900/60 dark:text-white/60 font-bold">{t('contact.call_us')}</p>
                  <p className="font-bold text-white">+1 (555) 000-SMART</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900/10 flex items-center justify-center border border-white dark:border-slate-800/20 group-hover:bg-white dark:bg-slate-900/20 transition-colors">
                  <Mail size={24} className="text-[#43dabb]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-900/60 dark:text-white/60 font-bold">{t('contact.email')}</p>
                  <p className="font-bold text-white">hello@smartshop.tech</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
               {[Globe, Send].map((Icon, i) => (
                 <div key={i} className="w-10 h-10 rounded-full border border-white dark:border-slate-800/20 flex items-center justify-center hover:bg-white dark:bg-slate-900 hover:text-[#0046be] transition-all cursor-pointer">
                    <Icon size={18} />
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* RIGHT PART: Contact Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-slate-900 text-start rtl:text-right">
          <div className="max-w-md w-full mx-auto">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{t('contact.get_in_touch')}</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">{t('contact.form_description')}</p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{t('contact.full_name')}</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="John Doe"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0046be]/20 focus:border-[#0046be] transition-all font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{t('contact.email_address')}</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="john@example.com"
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0046be]/20 focus:border-[#0046be] transition-all font-bold text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">{t('contact.message')}</label>
                <textarea 
                  name="message" 
                  required 
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0046be]/20 focus:border-[#0046be] transition-all font-bold text-slate-800 dark:text-slate-100 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-5 bg-[#0046be] text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 cursor-pointer ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white dark:border-slate-800/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{t('contact.send_message')}</span>
                    <Send size={20} className="rtl:rotate-180" />
                  </>
                )}
              </button>

              {result && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-4 p-4 rounded-xl text-center font-bold text-sm ${
                    result.includes("Successfully") 
                    ? "bg-green-50 text-green-600 border border-green-100" 
                    : "bg-blue-50 text-[#0046be] border border-blue-100"
                  }`}
                >
                  {result}
                </motion.div>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;
