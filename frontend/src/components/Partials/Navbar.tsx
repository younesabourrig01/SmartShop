import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LogIn, UserPlus, Menu, Moon, Sun, ShoppingCart, Languages, ChevronDown, Heart, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import logo from '../../assets/smartShopLogo.png';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisualDarkMode, setIsVisualDarkMode] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const linksDropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'ar', name: 'العربية', flag: 'https://flagcdn.com/w40/ma.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
  ];

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
    document.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  // Sync direction on mount
  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (linksDropdownRef.current && !linksDropdownRef.current.contains(event.target as Node)) {
        setIsLinksOpen(false);
      }
    };

    if (isLangOpen || isLinksOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangOpen]);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 bg-white/40 backdrop-blur-xl border-b border-blue-100/50 shadow-sm transition-all duration-300">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img 
            src={logo} 
            alt="SmartShop Logo" 
            className="h-10 md:h-15 cursor-pointer transition-all duration-300 hover:scale-105 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" 
          />
        </Link>
      </div>

      {/* Middle: Search & Links */}
      <div className="flex-1 flex items-center justify-center gap-2 md:gap-8 px-2">
        <div className="relative flex items-center w-full max-w-[150px] sm:max-w-xs md:max-w-lg group">
          <Search size={18} className={`absolute ${i18n.language === 'ar' ? 'right-3' : 'left-3'} text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300 pointer-events-none`} />
          <input
            type="text"
            className={`w-full ${i18n.language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-slate-100 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-full text-[10px] sm:text-xs md:text-sm text-slate-900 placeholder-slate-500 outline-none transition-all duration-300`}
            placeholder={t('hero.search', { defaultValue: 'Search...' })}
          />
        </div>
        
        {/* Medium Screens Dropdown */}
        <div className="hidden md:flex lg:hidden relative" ref={linksDropdownRef}>
          <button 
            onClick={() => setIsLinksOpen(!isLinksOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium text-sm"
          >
            <span>{t('nav.links', 'Explore')}</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isLinksOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isLinksOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute top-full mt-2 ${i18n.language === 'ar' ? 'right-0' : 'left-0'} bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 w-48 z-[60]`}
              >
                <Link to="/" className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all" onClick={() => setIsLinksOpen(false)}>
                  {t('nav.home')}
                </Link>
                <Link to="/products" className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all" onClick={() => setIsLinksOpen(false)}>
                  {t('nav.products')}
                </Link>
                <Link to="/categories" className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all" onClick={() => setIsLinksOpen(false)}>
                  {t('nav.categories')}
                </Link>
                <Link to="/contact" className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all" onClick={() => setIsLinksOpen(false)}>
                  {t('nav.contact')}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Large Screens Links */}
        <ul className="hidden lg:flex gap-6 shrink-0">
          <li>
            <Link to="/" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative text-sm">
              {t('nav.home')}
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative text-sm">
              {t('nav.products')}
            </Link>
          </li>
          <li>
            <Link to="/categories" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative text-sm">
              {t('nav.categories')}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative text-sm">
              {t('nav.contact')}
            </Link>
          </li>
        </ul>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Language Dropdown */}
        <div className="relative" ref={langDropdownRef}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50/80 transition-all active:scale-95 group"
          >
            <Languages size={20} className="group-hover:rotate-12 transition-transform" />
            <img src={currentLanguage.flag} alt={currentLanguage.name} className="hidden lg:inline w-5 h-auto rounded-sm shadow-sm" />
            <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className={`absolute top-full mt-2 ${i18n.language === 'ar' ? 'left-0' : 'right-0'} bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 w-48 overflow-hidden z-[60] animate-in fade-in zoom-in duration-200`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    i18n.language === lang.code 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <img src={lang.flag} alt={lang.name} className="w-5 h-auto rounded-sm" />
                  <span className="flex-1 text-left rtl:text-right">{lang.name}</span>
                  {i18n.language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Visual-only Theme Toggle Button */}
        <button 
          onClick={() => setIsVisualDarkMode(!isVisualDarkMode)}
          className="hidden md:relative p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50/80 overflow-hidden group transition-all duration-500 ease-in-out hover:shadow-[0_0_12px_rgba(59,130,246,0.2)] active:scale-95"
          aria-label="Toggle theme visual"
          title="Toggle theme"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Sun 
              size={20} 
              className={`absolute transition-all duration-500 transform ${isVisualDarkMode ? 'rotate-[360deg] opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} 
            />
            <Moon 
              size={20} 
              className={`absolute transition-all duration-500 transform ${isVisualDarkMode ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`} 
            />
          </div>
        </button>

        <Link to="/wishlist" className="hidden md:flex p-2 text-slate-500 hover:text-pink-500 hover:bg-pink-50/80 rounded-full transition-all duration-300 relative group">
          <Heart size={22} className="group-hover:fill-pink-500 transition-all" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">{wishlistCount}</span>
        </Link>

        <Link to="/cart" className="hidden md:flex p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50/80 rounded-full transition-all duration-300 relative group">
          <ShoppingCart size={22} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
        </Link>

        {/* regester/login buttons or profile icone */}
        {!user?(

        <div className="hidden sm:flex items-center gap-2">
          <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 border border-slate-200 text-slate-700 hover:bg-slate-50 hover:-translate-y-0.5">
            <LogIn size={16} />
            <span>{t('nav.login')}</span>
          </Link>
          <Link to="/register" className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-500/30">
            <UserPlus size={16} />
            <span>{t('nav.register')}</span>
          </Link>
        </div>
        ):(
          <div className="hidden sm:flex items-center gap-2">
            <Link 
              to={user.role === 'admin' ? '/dashboard' : '/profile'} 
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 border border-slate-200 text-slate-700 hover:bg-slate-50 hover:-translate-y-0.5"
            >
              {user.image ? (
                <img 
                  src={`http://127.0.0.1:8000/storage/${user.image}`} 
                  alt="Profile" 
                  className="w-6 h-6 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <User size={16} />
              )}
              <span>{user.role === 'admin' ? t('nav.dashboard', 'Dashboard') : t('nav.profile')}</span>
            </Link>
          </div>
        )
        }
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Menu Dropdown (Simplified) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 flex flex-col gap-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/" className="py-2 text-slate-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</Link>
            <Link to="/products" className="py-2 text-slate-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.products')}</Link>
            <Link to="/categories" className="py-2 text-slate-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.categories')}</Link>
            <Link to="/contact" className="py-2 text-slate-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.contact')}</Link>
            
            <div className="flex items-center gap-4 py-3 mt-2 border-t border-slate-100">
               {/* Dark Mode toggle in mobile menu */}
               <button 
                onClick={() => setIsVisualDarkMode(!isVisualDarkMode)}
                className="flex items-center gap-3 text-slate-700 font-medium"
               >
                <div className="relative w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                    <Sun size={20} className={`absolute transition-all duration-500 transform ${isVisualDarkMode ? 'rotate-[360deg] opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} />
                    <Moon size={20} className={`absolute transition-all duration-500 transform ${isVisualDarkMode ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`} />
                </div>
                <span>{isVisualDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
               </button>

               {/* Wishlist item in mobile menu */}
               <Link to="/wishlist" className="flex items-center gap-3 text-slate-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="relative w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500">
                    <Heart size={20} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white">{wishlistCount}</span>
                </div>
                <span>Wishlist</span>
               </Link>

               {/* Cart item in mobile menu */}
               <Link to="/cart" className="flex items-center gap-3 text-slate-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="relative w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <ShoppingCart size={20} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white">{cartCount}</span>
                </div>
                <span>Cart</span>
               </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-slate-100">
            {!user ? (
              <>
                <Link to="/login" className="flex justify-center items-center gap-2 px-4 py-2 rounded-full font-medium text-sm border border-slate-200 text-slate-700 bg-transparent" onClick={() => setIsMobileMenuOpen(false)}>
                  <LogIn size={16} /> {t('nav.login')}
                </Link>
                <Link to="/register" className="flex justify-center items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-blue-600 text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  <UserPlus size={16} /> {t('nav.register')}
                </Link>
              </>
            ) : (
            <div className="flex flex-col gap-2">
              <Link 
                to={user.role === 'admin' ? '/dashboard' : '/profile'} 
                className="flex justify-center items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm border border-slate-200 text-slate-700 bg-transparent" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {user.image ? (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${user.image}`} 
                    alt="Profile" 
                    className="w-6 h-6 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <User size={16} />
                )}
                {user.role === 'admin' ? t('nav.dashboard', 'Dashboard') : t('nav.profile')}
              </Link>
            </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
