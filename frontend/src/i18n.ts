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
        "dashboard": "Dashboard",
        "wishlist": "Wishlist",
        "cart": "Cart",
        "explore": "Explore",
        "light_mode": "LIGHT MODE",
        "night_mode": "NIGHT MODE",
        "limited_offer": "Limited Time Offer"
      },
      "common": {
        "back_to_profile": "Back to Profile",
        "back_to_dashboard": "Back to Dashboard",
        "logout_success": "Logged out successfully",
        "logout_failed": "Logout failed",
        "error": "Error",
        "user": "User"
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
        "trending": "Trending",
        "badges": {
          "rating": "4.9/5 Rating",
          "shipping": "Express Shipping",
          "secure": "Secure Checkout"
        }
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
        },
        "description": "Explore our wide range of premium collections designed for modern living."
      },
      "comments": {
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
        "joined": "Joined by 12,000+ shoppers",
        "badge": "Testimonials",
        "list": {
          "1": {
            "name": "Mohamed El Mansouri",
            "comment": "This e-commerce platform has redefined what shopping online should feel like. The attention to detail is mind-blowing. Truly premium experience."
          },
          "2": {
            "name": "Fatima Zohra",
            "comment": "Great experience with SmartShop! The technical support and product quality are top-tier. I highly recommend them for any tech needs. Innovation at its best."
          },
          "3": {
            "name": "Youssef Amrani",
            "comment": "The interface is seamless, making shopping an absolute joy. Innovative features and user-friendly design. Keep up the amazing work!"
          }
        }
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
        "name_placeholder": "John Doe",
        "email_placeholder": "john@example.com",
        "message_placeholder": "How can we help you?",
        "send_message": "Send Message",
        "sending": "Sending....",
        "success": "Form Submitted Successfully",
        "our_story_title": "Our Story",
        "our_story_desc": "Founded in the heart of innovation, SmartShop began with a simple mission: to make premium technology accessible to everyone. We believe that technology should empower, inspire, and connect people across the globe.",
        "find_us": "Find Us",
        "visit_us": "Visit our physical store in Agadir",
        "location_val": "Agadir. Morocco",
        "phone_val": "0712074402",
        "email_val": "support@smartshop.com"
      },
      "footer": {
        "description": "Elevating your tech experience with premium products and clinical precision. Join the future of electronics today.",
        "shop": "Shop",
        "company": "Company",
        "support": "Support",
        "made_with": "Made with",
        "for_lovers": "for tech lovers",
        "follow_me": "Follow Me",
        "rights": "All rights reserved"
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
        "free_shipping": "Shipping from 103 MAD (Rival apply)",
        "on_orders_above": "On orders above",
        "returns": "Easy Returns",
        "days_return": "days return policy",
        "you_may_like": "You May Also Like",
        "price_label": "Price",
        "added_to_cart_success": "Product added to cart!",
        "added_to_cart_error": "Failed to add product to cart",
        "added_to_wishlist_success": "Product added to wishlist!",
        "removed_from_wishlist_success": "Product removed from wishlist!"
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
        "featured_picks": "Editor's Picks",
        "banner": {
          "title": "Upgrade to the M3 Generation",
          "subtitle": "Get up to 200 MAD trade-in credit when you upgrade your old MacBook.",
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
          "price_high": "Price: High to Low",
          "min_price": "Min Price",
          "max_price": "Max Price",
          "no_results": "No products found matches your criteria.",
          "search_placeholder": "Search products...",
          "search_title": "Find Your Product"
        }
      },
      "reviews": {
        "title": "Customer Reviews",
        "subtitle": "See what others say about this product",
        "write_review": "Write a Review",
        "rating": "Your Rating",
        "comment": "Your Comment",
        "placeholder": "What did you think of the product?",
        "submit": "Post Review",
        "success": "Review posted successfully!"
      },
      "dashboard": {
        "welcome": "Welcome back, Admin 👋",
        "sidebar": {
          "dashboard": "Dashboard",
          "users": "Users",
          "products": "Products",
          "categories": "Categories",
          "ads": "Advertisements",
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
          "shipping": "Shipping (Base 103 MAD)",
          "free": "FREE",
          "total": "Total",
          "checkout": "Checkout Now",
          "empty": "Your cart is empty",
          "empty_desc": "Looks like you haven't added anything to your cart yet. Let's find something amazing for you!",
          "start_shopping": "Start Shopping"
        },
        "ads": {
          "title": "Manage Advertisements",
          "add_new": "Add New Ad",
          "add_short": "Add",
          "tabs": {
            "slider": "Main Sliders",
            "slider_desc": "Huge hero section banners with images.",
            "banner": "Text Banners",
            "banner_desc": "Slim contextual alerts across the shop."
          },
          "stats": {
            "active": "Active"
          },
          "list": {
            "published": "Published"
          },
          "empty": {
            "title": "No Advertisements Found",
            "description": "We couldn't find any {{tab}}s matching your search criteria. Try adjusting your filters or create a new one.",
            "cta": "Create Your First Ad"
          },
          "form": {
            "update_title": "Update Ad Campaign",
            "launch_title": "Launch New Campaign"
          },
          "delete": {
            "title": "Archive Campaign",
            "message": "Are you sure you want to delete the \"{{title}}\" campaign? This will remove it from the customer view immediately."
          },
          "messages": {
            "load_failed": "Failed to load advertisements",
            "delete_success": "{{title}} deleted successfully",
            "delete_failed": "Failed to delete ad"
          }
        }
      },
      "profile": {
        "quick_stats": "Activity Overview",
        "stats": {
          "orders": "Orders",
          "wishlist": "Wishlist"
        },
        "nav": {
          "settings": "Settings",
          "settings_desc": "Update your preferences.",
          "reviews": "Your Reviews",
          "reviews_desc": "Manage your feedback.",
          "logout": "Log out",
          "logout_desc": "Exit your session."
        },
        "contact_us": "Contact Us",
        "support_title": "Premium Support",
        "support_desc": "Need help with an order? Our team is available 24/7.",
        "orders": {
          "title": "Latest Orders",
          "id": "ID",
          "product": "Product",
          "date": "Date",
          "amount": "Amount",
          "status": "Status",
          "view_all": "View All",
          "show_latest": "Show Latest",
          "no_orders": "No orders found.",
          "showing_recent": "Recent Activity Log • Version 2.0"
        },
        "badge": {
          "member_status": "Member Status",
          "loading": "Loading...",
          "status_guide": "Status Guide",
          "level_up": "Level up features",
          "total_orders": "Total Orders",
          "max_rank": "Max Rank Achieved",
          "next": "next",
          "orders_label": "Orders",
          "locked": "Locked",
          "current": "Current",
          "successful_orders": "Successful Orders",
          "status_guide_desc": "Track your orders to unlock massive shipping discounts and exclusive store privileges.",
          "premium_desc": "You've reached the pinnacle of SmartShop! Enjoy 10% discount on shipping, priority customer service and exclusive early access to all products.",
          "master_desc": "You are a shopping legend! Every order counts towards your legacy. Enjoy a massive 50% discount on all shipping costs and legendary status perks.",
          "medium_desc": "You are a regular shopper. Enjoy 5% discount on shipping. Collect more orders to unlock the special Premium rank.",
          "normal_desc": "As a Normal member, you enjoy 1.5% discount on shipping. Keep ordering to reach the Medium tier."
        },
        "settings": {
          "title": "Account Settings",
          "subtitle": "Manage your account preferences and security.",
          "update_title": "Update Profile",
          "update_desc": "Change your personal information, email address, and profile picture.",
          "update_btn": "Edit Information",
          "delete_title": "Delete Account",
          "delete_desc": "Permanently remove your account and all your data. This action cannot be undone.",
          "delete_btn": "Delete Account",
          "delete_modal_title": "Delete Account?",
          "delete_modal_desc": "This action is permanent. All your data, including orders and profile information, will be erased forever. There is no way to restore it.",
          "delete_confirm_pass": "Confirm Password",
          "delete_pass_placeholder": "Enter your password",
          "delete_keep_btn": "Keep Account",
          "delete_confirm_btn": "Delete Forever",
          "delete_error_pass": "Please enter your password to confirm",
          "delete_processing": "Processing your request...",
          "delete_success": "Account deleted successfully",
          "delete_failed": "Failed to delete account. Please check your password."
        },
        "form": {
          "title": "Edit Information",
          "name_placeholder": "e.g. John Doe",
          "email_placeholder": "e.g. john@example.com",
          "address_placeholder": "e.g. 123 Main St, Casablanca",
          "phone_placeholder": "e.g. 0612345678",
          "save_btn": "Save Changes",
          "update_success": "Profile updated successfully",
          "update_failed": "Failed to update profile"
        }
      },
      "cart": {
        "title": "Shopping Cart",
        "items_count": "items in your tray",
        "back": "Back to Shop",
        "clear": "Clear",
        "product_removed": "Product removed",
        "in_stock": "In Stock",
        "empty_title": "Your cart is empty",
        "empty_desc": "Looks like you haven't added anything to your cart yet.",
        "start_shopping": "Start Shopping",
        "summary": "Order Summary",
        "subtotal": "Subtotal",
        "shipping": "Shipping",
        "total": "Total",
        "checkout": "Checkout Now",
        "secure_checkout": "Secure checkout powered by Stripe",
        "order_success_title": "Order Successful!",
        "order_success_desc": "Your order has been placed successfully. Would you like to download your invoice?",
        "download_invoice": "Download Invoice",
        "later": "Maybe Later",
        "download_success": "Invoice downloaded successfully",
        "download_failed": "Failed to download invoice",
        "order_failed": "Failed to create order",
        "cart_update_failed": "Failed to update cart",
        "badge_info": "{{badge}} badge: {{discount}}% discount"
      },
      "wishlist": {
        "title": "My Wishlist",
        "items": "items saved to your wishlist",
        "back": "Back to Shop",
        "add_to_cart": "Add",
        "empty": "Your wishlist is empty",
        "empty_desc": "Save items you love to find them easily later.",
        "explore": "Explore Products",
        "removed_success": "Removed from wishlist",
        "removed_failed": "Failed to remove from wishlist",
        "added_success": "Added to cart!",
        "added_failed": "Failed to add to cart",
        "price_label": "Price"
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
        "dashboard": "لوحة التحكم",
        "wishlist": "المفضلة",
        "cart": "السلة",
        "explore": "استكشف",
        "light_mode": "الوضع النهاري",
        "night_mode": "الوضع الليلي",
        "limited_offer": "عرض لفترة محدودة"
      },
      "common": {
        "back_to_profile": "العودة للملف الشخصي",
        "back_to_dashboard": "العودة للوحة التحكم",
        "logout_success": "تم تسجيل الخروج بنجاح",
        "logout_failed": "فشل تسجيل الخروج",
        "error": "خطأ",
        "user": "مستخدم"
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
        "trending": "الأكثر بحثاً",
        "badges": {
          "rating": "تقييم 4.9/5",
          "shipping": "شحن سريع",
          "secure": "دفع آمن"
        }
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
        },
        "description": "استكشف مجموعتنا الواسعة من المجموعات المميزة المصممة للحياة العصرية."
      },
      "comments": {
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
        "joined": "انضم إلينا أكثر من 12,000 متسوق",
        "badge": "شهادات العملاء",
        "list": {
          "1": {
            "name": "محمد المنصوري",
            "comment": "لقد أعادت هذه المنصة تعريف معنى التسوق عبر الإنترنت. الاهتمام بالتفاصيل مذهل حقاً. تجربة ممتازة بحق."
          },
          "2": {
            "name": "فاطمة الزهراء",
            "comment": "تجربة رائعة مع سمارت شوب! الدعم الفني وجودة المنتج من الطراز الأول. أوصي بهم بشدة لأي احتياجات تقنية. ابتكار في أرقى صوره."
          },
          "3": {
            "name": "يوسف العمراني",
            "comment": "الواجهة سلسة للغاية، مما يجعل التسوق متعة حقيقية. ميزات مبتكرة وتصميم سهل الاستخدام. استمروا في هذا العمل الرائع!"
          }
        }
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
        "name_placeholder": "الاسم الكامل",
        "email_placeholder": "البريد الإلكتروني",
        "message_placeholder": "كيف يمكننا مساعدتك؟",
        "send_message": "إرسال الرسالة",
        "sending": "جاري الإرسال...",
        "success": "تم إرسال النموذج بنجاح",
        "our_story_title": "قصتنا",
        "our_story_desc": "تأسست سمارت شوب في قلب الابتكار ، وبدأت بمهمة بسيطة: جعل التكنولوجيا المتميزة في متناول الجميع. نحن نؤمن بأن التكنولوجيا يجب أن تمكن وتلهم وتربط الناس في جميع أنحاء العالم.",
        "find_us": "تجدنا",
        "visit_us": "قم بزيارة متجرنا في أكادير",
        "location_val": "أكادير، المغرب",
        "phone_val": "0712074402",
        "email_val": "support@smartshop.com"
      },
      "footer": {
        "description": "نرفع مستوى تجربتك التقنية بمنتجات متميزة ودقة سريرية. انضم إلى مستقبل الإلكترونيات اليوم.",
        "shop": "تسوق",
        "company": "الشركة",
        "support": "الدعم",
        "made_with": "صنع بـ",
        "for_lovers": "لعشاق التقنية",
        "follow_me": "تابعنا",
        "rights": "جميع الحقوق محفوظة"
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
        "price_label": "السعر",
        "added_to_cart_success": "تم إضافة المنتج إلى السلة!",
        "added_to_cart_error": "فشل إضافة المنتج إلى السلة",
        "added_to_wishlist_success": "تم إضافة المنتج إلى المفضلة!",
        "removed_from_wishlist_success": "تم إزالة المنتج من المفضلة!"
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
        "featured_picks": "اختيارات المحرر",
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
          "price_high": "السعر: من الأعلى إلى الأقل",
          "min_price": "السعر الأدنى",
          "max_price": "السعر الأعلى",
          "no_results": "لم يتم العثور على منتجات تطابق معاييرك.",
          "search_placeholder": "ابحث عن المنتجات...",
          "search_title": "ابحث عن منتجك"
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
          "ads": "الإعلانات",
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
        },
        "ads": {
          "title": "إدارة الإعلانات",
          "add_new": "إضافة إعلان جديد",
          "add_short": "إضافة",
          "tabs": {
            "slider": "المنزلقات الرئيسية",
            "slider_desc": "لافتات قسم هيرو ضخمة مع صور.",
            "banner": "لافتات نصية",
            "banner_desc": "تنبيهات سياقية رفيعة عبر المتجر."
          },
          "stats": {
            "active": "نشط"
          },
          "list": {
            "published": "تم النشر"
          },
          "empty": {
            "title": "لم يتم العثور على إعلانات",
            "description": "لم نتمكن من العثور على أي {{tab}} تطابق معايير البحث الخاصة بك.",
            "cta": "أنشئ إعلانك الأول"
          },
          "form": {
            "update_title": "تحديث حملة الإعلانات",
            "launch_title": "إطلاق حملة جديدة"
          },
          "delete": {
            "title": "أرشفة الحملة",
            "message": "هل أنت متأكد من أنك تريد حذف حملة \"{{title}}\"؟"
          },
          "messages": {
            "load_failed": "فشل تحميل الإعلانات",
            "delete_success": "تم حذف {{title}} بنجاح",
            "delete_failed": "فشل حذف الإعلان"
          }
        }
      },
      "profile": {
        "quick_stats": "نظرة عامة على النشاط",
        "stats": {
          "orders": "الطلبات",
          "wishlist": "المفضلة"
        },
        "nav": {
          "settings": "الإعدادات",
          "settings_desc": "تحديث تفضيلاتك.",
          "reviews": "تقييماتك",
          "reviews_desc": "إدارة ملاحظاتك.",
          "logout": "تسجيل الخروج",
          "logout_desc": "إنهاء جلستك."
        },
        "contact_us": "اتصل بنا",
        "support_title": "الدعم المميز",
        "support_desc": "هل تحتاج مساعدة في طلب؟ فريقنا متاح على مدار الساعة.",
        "orders": {
          "title": "أحدث الطلبات",
          "id": "الرقم",
          "product": "المنتج",
          "date": "التاريخ",
          "amount": "المبلغ",
          "status": "الحالة",
          "view_all": "عرض الكل",
          "show_latest": "عرض الأحدث",
          "no_orders": "لا توجد طلبات.",
          "showing_recent": "سجل النشاط الأخير • الإصدار 2.0"
        },
        "badge": {
          "member_status": "حالة العضوية",
          "loading": "جاري التحميل...",
          "level_up": "مميزات الترقية",
          "total_orders": "إجمالي الطلبات",
          "max_rank": "تم الوصول لأعلى رتبة",
          "next": "التالي",
          "orders_label": "طلب",
          "locked": "مغلق",
          "current": "الحالي",
          "successful_orders": "طلبات ناجحة",
          "status_guide": "دليل العضوية",
          "status_guide_desc": "تتبع طلباتك لفتح خصومات شحن هائلة وامتيازات متجر حصرية.",
          "premium_desc": "لقد وصلت إلى قمة سمارت شوب! استمتع بخدمة العملاء ذات الأولوية والوصول المبكر الحصري لجميع المنتجات.",
          "medium_desc": "أنت متسوق منتظم. اجمع المزيد من الطلبات لفتح رتبة بريميوم الخاصة.",
          "normal_desc": "كعضو عادي، تتمتع بمزايا قياسية. استمر في الطلب للوصول لرتبة متوسط."
        },
        "settings": {
          "title": "إعدادات الحساب",
          "subtitle": "إدارة تفضيلات حسابك وأمانك.",
          "update_title": "تحديث الملف الشخصي",
          "update_desc": "تغيير معلوماتك الشخصية وعنوان بريدك الإلكتروني وصورتك الشخصية.",
          "update_btn": "تعديل المعلومات",
          "delete_title": "حذف الحساب",
          "delete_desc": "حذف حسابك وجميع بياناتك نهائياً. لا يمكن التراجع عن هذا الإجراء.",
          "delete_btn": "حذف الحساب",
          "delete_modal_title": "حذف الحساب؟",
          "delete_modal_desc": "هذا الإجراء نهائي. سيتم مسح جميع بياناتك، بما في ذلك الطلبات ومعلومات الملف الشخصي، للأبد. لا توجد طريقة لاستعادتها.",
          "delete_confirm_pass": "تأكيد كلمة المرور",
          "delete_pass_placeholder": "أدخل كلمة المرور الخاصة بك",
          "delete_keep_btn": "الاحتفاظ بالحساب",
          "delete_confirm_btn": "حذف للأبد",
          "delete_error_pass": "يرجى إدخال كلمة المرور للتأكيد",
          "delete_processing": "جاري معالجة طلبك...",
          "delete_success": "تم حذف الحساب بنجاح",
          "delete_failed": "فشل حذف الحساب. يرجى التحقق من كلمة المرور الخاصة بك."
        },
        "form": {
          "title": "تعديل المعلومات",
          "name_placeholder": "مثال: يونس ابوريق",
          "email_placeholder": "مثال: mail@example.com",
          "address_placeholder": "مثال: شارع الحسن الثاني، أكادير",
          "phone_placeholder": "مثال: 0612345678",
          "save_btn": "حفظ التغييرات",
          "update_success": "تم تحديث الملف الشخصي بنجاح",
          "update_failed": "فشل تحديث الملف الشخصي"
        }
      },
      "cart": {
        "title": "سلة التسوق",
        "items_count": "منتجات في سلتك",
        "back": "العودة للمتجر",
        "clear": "مسح السلة",
        "product_removed": "تمت إزالة المنتج",
        "in_stock": "متوفر",
        "empty_title": "سلتك فارغة",
        "empty_desc": "يبدو أنك لم تضف أي شيء إلى سلتك بعد.",
        "start_shopping": "ابدأ التسوق",
        "summary": "ملخص الطلب",
        "subtotal": "المجموع الفرعي",
        "shipping": "الشحن",
        "total": "المجموع الكلي",
        "checkout": "الدفع الآن",
        "secure_checkout": "دفع آمن بواسطة Stripe",
        "order_success_title": "تم طلبك بنجاح!",
        "order_success_desc": "لقد تم وضع طلبك بنجاح. هل ترغب في تحميل الفاتورة؟",
        "download_invoice": "تحميل الفاتورة",
        "later": "لاحقاً",
        "download_success": "تم تحميل الفاتورة بنجاح",
        "download_failed": "فشل تحميل الفاتورة",
        "order_failed": "فشل إنشاء الطلب",
        "cart_update_failed": "فشل تحديث السلة",
        "badge_info": "رتبة {{badge}}: خصم {{discount}}%"
      },
      "wishlist": {
        "title": "قائمتي المفضلة",
        "items": "منتجات محفوظة في قائمتك",
        "back": "العودة للمتجر",
        "add_to_cart": "أضف",
        "empty": "قائمة المفضلة فارغة",
        "empty_desc": "احفظ المنتجات التي تحبها لتجدها بسهولة لاحقاً.",
        "explore": "اكتشف المنتجات",
        "removed_success": "تمت الإزالة من المفضلة",
        "removed_failed": "فشل الإزالة من المفضلة",
        "added_success": "تمت الإضافة للسلة!",
        "added_failed": "فشل الإضافة للسلة",
        "price_label": "السعر"
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
        "dashboard": "Tableau de Bord",
        "wishlist": "Favoris",
        "cart": "Panier",
        "explore": "Explorer",
        "light_mode": "MODE JOUR",
        "night_mode": "MODE NUIT",
        "limited_offer": "Offre à Temps Limité"
      },
      "common": {
        "back_to_profile": "Retour au profil",
        "back_to_dashboard": "Retour au tableau de bord",
        "logout_success": "Déconnexion réussie",
        "logout_failed": "Échec de la déconnexion",
        "error": "Erreur",
        "user": "Utilisateur"
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
        "trending": "Tendance",
        "badges": {
          "rating": "Note 4.9/5",
          "shipping": "Livraison Express",
          "secure": "Paiement Sécurisé"
        }
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
        },
        "description": "Explorez notre large gamme de collections premium conçues pour la vie moderne."
      },
      "comments": {
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
        "joined": "Rejoint par 12 000+ acheteurs",
        "badge": "Témoignages",
        "list": {
          "1": {
            "name": "Mohamed El Mansouri",
            "comment": "Cette plateforme e-commerce a redéfini ce que le shopping en ligne devrait être. L'attention aux détails est époustouflante. Une expérience vraiment premium."
          },
          "2": {
            "name": "Fatima Zohra",
            "comment": "Excellente expérience avec SmartShop ! Le support technique et la qualité des produits sont de premier ordre. Je les recommande vivement pour tous vos besoins technologiques."
          },
          "3": {
            "name": "Youssef Amrani",
            "comment": "L'interface est fluide, faisant du shopping un pur plaisir. Des fonctionnalités innovantes et un design convivial. Continuez votre excellent travail !"
          }
        }
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
        "name_placeholder": "Jean Dupont",
        "email_placeholder": "jean@exemple.com",
        "message_placeholder": "Comment pouvons-nous vous aider ?",
        "send_message": "Envoyer",
        "sending": "Envoi en cours...",
        "success": "Formulaire envoyé avec succès",
        "our_story_title": "Notre Histoire",
        "our_story_desc": "Fondé au cœur de l'innovation, SmartShop a commencé avec une mission simple : rendre la technologie premium accessible à tous. Nous pensons que la technologie doit responsabiliser, inspirer et connecter les gens à travers le monde.",
        "find_us": "Nous Trouver",
        "visit_us": "Visitez notre boutique physique à Agadir",
        "location_val": "Agadir, Maroc",
        "phone_val": "0712074402",
        "email_val": "support@smartshop.com"
      },
      "footer": {
        "description": "Élevez votre expérience tech avec des produits premium. Rejoignez le futur de l'électronique dès aujourd'hui.",
        "shop": "Boutique",
        "company": "Entreprise",
        "support": "Support",
        "made_with": "Fait avec",
        "for_lovers": "pour les passionnés",
        "follow_me": "Suivez-moi",
        "rights": "Tous droits réservés"
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
        "price_label": "Prix",
        "added_to_cart_success": "Produit ajouté au panier !",
        "added_to_cart_error": "Échec de l'ajout du produit au panier",
        "added_to_wishlist_success": "Produit ajouté aux favoris !",
        "removed_from_wishlist_success": "Produit retiré des favoris !"
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
        "featured_picks": "Coups de Cœur",
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
          "price_high": "Prix : Décroissant",
          "min_price": "Prix Minimum",
          "max_price": "Prix Maximum",
          "no_results": "Aucun produit trouvé correspondant à vos critères.",
          "search_placeholder": "Rechercher des produits...",
          "search_title": "Trouvez Votre Produit"
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
          "ads": "Publicités",
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
        },
        "ads": {
          "title": "Gérer les Publicités",
          "add_new": "Ajouter une Publicité",
          "add_short": "Ajouter",
          "tabs": {
            "slider": "Sliders Principaux",
            "slider_desc": "Grandes bannières de la section hero avec images.",
            "banner": "Bannières Texte",
            "banner_desc": "Alertes contextuelles minces dans toute la boutique."
          },
          "stats": {
            "active": "Actif"
          },
          "list": {
            "published": "Publié"
          },
          "empty": {
            "title": "Aucune Publicité Trouvée",
            "description": "Nous n'avons trouvé aucun {{tab}} correspondant à vos critères.",
            "cta": "Créer Votre Première Pub"
          },
          "form": {
            "update_title": "Modifier la Campagne",
            "launch_title": "Lancer une Nouvelle Campagne"
          },
          "delete": {
            "title": "Archiver la Campagne",
            "message": "Êtes-vous sûr de vouloir supprimer la campagne \"{{title}}\" ?"
          },
          "messages": {
            "load_failed": "Échec du chargement des publicités",
            "delete_success": "{{title}} supprimé avec succès",
            "delete_failed": "Échec de la suppression de la publicité"
          }
        }
      },
      "profile": {
        "quick_stats": "Aperçu de l'activité",
        "stats": {
          "orders": "Commandes",
          "wishlist": "Favoris"
        },
        "nav": {
          "settings": "Paramètres",
          "settings_desc": "Mettez à jour vos préférences.",
          "reviews": "Vos Avis",
          "reviews_desc": "Gérez vos retours.",
          "logout": "Déconnexion",
          "logout_desc": "Quitter votre session."
        },
        "contact_us": "Contactez-nous",
        "support_title": "Support Premium",
        "support_desc": "Besoin d'aide avec une commande ? Notre équipe est disponible 24h/24.",
        "orders": {
          "title": "Dernières Commandes",
          "id": "ID",
          "product": "Produit",
          "date": "Date",
          "amount": "Montant",
          "status": "Statut",
          "view_all": "Tout Voir",
          "show_latest": "Afficher les Récentes",
          "no_orders": "Aucune commande trouvée.",
          "showing_recent": "Journal d'activité récent • Version 2.0"
        },
        "badge": {
          "member_status": "Statut Membre",
          "loading": "Chargement...",
          "status_guide": "Guide de Statut",
          "level_up": "Fonctionnalités de niveau",
          "total_orders": "Total Commandes",
          "max_rank": "Rang Maximum Atteint",
          "next": "suivant",
          "orders_label": "Commandes",
          "premium_desc": "Vous avez atteint le sommet de SmartShop ! Profitez du service client prioritaire et de l'accès anticipé exclusif à tous les produits.",
          "medium_desc": "Vous êtes un acheteur régulier. Accumulez plus de commandes pour débloquer le rang Premium spécial.",
          "normal_desc": "En tant que membre Normal, vous profitez des avantages standards. Continuez à commander pour atteindre le niveau Moyen."
        },
        "settings": {
          "title": "Paramètres du Compte",
          "subtitle": "Gérez vos préférences de compte et votre sécurité.",
          "update_title": "Mettre à jour le Profil",
          "update_desc": "Modifiez vos informations personnelles, votre adresse e-mail et votre photo de profil.",
          "update_btn": "Modifier les Informations",
          "delete_title": "Supprimer le Compte",
          "delete_desc": "Supprimez définitivement votre compte et toutes vos données. Cette action est irréversible.",
          "delete_btn": "Supprimer le Compte",
          "delete_modal_title": "Supprimer le Compte ?",
          "delete_modal_desc": "Cette action est définitive. Toutes vos données, y compris les commandes et les informations de profil, seront effacées à jamais. Il n'y a aucun moyen de les restaurer.",
          "delete_confirm_pass": "Confirmer le Mot de Passe",
          "delete_pass_placeholder": "Entrez votre mot de passe",
          "delete_keep_btn": "Garder le Compte",
          "delete_confirm_btn": "Supprimer à Jamais",
          "delete_error_pass": "Veuillez entrer votre mot de passe pour confirmer",
          "delete_processing": "Traitement de votre demande...",
          "delete_success": "Compte supprimé avec succès",
          "delete_failed": "Échec de la suppression du compte. Veuillez vérifier votre mot de passe."
        },
        "form": {
          "title": "Modifier les Informations",
          "name_placeholder": "ex: Jean Dupont",
          "email_placeholder": "ex: jean@exemple.com",
          "address_placeholder": "ex: 123 Rue Principale, Agadir",
          "phone_placeholder": "ex: 0612345678",
          "save_btn": "Enregistrer les Modifications",
          "update_success": "Profil mis à jour avec succès",
          "update_failed": "Échec de la mise à jour du profil"
        }
      },
      "cart": {
        "title": "Panier",
        "items_count": "articles dans votre panier",
        "back": "Retour à la boutique",
        "clear": "Vider",
        "product_removed": "Produit retiré",
        "in_stock": "En stock",
        "empty_title": "Votre panier est vide",
        "empty_desc": "Il semble que vous n'ayez encore rien ajouté à votre panier.",
        "start_shopping": "Commencer vos achats",
        "summary": "Résumé de la commande",
        "subtotal": "Sous-total",
        "shipping": "Livraison",
        "total": "Total",
        "checkout": "Payer maintenant",
        "secure_checkout": "Paiement sécurisé par Stripe",
        "order_success_title": "Commande réussie !",
        "order_success_desc": "Votre commande a été passée avec succès. Souhaitez-vous télécharger votre facture ?",
        "download_invoice": "Télécharger la facture",
        "later": "Plus tard",
        "download_success": "Facture téléchargée avec succès",
        "download_failed": "Échec du téléchargement de la facture",
        "order_failed": "Échec de la création de la commande",
        "cart_update_failed": "Échec de la mise à jour du panier",
        "badge_info": "Badge {{badge}} : {{discount}}% de réduction"
      },
      "wishlist": {
        "title": "Ma Liste de Souhaits",
        "items": "articles enregistrés dans votre liste",
        "back": "Retour à la boutique",
        "add_to_cart": "Ajouter",
        "empty": "Votre liste de souhaits est vide",
        "empty_desc": "Enregistrez les articles que vous aimez pour les retrouver facilement plus tard.",
        "explore": "Explorer les Produits",
        "removed_success": "Retiré de la liste de souhaits",
        "removed_failed": "Échec du retrait de la liste",
        "added_success": "Ajouté au panier !",
        "added_failed": "Échec de l'ajout au panier",
        "price_label": "Prix"
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
