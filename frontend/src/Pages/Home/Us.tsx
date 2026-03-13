import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { ShoppingBag, ArrowRight, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/smartShopLogo.png';

// The "First" Logo Animation Scene
const LogoScene = () => {
  return (
    <div className="w-full h-[400px] md:h-[550px] relative pointer-events-auto overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Suspense fallback={null}>
          {/* Principal Sphere */}
          <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
            <Sphere args={[1, 64, 64]} scale={1.5}>
                <MeshDistortMaterial
                    color="#0046be"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.1}
                    metalness={0.2}
                />
            </Sphere>
          </Float>

          {/* Small Secondary Elements */}
          <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} position={[-2, 1.2, -1]}>
            <Sphere args={[0.25, 32, 32]}>
              <MeshDistortMaterial color="#01b0d3" distort={0.3} speed={3} />
            </Sphere>
          </Float>

          <Float speed={3.5} rotationIntensity={0.8} floatIntensity={1.5} position={[2, -1, 0.5]}>
            <Sphere args={[0.18, 16, 16]}>
              <meshStandardMaterial color="#0046be" roughness={0} metalness={0.8} />
            </Sphere>
          </Float>

          <Float speed={2} rotationIntensity={2} floatIntensity={3} position={[-1.5, -1.8, -0.5]}>
            <Sphere args={[0.12, 16, 16]}>
              <meshStandardMaterial color="#01b0d3" roughness={0.2} metalness={0.5} />
            </Sphere>
          </Float>

          <Float speed={4.5} rotationIntensity={0.4} floatIntensity={0.8} position={[2.5, 1.5, -2]}>
             <Sphere args={[0.08, 16, 16]}>
              <meshBasicMaterial color="white" transparent opacity={0.6} />
            </Sphere>
          </Float>
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
      
      {/* Overlaying the actual logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.img 
            src={logo} 
            alt="SmartShop Logo" 
            className="w-40 md:w-56 drop-shadow-[0_25px_60px_rgba(0,70,190,0.4)]"
            animate={{ 
                y: [0, -15, 0],
                rotateY: [0, 10, -10, 0],
                scale: [1, 1.04, 1]
            }}
            transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
        />
      </div>
    </div>
  );
};

const Us: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative w-full">
      {/* Main Container Card - Balanced Rounded Corners & Shadow */}
      <div className="w-full bg-white rounded-[2.5rem] shadow-xl border border-slate-50 p-8 md:p-16 overflow-hidden flex flex-col items-center">
        
        {/* Hero Top Content: Dual Layout */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 mb-16 z-10 text-start rtl:text-right">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2 space-y-8"
          >
            {/* Minimalist Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 transition-all hover:bg-white hover:shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#01b0d3] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t('us.welcome')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter">
              {t('us.title_1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0046be] via-[#01b0d3] to-[#43dabb]">
                {t('us.title_2')}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
              {t('us.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
              {/* Primary CTA */}
              <Link to="/products">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-[#0046be] text-white font-black text-xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] flex items-center justify-center gap-3 group"
                >
                  <ShoppingBag size={24} />
                  <span>{t('us.shop_products')}</span>
                </motion.button>
              </Link>

              {/* Secondary CTA */}
              <motion.button 
                whileHover={{ x: 6 }}
                className="flex items-center gap-2 text-slate-900 font-black text-xl group cursor-pointer"
              >
                <span>{t('us.our_story')}</span>
                <ArrowRight size={24} className={`text-[#01b0d3] group-hover:translate-x-1 transition-transform rtl:rotate-180`} />
              </motion.button>
            </div>
          </motion.div>

          {/* Right: The RE-RESTORED Logo Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full md:w-1/2 relative flex items-center justify-center"
          >
            <LogoScene />
          </motion.div>
        </div>

        {/* BOTTOM: Minimalist Search Bar Integration */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-4xl relative"
        >
          <div className="relative bg-slate-50 p-2.5 rounded-[2.5rem] shadow-inner flex flex-col md:flex-row items-center gap-4 border border-slate-100/50">
            <div className="flex-1 w-full relative flex items-center">
               <div className={`absolute ${i18n.language === 'ar' ? 'right-7' : 'left-7'} text-slate-400`}>
                  <Search size={24} />
               </div>
               <input 
                 type="text" 
                 placeholder={t('us.search_placeholder')}
                 className={`w-full py-5 ${i18n.language === 'ar' ? 'pr-16 pl-8' : 'pl-16 pr-8'} bg-transparent rounded-[1.8rem] text-lg font-bold text-slate-800 placeholder-slate-400 outline-none`}
               />
            </div>
            <button className="w-full md:w-auto px-10 py-5 bg-[#0046be] text-white font-black text-lg rounded-[2rem] shadow-lg hover:shadow-2xl transition-all cursor-pointer">
              {t('us.search_button')}
            </button>
          </div>

          {/* Trending Bar */}
          <div className="flex justify-center gap-6 mt-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('us.trending')}:</span>
            {["Razer", "iPhone 15", "Gaming PC"].map(tag => (
              <button key={tag} className="text-[10px] font-black uppercase tracking-widest text-[#0046be] opacity-70 hover:opacity-100 transition-opacity cursor-pointer">#{tag}</button>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Us;
