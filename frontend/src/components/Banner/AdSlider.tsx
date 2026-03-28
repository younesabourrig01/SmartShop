import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAds } from '../../api/ads';
import { API_BASE_URL } from '../../api/client';

const AdSlider: React.FC = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAds();
        if (res.data.status === 'success') {
          const sliders = res.data.data.sliders;
          setAds(sliders);
        }
      } catch (err) {
        console.error('Failed to load slider ads:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [ads]);

  if (isLoading) {
    return (
      <div className="w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!isLoading && ads.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % ads.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);

  return (
    <div className="relative w-full z-0 h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] mb-[-50px] md:mb-[-80px] lg:mb-[-120px] overflow-hidden">
      {/* Sticky Parallax Wrapper */}
      <div className="sticky top-[80px] left-0 w-full h-full overflow-hidden group z-0">
        {/* Slider Container */}
        <div 
          className="w-full flex transition-transform duration-700 ease-out h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {ads.map((ad) => (
          <div key={ad.id} className="min-w-full relative h-full bg-transparent">
            <img 
              src={ad.image?.startsWith('http') ? ad.image : `${API_BASE_URL}/storage/${ad.image}`} 
              alt={ad.title} 
              className="w-full h-full object-cover object-top"
            />
            {/* Top-aligned Text Content */}
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-start p-8 md:p-16 lg:p-24 z-10">
              <div className="max-w-3xl text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-center md:text-left mx-auto md:mx-0 mt-8 md:mt-0">
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-[4.5rem] font-black mb-4 tracking-tight drop-shadow-2xl leading-tight">{ad.title}</h2>
                <p className="text-base md:text-xl lg:text-2xl font-semibold opacity-95 drop-shadow-lg">{ad.description}</p>
              </div>
            </div>
            
            {/* Structural Dissipation Fade Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[90px] lg:h-[130px] bg-gradient-to-t from-white to-transparent dark:from-slate-900 pointer-events-none z-10" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {ads.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute top-1/3 md:top-1/4 left-2 md:left-6 w-10 h-10 md:w-16 md:h-16 bg-white/20 hover:bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:text-slate-900 shadow-xl opacity-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 z-20 border border-white/30"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/3 md:top-1/4 right-2 md:right-6 w-10 h-10 md:w-16 md:h-16 bg-white/20 hover:bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:text-slate-900 shadow-xl opacity-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 z-20 border border-white/30"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {ads.length > 1 && (
        <div className="absolute bottom-[20%] md:bottom-[25%] left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {ads.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-8 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/40 hover:bg-white/80 w-2'}`}
            />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default AdSlider;
