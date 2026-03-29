import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, MessageSquare } from 'lucide-react';

const Comments: React.FC = () => {
  const { t, i18n } = useTranslation();

  const commentsData = [
    {
      id: 1,
      name: t('comments.list.1.name'),
      rating: 5,
      comment: t('comments.list.1.comment'),
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: t('comments.list.2.name'),
      rating: 5,
      comment: t('comments.list.2.comment'),
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: t('comments.list.3.name'),
      rating: 5,
      comment: t('comments.list.3.comment'),
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
  ];

  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev + 1) % commentsData.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + commentsData.length) % commentsData.length);

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = commentsData[index];
  const isRtl = i18n.language === 'ar';

  return (
    <section className="w-full py-16 lg:py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
      {/* Decorative circle blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 border border-amber-100 rounded-full mb-6">
            <MessageSquare size={13} className="text-amber-500" />
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-amber-600">
              {t('comments.badge')}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {t('comments.title')}
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            {t('comments.subtitle')}
          </p>
        </div>

        {/* Main carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Nav arrow — LEFT */}
          <button
            onClick={isRtl ? handleNext : handlePrev}
            className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? '-right-5 md:-right-14' : '-left-5 md:-left-14'} z-10 w-11 h-11 bg-white dark:bg-slate-900 rounded-full shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:text-blue-400 hover:border-blue-200 transition-all`}
          >
            <ChevronLeft size={20} className="rtl:rotate-180" />
          </button>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-700/80 shadow-sm relative flex flex-col items-center text-center"
            >
              {/* Big quote icon */}
              <Quote
                size={44}
                className="text-blue-100 mb-6 rotate-180 shrink-0"
              />

              {/* Star rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Comment text */}
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-10 max-w-2xl">
                "{current.comment}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover shadow-md ring-2 ring-white"
                />
                <div className="text-left rtl:text-right">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{current.name}</h4>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrow — RIGHT */}
          <button
            onClick={isRtl ? handlePrev : handleNext}
            className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? '-left-5 md:-left-14' : '-right-5 md:-right-14'} z-10 w-11 h-11 bg-white dark:bg-slate-900 rounded-full shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:text-blue-400 hover:border-blue-200 transition-all`}
          >
            <ChevronRight size={20} className="rtl:rotate-180" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2.5 mt-10">
          {commentsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comments;
