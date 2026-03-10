import React, { useState, useEffect, useRef } from 'react';
import { Search, LogIn, UserPlus, Menu, Moon, Sun, ShoppingCart, Languages, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/smartShopLogo.png';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisualDarkMode, setIsVisualDarkMode] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

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
    };

    if (isLangOpen) {
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
        <a href="/">
          <img 
            src={logo} 
            alt="SmartShop Logo" 
            className="h-10 md:h-15 cursor-pointer transition-all duration-300 hover:scale-105 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" 
          />
        </a>
      </div>

      {/* Middle: Search & Links */}
      <div className="hidden md:flex flex-1 items-center justify-center gap-8">
        <div className="relative flex items-center w-full max-w-sm group">
          <Search size={18} className={`absolute ${i18n.language === 'ar' ? 'right-3' : 'left-3'} text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300 pointer-events-none`} />
          <input
            type="text"
            className={`w-full ${i18n.language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-slate-100 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-full text-sm text-slate-900 placeholder-slate-500 outline-none transition-all duration-300`}
            placeholder={t('hero.search', { defaultValue: 'Search products, brands and more...' })}
          />
        </div>
        
        <ul className="flex gap-8">
          <li>
            <a href="/products" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative after:absolute after:bottom-[-4px] after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:-translate-x-1/2">
              {t('nav.products')}
            </a>
          </li>
          <li>
            <a href="/categories" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative after:absolute after:bottom-[-4px] after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:-translate-x-1/2">
              {t('nav.categories')}
            </a>
          </li>
          <li>
            <a href="/contact" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative after:absolute after:bottom-[-4px] after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:-translate-x-1/2">
              {t('nav.contact')}
            </a>
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
          className="relative p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50/80 overflow-hidden group transition-all duration-500 ease-in-out hover:shadow-[0_0_12px_rgba(59,130,246,0.2)] active:scale-95"
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

        {/* Cart Icon */}
        <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50/80 rounded-full transition-all duration-300 relative group">
          <ShoppingCart size={22} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">0</span>
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 border border-slate-200 text-slate-700 hover:bg-slate-50 hover:-translate-y-0.5">
            <LogIn size={16} />
            <span>{t('nav.login')}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-500/30">
            <UserPlus size={16} />
            <span>{t('nav.register')}</span>
          </button>
        </div>

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
            <a href="/products" className="py-2 text-slate-700 font-medium">{t('nav.products')}</a>
            <a href="/categories" className="py-2 text-slate-700 font-medium">{t('nav.categories')}</a>
            <a href="/contact" className="py-2 text-slate-700 font-medium">{t('nav.contact')}</a>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-slate-100">
            <button className="flex justify-center items-center gap-2 px-4 py-2 rounded-full font-medium text-sm border border-slate-200 text-slate-700 bg-transparent">
              <LogIn size={16} /> {t('nav.login')}
            </button>
            <button className="flex justify-center items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-blue-600 text-white">
              <UserPlus size={16} /> {t('nav.register')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
