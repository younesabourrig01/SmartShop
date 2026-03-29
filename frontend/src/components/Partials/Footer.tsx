import React from 'react';
import { Facebook, Instagram, Github, Heart, Linkedin } from 'lucide-react';
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
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm">{t('footer.shop')}</h4>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-slate-500 dark:text-slate-400 font-bold hover:text-blue-600 transition-colors uppercase text-xs tracking-widest">{t('nav.home')}</a>
              </li>
              <li>
                <a href="/products" className="text-slate-500 dark:text-slate-400 font-bold hover:text-blue-600 transition-colors uppercase text-xs tracking-widest">{t('nav.products')}</a>
              </li>
              <li>
                <a href="/categories" className="text-slate-500 dark:text-slate-400 font-bold hover:text-blue-600 transition-colors uppercase text-xs tracking-widest">{t('nav.categories')}</a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm">{t('footer.support')}</h4>
            <ul className="space-y-4">
              <li>
                <a href="/contact" className="text-slate-500 dark:text-slate-400 font-bold hover:text-blue-600 transition-colors uppercase text-xs tracking-widest">{t('nav.contact')}</a>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="space-y-6">
            <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm">{t('footer.follow_me')}</h4>
            <div className="flex flex-wrap gap-4">
              {[
                { Icon: Github, href: "https://github.com/younesabourrig01" },
                { Icon: Instagram, href: "https://www.instagram.com/younes1ya" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/younes-abourrig-08103a338/" },
                { Icon: Facebook, href: "https://web.facebook.com/youness.abourig" }
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 font-bold text-sm">
            © {currentYear} SmartShop. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
