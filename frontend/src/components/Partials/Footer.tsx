import React from 'react';
import { Facebook, Twitter, Instagram, Github, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/smartShopLogo.png';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 pt-16 pb-8">
      <div className="w-full px-4 md:px-52 mx-auto text-start rtl:text-right">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <img src={logo} alt="SmartShop Logo" className="h-10 w-auto" />
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0046be] hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm">{t('footer.shop')}</h4>
            <ul className="space-y-4">
              {['Laptops', 'Smartphones', 'Gaming', 'Audio'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-500 dark:text-slate-400 font-bold hover:text-[#0046be] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm">{t('footer.company')}</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-500 dark:text-slate-400 font-bold hover:text-[#0046be] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm">{t('footer.support')}</h4>
            <ul className="space-y-4">
              {['Help Center', 'Track Order', 'Returns', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-500 dark:text-slate-400 font-bold hover:text-[#0046be] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 font-bold text-sm">
            © {currentYear} SmartShop. {t('footer.for_lovers').includes('تقني') ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
            <span>{t('footer.made_with')}</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>{t('footer.for_lovers')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
