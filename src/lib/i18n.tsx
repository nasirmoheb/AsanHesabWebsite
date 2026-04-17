"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export type Locale = "fa" | "en" | "ps";

interface Translations {
  [key: string]: string;
}

interface LanguageInfo {
  code: Locale;
  name: string;
  dir: "rtl" | "ltr";
}

export const languages: LanguageInfo[] = [
  { code: "fa", name: "دری", dir: "rtl" },
  { code: "en", name: "English", dir: "ltr" },
  { code: "ps", name: "پشتو", dir: "rtl" },
];

export function getLanguageInfo(code: Locale): LanguageInfo {
  return languages.find((l) => l.code === code)!;
}

// ═══════════════════════════════════════════
//   TRANSLATION DICTIONARIES
//   ═══════════════════════════════════════════

const fa: Translations = {
  // Navbar
  "nav.features": "ویژگی‌ها",
  "nav.dashboard": "داشبورد",
  "nav.testimonials": "نظرات",
  "nav.pricing": "قیمت‌ها",
  "nav.faq": "سوالات",
  "nav.download": "دانلود رایگان",

  // Hero
  "hero.badge": "نرم‌افزار حسابداری ویژه بازار افغانستان",
  "hero.line1": "مدیریت تجارت شما،",
  "hero.line2_before": "حالا",
  "hero.line2_highlight": "آسان‌تر",
  "hero.line2_after": "از همیشه!",
  "hero.accounting_sw": "نرم‌افزار حسابداری",
  "hero.for_your_biz": "مخصوص کسب‌وکار شما",
  "hero.cta_primary": "دانلود رایگان نسخه آزمایشی",
  "hero.cta_secondary": "تماشای ویدیو",
  "hero.sub_desc": "بدون نیاز به دانش حسابداری — همین امروز شروع کنید!",

  // Rotating phrases
  "phrase.in_dari": "به زبان دری",
  "phrase.no_internet": "بدون اینترنت",
  "phrase.solar_calendar": "تقویم شمسی",
  "phrase.simple": "ساده و آسان",
  "phrase.offline": "کاملاً آفلاین",

  // Trust signals
  "trust.install": "نصب در ۵ دقیقه",
  "trust.offline": "بدون نیاز به اینترنت",
  "trust.support": "پشتیبانی دایمی",
  "trust.secure": "کاملاً آفلاین و امن",
  "trust.active_users": "+۵,۰۰۰",
  "trust.users_label": "کاربر فعال",
  "trust.satisfied_users": "کاربر راضی",

  // Stats
  "stat.active_users": "کاربر فعال",
  "stat.invoices": "فاکتور صادر شده",
  "stat.provinces": "ولایت تحت پوشش",
  "stat.satisfaction": "رضایت مشتریان",

  // Marquee trust items
  "marquee.secure": "امن و مطمئن",
  "marquee.no_internet": "بدون اینترنت",
  "marquee.dari": "به زبان دری",
  "marquee.solar": "تقویم شمسی",
  "marquee.fast": "سریع و آسان",
  "marquee.data_protection": "محافظت از داده‌ها",
  "marquee.desktop": "برای دسکتاپ",
  "marquee.offline_storage": "ذخیره آفلاین",

  // Problem section
  "problem.badge": "آیا شما هم این مشکلات را دارید؟",
  "problem.title_before": "مشکلاتی که کسب‌وکار شما را",
  "problem.title_highlight": "متوقف",
  "problem.title_after": "می‌کند",
  "problem.paper": "حساب و کتاب کاغذی",
  "problem.paper_desc": "دفترچه‌های پراکنده که پیدا کردن یک فاکتور را غیرممکن می‌کند.",
  "problem.english_sw": "نرم‌افزارهای انگلیسی",
  "problem.english_sw_desc": "نرم‌افزار خارجی که زبان و تقویمش با شما فرق دارد.",
  "problem.opacity": "عدم شفافیت مالی",
  "problem.opacity_desc": "نمی‌دانید چقدر سود کرده‌اید و وضعیت مالی‌تان چیست.",
  "problem.time_waste": "هدر رفتن وقت",
  "problem.time_waste_desc": "ساعت‌ها وقت صرف محاسبات دستی می‌کنید.",
  "problem.unprofessional": "فاکتورهای غیرحرفه‌ای",
  "problem.unprofessional_desc": "فاکتورهای دستی که اعتبار شما را زیر سوال می‌برند.",
  "problem.data_loss": "خطر از دست رفتن اطلاعات",
  "problem.data_loss_desc": "یک ورقه گم‌شده اطلاعات مهم مالی را نابود می‌کند.",

  // Features section
  "features.badge": "ویژگی‌های قدرتمند",
  "features.title_before": "همه چیز آن چیزی است که",
  "features.title_highlight": "نیاز دارید",
  "features.f1_title": "کاملاً به زبان دری",
  "features.f1_desc": "تمام رابط کاربری، گزارش‌ها و تنظیمات به زبان دری و پشتو طراحی شده است.",
  "features.f2_title": "تقویم هجری شمسی",
  "features.f2_desc": "تمام تاریخ‌ها و گزارش‌ها به تاریخ شمسی نمایش داده می‌شوند.",
  "features.f3_title": "ساده برای همه",
  "features.f3_desc": "حتی بدون دانش حسابداری می‌توانید به راحتی کار کنید.",
  "features.f4_title": "صدور فاکتور",
  "features.f4_desc": "با چند کلیک فاکتورهای حرفه‌ای صادر کنید و ارسال نمایید.",
  "features.f5_title": "گزارش‌های هوشمند",
  "features.f5_desc": "داشبورد با نمودارهای زیبا و قابل فهم، لحظه‌ای و دقیق.",
  "features.f6_title": "امنیت کامل",
  "features.f6_desc": "رمزگذاری پیشرفته و پشتیبان‌گیری خودکار روزانه.",
  "features.f7_title": "نصب آسان",
  "features.f7_desc": "به راحتی روی کامپیوتر خود نصب کنید و بدون نیاز به اینترنت کار کنید.",
  "features.f8_title": "پول افغانی",
  "features.f8_desc": "تمام محاسبات به واحد پول افغانی بدون نیاز به تبدیل ارز.",

  // Bento features
  "bento.title_before": "یک نگاه به قدرت ",
  "bento.title_highlight": "آسان حساب",
  "bento.smart_dashboard": "داشبورد مدیریتی هوشمند",
  "bento.smart_dashboard_desc": "با یک نگاه، تصویر کامل مالی کسب‌وکار خود را ببینید. نمودارهای تعاملی، شاخص‌های کلیدی و گزارش‌های لحظه‌ای همه در یک صفحه.",
  "bento.instant_invoice": "فاکتور آنی",
  "bento.instant_invoice_desc": "در کمتر از ۳۰ ثانیه فاکتور حرفه‌ای بسازید.",
  "bento.auto_backup": "پشتیبان‌گیری خودکار",
  "bento.auto_backup_desc": "پشتیبان‌گیری خودکار اطلاعات روی کامپیوتر شما انجام می‌شود.",
  "bento.local_support": "پشتیبانی محلی",
  "bento.local_support_desc": "تیم پشتیبانی به زبان دری همیشه در دسترس است.",
  "bento.solar_cal": "تقویم هجری",
  "bento.solar_cal_desc": "تاریخ‌ها و گزارش‌ها به تقویم شمسی.",

  // Dashboard section
  "dashboard.title": "داشبورد ساده و قدرتمند",
  "dashboard.desc": "با یک نگاه، وضعیت کامل مالی کسب‌وکار خود را ببینید",
  "dashboard.pill1": "تقویم هجری شمسی",
  "dashboard.pill2": "گزارش لحظه‌ای",
  "dashboard.pill3": "فاکتور خودکار",
  "dashboard.pill4": "نمودارهای تعاملی",

  // How it works
  "how.badge": "شروع آسان",
  "how.title": "در سه قدم شروع کنید",
  "how.step1_title": "دانلود و نصب",
  "how.step1_desc": "نرم‌افزار را دانلود و در کمتر از یک دقیقه نصب کنید. بدون نیاز به اینترنت.",
  "how.step2_title": "تنظیم کسب‌وکار",
  "how.step2_desc": "ویزارد هوشمند به شما کمک می‌کند تا اطلاعات اولیه را وارد کنید.",
  "how.step3_title": "شروع حسابداری",
  "how.step3_desc": "فاکتور صادر کنید، گزارش ببینید. همین امروز!",

  // Business types
  "biz.title": "مناسب برای هر نوع کسب‌وکار",
  "biz.stores": "فروشگاه‌ها",
  "biz.transport": "حمل‌ونقل",
  "biz.trade": "بازرگانی",
  "biz.restaurants": "رستوران‌ها",
  "biz.education": "موسسات آموزشی",
  "biz.clinics": "کلینیک‌ها",

  // Testimonials
  "testimonials.badge": "صدای مشتریان",
  "testimonials.title_before": "آن‌ها آسان حساب را ",
  "testimonials.title_highlight": "دوست دارند",
  "t1.name": "محمد احمد رحیمی",
  "t1.role": "صاحب فروشگاه لوازم الکترونیک، کابل",
  "t1.text": "قبل از آسان حساب، حسابداری فروشگاهم را در دفترچه یادداشت می‌کردم. حالا همه چیز راحت و مرتب است. واقعاً زندگیم را تغییر داد!",
  "t2.name": "فاطمه نوری",
  "t2.role": "مدیر شرکت بازرگانی، هرات",
  "t2.text": "به عنوان یک زن کارآفرین، داشتن نرم‌افزار حسابداری به زبان دری برای من خیلی مهم بود. آسان حساب بهترین انتخاب من بود.",
  "t3.name": "حاجی عبدالسلام",
  "t3.role": "صاحب شرکت حمل و نقل، مزار شریف",
  "t3.text": "من هیچ دانش حسابداری ندارم ولی با آسان حساب به راحتی درآمد و هزینه‌های شرکت حمل‌ونقل‌ام را مدیریت می‌کنم. عالی است!",
  "t4.name": "زهرا موسوی",
  "t4.role": "دارنده بوتیک پوشاک، قندهار",
  "t4.text": "تقویم هجری شمسی و زبان دری باعث شد آسان حساب را انتخاب کنم. خیلی راحت فاکتور صادر می‌کنم و مشتریانم راضی هستند.",
  "t5.name": "غلام حیدر",
  "t5.role": "صاحب رستوران، جلال‌آباد",
  "t5.text": "آسان حساب کمک کرد تا هزینه‌های رستورانم را کنترل کنم و سودآوری‌ام را افزایش دهم.",
  "t6.name": "مریم صدیقی",
  "t6.role": "مدیر موسسه آموزشی، بامیان",
  "t6.text": "مدیریت شهریه دانش‌آموزان و هزینه‌های موسسه قبل از آسان حساب خیلی سخت بود. حالا همه چیز سیستماتیک و شفاف است.",

  // Pricing
  "pricing.badge": "قیمت‌گذاری منصفانه",
  "pricing.title": "پلنی مناسب هر کسب‌وکار",
  "pricing.subtitle": "نسخه آزمایشی رایگان — بدون نیاز به اینترنت",
  "pricing.basic": "پایه",
  "pricing.basic_price": "۲,۵۰۰",
  "pricing.basic_period": "افغانی / ماهانه",
  "pricing.basic_desc": "کسب‌وکارهای کوچک",
  "pricing.basic_f1": "یک کاربر",
  "pricing.basic_f2": "صدور فاکتور نامحدود",
  "pricing.basic_f3": "گزارش سود و زیان",
  "pricing.basic_f4": "تقویم هجری شمسی",
  "pricing.basic_f5": "پشتیبانی تلفنی",
  "pricing.pro": "حرفه‌ای",
  "pricing.pro_price": "۵,۵۰۰",
  "pricing.pro_period": "افغانی / ماهانه",
  "pricing.pro_desc": "کسب‌وکارهای متوسط",
  "pricing.pro_f1": "۵ کاربر",
  "pricing.pro_f2": "تمام امکانات پایه",
  "pricing.pro_f3": "مدیریت موجودی انبار",
  "pricing.pro_f4": "گزارش‌های پیشرفته",
  "pricing.pro_f5": "نصب روی چند کامپیوتر",
  "pricing.pro_f6": "پشتیبانی تلفنی ۲۴/۷",
  "pricing.pro_f7": "بکاپ خودکار روزانه",
  "pricing.org": "سازمانی",
  "pricing.org_price": "۱۲,۰۰۰",
  "pricing.org_period": "افغانی / ماهانه",
  "pricing.org_desc": "شرکت‌ها و سازمان‌ها",
  "pricing.org_f1": "کاربران نامحدود",
  "pricing.org_f2": "تمام امکانات حرفه‌ای",
  "pricing.org_f3": "گزارش مالیاتی",
  "pricing.org_f4": "مدیریت چند شعبه",
  "pricing.org_f5": "API اختصاصی",
  "pricing.org_f6": "آموزش تیم",
  "pricing.org_f7": "پشتیبانی VIP",
  "pricing.popular": "محبوب‌ترین انتخاب",
  "pricing.download": "دانلود رایگان",
  "pricing.contact": "تماس بگیرید",

  // FAQ
  "faq.title": "سوالات متداول",
  "faq.q1": "آیا استفاده از آسان حساب نیاز به دانش حسابداری دارد؟",
  "faq.a1": "خیر، اصلاً! آسان حساب مخصوص افرادی طراحی شده که هیچ دانش حسابداری ندارند. رابط کاربری به زبان دری و بسیار ساده است. با چند کلیک می‌توانید فاکتور صادر کنید و گزارش‌ها را ببینید. ویدیوهای آموزشی رایگان به زبان دری نیز موجود است.",
  "faq.q2": "آیا تقویم هجری شمسی پشتیبانی می‌شود؟",
  "faq.a2": "بله، به صورت کامل. تمام تاریخ‌ها، گزارش‌ها، فاکتورها و صورت‌حساب‌ها به تاریخ شمسی نمایش داده می‌شوند. امکان تبدیل تاریخ بین شمسی و میلادی نیز وجود دارد.",
  "faq.q3": "آیا برای استفاده نیاز به اینترنت دارم؟",
  "faq.a3": "خیر! آسان حساب کاملاً آفلاین کار می‌کند. بدون نیاز به اینترنت، تمام عملیات حسابداری، صدور فاکتور و گزارش‌گیری را انجام دهید. اطلاعات شما فقط روی کامپیوتر خودتان ذخیره می‌شود.",
  "faq.q4": "اطلاعات مالی من چقدر امن است؟",
  "faq.a4": "بالاترین سطح امنیت: رمزگذاری پیشرفته اطلاعات، پشتیبان‌گیری خودکار روی کامپیوتر شما، بدون ارسال اطلاعات به اینترنت. تمام داده‌های مالی شما فقط روی دستگاه خودتان ذخیره می‌شود.",
  "faq.q5": "آیا نسخه رایگان وجود دارد؟",
  "faq.a5": "بله! نسخه آزمایشی رایگان با تمام امکانات. بدون نیاز به اینترنت و بدون تعهد.",

  // Final CTA
  "cta.title_line1": "آینده مالی کسب‌وکارتان",
  "cta.title_line2": "از همین لحظه شروع می‌شود",
  "cta.desc": "هزاران کاربر افغان پیش از شما این تصمیم را گرفته‌اند. به آن‌ها بپیوندید و مدیریت مالی خود را برای همیشه متحول کنید.",
  "cta.download": "دانلود رایگان",
  "cta.contact": "تماس با ما",
  "cta.note": "بدون نیاز به اینترنت • کاملاً آفلاین • هر وقت بخواهید",

  // Footer
  "footer.cta_title": "آماده شروع هستید؟",
  "footer.cta_desc": "همین حالا آسان حساب را دانلود و شروع کنید.",
  "footer.brand_desc": "اولین نرم‌افزار حسابداری به زبان دری با تقویم هجری شمسی، مخصوص بازار افغانستان.",
  "footer.product": "محصول",
  "footer.product_features": "ویژگی‌ها",
  "footer.product_pricing": "قیمت‌ها",
  "footer.product_updates": "آپدیت‌ها",
  "footer.product_desktop": "نسخه دسکتاپ",
  "footer.company": "شرکت",
  "footer.company_about": "درباره ما",
  "footer.company_contact": "تماس با ما",
  "footer.company_blog": "بلاگ",
  "footer.company_careers": "فرصت‌ها",
  "footer.support": "پشتیبانی",
  "footer.support_help": "مرکز راهنما",
  "footer.support_tutorials": "آموزش ویدیویی",
  "footer.support_faq": "سوالات متداول",
  "footer.support_phone": "تماس تلفنی",
  "footer.copyright": "تمام حقوق محفوظ است © آسان حساب ۱۴۰۴",

  // Hero dashboard card labels
  "card.auto_record": "ثبت خودکار",
  "card.revenue": "درآمد کل",
  "card.invoices": "فاکتورها",
  "card.customers": "مشتریان",
  "card.monthly_chart": "نمودار ماهانه",
  "card.weekly_activity": "فعالیت هفتگی",
  "card.recent_tx": "آخرین تراکنش‌ها",
  "card.today": "امروز",
  "card.offline": "آفلاین",
  "card.new_invoice": "فاکتور جدید",
  "card.register_customer": "ثبت مشتری",
  "card.add_items": "افزودن اقلام",
  "card.confirm_send": "تایید و ارسال",
  "card.total_amount": "مبلغ کل: ",
  "card.afi": "افغانی",
  "card.management_dashboard": "داشبورد مدیریت",

  // Floating cards
  "float.revenue_growth": "رشد درآمد",
  "float.customer_satisfaction": "رضایت مشتری",
  "float.today_invoices": "فاکتور امروز",
  "float.ssl": "SSL امن",
  "float.protected": "محافظت شده",
  "float.invoice_count": "۱۲ عدد",

  // New translation keys for components
  "bento.heading_before": "یک نگاه به قدرت",
  "dashboard.browser_url": "آسان حساب — داشبورد مدیریت",
  "dashboard.alt_text": "داشبورد آسان حساب",
  "how.step1_num": "۱",
  "how.step2_num": "۲",
  "how.step3_num": "۳",
  "cta.social_proof": "هزاران کاربر افغان پیش از شما این تصمیم را گرفته‌اند.",
  "cta.social_proof_cta": "به آن‌ها بپیوندید و مدیریت مالی خود را برای همیشه متحول کنید.",
  "cta.download_free": "دانلود رایگان",
  "cta.offline_note": "بدون نیاز به اینترنت • کاملاً آفلاین • هر وقت بخواهید",
  "footer.privacy": "حریم خصوصی",
  "footer.terms": "شرایط استفاده",
};

const en: Translations = {
  // Navbar
  "nav.features": "Features",
  "nav.dashboard": "Dashboard",
  "nav.testimonials": "Testimonials",
  "nav.pricing": "Pricing",
  "nav.faq": "FAQ",
  "nav.download": "Free Download",

  // Hero
  "hero.badge": "Accounting Software Built for Afghanistan's Market",
  "hero.line1": "Manage Your Business,",
  "hero.line2_before": "Now ",
  "hero.line2_highlight": "Easier",
  "hero.line2_after": "Than Ever!",
  "hero.accounting_sw": "Accounting Software",
  "hero.for_your_biz": "For Your Business",
  "hero.cta_primary": "Download Free Trial",
  "hero.cta_secondary": "Watch Video",
  "hero.sub_desc": "No accounting knowledge needed — start today!",

  // Rotating phrases
  "phrase.in_dari": "In Dari Language",
  "phrase.no_internet": "No Internet Needed",
  "phrase.solar_calendar": "Solar Calendar",
  "phrase.simple": "Simple & Easy",
  "phrase.offline": "Fully Offline",

  // Trust signals
  "trust.install": "Install in 5 Minutes",
  "trust.offline": "No Internet Required",
  "trust.support": "Always Available Support",
  "trust.secure": "Completely Offline & Secure",
  "trust.active_users": "+5,000",
  "trust.users_label": "Active Users",
  "trust.satisfied_users": "Satisfied Users",

  // Stats
  "stat.active_users": "Active Users",
  "stat.invoices": "Invoices Issued",
  "stat.provinces": "Provinces Covered",
  "stat.satisfaction": "Customer Satisfaction",

  // Marquee trust items
  "marquee.secure": "Secure & Reliable",
  "marquee.no_internet": "No Internet Needed",
  "marquee.dari": "In Dari Language",
  "marquee.solar": "Solar Calendar",
  "marquee.fast": "Fast & Easy",
  "marquee.data_protection": "Data Protection",
  "marquee.desktop": "For Desktop",
  "marquee.offline_storage": "Offline Storage",

  // Problem section
  "problem.badge": "Do You Face These Problems Too?",
  "problem.title_before": "Problems That ",
  "problem.title_highlight": "Stop",
  "problem.title_after": " Your Business",
  "problem.paper": "Paper-Based Accounting",
  "problem.paper_desc": "Scattered notebooks that make finding an invoice impossible.",
  "problem.english_sw": "English-Only Software",
  "problem.english_sw_desc": "Foreign software with a different language and calendar.",
  "problem.opacity": "Lack of Financial Transparency",
  "problem.opacity_desc": "You don't know how much profit you've made or your financial status.",
  "problem.time_waste": "Wasted Time",
  "problem.time_waste_desc": "Hours spent on manual calculations.",
  "problem.unprofessional": "Unprofessional Invoices",
  "problem.unprofessional_desc": "Handwritten invoices that undermine your credibility.",
  "problem.data_loss": "Risk of Data Loss",
  "problem.data_loss_desc": "One lost paper can destroy important financial records.",

  // Features section
  "features.badge": "Powerful Features",
  "features.title_before": "Everything You ",
  "features.title_highlight": "Need",
  "features.f1_title": "Fully in Dari Language",
  "features.f1_desc": "The entire interface, reports, and settings are designed in Dari and Pashto.",
  "features.f2_title": "Solar Hijri Calendar",
  "features.f2_desc": "All dates and reports are displayed in the Solar Hijri calendar.",
  "features.f3_title": "Simple for Everyone",
  "features.f3_desc": "You can easily work even without accounting knowledge.",
  "features.f4_title": "Invoice Generation",
  "features.f4_desc": "Create and send professional invoices with just a few clicks.",
  "features.f5_title": "Smart Reports",
  "features.f5_desc": "Dashboard with beautiful and understandable charts, real-time and accurate.",
  "features.f6_title": "Complete Security",
  "features.f6_desc": "Advanced encryption and automatic daily backups.",
  "features.f7_title": "Easy Installation",
  "features.f7_desc": "Easily install on your computer and work without internet.",
  "features.f8_title": "Afghani Currency",
  "features.f8_desc": "All calculations in Afghani currency without currency conversion.",

  // Bento features
  "bento.title_before": "A Look at the Power of ",
  "bento.title_highlight": "AsanHesab",
  "bento.smart_dashboard": "Smart Management Dashboard",
  "bento.smart_dashboard_desc": "See the complete financial picture of your business at a glance. Interactive charts, key indicators, and real-time reports all in one page.",
  "bento.instant_invoice": "Instant Invoice",
  "bento.instant_invoice_desc": "Create a professional invoice in less than 30 seconds.",
  "bento.auto_backup": "Automatic Backup",
  "bento.auto_backup_desc": "Automatic backup of your data on your computer.",
  "bento.local_support": "Local Support",
  "bento.local_support_desc": "Dari-speaking support team always available.",
  "bento.solar_cal": "Solar Calendar",
  "bento.solar_cal_desc": "Dates and reports in Solar Hijri calendar.",

  // Dashboard section
  "dashboard.title": "Simple & Powerful Dashboard",
  "dashboard.desc": "See the complete financial status of your business at a glance",
  "dashboard.pill1": "Solar Hijri Calendar",
  "dashboard.pill2": "Real-time Reports",
  "dashboard.pill3": "Auto Invoice",
  "dashboard.pill4": "Interactive Charts",

  // How it works
  "how.badge": "Easy Start",
  "how.title": "Get Started in 3 Steps",
  "how.step1_title": "Download & Install",
  "how.step1_desc": "Download the software and install it in less than a minute. No internet needed.",
  "how.step2_title": "Setup Your Business",
  "how.step2_desc": "Smart wizard helps you enter basic information.",
  "how.step3_title": "Start Accounting",
  "how.step3_desc": "Create invoices, view reports. Start today!",

  // Business types
  "biz.title": "Suitable for Every Business Type",
  "biz.stores": "Stores",
  "biz.transport": "Transportation",
  "biz.trade": "Trading",
  "biz.restaurants": "Restaurants",
  "biz.education": "Educational Institutes",
  "biz.clinics": "Clinics",

  // Testimonials
  "testimonials.badge": "Customer Voices",
  "testimonials.title_before": "They Love ",
  "testimonials.title_highlight": "AsanHesab",
  "t1.name": "Mohammad Ahmad Rahimi",
  "t1.role": "Electronics Store Owner, Kabul",
  "t1.text": "Before AsanHesab, I used to keep my store's accounts in notebooks. Now everything is easy and organized. It truly changed my life!",
  "t2.name": "Fatima Noori",
  "t2.role": "Trading Company Manager, Herat",
  "t2.text": "As a female entrepreneur, having accounting software in Dari was very important to me. AsanHesab was my best choice.",
  "t3.name": "Haji Abdulsalam",
  "t3.role": "Transport Company Owner, Mazar-i-Sharif",
  "t3.text": "I have no accounting knowledge but with AsanHesab I easily manage my transport company's income and expenses. Excellent!",
  "t4.name": "Zahra Mousavi",
  "t4.role": "Boutique Owner, Kandahar",
  "t4.text": "The Solar Hijri calendar and Dari language made me choose AsanHesab. I easily issue invoices and my customers are satisfied.",
  "t5.name": "Ghulam Haider",
  "t5.role": "Restaurant Owner, Jalalabad",
  "t5.text": "AsanHesab helped me control my restaurant expenses and increase my profitability.",
  "t6.name": "Maryam Seddighi",
  "t6.role": "Educational Institute Director, Bamyan",
  "t6.text": "Managing student tuition and institute expenses was very difficult before AsanHesab. Now everything is systematic and transparent.",

  // Pricing
  "pricing.badge": "Fair Pricing",
  "pricing.title": "A Plan for Every Business",
  "pricing.subtitle": "Free trial — no internet required",
  "pricing.basic": "Basic",
  "pricing.basic_price": "2,500",
  "pricing.basic_period": "Afghanis / Monthly",
  "pricing.basic_desc": "Small Businesses",
  "pricing.basic_f1": "1 User",
  "pricing.basic_f2": "Unlimited Invoices",
  "pricing.basic_f3": "Profit & Loss Report",
  "pricing.basic_f4": "Solar Hijri Calendar",
  "pricing.basic_f5": "Phone Support",
  "pricing.pro": "Professional",
  "pricing.pro_price": "5,500",
  "pricing.pro_period": "Afghanis / Monthly",
  "pricing.pro_desc": "Medium Businesses",
  "pricing.pro_f1": "5 Users",
  "pricing.pro_f2": "All Basic Features",
  "pricing.pro_f3": "Inventory Management",
  "pricing.pro_f4": "Advanced Reports",
  "pricing.pro_f5": "Multi-computer Installation",
  "pricing.pro_f6": "24/7 Phone Support",
  "pricing.pro_f7": "Daily Auto Backup",
  "pricing.org": "Enterprise",
  "pricing.org_price": "12,000",
  "pricing.org_period": "Afghanis / Monthly",
  "pricing.org_desc": "Companies & Organizations",
  "pricing.org_f1": "Unlimited Users",
  "pricing.org_f2": "All Professional Features",
  "pricing.org_f3": "Tax Reports",
  "pricing.org_f4": "Multi-branch Management",
  "pricing.org_f5": "Custom API",
  "pricing.org_f6": "Team Training",
  "pricing.org_f7": "VIP Support",
  "pricing.popular": "Most Popular Choice",
  "pricing.download": "Free Download",
  "pricing.contact": "Contact Us",

  // FAQ
  "faq.title": "Frequently Asked Questions",
  "faq.q1": "Do I need accounting knowledge to use AsanHesab?",
  "faq.a1": "Not at all! AsanHesab is designed for people with no accounting knowledge. The interface is in Dari and very simple. You can create invoices and view reports with just a few clicks. Free Dari tutorial videos are also available.",
  "faq.q2": "Is the Solar Hijri calendar supported?",
  "faq.a2": "Yes, fully. All dates, reports, invoices, and statements are displayed in the Solar Hijri calendar. Converting dates between Hijri and Gregorian is also possible.",
  "faq.q3": "Do I need internet to use it?",
  "faq.a3": "No! AsanHesab works completely offline. Perform all accounting operations, issue invoices, and generate reports without internet. Your data is stored only on your computer.",
  "faq.q4": "How secure is my financial data?",
  "faq.a4": "Highest security level: Advanced data encryption, automatic backup on your computer, no data sent over the internet. All your financial data is stored only on your device.",
  "faq.q5": "Is there a free version?",
  "faq.a5": "Yes! Free trial version with all features. No internet needed and no commitment.",

  // Final CTA
  "cta.title_line1": "The Financial Future of Your Business",
  "cta.title_line2": "Starts Right Now",
  "cta.desc": "Thousands of Afghan users have already made this decision. Join them and transform your financial management forever.",
  "cta.download": "Free Download",
  "cta.contact": "Contact Us",
  "cta.note": "No Internet Required • Fully Offline • Anytime",

  // Footer
  "footer.cta_title": "Ready to Get Started?",
  "footer.cta_desc": "Download and start using AsanHesab right now.",
  "footer.brand_desc": "The first accounting software in Dari with Solar Hijri calendar, built for Afghanistan's market.",
  "footer.product": "Product",
  "footer.product_features": "Features",
  "footer.product_pricing": "Pricing",
  "footer.product_updates": "Updates",
  "footer.product_desktop": "Desktop Version",
  "footer.company": "Company",
  "footer.company_about": "About Us",
  "footer.company_contact": "Contact Us",
  "footer.company_blog": "Blog",
  "footer.company_careers": "Careers",
  "footer.support": "Support",
  "footer.support_help": "Help Center",
  "footer.support_tutorials": "Video Tutorials",
  "footer.support_faq": "FAQ",
  "footer.support_phone": "Phone Support",
  "footer.copyright": "All Rights Reserved © AsanHesab 1404",

  // Hero dashboard card labels
  "card.auto_record": "Auto Record",
  "card.revenue": "Total Revenue",
  "card.invoices": "Invoices",
  "card.customers": "Customers",
  "card.monthly_chart": "Monthly Chart",
  "card.weekly_activity": "Weekly Activity",
  "card.recent_tx": "Recent Transactions",
  "card.today": "Today",
  "card.offline": "Offline",
  "card.new_invoice": "New Invoice",
  "card.register_customer": "Register Customer",
  "card.add_items": "Add Items",
  "card.confirm_send": "Confirm & Send",
  "card.total_amount": "Total: ",
  "card.afi": "Afs",
  "card.management_dashboard": "Management Dashboard",

  // Floating cards
  "float.revenue_growth": "Revenue Growth",
  "float.customer_satisfaction": "Customer Satisfaction",
  "float.today_invoices": "Today's Invoices",
  "float.ssl": "SSL Secure",
  "float.protected": "Protected",
  "float.invoice_count": "12 Items",

  // New translation keys for components
  "bento.heading_before": "A Look at the Power of",
  "dashboard.browser_url": "AsanHesab — Management Dashboard",
  "dashboard.alt_text": "AsanHesab Dashboard",
  "how.step1_num": "1",
  "how.step2_num": "2",
  "how.step3_num": "3",
  "cta.social_proof": "Thousands of Afghan users have already made this decision.",
  "cta.social_proof_cta": "Join them and transform your financial management forever.",
  "cta.download_free": "Free Download",
  "cta.offline_note": "No Internet Required • Fully Offline • Anytime",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Use",
};

const ps: Translations = {
  // Navbar
  "nav.features": "ځانګړتیاوې",
  "nav.dashboard": "داشبورد",
  "nav.testimonials": "نظرونه",
  "nav.pricing": "بیه",
  "nav.faq": "پوښتنې",
  "nav.download": "وړیا ډاونلوډ",

  // Hero
  "hero.badge": "د افغانستان بازار لپاره حسابداري سافټویر",
  "hero.line1": "د خپل سوداګرۍ مدیریت،",
  "hero.line2_before": "اوس",
  "hero.line2_highlight": "اسانه",
  "hero.line2_after": "تر هر وخت مخکې!",
  "hero.accounting_sw": "حسابداري سافټویر",
  "hero.for_your_biz": "د خپل سوداګرۍ لپاره",
  "hero.cta_primary": "وړیا ازموینې ډاونلوډ کړئ",
  "hero.cta_secondary": "ویډیو وګورئ",
  "hero.sub_desc": "بدون حسابداري پوهې — نن پیل کړئ!",

  // Rotating phrases
  "phrase.in_dari": "په دری ژبه",
  "phrase.no_internet": "بدي انټرنیټ",
  "phrase.solar_calendar": "شمسی تقویم",
  "phrase.simple": "ساده او اسان",
  "phrase.offline": "بديله آفلاین",

  // Trust signals
  "trust.install": "په ۵ دقیقو نصب",
  "trust.offline": "بدي انټرنیټ ته اړتیا",
  "trust.support": "تل موجود ملاتړ",
  "trust.secure": "بله آفلاین او خوندي",
  "trust.active_users": "+۵,۰۰۰",
  "trust.users_label": "فعال کاروونکي",
  "trust.satisfied_users": "منظم کاروونکي",

  // Stats
  "stat.active_users": "فعال کاروونکي",
  "stat.invoices": "صادر شوي فاکتورونه",
  "stat.provinces": "تر پوښښ لاندې ولایتونه",
  "stat.satisfaction": "د پیرودونکو رضایت",

  // Marquee trust items
  "marquee.secure": "خوندي او باوري",
  "marquee.no_internet": "بدي انټرنیټ",
  "marquee.dari": "په دری ژبه",
  "marquee.solar": "شمسی تقویم",
  "marquee.fast": "ګړندی او اسان",
  "marquee.data_protection": "د معلوماتو خوندیتوب",
  "marquee.desktop": "د ډیسکټاپ لپاره",
  "marquee.offline_storage": "آفلاین ذخیره",

  // Problem section
  "problem.badge": "ایا تاسو هم دا ستونزې لرئ؟",
  "problem.title_before": "ستونزې چې ستاسو سوداګرۍ",
  "problem.title_highlight": "وه",
  "problem.title_after": "درېږي",
  "problem.paper": "کاغذي حساب کتاب",
  "problem.paper_desc": "خپلواني ډفټرونه چې یو فاکتور پیدا کول ناممکن کوي.",
  "problem.english_sw": "انګلیسي سافټویرونه",
  "problem.english_sw_desc": "بهرني سافټویر چې د ژبې او تقویم له مخې سره توپير لري.",
  "problem.opacity": "د مالي شفافیت نشتوالي",
  "problem.opacity_desc": "تاسو نه پوهیږئ چې څومره ګټه مو کړې او مالي حالت مو څه دی.",
  "problem.time_waste": "د وخت تلفیدل",
  "problem.time_waste_desc": "ساعتونه په لاسي محاسبو تیروی.",
  "problem.unprofessional": "غیر مسلکي فاکتورونه",
  "problem.unprofessional_desc": "لاسي فاکتورونه چې ستاسو اعتبار ته زیان رسوي.",
  "problem.data_loss": "د معلوماتو له لاسه ورکولو خطر",
  "problem.data_loss_desc": "یو ورقه د مهمو مالي معلوماتو له منځه وړي.",

  // Features section
  "features.badge": "پیاوړي ځانګړتیاوې",
  "features.title_before": "هر څه هغه چې ",
  "features.title_highlight": "اړتیا لرئ",
  "features.f1_title": "بله په دری ژبه",
  "features.f1_desc": "ټول انټرفیس، راپورونه او تنظیمات په دری او پښتو ژبه دي.",
  "features.f2_title": "شمسی هجري تقویم",
  "features.f2_desc": "ټول نیټې او راپورونه په شمسي تقویم ښکاري.",
  "features.f3_title": "د ټولو لپاره ساده",
  "features.f3_desc": "حتی بدي حسابداري پوهې په اسانۍ سره کار کولی شئ.",
  "features.f4_title": "فاکتور صادرول",
  "features.f4_desc": "د څو کلیکونو سره مسلکي فاکتورونه صادر او ولیږئ.",
  "features.f5_title": "هوښیار راپورونه",
  "features.f5_desc": "د ښکلو او پوهیدونکو چارټونو سره داشبورد، سمدستي او دقیق.",
  "features.f6_title": "بشپړ خوندیتوب",
  "features.f6_desc": "پرمختللي رمزګذاري او اتوماتیک ورځنی بیکاپ.",
  "features.f7_title": "اسانه نصب",
  "features.f7_desc": "په خپل کمپیوټر اسانۍ سره نصب کړئ او بدي انټرنیټ کار وکړئ.",
  "features.f8_title": "افغاني پيسې",
  "features.f8_desc": "ټول محاسبې په افغاني اسعارو بدي د اسعارو تبادله.",

  // Bento features
  "bento.title_before": "د ",
  "bento.title_highlight": "اسان حساب",
  "bento.title_after2": " قدرت ته یو نظر",
  "bento.smart_dashboard": "هوښیار مدیریتي داشبورد",
  "bento.smart_dashboard_desc": "د یو نظر سره د خپل سوداګرۍ بشپړ مالي انځور وګورئ. تعاملي چارټونه، اصلي شاخصونه او سمدستي راپورونه ټول په یوه صفحه کې.",
  "bento.instant_invoice": "سمدستي فاکتور",
  "bento.instant_invoice_desc": "په لسو ثانیو کې مسلکي فاکتور جوړ کړئ.",
  "bento.auto_backup": "اتوماتیک بیکاپ",
  "bento.auto_backup_desc": "د خپل معلوماتو اتوماتیک بیکاپ په خپل کمپیوټر.",
  "bento.local_support": "محلي ملاتړ",
  "bento.local_support_desc": "دری ژبې ملاتړي ټیم تل موجود.",
  "bento.solar_cal": "شمسی تقویم",
  "bento.solar_cal_desc": "نیټې او راپورونه په شمسي تقویم.",

  // Dashboard section
  "dashboard.title": "ساده او پیاوړی داشبورد",
  "dashboard.desc": "د یو نظر سره د خپل سوداګرۍ بشپړ مالي حالت وګورئ",
  "dashboard.pill1": "شمسی هجري تقویم",
  "dashboard.pill2": "سمدستي راپورونه",
  "dashboard.pill3": "اتوماتیک فاکتور",
  "dashboard.pill4": "تعاملي چارټونه",

  // How it works
  "how.badge": "اسانه پیل",
  "how.title": "په دريو پړاونو کې پیل کړئ",
  "how.step1_title": "ډاونلوډ او نصب",
  "how.step1_desc": "سافټویر ډاونلوډ او په لږ وخت کې نصب کړئ. بدي انټرنیټ.",
  "how.step2_title": "سوداګرۍ تنظیم",
  "how.step2_desc": "هوښیار ویزارد تاسو سره د اساسي معلوماتو دننولو کې مرسته کوي.",
  "how.step3_title": "حسابداري پیل",
  "how.step3_desc": "فاکتور صادر کړئ، راپورونه وګورئ. نن!",

  // Business types
  "biz.title": "د هر ډول سوداګرۍ لپاره مناسب",
  "biz.stores": "دوکانونه",
  "biz.transport": "انتقال",
  "biz.trade": "سوداګري",
  "biz.restaurants": "رستورانتونه",
  "biz.education": "د زده کړې موسسې",
  "biz.clinics": "کلینیکونه",

  // Testimonials
  "testimonials.badge": "د پیرودونکو غږونه",
  "testimonials.title_before": "هغوی ",
  "testimonials.title_highlight": "اسان حساب",
  "testimonials.title_after2": " خوښوي",
  "t1.name": "محمد احمد رحیمي",
  "t1.role": "د برېښنایي وسایلو دوکانوال، کابل",
  "t1.text": "د اسان حساب مخکې، زما دوکان حساب کتاب په ډفټر کې ساتل. اوس هر څه اسانه او منظم دی. ریښتا زما ژوند بدل کړ!",
  "t2.name": "فاطمه نوري",
  "t2.role": "د سوداګرۍ شرکت مدیره، هرات",
  "t2.text": "د ښځینه کارآفرین په توګه، په دری ژبه حسابداري سافټویر لرل زما لپاره ډیر مهم و. اسان حساب زما غوره انتخاب و.",
  "t3.name": "حاجي عبدالسلام",
  "t3.role": "د حمل او نقل شرکت صاحب، مزار شریف",
  "t3.text": "زه هیڅ حسابداري پوهنه نلرم خو په اسان حساب سره په اسانۍ سره د خپل شرکت عاید او لګښتونه مدیریت کوم. عالي دی!",
  "t4.name": "زهرا موسيوي",
  "t4.role": "د جامو بوتیک لرونکې، قندهار",
  "t4.text": "شمسی هجري تقویم او دری ژبې رامنځته کړ چې اسان حساب انتخاب کړم. په اسانۍ سره فاکتور صادر کوم او زما پیرودونکي خوښ دي.",
  "t5.name": "غلام حیدر",
  "t5.role": "د رستورانت صاحب، جلال آباد",
  "t5.text": "اسان حساب ما سره مرسته وکړه چې د رستورانت لګښتونه کنترول کړم او د ګټې برخې زیاتووالی ورکړم.",
  "t6.name": "مریم صدیقي",
  "t6.role": "د زده کړې موسسې مدیره، بامیان",
  "t6.text": "د زده کوونکو شهریې او د موسسې لګښتونو مدیریت د اسان حساب مخکې ډیر سخت و. اوس هر څه سیسټماتیک او روښان دی.",

  // Pricing
  "pricing.badge": "منصفانه بیه",
  "pricing.title": "د هرې سوداګرۍ لپاره پلان",
  "pricing.subtitle": "وړیا ازموینه — بدي انټرنیټ",
  "pricing.basic": "اساسي",
  "pricing.basic_price": "۲,۵۰۰",
  "pricing.basic_period": "افغانۍ / میاشتنی",
  "pricing.basic_desc": "کوچنۍ سوداګرۍ",
  "pricing.basic_f1": "یو کاروونکی",
  "pricing.basic_f2": "بسته فاکتور",
  "pricing.basic_f3": "د ګټې او زیان راپور",
  "pricing.basic_f4": "شمسی هجري تقویم",
  "pricing.basic_f5": "تلیفوني ملاتړ",
  "pricing.pro": "مسلکي",
  "pricing.pro_price": "۵,۵۰۰",
  "pricing.pro_period": "افغانۍ / میاشتنی",
  "pricing.pro_desc": "منځني سوداګرۍ",
  "pricing.pro_f1": "۵ کاروونکي",
  "pricing.pro_f2": "ټولې اساسي ځانګړتیاوې",
  "pricing.pro_f3": "د انبار مدیریت",
  "pricing.pro_f4": "پرمختللي راپورونه",
  "pricing.pro_f5": "په ډیرو کمپیوټرونو نصب",
  "pricing.pro_f6": "۲۴/۷ تلیفوني ملاتړ",
  "pricing.pro_f7": "ورځنی اتوماتیک بیکاپ",
  "pricing.org": "سازماني",
  "pricing.org_price": "۱۲,۰۰۰",
  "pricing.org_period": "افغانۍ / میاشتنی",
  "pricing.org_desc": "شرکتونه او سازمانونه",
  "pricing.org_f1": "بسته کاروونکي",
  "pricing.org_f2": "ټولې مسلکي ځانګړتیاوې",
  "pricing.org_f3": "مالیاتي راپورونه",
  "pricing.org_f4": "د ډیرو ښاخونو مدیریت",
  "pricing.org_f5": "ځانګړی API",
  "pricing.org_f6": "د ټیم روزنه",
  "pricing.org_f7": "VIP ملاتړ",
  "pricing.popular": "ترټولو محبوب انتخاب",
  "pricing.download": "وړیا ډاونلوډ",
  "pricing.contact": "اړیکه ونیسئ",

  // FAQ
  "faq.title": "دودیزې پوښتنې",
  "faq.q1": "ایا د اسان حساب کارولو لپاره حسابداري پوهنه ته اړتیا شته؟",
  "faq.a1": "هوکه، په کلکه نه! اسان حساب د هغو خلکو لپاره ډیزاین شوی چې هیڅ حسابداري پوهنه نلري. انټرفیس په دری ژبه او ډیر ساده دی. د څو کلیکونو سره فاکتور صادر او راپورونه وګورئ کولی شئ.",
  "faq.q2": "ایا شمسی هجري تقویم ملاتړ کیږي؟",
  "faq.a2": "هو، بشپړ. ټولې نیټې، راپورونه، فاکتورونه او صفت حسابونه په شمسي تقویم ښکاري.",
  "faq.q3": "ایا کارولو لپاره انټرنیټ ته اړتیا لرم؟",
  "faq.a3": "نه! اسان حساب بشپړ آفلاین کار کوي. بده انټرنیټ ټولې حسابداري عملیات، فاکتور صادرول او راپور جوړول.",
  "faq.q4": "زما مالي معلومات څومره خوندي دي؟",
  "faq.a4": "لوړ خوندیتوب: پرمختللي معلوماتو رمزګذاري، اتوماتیک بیکاپ په خپل کمپیوټر، بده انټرنیټ.",
  "faq.q5": "ایا وړیا نسخه شته؟",
  "faq.a5": "هو! وړیا ازموینې نسخه د ټولو ځانګړتیاوو سره.",

  // Final CTA
  "cta.title_line1": "د خپل سوداګرۍ مالي راتلونکی",
  "cta.title_line2": "همدا اوس پیل کیږي",
  "cta.desc": "زرګونه افغان کاروونکي د تاسو مخکې دا تصمیم نیولي دي. ورسره یوځای شئ او خپل مالي مدیریت تل لپاره بدل کړئ.",
  "cta.download": "وړیا ډاونلوډ",
  "cta.contact": "اړیکه ونیسئ",
  "cta.note": "بدي انټرنیټ • بشپړ آفلاین • هر وخت",

  // Footer
  "footer.cta_title": "د پیل کولو لپاره چمتو یاست؟",
  "footer.cta_desc": "همدا اوس اسان حساب ډاونلوډ او پیل کړئ.",
  "footer.brand_desc": "لومړی حسابداري سافټویر په دری ژبه د شمسي هجري تقویم سره، د افغانستان بازار لپاره.",
  "footer.product": "محصول",
  "footer.product_features": "ځانګړتیاوې",
  "footer.product_pricing": "بیه",
  "footer.product_updates": "تازهوالۍ",
  "footer.product_desktop": "ډیسکټاپ نسخه",
  "footer.company": "شرکت",
  "footer.company_about": "زموږ په اړه",
  "footer.company_contact": "اړیکه ونیسئ",
  "footer.company_blog": "بلاګ",
  "footer.company_careers": "فرصتونه",
  "footer.support": "ملاتړ",
  "footer.support_help": "د مرستې مرکز",
  "footer.support_tutorials": "ویډیو روزنه",
  "footer.support_faq": "پوښتنې",
  "footer.support_phone": "تلیفوني ملاتړ",
  "footer.copyright": "ټول حقوق خوندي دي © اسان حساب ۱۴۰۴",

  // Hero dashboard card labels
  "card.auto_record": "اتوماتیک ثبت",
  "card.revenue": "ټول عاید",
  "card.invoices": "فاکتورونه",
  "card.customers": "پیرودونکي",
  "card.monthly_chart": "میاشتنی چارټ",
  "card.weekly_activity": "اونیزه فعالیت",
  "card.recent_tx": "وروستي تراکنشونه",
  "card.today": "نن",
  "card.offline": "آفلاین",
  "card.new_invoice": "نوی فاکتور",
  "card.register_customer": "پیرودونکی ثبت",
  "card.add_items": "توکي اضافه",
  "card.confirm_send": "تایید او لېږل",
  "card.total_amount": "ټوله بیه: ",
  "card.afi": "افغانی",
  "card.management_dashboard": "مدیریتي داشبورد",

  // Floating cards
  "float.revenue_growth": "د عاید ودې",
  "float.customer_satisfaction": "د پیرودونکو رضایت",
  "float.today_invoices": "د نن ورځې فاکتورونه",
  "float.ssl": "SSL خوندي",
  "float.protected": "محافظت شوی",
  "float.invoice_count": "۱۲ قلم",

  // New translation keys for components
  "bento.heading_before": "د قدرت یو نظر",
  "dashboard.browser_url": "اسان حساب — مدیریتي داشبورد",
  "dashboard.alt_text": "د اسان حساب داشبورد",
  "how.step1_num": "۱",
  "how.step2_num": "۲",
  "how.step3_num": "۳",
  "cta.social_proof": "زرګونه افغان کاروونکي د تاسو مخکې دا تصمیم نیولي دي.",
  "cta.social_proof_cta": "ورسره یوځای شئ او خپل مالي مدیریت تل لپاره بدل کړئ.",
  "cta.download_free": "وړیا ډاونلوډ",
  "cta.offline_note": "بدي انټرنیټ • بشپړ آفلاین • هر وخت",
  "footer.privacy": "د محرمیت تګلاره",
  "footer.terms": "د کارولو شرایط",
};

const dictionaries: Record<Locale, Translations> = { fa, en, ps };

// ═══════════════════════════════════════════
//   I18N CONTEXT
//   ═══════════════════════════════════════════

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "rtl" | "ltr";
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "fa",
  setLocale: () => {},
  dir: "rtl",
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("asanhesab-locale") as Locale | null;
      if (saved && ["fa", "en", "ps"].includes(saved)) {
        return saved;
      }
    }
    return "fa";
  });

  useEffect(() => {
    document.documentElement.lang = locale === "fa" ? "fa" : locale === "ps" ? "ps" : "en";
    document.documentElement.dir = locale === "en" ? "ltr" : "rtl";
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("asanhesab-locale", newLocale);
    document.documentElement.lang = newLocale === "fa" ? "fa" : newLocale === "ps" ? "ps" : "en";
    document.documentElement.dir = newLocale === "en" ? "ltr" : "rtl";
  }, []);

  const dir = useMemo(() => (locale === "en" ? "ltr" : "rtl"), [locale]);

  const t = useCallback(
    (key: string) => {
      return dictionaries[locale]?.[key] ?? dictionaries.fa?.[key] ?? key;
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, dir, t }),
    [locale, setLocale, dir, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
