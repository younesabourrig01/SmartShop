import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LogoAnimation from '../../components/LogoAnimation/LogoAnimation';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-50 overflow-hidden flex flex-col md:flex-row items-center">
        
        {/* Left Side: Animation */}
        <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-800/50">
          <LogoAnimation height="h-[250px] md:h-[450px]" logoWidth="w-32 md:w-48" />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              {t('notFound.oops', 'Oops!')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0046be] to-[#01b0d3]">
                {t('notFound.title', 'Not Found.')}
              </span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed"
          >
            {t('notFound.message', "The page you're looking for doesn't exist or has been moved. Let's get you back on track.")}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <Link to="/" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-[#0046be] text-white font-black text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3 group transition-all"
              >
                <Home size={22} />
                <span>{t('notFound.returnHome', 'Return Home')}</span>
              </motion.button>
            </Link>

            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-lg group cursor-pointer"
            >
              <ArrowLeft size={22} className="text-[#01b0d3] group-hover:-translate-x-1 transition-transform" />
              <span>{t('notFound.goBack', 'Go Back')}</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
