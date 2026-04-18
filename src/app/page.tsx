"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import {
  Globe, CalendarDays, Sparkles, Receipt, BarChart3, Shield, Monitor, Wallet, ArrowUp,
} from "lucide-react";

import Navbar from "@/components/landing/navbar";
import HeroSection from "@/components/landing/hero-section";

/* ─── Dynamic imports for below-fold sections ─── */
const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection"), { ssr: false });
const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection"), { ssr: false });
const DashboardShowcase = dynamic(() => import("@/components/sections/DashboardShowcase"), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), { ssr: false });
const BusinessTypes = dynamic(() => import("@/components/sections/BusinessTypes"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), { ssr: false });
const PricingSection = dynamic(() => import("@/components/sections/PricingSection"), { ssr: false });
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), { ssr: false });
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"), { ssr: false });

export default function Home() {
  const { t, dir } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { icon: <Globe className="w-7 h-7" />, title: t("features.f1_title"), desc: t("features.f1_desc") },
    { icon: <CalendarDays className="w-7 h-7" />, title: t("features.f2_title"), desc: t("features.f2_desc") },
    { icon: <Sparkles className="w-7 h-7" />, title: t("features.f3_title"), desc: t("features.f3_desc") },
    { icon: <Receipt className="w-7 h-7" />, title: t("features.f4_title"), desc: t("features.f4_desc") },
    { icon: <BarChart3 className="w-7 h-7" />, title: t("features.f5_title"), desc: t("features.f5_desc") },
    { icon: <Shield className="w-7 h-7" />, title: t("features.f6_title"), desc: t("features.f6_desc") },
    { icon: <Monitor className="w-7 h-7" />, title: t("features.f7_title"), desc: t("features.f7_desc") },
    { icon: <Wallet className="w-7 h-7" />, title: t("features.f8_title"), desc: t("features.f8_desc") },
  ];

  const bentoFeatures = [
    { span: "md:col-span-2 md:row-span-2", icon: <BarChart3 className="w-10 h-10" />, title: t("bento.smart_dashboard"), desc: t("bento.smart_dashboard_desc"), gradient: true },
    { span: "md:col-span-1", icon: <Receipt className="w-7 h-7" />, title: t("bento.instant_invoice"), desc: t("bento.instant_invoice_desc"), gradient: false },
    { span: "md:col-span-1", icon: <Shield className="w-7 h-7" />, title: t("bento.auto_backup"), desc: t("bento.auto_backup_desc"), gradient: false },
    { span: "md:col-span-1", icon: <Globe className="w-7 h-7" />, title: t("bento.local_support"), desc: t("bento.local_support_desc"), gradient: false },
    { span: "md:col-span-1", icon: <CalendarDays className="w-7 h-7" />, title: t("bento.solar_cal"), desc: t("bento.solar_cal_desc"), gradient: false },
  ];

  const testimonials = [
    { name: "محمد احمد رحیمی", role: t("t1.role"), text: "قبل از آسان حساب، حسابداری فروشگاهم را در دفترچه یادداشت می‌کردم. حالا همه چیز راحت و مرتب است. واقعاً زندگیم را تغییر داد!", rating: 5, city: "کابل" },
    { name: "فاطمه نوری", role: t("t2.role"), text: "به عنوان یک زن کارآفرین، داشتن نرم‌افزار حسابداری به زبان دری برای من خیلی مهم بود. آسان حساب بهترین انتخاب من بود.", rating: 5, city: "هرات" },
    { name: "حاجی عبدالسلام", role: t("t3.role"), text: "من هیچ دانش حسابداری ندارم ولی با آسان حساب به راحتی درآمد و هزینه‌های شرکت حمل‌ونقل‌ام را مدیریت می‌کنم. عالی است!", rating: 5, city: "مزار شریف" },
    { name: "زهرا موسوی", role: t("t4.role"), text: "تقویم هجری شمسی و زبان دری باعث شد آسان حساب را انتخاب کنم. خیلی راحت فاکتور صادر می‌کنم و مشتریانم راضی هستند.", rating: 5, city: "قندهار" },
    { name: "غلام حیدر", role: t("t5.role"), text: "آسان حساب کمک کرد تا هزینه‌های رستورانم را کنترل کنم و سودآوری‌ام را افزایش دهم.", rating: 5, city: "جلال‌آباد" },
    { name: "مریم صدیقی", role: t("t6.role"), text: "مدیریت شهریه دانش‌آموزان و هزینه‌های موسسه قبل از آسان حساب خیلی سخت بود. حالا همه چیز سیستماتیک و شفاف است.", rating: 5, city: "بامیان" },
  ];

  const pricingPlans = [
    {
      name: t("pricing.basic"), price: "۲,۵۰۰", period: "افغانی / ماهانه", desc: t("pricing.basic_desc"),
      features: ["یک کاربر", "صدور فاکتور نامحدود", "گزارش سود و زیان", "تقویم هجری شمسی", "پشتیبانی تلفنی"],
      cta: t("pricing.download"), popular: false,
    },
    {
      name: t("pricing.pro"), price: "۵,۵۰۰", period: "افغانی / ماهانه", desc: t("pricing.pro_desc"),
      features: ["۵ کاربر", "تمام امکانات پایه", "مدیریت موجودی انبار", "گزارش‌های پیشرفته", "نصب روی چند کامپیوتر", "پشتیبانی تلفنی ۲۴/۷", "بکاپ خودکار روزانه"],
      cta: "دانلود رایگان", popular: true,
    },
    {
      name: t("pricing.org"), price: "۱۲,۰۰۰", period: "افغانی / ماهانه", desc: t("pricing.org_desc"),
      features: ["کاربران نامحدود", "تمام امکانات حرفه‌ای", "گزارش مالیاتی", "مدیریت چند شعبه", "API اختصاصی", "آموزش تیم", "پشتیبانی VIP"],
      cta: t("pricing.contact"), popular: false,
    },
  ];

  const faqs = [
    { q: t("faq.q1"), a: "خیر، اصلاً! آسان حساب مخصوص افرادی طراحی شده که هیچ دانش حسابداری ندارند. رابط کاربری به زبان دری و بسیار ساده است. با چند کلیک می‌توانید فاکتور صادر کنید و گزارش‌ها را ببینید. ویدیوهای آموزشی رایگان به زبان دری نیز موجود است." },
    { q: t("faq.q2"), a: "بله، به صورت کامل. تمام تاریخ‌ها، گزارش‌ها، فاکتورها و صورت‌حساب‌ها به تاریخ شمسی نمایش داده می‌شوند. امکان تبدیل تاریخ بین شمسی و میلادی نیز وجود دارد." },
    { q: t("faq.q3"), a: "خیر! آسان حساب کاملاً آفلاین کار می‌کند. بدون نیاز به اینترنت، تمام عملیات حسابداری، صدور فاکتور و گزارش‌گیری را انجام دهید. اطلاعات شما فقط روی کامپیوتر خودتان ذخیره می‌شود." },
    { q: t("faq.q4"), a: "بالاترین سطح امنیت: رمزگذاری پیشرفته اطلاعات، پشتیبان‌گیری خودکار روی کامپیوتر شما، بدون ارسال اطلاعات به اینترنت. تمام داده‌های مالی شما فقط روی دستگاه خودتان ذخیره می‌شود." },
    { q: t("faq.q5"), a: "بله! نسخه آزمایشی رایگان با تمام امکانات. بدون نیاز به اینترنت و بدون تعهد." },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground" style={{ direction: dir }}>
      <Navbar />

      <HeroSection />

      <div className="gradient-divider-section" />
      <ProblemSection />

      <div className="gradient-divider-section" />
      <FeaturesSection features={features} bentoFeatures={bentoFeatures} />

      <div className="gradient-divider-section" />
      <DashboardShowcase />

      <div className="gradient-divider-section" />
      <HowItWorks />

      <div className="gradient-divider-section" />
      <BusinessTypes />

      <div className="gradient-divider-section" />
      <TestimonialsSection testimonials={testimonials} />

      <div className="gradient-divider-section" />
      <PricingSection pricingPlans={pricingPlans} />

      <div className="gradient-divider-section" />
      <FAQSection faqs={faqs} />

      <div className="gradient-divider-section" />
      <FinalCTA />

      {/* Back to Top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 gradient-brand rounded-full shadow-xl shadow-brand-mid/30 flex items-center justify-center text-white"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/93799422717"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-xl shadow-[#25D366]/30 flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <motion.span
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ۱
        </motion.span>
      </motion.a>
    </div>
  );
}
