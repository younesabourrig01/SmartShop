import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "products": "Products",
        "categories": "Categories",
        "contact": "Contact",
        "login": "Login",
        "register": "Register"
      },
      "us": {
        "welcome": "Welcome to the future",
        "title_1": "Experience",
        "title_2": "Innovation.",
        "description": "Curating the next generation of premium electronics. We bring you state-of-the-art technology with an experience that feels like magic.",
        "shop_products": "Shop Products",
        "our_story": "Our Story",
        "search_placeholder": "Quick search products...",
        "search_button": "Search Smart",
        "trending": "Trending"
      },
      "slider": {
        "hero_title": "Got your check? Get your tech.",
        "hero_subtitle": "Make the most of your tax refund with Top Deals.",
        "shop_now": "Shop now",
        "category_title": "Shop deals by category",
        "categories": {
          "all": "Shop all",
          "apple": "Apple",
          "tv": "TV & Home Theater",
          "computers": "Computers & Tablets",
          "games": "All Video Games",
          "appliances": "Appliances",
          "phones": "Cell Phones",
          "audio": "Home Audio & Speakers"
        }
      },
      "commantes": {
        "title": "What Our",
        "subtitle": "Clients Say.",
        "stats": {
          "customers": "Happy Customers",
          "products": "Products",
          "support": "Expert Support",
          "delivery": "Fast Delivery",
          "quality": "Premium",
          "satisfaction": "Satisfaction"
        },
        "read_more": "Read more testimonials",
        "joined": "Joined by 12,000+ shoppers"
      },
      "contact": {
        "who_are_we": "Who are we?",
        "description": "SmartShop is more than just an e-commerce platform. We are a team of tech enthusiasts dedicated to bringing the future of electronics to your doorstep with unmatched quality and service.",
        "location": "Location",
        "call_us": "Call Us",
        "email": "Email",
        "get_in_touch": "Get in Touch",
        "form_description": "Fill out the form below and we'll get back to you within 24 hours.",
        "full_name": "Full Name",
        "email_address": "Email Address",
        "message": "Message",
        "send_message": "Send Message",
        "sending": "Sending....",
        "success": "Form Submitted Successfully"
      },
      "footer": {
        "description": "Elevating your tech experience with premium products and clinical precision. Join the future of electronics today.",
        "shop": "Shop",
        "company": "Company",
        "support": "Support",
        "made_with": "Made with",
        "for_lovers": "for tech lovers"
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "products": "المنتجات",
        "categories": "الفئات",
        "contact": "اتصل بنا",
        "login": "تسجيل الدخول",
        "register": "إنشاء حساب"
      },
      "us": {
        "welcome": "مرحباً بكم في المستقبل",
        "title_1": "اختبر",
        "title_2": "الابتكار.",
        "description": "نختار بعناية الجيل القادم من الإلكترونيات المتميزة. نقدم لك أحدث التقنيات مع تجربة تشبه السحر.",
        "shop_products": "تسوق المنتجات",
        "our_story": "قصتنا",
        "search_placeholder": "بحث سريع عن المنتجات...",
        "search_button": "بحث ذكي",
        "trending": "الأكثر بحثاً"
      },
      "slider": {
        "hero_title": "حصلت على شيكك؟ احصل على تقنيتك.",
        "hero_subtitle": "استفد إلى أقصى حد من استردادك الضريبي مع أفضل العروض.",
        "shop_now": "تسوق الآن",
        "category_title": "تسوق العروض حسب الفئة",
        "categories": {
          "all": "تسوق الكل",
          "apple": "آبل",
          "tv": "التلفزيون والمسرح المنزلي",
          "computers": "الحواسيب والأجهزة اللوحية",
          "games": "جميع ألعاب الفيديو",
          "appliances": "الأجهزة المنزلية",
          "phones": "الهواتف المحمولة",
          "audio": "أجهزة الصوت والسماعات"
        }
      },
      "commantes": {
        "title": "ماذا يقول",
        "subtitle": "عملاؤنا.",
        "stats": {
          "customers": "عميل سعيد",
          "products": "منتج",
          "support": "دعم خبراء",
          "delivery": "توصيل سريع",
          "quality": "ممتاز",
          "satisfaction": "نسبة الرضا"
        },
        "read_more": "اقرأ المزيد من التقييمات",
        "joined": "انضم إلينا أكثر من 12,000 متسوق"
      },
      "contact": {
        "who_are_we": "من نحن؟",
        "description": "سماآرت شوب هو أكثر من مجرد منصة للتجارة الإلكترونية. نحن فريق من عشاق التكنولوجيا المكرسين لتقديم مستقبل الإلكترونيات إلى باب منزلك بجودة وخدمة لا مثيل لهما.",
        "location": "الموقع",
        "call_us": "اتصل بنا",
        "email": "البريد الإلكتروني",
        "get_in_touch": "تواصل معنا",
        "form_description": "املأ النموذج أدناه وسنقوم بالرد عليك في غضون 24 ساعة.",
        "full_name": "الاسم الكامل",
        "email_address": "البريد الإلكتروني",
        "message": "الرسالة",
        "send_message": "إرسال الرسالة",
        "sending": "جاري الإرسال...",
        "success": "تم إرسال النموذج بنجاح"
      },
      "footer": {
        "description": "نرفع مستوى تجربتك التقنية بمنتجات متميزة ودقة سريرية. انضم إلى مستقبل الإلكترونيات اليوم.",
        "shop": "تسوق",
        "company": "الشركة",
        "support": "الدعم",
        "made_with": "صنع بـ",
        "for_lovers": "لعشاق التقنية"
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "products": "Produits",
        "categories": "Catégories",
        "contact": "Contact",
        "login": "Connexion",
        "register": "S'inscrire"
      },
      "us": {
        "welcome": "Bienvenue dans le futur",
        "title_1": "Découvrez",
        "title_2": "l'Innovation.",
        "description": "Sélection de la prochaine génération d'électronique haut de gamme. Nous vous apportons une technologie de pointe avec une expérience magique.",
        "shop_products": "Acheter des Produits",
        "our_story": "Notre Histoire",
        "search_placeholder": "Recherche rapide...",
        "search_button": "Rechercher",
        "trending": "Tendance"
      },
      "slider": {
        "hero_title": "Votre chèque ? Votre tech.",
        "hero_subtitle": "Profitez de votre remboursement avec les meilleures offres.",
        "shop_now": "Acheter maintenant",
        "category_title": "Offres par catégorie",
        "categories": {
          "all": "Tout voir",
          "apple": "Apple",
          "tv": "TV & Home Cinéma",
          "computers": "Ordinateurs & Tablettes",
          "games": "Jeux Vidéo",
          "appliances": "Électroménager",
          "phones": "Téléphones",
          "audio": "Audio & Enceintes"
        }
      },
      "commantes": {
        "title": "Ce que nos",
        "subtitle": "Clients disent.",
        "stats": {
          "customers": "Clients Heureux",
          "products": "Produits",
          "support": "Support Expert",
          "delivery": "Livraison Rapide",
          "quality": "Premium",
          "satisfaction": "Satisfaction"
        },
        "read_more": "Plus de témoignages",
        "joined": "Rejoint par 12 000+ acheteurs"
      },
      "contact": {
        "who_are_we": "Qui sommes-nous ?",
        "description": "SmartShop est plus qu'une plateforme e-commerce. Nous sommes une équipe de passionnés de tech dédiés à vous apporter le futur de l'électronique.",
        "location": "Localisation",
        "call_us": "Appelez-nous",
        "email": "E-mail",
        "get_in_touch": "Contactez-nous",
        "form_description": "Remplissez le formulaire et nous vous répondrons sous 24h.",
        "full_name": "Nom Complet",
        "email_address": "Adresse E-mail",
        "message": "Message",
        "send_message": "Envoyer",
        "sending": "Envoi en cours...",
        "success": "Formulaire envoyé avec succès"
      },
      "footer": {
        "description": "Élevez votre expérience tech avec des produits premium. Rejoignez le futur de l'électronique dès aujourd'hui.",
        "shop": "Boutique",
        "company": "Entreprise",
        "support": "Support",
        "made_with": "Fait avec",
        "for_lovers": "pour les passionnés"
      }
    }
  },
  es: {
    translation: {
      "nav": {
        "products": "Productos",
        "categories": "Categorías",
        "contact": "Contacto",
        "login": "Acceso",
        "register": "Registrarse"
      },
      "us": {
        "welcome": "Bienvenido al futuro",
        "title_1": "Vive la",
        "title_2": "Innovación.",
        "description": "Curando la próxima generación de electrónica premium. Te traemos tecnología de punta con una experiencia que se siente como magia.",
        "shop_products": "Comprar Productos",
        "our_story": "Nuestra Historia",
        "search_placeholder": "Buscar productos...",
        "search_button": "Buscar",
        "trending": "Tendencias"
      },
      "slider": {
        "hero_title": "¿Tienes tu cheque? Consigue tu tecnología.",
        "hero_subtitle": "Aprovecha al máximo tu reembolso con las mejores ofertas.",
        "shop_now": "Comprar ahora",
        "category_title": "Ofertas por categoría",
        "categories": {
          "all": "Ver todo",
          "apple": "Apple",
          "tv": "TV y Cine en Casa",
          "computers": "Ordenadores y Tablets",
          "games": "Videojuegos",
          "appliances": "Electrodomésticos",
          "phones": "Teléfonos Móviles",
          "audio": "Audio y Altavoces"
        }
      },
      "commantes": {
        "title": "Lo que dicen",
        "subtitle": "Nuestros Clientes.",
        "stats": {
          "customers": "Clientes Felices",
          "products": "Productos",
          "support": "Soporte Experto",
          "delivery": "Entrega Rápida",
          "quality": "Premium",
          "satisfaction": "Satisfacción"
        },
        "read_more": "Más testimonios",
        "joined": "Más de 12.000 compradores"
      },
      "contact": {
        "who_are_we": "¿Quiénes somos?",
        "description": "SmartShop es más que una plataforma de comercio electrónico. Somos un equipo de entusiastas de la tecnología dedicados a traerte el futuro.",
        "location": "Ubicación",
        "call_us": "Llámanos",
        "email": "Correo",
        "get_in_touch": "Contáctanos",
        "form_description": "Completa el formulario y te responderemos en 24 horas.",
        "full_name": "Nombre Completo",
        "email_address": "Correo Electrónico",
        "message": "Mensaje",
        "send_message": "Enviar Mensaje",
        "sending": "Enviando...",
        "success": "Formulario enviado con éxito"
      },
      "footer": {
        "description": "Elevando su experiencia tecnológica con productos premium. Únase al futuro de la electrónica hoy.",
        "shop": "Tienda",
        "company": "Empresa",
        "support": "Soporte",
        "made_with": "Hecho con",
        "for_lovers": "para amantes de la tech"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;
