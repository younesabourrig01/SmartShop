import React, { useRef, useContext } from "react";
import { ChevronRight, ChevronLeft, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CategoryContext } from "../../context/CategoryContext";
import { Link } from "react-router-dom";

const BASE_IMAGE = import.meta.env.VITE_BASE_IMAGE;

const Slider: React.FC = () => {
  const { categories, loading } = useContext(CategoryContext);
  const { t, i18n } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const amount = clientWidth * 0.75;
      const isRtl = i18n.language === "ar";

      const scrollTo =
        direction === "left"
          ? scrollLeft - (isRtl ? -amount : amount)
          : scrollLeft + (isRtl ? -amount : amount);

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading || !categories?.length) return null;

  return (
    <section className="w-full py-24 lg:py-32 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Faint radial gradient background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.06),_transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-start rtl:text-right">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full mb-5">
              <Tag size={13} className="text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-slate-500 dark:text-slate-400">
                {t("nav.categories")}
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
              {t("slider.category_title")}
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {t("slider.description")}
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:bg-blue-900/30 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:text-blue-400 hover:border-blue-200 transition-all cursor-pointer active:scale-95 group"
            >
              <ChevronLeft
                size={20}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:bg-blue-900/30 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 dark:text-blue-400 hover:border-blue-200 transition-all cursor-pointer active:scale-95 group"
            >
              <ChevronRight
                size={20}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Carousel — extend to edge with negative margin trick */}
        <div className="relative -mx-6 px-6 lg:-mx-8 lg:px-8">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="snap-start shrink-0 cursor-pointer group"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="w-[260px] sm:w-[300px] lg:w-[320px] aspect-[4/5] rounded-[2.5rem] bg-slate-100 dark:bg-slate-800/50 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900 dark:shadow-none/[0.12] hover:-translate-y-2 ring-1 ring-black/5"
                >
                  {category.url && (
                    <img
                      src={
                        category.url.startsWith("http")
                          ? category.url
                          : `${BASE_IMAGE}${category.url}`
                      }
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.08] transition-all duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x500?text=${category.name}`;
                      }}
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent pointer-events-none" />

                  {/* Card footer */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
                    <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
                      {category.name}
                    </h3>
                    <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-900/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400 shrink-0">
                      <ChevronRight size={18} className="rtl:rotate-180" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
