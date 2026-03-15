import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const commentsData = [
  {
    id: 1,
    name: "John Doe",
    role: "UX/UI Designer",
    comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Elena Ross",
    role: "Product Designer",
    comment: "Great experience with SmartShop! The technical support and product quality are top-tier. I highly recommend them for any tech needs. Innovation at its best.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "James Miller",
    role: "Marketing Specialist",
    comment: "The 3D experience and the seamless interface make shopping an absolute joy. Innovative features and user-friendly design. Keep up the amazing work!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Tech Lead",
    comment: "As a developer, I appreciate the attention to detail in the performance and the 3D rendering. SmartShop is truly pushing the boundaries of web commerce.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Michael Chen",
    role: "Software Architect",
    comment: "The integration of 3D elements without sacrificing load speed is impressive. A masterclass in modern frontend architecture and user engagement.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
  }
];

// E-commerce Statistics Component for the Left Side
const StatsDisplay = () => {
  const { t } = useTranslation();
  const stats = [
    { label: t('commantes.stats.customers'), value: "50k+", icon: "😊", color: "from-[#0046be] to-[#01b0d3]" },
    { label: t('commantes.stats.products'), value: "10k+", icon: "📦", color: "from-[#43dabb] to-[#218a74]" },
    { label: t('commantes.stats.support'), value: "24/7", icon: "🛠️", color: "from-[#1a5e7b] to-[#164e63]" },
    { label: t('commantes.stats.delivery'), value: t('slider.hero_title').includes(' حصلت') ? 'عالمي' : 'Global', icon: "🚀", color: "from-[#0046be] to-[#43dabb]" },
    { label: t('commantes.stats.quality'), value: t('commantes.stats.quality'), icon: "🏆", color: "from-[#01b0d3] to-[#43dabb]" },
    { label: t('commantes.stats.satisfaction'), value: "99.9%", icon: "⭐", color: "from-[#218a74] to-[#1a5e7b]" }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center gap-4 p-2">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className={`p-5 rounded-[2rem] bg-gradient-to-br ${stat.color} text-white shadow-lg flex flex-col items-center text-center gap-1 border border-white/10`}
          >
            <span className="text-2xl mb-1">{stat.icon}</span>
            <span className="text-xl md:text-2xl font-black tracking-tight">{stat.value}</span>
            <span className="text-[10px] md:text-xs font-bold opacity-80 uppercase tracking-widest">{stat.label}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Trust Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-2 p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center gap-4 group"
      >
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
              <img src={`https://i.pravatar.cc/100?img=${i + 14}`} alt="user" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-8 h-8 rounded-full bg-[#0046be] border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">
            +12k
          </div>
        </div>
        <p className="text-xs font-bold text-slate-600">
          {t('commantes.joined')}
        </p>
      </motion.div>
    </div>
  );
};

const Commantes: React.FC = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % commentsData.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + commentsData.length) % commentsData.length);
  };

  return (
    <section className="">
      {/* Outer Card Wrapper - Now Split Layout */}
      <div className="w-full bg-white rounded-[2.5rem] shadow-xl border border-slate-50 p-6 md:p-10 lg:p-12 overflow-hidden flex flex-col lg:flex-row gap-12 min-h-[700px] relative">
        
        {/* LEFT PART: Statistics & Header */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6 relative text-start rtl:text-right">
          <div className="z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-2">
              {t('commantes.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0046be] to-[#01b0d3]">
                {t('commantes.subtitle')}
              </span>
            </h2>
          </div>

          {/* Stats Container */}
          <div className="flex-1 w-full bg-slate-50/30 rounded-[2rem] overflow-hidden border border-slate-100/50 backdrop-blur-sm">
             <StatsDisplay />
          </div>

          {/* Separate Read More Link */}
          <div className="mt-4 flex justify-start">
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center gap-3 text-[#0046be] font-black text-xl hover:opacity-80 transition-all group cursor-pointer"
            >
              <span>{t('commantes.read_more')}</span>
              <ArrowRight size={24} className={`group-hover:translate-x-1 transition-transform duration-300 rtl:rotate-180`} />
            </motion.button>
          </div>
        </div>

        {/* RIGHT PART: The Testimonial Slider */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center items-center relative min-h-[500px]">
          
          {/* Slider Layout */}
          <div className="relative w-full h-full flex flex-col items-center">
            
            {/* Main Slider Content */}
            <div className="flex-1 relative w-full flex justify-center items-center h-[450px]">
              {/* Navigation Arrows for Mobile/Tablet context */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-4 z-40 lg:hidden pointer-events-none">
                <button 
                  onClick={handlePrev}
                  className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-100 text-slate-800 pointer-events-auto active:scale-95 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-100 text-slate-800 pointer-events-auto active:scale-95 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                {commentsData.map((data, i) => {
                  let position = i - index;
                  // Infinite loop logic
                  if (position < -Math.floor(commentsData.length / 2)) position += commentsData.length;
                  if (position > Math.floor(commentsData.length / 2)) position -= commentsData.length;
 
                  const isVisible = Math.abs(position) <= 1;
                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={data.id}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(_, info) => {
                        if (info.offset.x > 100) handlePrev();
                        else if (info.offset.x < -100) handleNext();
                      }}
                      initial={{ opacity: 0, scale: 0.6, x: position * 200 }}
                      animate={{ 
                        opacity: position === 0 ? 1 : 0.3,
                        scale: position === 0 ? 1 : 0.8,
                        x: position * 110, 
                        y: Math.abs(position) * 40,
                        rotate: position * 3,
                        zIndex: position === 0 ? 30 : 20 - Math.abs(position),
                        filter: position === 0 ? "blur(0px)" : "blur(4px)",
                      }}
                      exit={{ opacity: 0, scale: 0.5, x: position * -200 }}
                      transition={{ type: "spring", stiffness: 220, damping: 25 }}
                      className="absolute w-[280px] sm:w-[350px] md:w-[420px] cursor-grab active:cursor-grabbing"
                    >
                      <div className="w-full bg-[#1a5e7b] rounded-[2.5rem] p-10 md:p-12 flex flex-col items-center gap-6 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] border border-white/10 text-white select-none">
                        <div className="relative pointer-events-none">
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[6px] border-[#43dabb] overflow-hidden shadow-2xl">
                            <img 
                              src={data.avatar} 
                              alt={data.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 rounded-full border-t border-white/40 pointer-events-none"></div>
                        </div>

                        <div className="text-center mt-2 pointer-events-none">
                          <h3 className="text-xl md:text-2xl font-black tracking-tight mb-1">
                            {data.name}
                          </h3>
                          <p className="text-[#43dabb] font-bold text-xs md:text-sm uppercase tracking-[0.2em] opacity-90">
                            {data.role}
                          </p>
                        </div>

                        <div className="mt-4 px-2 pointer-events-none">
                           <p className="text-center italic text-sm md:text-lg leading-relaxed opacity-85 font-medium line-clamp-4">
                            "{data.comment}"
                           </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* DOTS NAVIGATION - Enhanced for mobile as per reference */}
            <div className="mt-8 flex justify-center items-center">
              <div className="flex bg-white p-4 rounded-full gap-3 px-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-slate-100">
                {commentsData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className="relative flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95"
                  >
                    <motion.div
                      animate={{
                        width: index === i ? 28 : 10,
                        backgroundColor: index === i ? "#0046be" : "#e2e8f0",
                      }}
                      className="h-2.5 rounded-full"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Commantes;
