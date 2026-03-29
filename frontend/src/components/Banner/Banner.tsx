import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getAds } from '../../api/ads';
import { API_BASE_URL } from '../../api/client';

interface BannerProps {
  gradient?: string;
}

const Banner: React.FC<BannerProps> = ({ 
  gradient = "from-slate-900 via-blue-900 to-blue-800" 
}) => {
  const { t } = useTranslation();
  const [ads, setAds] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAds = useCallback(async () => {
    try {
      const res = await getAds();
      if (res.data.status === 'success') {
        const banners = res.data.data.banners || [];
        setAds(banners);
      }
    } catch (error) {
      console.error("Failed to load banner ads:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const nextSlide = useCallback(() => {
    if (ads.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }
  }, [ads.length]);

  useEffect(() => {
    if (isPlaying && ads.length > 1) {
      timerRef.current = setInterval(nextSlide, 5000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide, ads.length]);

  if (isLoading) {
    return (
      <div className="relative w-full rounded-[2.5rem] p-8 md:p-12 mb-12 bg-slate-200 dark:bg-slate-800 animate-pulse h-[200px] md:h-[250px] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (ads.length === 0) return null;

  const currentAd = ads[currentIndex];

  return (
    <div 
      className="relative group mb-12"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentAd.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`relative w-full rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/10 bg-gradient-to-br ${gradient}`}
        >
          {/* Noise/Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          {/* Background Image if available */}
          {currentAd.image && (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img 
                src={currentAd.image.startsWith('http') ? currentAd.image : `${API_BASE_URL}/storage/${currentAd.image}`} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Decorative background elements */}
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-10 -mb-10 blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
                <Sparkles size={12} className="animate-spin-slow" />
                {t('nav.limited_offer')}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                {currentAd.title}
              </h2>
              <p className="text-white dark:text-white/80 text-lg font-medium max-w-xl">
                {currentAd.description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Banner;
