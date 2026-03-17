import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "products": "Products",
        "categories": "Categories",
        "contact": "Contact",
        "login": "Login",
        "register": "Register",
        "profile": "Profile",
        "dashboard": "Dashboard"
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
        "success": "Form Submitted Successfully",
        "our_story_title": "Our Story",
        "our_story_desc": "Founded in the heart of innovation, SmartShop began with a simple mission: to make premium technology accessible to everyone. We believe that technology should empower, inspire, and connect people across the globe.",
        "find_us": "Find Us",
        "visit_us": "Visit our physical store in Agadir"
      },
      "footer": {
        "description": "Elevating your tech experience with premium products and clinical precision. Join the future of electronics today.",
        "shop": "Shop",
        "company": "Company",
        "support": "Support",
        "made_with": "Made with",
        "for_lovers": "for tech lovers"
      },
      "register_page": {
        "welcome": "Welcome to",
        "welcome_desc": "We are thrilled to have you here! Join our community of tech enthusiasts and experience the future of shopping.",
        "email_verify": "Email Verification",
        "email_verify_desc": "For your security, we need to verify your email address before you can continue.",
        "check_inbox": "Check your",
        "inbox": "Inbox!",
        "check_inbox_desc": "Almost there! We've sent a 6-digit verification code to",
        "verify_account": "Verify Account",
        "verify_account_desc": "Please fill in the code and complete your profile information below.",
        "back_to_shop": "Back to SmartShop",
        "create_account": "Create Account",
        "step_1": "Step 1 of 2: Basic Information",
        "full_name": "Full Name",
        "email_address": "Email Address",
        "next_step": "Next Step",
        "cancel": "Cancel",
        "already_have_account": "Already have an account?",
        "login_here": "Login here",
        "final_step": "Final Step",
        "complete_profile": "Complete your profile",
        "name_label": "Name",
        "email_label": "Email",
        "otp": "Verification Code (OTP)",
        "password": "Create Password",
        "confirm_password": "Confirm Password",
        "profile_picture": "Profile Picture (Optional)",
        "img_specs": "JPG, PNG or JPEG. Max 2MB.",
        "complete_registration": "Complete Registration",
        "go_back": "Go Back to Step 1",
        "address": "Address",
        "phone_number": "Phone Number",
        "errors": {
          "name_req": "Name is required",
          "name_min": "Name must be at least 3 characters",
          "email_req": "Email is required",
          "email_inv": "Email is invalid",
          "otp_req": "OTP is required",
          "pass_req": "Password is required",
          "pass_match": "Passwords do not match",
          "img_type": "Only JPG, JPEG, and PNG are allowed",
          "img_size": "Image size must be less than 2MB",
          "adress_req": "Address is required",
          "phone_req": "Phone number is required"
        }
      },
      "login_page": {
        "welcome": "Welcome Back",
        "welcome_desc": "We missed you! Log in to access your account and continue your tech journey.",
        "login_title": "Sign In",
        "sign_in_desc": "Please enter your credentials to access your account",
        "email_address": "Email Address",
        "password": "Password",
        "login_button": "Login",
        "no_account": "Don't have an account?",
        "register_link": "Register here",
        "back_to_home": "Back to Home",
        "errors": {
          "email_req": "Email is required",
          "email_inv": "Email is invalid",
          "pass_req": "Password is required",
          "pass_min": "Password must be at least 6 characters"
        }
      },
      "notFound": {
        "oops": "Oops!",
        "title": "Not Found.",
        "message": "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
        "returnHome": "Return Home",
        "goBack": "Go Back"
      },
      "product_page": {
        "back_to_products": "Back to Products",
        "not_found": "Product Not Found",
        "in_stock": "In Stock",
        "out_of_stock": "Out of Stock",
        "description": "Description",
        "add_to_cart": "Add to Cart",
        "wishlist": "Add to Wishlist",
        "free_shipping": "Free Shipping",
        "on_orders_above": "On orders above",
        "returns": "Easy Returns",
        "days_return": "days return policy",
        "you_may_like": "You May Also Like",
        "price_label": "Price"
      },
      "categories": {
        "banner": {
          "title": "Explore Our Categories",
          "subtitle": "Discover the best products from our wide range of carefully curated categories.",
          "cta": "View All Products"
        },
        "items": {
          "electronics": "Electronics",
          "fashion": "Fashion",
          "home": "Home & Garden",
          "audio": "Audio & Music",
          "accessories": "Accessories",
          "gaming": "Gaming",
          "count": "Items"
        }
      },
      "products": {
        "title": "Our Products",
        "description": "Discover our curated collection of premium tech and electronics.",
        "banner": {
          "title": "Upgrade to the M3 Generation",
          "subtitle": "Get up to $200 trade-in credit when you upgrade your old MacBook.",
          "cta": "Explore Now"
        },
        "filter": {
          "title": "Filter & Sort",
          "subtitle": "Refine your browsing experience",
          "category": "Category",
          "sort_by": "Sort By",
          "all_categories": "All Categories",
          "electronics": "Electronics",
          "fashion": "Fashion",
          "home": "Home & Garden",
          "newest": "Newest Arrivals",
          "popular": "Most Popular",
          "price_low": "Price: Low to High",
          "price_high": "Price: High to Low"
        }
      },
      "dashboard": {
        "welcome": "Welcome back, Admin 👋",
        "sidebar": {
          "dashboard": "Dashboard",
          "users": "Users",
          "products": "Products",
          "categories": "Categories",
          "settings": "Settings",
          "logout": "Logout"
        },
        "stats": {
          "total_users": "Total Users",
          "total_products": "Total Products",
          "total_categories": "Total Categories",
          "see_all": "See all Users",
          "manage_all": "Manage All"
        },
        "transactions": {
          "title": "Recent Transactions",
          "export": "Export PDF",
          "id": "Transaction ID",
          "customer": "Customer",
          "amount": "Amount",
          "date": "Date",
          "status": "Status",
          "action": "Action",
          "completed": "completed",
          "pending": "pending",
          "cancelled": "cancelled"
        },
        "wishlist": {
          "title": "My Wishlist",
          "items": "items saved to your wishlist",
          "back": "Back to Shop",
          "add_to_cart": "Add to Cart",
          "empty": "Your wishlist is empty",
          "empty_desc": "Save items you love to find them easily later.",
          "explore": "Explore Products"
        },
        "cart": {
          "title": "Shopping Cart",
          "items_count": "items in your tray",
          "back": "Back to Shop",
          "clear": "Clear Cart",
          "summary": "Order Summary",
          "subtotal": "Subtotal",
          "shipping": "Shipping",
          "free": "FREE",
          "total": "Total",
          "checkout": "Checkout Now",
          "empty": "Your cart is empty",
          "empty_desc": "Looks like you haven't added anything to your cart yet. Let's find something amazing for you!",
          "start_shopping": "Start Shopping"
        }
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "home": "الرئيسية",
        "products": "المنتجات",
        "categories": "الفئات",
        "contact": "اتصل بنا",
        "login": "تسجيل الدخول",
        "register": "إنشاء حساب",
        "profile": "الملف الشخصي",
        "dashboard": "لوحة التحكم"
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
        "success": "تم إرسال النموذج بنجاح",
        "our_story_title": "قصتنا",
        "our_story_desc": "تأسست سمارت شوب في قلب الابتكار ، وبدأت بمهمة بسيطة: جعل التكنولوجيا المتميزة في متناول الجميع. نحن نؤمن بأن التكنولوجيا يجب أن تمكن وتلهم وتربط الناس في جميع أنحاء العالم.",
        "find_us": "تجدنا",
        "visit_us": "قم بزيارة متجرنا في أكادير"
      },
      "footer": {
        "description": "نرفع مستوى تجربتك التقنية بمنتجات متميزة ودقة سريرية. انضم إلى مستقبل الإلكترونيات اليوم.",
        "shop": "تسوق",
        "company": "الشركة",
        "support": "الدعم",
        "made_with": "صنع بـ",
        "for_lovers": "لعشاق التقنية"
      },
      "register_page": {
        "welcome": "مرحباً بك في",
        "welcome_desc": "نحن سعداء بوجودك هنا! انضم إلى مجتمعنا من عشاق التكنولوجيا واستمتع بمستقبل التسوق.",
        "email_verify": "التحقق من البريد",
        "email_verify_desc": "من أجل أمنك، نحتاج إلى التحقق من عنوان بريدك الإلكتروني قبل المتابعة.",
        "check_inbox": "تحقق من",
        "inbox": "صندوق الوارد!",
        "check_inbox_desc": "لقد اقتربنا! لقد أرسلنا رمز تحقق مكونًا من 6 أرقام إلى",
        "verify_account": "تحقق من الحساب",
        "verify_account_desc": "يرجى إدخال الرمز وإكمال معلومات ملفك الشخصي أدناه.",
        "back_to_shop": "العودة إلى سماآرت شوب",
        "create_account": "إنشاء حساب",
        "step_1": "الخطوة 1 من 2: المعلومات الأساسية",
        "full_name": "الاسم الكامل",
        "email_address": "البريد الإلكتروني",
        "next_step": "الخطوة التالية",
        "cancel": "إلغاء",
        "already_have_account": "لديك حساب بالفعل؟",
        "login_here": "سجل دخولك هنا",
        "final_step": "الخطوة النهائية",
        "complete_profile": "أكمل ملفك الشخصي",
        "name_label": "الاسم",
        "email_label": "البريد",
        "otp": "رمز التحقق (OTP)",
        "password": "إنشاء كلمة مرور",
        "confirm_password": "تأكيد كلمة المرور",
        "profile_picture": "الصورة الشخصية (اختياري)",
        "img_specs": "JPG أو PNG أو JPEG. بحد أقصى 2 ميجابايت.",
        "complete_registration": "إتمام التسجيل",
        "go_back": "العودة للخطوة 1",
        "address": "العنوان",
        "phone_number": "رقم الهاتف",
        "errors": {
          "name_req": "الاسم مطلوب",
          "name_min": "يجب أن يكون الاسم 3 أحرف على الأقل",
          "email_req": "البريد الإلكتروني مطلوب",
          "email_inv": "البريد الإلكتروني غير صالح",
          "otp_req": "رمز التحقق مطلوب",
          "pass_req": "كلمة المرور مطلوبة",
          "pass_match": "كلمات المرور غير متطابقة",
          "img_type": "مسموح فقط بصيغ JPG و JPEG و PNG",
          "img_size": "حجم الصورة يجب أن يكون أقل من 2 ميجابايت",
          "adress_req": "العنوان مطلوب",
          "phone_req": "رقم الهاتف مطلوب"
        }
      },
      "login_page": {
        "welcome": "مرحباً بعودتك",
        "welcome_desc": "لقد افتقدناك! سجل دخولك للوصول إلى حسابك ومتابعة رحلتك التقنية.",
        "login_title": "تسجيل الدخول",
        "sign_in_desc": "يرجى إدخال بيانات الاعتماد الخاصة بك للوصول إلى حسابك",
        "email_address": "البريد الإلكتروني",
        "password": "كلمة المرور",
        "login_button": "تسجيل الدخول",
        "no_account": "ليس لديك حساب؟",
        "register_link": "أنشئ حساباً هنا",
        "back_to_home": "العودة للرئيسية",
        "errors": {
          "email_req": "البريد الإلكتروني مطلوب",
          "email_inv": "البريد الإلكتروني غير صالح",
          "pass_req": "كلمة المرور مطلوبة",
          "pass_min": "يجب أن تكون كلمة المرور 6 أحرف على الأقل"
        }
      },
      "notFound": {
        "oops": "عذراً!",
        "title": "الصفحة غير موجودة.",
        "message": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعيدك إلى المسار الصحيح.",
        "returnHome": "العودة للرئيسية",
        "goBack": "العودة للخلف"
      },
      "product_page": {
        "back_to_products": "العودة للمنتجات",
        "not_found": "المنتج غير موجود",
        "in_stock": "متوفر",
        "out_of_stock": "غير متوفر",
        "description": "الوصف",
        "add_to_cart": "أضف إلى السلة",
        "wishlist": "أضف للمفضلة",
        "free_shipping": "شحن مجاني",
        "on_orders_above": "للطلبات فوق",
        "returns": "إرجاع سهل",
        "days_return": "يوم سياسة الإرجاع",
        "you_may_like": "قد يعجبك أيضاً",
        "price_label": "السعر"
      },
      "categories": {
        "banner": {
          "title": "استكشف فئاتنا",
          "subtitle": "اكتشف أفضل المنتجات من مجموعتنا الواسعة من الفئات المختارة بعناية.",
          "cta": "عرض جميع المنتجات"
        },
        "items": {
          "electronics": "إلكترونيات",
          "fashion": "أزياء",
          "home": "المنزل والحديقة",
          "audio": "أجهزة الصوت",
          "accessories": "إكسسوارات",
          "gaming": "ألعاب",
          "count": "عناصر"
        }
      },
      "products": {
        "title": "منتجاتنا",
        "description": "اكتشف مجموعتنا المختارة من التقنيات والإلكترونيات المميزة.",
        "banner": {
          "title": "قم بالترقية إلى جيل M3",
          "subtitle": "احصل على رصيد استبدال يصل إلى 200 دولار عند ترقية جهاز MacBook القديم الخاص بك.",
          "cta": "استكشف الآن"
        },
        "filter": {
          "title": "التصفية والفرز",
          "subtitle": "حسّن تجربة التصفح الخاصة بك",
          "category": "الفئة",
          "sort_by": "التصنيف حسب",
          "all_categories": "جميع الفئات",
          "electronics": "إلكترونيات",
          "fashion": "أزياء",
          "home": "المنزل والحديقة",
          "newest": "أحدث المنتجات",
          "popular": "الأكثر رواجاً",
          "price_low": "السعر: من الأقل إلى الأعلى",
          "price_high": "السعر: من الأعلى إلى الأقل"
        }
      },
      "reviews": {
        "title": "تقييمات العملاء",
        "subtitle": "شاهد ماذا يقول الآخرون عن هذا المنتج",
        "write_review": "اكتب تقييماً",
        "rating": "تقييمك",
        "comment": "تعليقك",
        "placeholder": "ما رأيك في المنتج؟",
        "submit": "نشر التقييم",
        "success": "تم نشر التقييم بنجاح!"
      },
      "dashboard": {
        "welcome": "مرحباً بك مجدداً، أيها المسؤول 👋",
        "sidebar": {
          "dashboard": "لوحة القيادة",
          "users": "المستخدمين",
          "products": "المنتجات",
          "categories": "الفئات",
          "settings": "الإعدادات",
          "logout": "تسجيل الخروج"
        },
        "stats": {
          "total_users": "إجمالي المستخدمين",
          "total_products": "إجمالي المنتجات",
          "total_categories": "إجمالي الفئات",
          "see_all": "عرض الكل",
          "manage_all": "إدارة الكل"
        },
        "transactions": {
          "title": "المعاملات الأخيرة",
          "export": "تصدير PDF",
          "id": "رقم المعاملة",
          "customer": "العميل",
          "amount": "المبلغ",
          "date": "التاريخ",
          "status": "الحالة",
          "action": "الإجراء",
          "completed": "مكتمل",
          "pending": "قيد الانتظار",
          "cancelled": "ملغى"
        },
        "wishlist": {
          "title": "قائمة رغباتي",
          "items": "عناصر محفوظة في قائمة رغباتك",
          "back": "العودة للمتجر",
          "add_to_cart": "أضف للسلة",
          "empty": "قائمة رغباتك فارغة",
          "empty_desc": "احفظ العناصر التي تحبها لتجدها بسهولة لاحقاً.",
          "explore": "استكشف المنتجات"
        },
        "cart": {
          "title": "سلة التسوق",
          "items_count": "عناصر في سلتك",
          "back": "العودة للمتجر",
          "clear": "مسح السلة",
          "summary": "ملخص الطلب",
          "subtotal": "المجموع الفرعي",
          "shipping": "الشحن",
          "free": "مجاني",
          "total": "المجموع",
          "checkout": "إتمام الشراء",
          "empty": "سلة التسوق فارغة",
          "empty_desc": "يبدو أنك لم تضف أي شيء إلى سلتك بعد. دعنا نجد شيئاً رائعاً لك!",
          "start_shopping": "ابدأ التسوق"
        }
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "home": "Accueil",
        "products": "Produits",
        "categories": "Catégories",
        "contact": "Contact",
        "login": "Connexion",
        "register": "S'inscrire",
        "profile": "Profil",
        "dashboard": "Tableau de Bord"
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
        "success": "Formulaire envoyé avec succès",
        "our_story_title": "Notre Histoire",
        "our_story_desc": "Fondé au cœur de l'innovation, SmartShop a commencé avec une mission simple : rendre la technologie premium accessible à tous. Nous pensons que la technologie doit responsabiliser, inspirer et connecter les gens à travers le monde.",
        "find_us": "Nous Trouver",
        "visit_us": "Visitez notre boutique physique à Agadir"
      },
      "footer": {
        "description": "Élevez votre expérience tech avec des produits premium. Rejoignez le futur de l'électronique dès aujourd'hui.",
        "shop": "Boutique",
        "company": "Entreprise",
        "support": "Support",
        "made_with": "Fait avec",
        "for_lovers": "pour les passionnés"
      },
      "register_page": {
        "welcome": "Bienvenue chez",
        "welcome_desc": "Nous sommes ravis de vous accueillir ! Rejoignez notre communauté de passionnés et découvrez le futur du shopping.",
        "email_verify": "Vérification d'E-mail",
        "email_verify_desc": "Pour votre sécurité, nous devons vérifier votre adresse e-mail avant de continuer.",
        "check_inbox": "Vérifiez votre",
        "inbox": "Boîte de réception !",
        "check_inbox_desc": "Presque fini ! Nous avons envoyé un code de vérification à 6 chiffres à",
        "verify_account": "Vérifier le Compte",
        "verify_account_desc": "Veuillez saisir le code et compléter vos informations ci-dessous.",
        "back_to_shop": "Retour à SmartShop",
        "create_account": "Créer un Compte",
        "step_1": "Étape 1 sur 2 : Informations de base",
        "full_name": "Nom Complet",
        "email_address": "Adresse E-mail",
        "next_step": "Étape Suivante",
        "cancel": "Annuler",
        "already_have_account": "Vous avez déjà un compte ?",
        "login_here": "Connectez-vous ici",
        "final_step": "Étape Finale",
        "complete_profile": "Complétez votre profil",
        "name_label": "Nom",
        "email_label": "E-mail",
        "otp": "Code de vérification (OTP)",
        "password": "Créer un mot de passe",
        "confirm_password": "Confirmer le mot de passe",
        "profile_picture": "Photo de profil (Optionnel)",
        "img_specs": "JPG, PNG ou JPEG. Max 2 Mo.",
        "complete_registration": "Finaliser l'inscription",
        "go_back": "Retour à l'étape 1",
        "address": "Adresse",
        "phone_number": "Numéro de Téléphone",
        "errors": {
          "name_req": "Nom requis",
          "name_min": "Le nom doit comporter au moins 3 caractères",
          "email_req": "E-mail requis",
          "email_inv": "E-mail invalide",
          "otp_req": "Code OTP requis",
          "pass_req": "Mot de passe requis",
          "pass_match": "Les mots de passe ne correspondent pas",
          "img_type": "Seuls JPG, JPEG et PNG sont autorisés",
          "img_size": "La taille de l'image doit être inférieure à 2 Mo",
          "adress_req": "L'adresse est requise",
          "phone_req": "Le numéro de téléphone est requis"
        }
      },
      "notFound": {
        "oops": "Oups !",
        "title": "Page Non Trouvée.",
        "message": "La page que vous recherchez n'existe pas ou a été déplacée. Revenons sur le bon chemin.",
        "returnHome": "Retour à l'accueil",
        "goBack": "Retour"
      },
      "login_page": {
        "welcome": "Bon retour",
        "welcome_desc": "Vous nous avez manqué ! Connectez-vous pour accéder à votre compte.",
        "login_title": "Connexion",
        "sign_in_desc": "Veuillez entrer vos identifiants pour accéder à votre compte",
        "email_address": "Adresse E-mail",
        "password": "Mot de passe",
        "login_button": "Se connecter",
        "no_account": "Pas encore de compte ?",
        "register_link": "S'inscrire ici",
        "back_to_home": "Retour à l'accueil",
        "errors": {
          "email_req": "E-mail requis",
          "email_inv": "E-mail invalide",
          "pass_req": "Mot de passe requis",
          "pass_min": "Le mot de passe doit contenir au moins 6 caractères"
        }
      },
      "product_page": {
        "back_to_products": "Retour aux Produits",
        "not_found": "Produit non trouvé",
        "in_stock": "En Stock",
        "out_of_stock": "En rupture de stock",
        "description": "Description",
        "add_to_cart": "Ajouter au panier",
        "wishlist": "Ajouter aux favoris",
        "free_shipping": "Livraison Gratuite",
        "on_orders_above": "Sur les commandes supérieures à",
        "returns": "Retours Faciles",
        "days_return": "jours de politique de retour",
        "you_may_like": "Vous pourriez aussi aimer",
        "price_label": "Prix"
      },
      "categories": {
        "banner": {
          "title": "Explorez Nos Catégories",
          "subtitle": "Découvrez les meilleurs produits parmi notre large gamme de catégories soigneusement sélectionnées.",
          "cta": "Voir Tous les Produits"
        },
        "items": {
          "electronics": "Électronique",
          "fashion": "Mode",
          "home": "Maison & Jardin",
          "audio": "Audio & Musique",
          "accessories": "Accessoires",
          "gaming": "Jeux Vidéo",
          "count": "Articles"
        }
      },
      "products": {
        "title": "Nos Produits",
        "description": "Découvrez notre collection de technologies et d'électronique haut de gamme.",
        "banner": {
          "title": "Passez à la génération M3",
          "subtitle": "Obtenez jusqu'à 200 $ de crédit de reprise lors de la mise à niveau de votre ancien MacBook.",
          "cta": "Explorer maintenant"
        },
        "filter": {
          "title": "Filtrer et Trier",
          "subtitle": "Affinez votre expérience de navigation",
          "category": "Catégorie",
          "sort_by": "Trier par",
          "all_categories": "Toutes les catégories",
          "electronics": "Électronique",
          "fashion": "Mode",
          "home": "Maison & Jardin",
          "newest": "Nouveaux arrivages",
          "popular": "Les plus populaires",
          "price_low": "Prix : Croissant",
          "price_high": "Prix : Décroissant"
        }
      },
      "reviews": {
        "title": "Avis Clients",
        "subtitle": "Découvrez ce que les autres disent de ce produit",
        "write_review": "Écrire un avis",
        "rating": "Votre Note",
        "comment": "Votre Commentaire",
        "placeholder": "Qu'avez-vous pensé du produit ?",
        "submit": "Publier l'avis",
        "success": "Avis publié avec succès !"
      },
      "dashboard": {
        "welcome": "Bon retour, Admin 👋",
        "sidebar": {
          "dashboard": "Tableau de Bord",
          "users": "Utilisateurs",
          "products": "Produits",
          "categories": "Catégories",
          "settings": "Paramètres",
          "logout": "Déconnexion"
        },
        "stats": {
          "total_users": "Total Utilisateurs",
          "total_products": "Total Produits",
          "total_categories": "Total Catégories",
          "see_all": "Voir tout",
          "manage_all": "Tout gérer"
        },
        "transactions": {
          "title": "Transactions Récentes",
          "export": "Exporter PDF",
          "id": "ID Transaction",
          "customer": "Client",
          "amount": "Montant",
          "date": "Date",
          "status": "Statut",
          "action": "Action",
          "completed": "terminé",
          "pending": "en attente",
          "cancelled": "annulé"
        },
        "wishlist": {
          "title": "Ma Liste de Souhaits",
          "items": "articles enregistrés dans votre liste",
          "back": "Retour à la Boutique",
          "add_to_cart": "Ajouter au Panier",
          "empty": "Votre liste de souhaits est vide",
          "empty_desc": "Enregistrez les articles que vous aimez pour les retrouver facilement plus tard.",
          "explore": "Explorer les Produits"
        },
        "cart": {
          "title": "Panier",
          "items_count": "articles dans votre panier",
          "back": "Retour à la Boutique",
          "clear": "Vider le Panier",
          "summary": "Résumé de la Commande",
          "subtotal": "Sous-total",
          "shipping": "Livraison",
          "free": "GRATUIT",
          "total": "Total",
          "checkout": "Commander",
          "empty": "Votre panier est vide",
          "empty_desc": "Il semble que vous n'ayez encore rien ajouté à votre panier. Trouvons quelque chose d'incroyable pour vous !",
          "start_shopping": "Commencer vos achats"
        }
      }
    }
  },
  es: {
    translation: {
      "nav": {
        "home": "Inicio",
        "products": "Productos",
        "categories": "Categorías",
        "contact": "Contacto",
        "login": "Acceso",
        "register": "Registrarse",
        "profile": "Perfil",
        "dashboard": "Tablero"
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
        "message": "Message",
        "send_message": "Enviar Mensaje",
        "sending": "Enviando...",
        "success": "Formulario enviado con éxito",
        "our_story_title": "Nuestra Historia",
        "our_story_desc": "Fundada en el corazón de la innovación, SmartShop comenzó con una misión simple: hacer que la tecnología de primera calidad sea accesible para todos. Creemos que la tecnología debe empoderar, inspirar y conectar a las personas en todo el mundo.",
        "find_us": "Encuéntranos",
        "visit_us": "Visite nuestra tienda física en Agadir"
      },
      "footer": {
        "description": "Elevando su experiencia tecnológica con productos premium. Únase al futuro de la electrónica hoy.",
        "shop": "Tienda",
        "company": "Empresa",
        "support": "Soporte",
        "made_with": "Hecho con",
        "for_lovers": "para amantes de la tech"
      },
      "register_page": {
        "welcome": "Bienvenido a",
        "welcome_desc": "¡Estamos encantados de tenerte aquí! Únete a nuestra comunidad de entusiastas y vive el futuro de las compras.",
        "email_verify": "Verificación de Correo",
        "email_verify_desc": "Por tu seguridad, necesitamos verificar tu correo electrónico antes de continuar.",
        "check_inbox": "Revisa tu",
        "inbox": "Bandeja de entrada",
        "check_inbox_desc": "¡Casi listo! Hemos enviado un código de 6 dígitos a",
        "verify_account": "Verificar Cuenta",
        "verify_account_desc": "Por favor, introduce el código y completa tu perfil a continuación.",
        "back_to_shop": "Volver a SmartShop",
        "create_account": "Crear Cuenta",
        "step_1": "Paso 1 de 2: Información básica",
        "full_name": "Nombre completo",
        "email_address": "Correo electrónico",
        "next_step": "Siguiente paso",
        "cancel": "Cancelar",
        "already_have_account": "¿Ya tienes una cuenta?",
        "login_here": "Inicia sesión aquí",
        "final_step": "Paso final",
        "complete_profile": "Completa tu perfil",
        "name_label": "Nombre",
        "email_label": "Correo",
        "otp": "Código de verificación (OTP)",
        "password": "Crear contraseña",
        "confirm_password": "Confirmar contraseña",
        "profile_picture": "Foto de perfil (Opcional)",
        "img_specs": "JPG, PNG o JPEG. Máx. 2MB.",
        "complete_registration": "Completar registro",
        "go_back": "Volver al paso 1",
        "address": "Dirección",
        "phone_number": "Número de Teléfono",
        "errors": {
          "name_req": "Nombre requerido",
          "name_min": "Mínimo 3 caracteres",
          "email_req": "Correo requerido",
          "email_inv": "Correo inválido",
          "otp_req": "OTP requerido",
          "pass_req": "Contraseña requerida",
          "pass_match": "Las contraseñas no coinciden",
          "img_type": "Solo JPG, JPEG y PNG",
          "img_size": "Máximo 2MB",
          "adress_req": "La dirección es requerida",
          "phone_req": "El número de teléfono es requerido"
        }
      },
    "login_page": {
      "welcome": "Bienvenido de nuevo",
      "welcome_desc": "¡Te extrañamos! Inicia sesión para acceder a tu cuenta.",
      "login_title": "Iniciar Sesión",
      "sign_in_desc": "Por favor, ingrese sus credenciales para acceder a su cuenta",
      "email_address": "Correo Electrónico",
      "password": "Contraseña",
      "login_button": "Entrar",
      "no_account": "¿No tienes una cuenta?",
      "register_link": "Regístrate aquí",
      "back_to_home": "Volver al inicio",
      "errors": {
        "email_req": "Correo requerido",
        "email_inv": "Correo inválido",
        "pass_req": "Contraseña requerida",
        "pass_min": "La contraseña debe tener al menos 6 caracteres"
      }
    },
    "notFound": {
      "oops": "¡Vaya!",
      "title": "Página No Encontrada.",
      "message": "La página que buscas no existe o ha sido movida. Volvamos al camino correcto.",
      "returnHome": "Volver al Inicio",
      "goBack": "Volver"
    },
    "product_page": {
      "back_to_products": "Volver a Productos",
      "not_found": "Producto no encontrado",
      "in_stock": "En Stock",
      "out_of_stock": "Agotado",
      "description": "Descripción",
      "add_to_cart": "Añadir al carrito",
      "wishlist": "Añadir a deseos",
      "free_shipping": "Envío Gratis",
      "on_orders_above": "En pedidos superiores a",
      "returns": "Devoluciones Fáciles",
      "days_return": "días de política de devolución",
      "you_may_like": "También te puede interesar",
      "price_label": "Precio"
    },
    "categories": {
      "banner": {
        "title": "Explora Nuestras Categorías",
        "subtitle": "Descubre los mejores productos de nuestra amplia gama de categorías cuidadosamente seleccionadas.",
        "cta": "Ver Todos los Productos"
      },
      "items": {
        "electronics": "Electrónica",
        "fashion": "Moda",
        "home": "Hogar y Jardín",
        "audio": "Audio y Música",
        "accessories": "Accesorios",
        "gaming": "Juegos",
        "count": "Artículos"
      }
    },
    "products": {
      "title": "Nuestros Productos",
      "description": "Descubre nuestra colección cuidadosamente seleccionada de tecnología y electrónica premium.",
      "banner": {
        "title": "Actualízate a la Generación M3",
        "subtitle": "Obtén hasta $200 de crédito de canje al actualizar tu viejo MacBook.",
        "cta": "Explorar ahora"
      },
      "filter": {
        "title": "Filtrar y Ordenar",
        "subtitle": "Refine su experiencia de navegación",
        "category": "Categoría",
        "sort_by": "Ordenar por",
        "all_categories": "Todas las categorías",
        "electronics": "Electrónica",
        "fashion": "Moda",
        "home": "Hogar y Jardín",
        "newest": "Nuevas llegadas",
        "popular": "Más populares",
        "price_low": "Precio: De menor a mayor",
        "price_high": "Precio: De mayor a menor"
      }
    },
    "reviews": {
      "title": "Opiniones de Clientes",
      "subtitle": "Mira lo que otros dicen sobre este producto",
      "write_review": "Escribir una Opinión",
      "rating": "Tu Calificación",
      "comment": "Tu Comentario",
      "placeholder": "¿Qué te pareció el producto?",
      "submit": "Publicar Opinión",
      "success": "¡Opinión publicada con éxito!"
      },
      "dashboard": {
        "welcome": "Bienvenido de nuevo, Admin 👋",
        "sidebar": {
          "dashboard": "Tablero",
          "users": "Usuarios",
          "products": "Productos",
          "categories": "Categorías",
          "settings": "Ajustes",
          "logout": "Cerrar sesión"
        },
        "stats": {
          "total_users": "Total Usuarios",
          "total_products": "Total Productos",
          "total_categories": "Total Categorías",
          "see_all": "Ver todo",
          "manage_all": "Gestionar todo"
        },
        "transactions": {
          "title": "Transacciones Recientes",
          "export": "Exportar PDF",
          "id": "ID de Transacción",
          "customer": "Cliente",
          "amount": "Monto",
          "date": "Fecha",
          "status": "Estado",
          "action": "Acción",
          "completed": "completado",
          "pending": "pendiente",
          "cancelled": "cancelado"
        }
      },
        "wishlist": {
          "title": "Mi Lista de Deseos",
          "items": "artículos guardados en tu lista",
          "back": "Volver a la Tienda",
          "add_to_cart": "Añadir al Carrito",
          "empty": "Tu lista de deseos está vacía",
          "empty_desc": "Guarda los artículos que te gustan para encontrarlos fácilmente más tarde.",
          "explore": "Explorar Productos"
        },
        "cart": {
          "title": "Carrito de Compras",
          "items_count": "artículos en tu bandeja",
          "back": "Volver a la Tienda",
          "clear": "Vaciar Carrito",
          "summary": "Resumen del Pedido",
          "subtotal": "Subtotal",
          "shipping": "Envío",
          "free": "GRATIS",
          "total": "Total",
          "checkout": "Pagar Ahora",
          "empty": "Tu carrito está vacío",
          "empty_desc": "Parece que aún no has añadido nada a tu carrito. ¡Encontremos algo increíble para ti!",
          "start_shopping": "Empezar a Comprar"
        }
      }
    }
  }
;

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
