import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LogIn, UserPlus, Menu, Moon, Sun, ShoppingCart, Languages, ChevronDown, Heart, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/smartShopLogo.png';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const linksDropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'ar', name: 'العربية', flag: 'https://flagcdn.com/w40/ma.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
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
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 md:px-8 bg-white dark:bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-xl border-b border-blue-100/50 dark:border-slate-800 shadow-sm transition-all duration-300">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img 
            src={logo} 
            alt="SmartShop Logo" 
            className="h-8 md:h-12 cursor-pointer transition-all duration-300 hover:scale-105 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" 
          />
        </Link>
      </div>

      {/* Middle: Links */}
      <div className="flex-1 flex items-center justify-center px-4 lg:px-8">
        
        {/* Medium Screens Dropdown */}
        <div className="hidden md:flex lg:hidden relative" ref={linksDropdownRef}>
            <button 
              onClick={() => setIsLinksOpen(!isLinksOpen)}
              className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-bold text-sm shadow-sm"
            >
              <span>{t('nav.explore')}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isLinksOpen ? 'rotate-180' : ''}`} />
            </button>

          <AnimatePresence>
            {isLinksOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute top-full mt-2 ${i18n.language === 'ar' ? 'right-0' : 'left-0'} bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-2 w-56 z-[60]`}
              >
                <Link to="/" className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all" onClick={() => setIsLinksOpen(false)}>
                  {t('nav.home')}
                </Link>
                <Link to="/products" className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all" onClick={() => setIsLinksOpen(false)}>
                  {t('nav.products')}
                </Link>
                <Link to="/categories" className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all" onClick={() => setIsLinksOpen(false)}>
                  {t('nav.categories')}
                </Link>
                <Link to="/contact" className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all" onClick={() => setIsLinksOpen(false)}>
                  {t('nav.contact')}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Large Screens Links */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-14 shrink-0 transition-all duration-300">
          <li>
            <Link to="/" className="text-slate-600 dark:text-slate-300 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-all relative text-sm xl:text-lg group">
              {t('nav.home')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-slate-600 dark:text-slate-300 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-all relative text-sm xl:text-lg group">
              {t('nav.products')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          </li>
          <li>
            <Link to="/categories" className="text-slate-600 dark:text-slate-300 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-all relative text-sm xl:text-lg group">
              {t('nav.categories')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-slate-600 dark:text-slate-300 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-all relative text-sm xl:text-lg group">
              {t('nav.contact')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 lg:gap-4 xl:gap-6">
        {/* Language Dropdown */}
        <div className="relative" ref={langDropdownRef}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 lg:gap-2.5 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/80 transition-all active:scale-95 group"
          >
            <Languages size={20} className="lg:size-[22px] group-hover:rotate-12 transition-transform" />
            <img src={currentLanguage.flag} alt={currentLanguage.name} className="hidden xl:inline w-6 h-auto rounded-md shadow-sm border border-slate-100 dark:border-slate-800" />
            <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className={`absolute top-full mt-2 ${i18n.language === 'ar' ? 'left-0' : 'right-0'} bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-2 w-48 overflow-hidden z-[60] animate-in fade-in zoom-in duration-200`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    i18n.language === lang.code 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
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

        {/* Universal Theme Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className={`relative flex items-center h-[38px] lg:h-[42px] rounded-full transition-all duration-500 shrink-0 shadow-inner ${
            isDarkMode ? 'bg-black' : 'bg-[#e5e5e5]'
          } w-[42px] xl:w-[130px]`}
          aria-label="Toggle theme visual"
        >
          {/* Light Mode Text */}
          <span 
            className={`absolute left-3.5 text-[10px] font-black tracking-wide transition-opacity duration-300 pointer-events-none hidden xl:block ${
              isDarkMode ? 'opacity-0' : 'opacity-100 text-black'
            }`}
          >
            {t('nav.light_mode')}
          </span>
          
          {/* Night Mode Text */}
          <span 
            className={`absolute right-3.5 text-[10px] font-black tracking-wide transition-opacity duration-300 pointer-events-none hidden xl:block ${
              isDarkMode ? 'opacity-100 text-white' : 'opacity-0'
            }`}
          >
            {t('nav.night_mode')}
          </span>

          {/* Toggle Thumb */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 w-[30px] h-[30px] lg:w-[34px] lg:h-[34px] bg-white dark:bg-slate-800 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${
              isDarkMode 
                ? 'left-1' 
                : 'left-[4px] xl:left-[92px]'
            }`}
          >
            {isDarkMode ? (
              <Moon size={16} strokeWidth={2.5} className="text-white lg:size-[18px]" />
            ) : (
              <Sun size={16} strokeWidth={2.5} className="text-black lg:size-[20px]" />
            )}
          </div>
        </button>

        {!user || user.role !== 'admin' ? (
          <Link to="/wishlist" className="hidden md:flex p-2 text-slate-500 dark:text-slate-400 hover:text-pink-500 hover:bg-pink-50/80 dark:hover:bg-pink-900/20 rounded-full transition-all duration-300 relative group">
            <Heart size={22} className="lg:size-[24px] group-hover:fill-pink-500 transition-all" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">{wishlistCount}</span>
          </Link>
        ) : null}

        {!user || user.role !== 'admin' ? (
          <Link to="/cart" className="hidden md:flex p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50/80 dark:hover:bg-blue-900/20 rounded-full transition-all duration-300 relative group">
            <ShoppingCart size={22} className="lg:size-[24px]" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">{cartCount}</span>
          </Link>
        ) : null}

        {/* register/login buttons or profile icon */}
        {!user?(
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-0.5">
              <LogIn size={18} />
              <span>{t('nav.login')}</span>
            </Link>
            <Link to="/register" className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-500/30 dark:shadow-none">
              <UserPlus size={18} />
              <span>{t('nav.register')}</span>
            </Link>
          </div>
        ):(
          <div className="hidden sm:flex items-center gap-2">
            <Link 
              to={user.role === 'admin' ? '/dashboard' : '/profile'} 
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-0.5"
            >
              {user.image ? (
                <img 
                  src={`http://127.0.0.1:8000/storage/${user.image}`} 
                  alt="Profile" 
                  className="w-6 h-6 lg:w-7 lg:h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
              ) : (
                <User size={18} className="lg:size-[20px]" />
              )}
              <span>{user.role === 'admin' ? t('nav.dashboard', 'Dashboard') : t('nav.profile')}</span>
            </Link>
          </div>
        )
        }
        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800/50 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Dropdown (Simplified) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/" className="py-2 text-slate-700 dark:text-slate-200 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</Link>
            <Link to="/products" className="py-2 text-slate-700 dark:text-slate-200 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.products')}</Link>
            <Link to="/categories" className="py-2 text-slate-700 dark:text-slate-200 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.categories')}</Link>
            <Link to="/contact" className="py-2 text-slate-700 dark:text-slate-200 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.contact')}</Link>
            
            <div className="flex items-center gap-4 py-3 mt-2 border-t border-slate-100 dark:border-slate-700">


                {user.role !== 'admin' && (
                  <>
                    {/* Wishlist item in mobile menu */}
                    <Link to="/wishlist" className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="relative w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500">
                        <Heart size={20} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white dark:border-slate-900">{wishlistCount}</span>
                      </div>
                      <span>{t('nav.wishlist')}</span>
                    </Link>
                    {/* Cart item in mobile menu */}
                    <Link to="/cart" className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="relative w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <ShoppingCart size={20} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white dark:border-slate-800">{cartCount}</span>
                      </div>
                      <span>{t('nav.cart')}</span>
                    </Link>
                  </>
                )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-slate-100 dark:border-slate-700">
            {!user ? (
              <>
                <Link to="/login" className="flex justify-center items-center gap-2 px-4 py-2 rounded-full font-medium text-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-transparent" onClick={() => setIsMobileMenuOpen(false)}>
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
                className="flex justify-center items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-transparent" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {user.image ? (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${user.image}`} 
                    alt="Profile" 
                    className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
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
