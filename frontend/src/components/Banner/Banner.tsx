import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface BannerProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  onCtaClick?: () => void;
  gradient?: string;
}

const Banner: React.FC<BannerProps> = ({ 
  title, 
  subtitle, 
  ctaText, 
  onCtaClick, 
  gradient = "from-[#0046be] via-[#01b0d3] to-[#43dabb]" 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative w-full rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-blue-500/10 mb-12 bg-gradient-to-r ${gradient}`}
    >
      {/* Decorative background elements */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-10 -mb-10 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-slate-900/20 backdrop-blur-md rounded-full text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles size={12} className="animate-spin-slow" />
            Limited Time Offer
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-slate-900 dark:text-white/80 text-lg font-medium max-w-xl">
            {subtitle}
          </p>
        </div>

        {ctaText && (
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCtaClick}
            className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
          >
            {ctaText}
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Banner;
