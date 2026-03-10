import React, { useState } from 'react';
import { Search, LogIn, UserPlus, Menu, Moon, Sun, ShoppingCart } from 'lucide-react';
import logo from '../assets/smartShopLogo.png';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisualDarkMode, setIsVisualDarkMode] = useState(false);

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
          <Search size={18} className="absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-full text-sm text-slate-900 placeholder-slate-500 outline-none transition-all duration-300"
            placeholder="Search products, brands and more..."
          />
        </div>
        
        <ul className="flex gap-8">
          <li>
            <a href="/products" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative after:absolute after:bottom-[-4px] after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:-translate-x-1/2">Products</a>
          </li>
          <li>
            <a href="/categories" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative after:absolute after:bottom-[-4px] after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:-translate-x-1/2">Categories</a>
          </li>
          <li>
            <a href="/contact" className="text-slate-600 font-medium hover:text-slate-900 transition-colors relative after:absolute after:bottom-[-4px] after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:after:-translate-x-1/2">Contact</a>
          </li>
        </ul>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
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
            <span>Login</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-500/30">
            <UserPlus size={16} />
            <span>Register</span>
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
          <div className="relative flex items-center w-full group">
            <Search size={18} className="absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent focus:border-blue-500 rounded-full text-sm outline-none"
              placeholder="Search products..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <a href="/products" className="py-2 text-slate-700 font-medium">Products</a>
            <a href="/categories" className="py-2 text-slate-700 font-medium">Categories</a>
            <a href="/contact" className="py-2 text-slate-700 font-medium">Contact</a>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-slate-100">
            <button className="flex justify-center items-center gap-2 px-4 py-2 rounded-full font-medium text-sm border border-slate-200 text-slate-700 bg-transparent">
              <LogIn size={16} /> Login
            </button>
            <button className="flex justify-center items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-blue-600 text-white">
              <UserPlus size={16} /> Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
