import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getAds } from '../../api/ads';

interface BannerProps {
  gradient?: string;
}

const Banner: React.FC<BannerProps> = ({ 
  gradient = "from-blue-700 via-blue-600 to-blue-500" 
}) => {
  const { t } = useTranslation();
  const [ad, setAd] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await getAds();
        if (res.data.status === 'success') {
          const banners = res.data.data.banners;
          if (banners.length > 0) {
            // Pick a random banner
            const randomBanner = banners[Math.floor(Math.random() * banners.length)];
            setAd(randomBanner);
          }
        }
      } catch (error) {
        console.error("Failed to load banner ad:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAd();
  }, []);

  if (isLoading) {
    return (
      <div className="relative w-full rounded-[2.5rem] p-8 md:p-12 mb-12 bg-slate-200 dark:bg-slate-800 animate-pulse h-[200px] md:h-[250px] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!ad) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative w-full rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-blue-500/10 dark:shadow-none mb-12 bg-gradient-to-r ${gradient}`}
    >
      {/* Decorative background elements */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-10 -mb-10 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles size={12} className="animate-spin-slow" />
            {t('nav.limited_offer')}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            {ad.title}
          </h2>
          <p className="text-white dark:text-white/80 text-lg font-medium max-w-xl">
            {ad.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
