import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: "Shop all", icon: <Star size={40} className="text-slate-800" />, isIcon: true },
  { name: "Apple", image: "https://images.unsplash.com/photo-1588423770574-91993ca06f10?q=80&w=200&auto=format&fit=crop" },
  { name: "TV & Home Theater", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=200&auto=format&fit=crop" },
  { name: "Computers & Tablets", image: "https://images.unsplash.com/photo-1517336712604-83984023a0a6?q=80&w=200&auto=format&fit=crop" },
  { name: "All Video Games", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=200&auto=format&fit=crop" },
  { name: "Appliances", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop" },
  { name: "Cell Phones", image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=200&auto=format&fit=crop" },
  { name: "Home Audio & Speakers", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=200&auto=format&fit=crop" },
];

const Slider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8">
      {/* Container Card */}
      <div className="w-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col border border-slate-50">
        {/* Hero Banner Area */}
        <div className="relative w-full h-[280px] bg-gradient-to-r from-[#0046be] via-[#007cc2] to-[#01b0d3] p-10 md:px-16 flex items-center justify-between">
          <div className="max-w-4xl z-10 text-pretty">
            <h1 className="text-white text-5xl md:text-6xl lg:text-8xl font-black mb-5 tracking-tighter leading-[0.95]">
              Got your check? Get your tech.
            </h1>
            <p className="text-white text-xl md:text-3xl font-bold opacity-95">
              Make the most of your tax refund with Top Deals.
            </p>
          </div>
          <div className="hidden lg:block z-10">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-[#0046be] font-bold text-xl rounded-2xl hover:shadow-2xl transition-all"
            >
              Shop now
            </motion.button>
          </div>
        </div>

        {/* Categories Slider Area */}
        <div className="w-full p-12 md:px-16">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-12 flex items-center gap-4">
            Shop deals by category
          </h2>
          
          <div className="relative group/slider">
            {/* Navigation Arrows */}
            <button 
              onClick={() => scroll('left')}
              className="absolute -left-12 top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border border-slate-100 shadow-2xl flex items-center justify-center text-slate-800 hover:text-blue-600 hover:border-blue-200 transition-all duration-500 z-20 cursor-pointer active:scale-90 opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronLeft size={32} />
            </button>

            <div 
              ref={scrollRef}
              className="flex items-start gap-16 overflow-x-auto pb-10 scroll-smooth select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {categories.map((category, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center gap-8 min-w-[150px] max-w-[200px] cursor-pointer"
                >
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center p-10 border border-slate-50 shadow-sm transition-all duration-700 hover:shadow-2xl hover:border-blue-100/50 overflow-hidden relative group bg-slate-50/50 backdrop-blur-sm">
                     {category.isIcon ? (
                       <div className="group-hover:scale-110 transition-transform duration-700">{category.icon}</div>
                     ) : (
                       <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
                      />
                     )}
                  </div>
                  <span className="text-center text-lg md:text-xl font-black text-slate-900 tracking-tight leading-tight">
                    {category.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute -right-12 top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border border-slate-100 shadow-2xl flex items-center justify-center text-slate-800 hover:text-blue-600 hover:border-blue-200 transition-all duration-500 z-20 cursor-pointer active:scale-90 opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
        
        {/* Mobile Shop Now button */}
        <div className="lg:hidden w-full px-12 pb-12">
            <button className="w-full py-6 bg-[#0046be] text-white font-black text-xl rounded-3xl shadow-2xl">
              Shop now
            </button>
        </div>
      </div>
    </section>
  );
};

export default Slider;
