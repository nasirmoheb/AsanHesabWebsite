"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  CalendarDays,
  FileText,
  BarChart3,
  Shield,
  Users,
  Smartphone,
  Globe,
  CheckCircle2,
  Star,
  ArrowLeft,
  Menu,
  X,
  TrendingUp,
  Wallet,
  Receipt,
  PieChart,
  Clock,
  Headphones,
  Award,
  Zap,
  Heart,
  ChevronDown,
  Building2,
  Truck,
  Store,
  Sparkles,
  Layers,
  Lock,
  Database,
  Monitor,
  Cpu,
} from "lucide-react";

/* ═══════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════ */

function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const dirMap = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
    none: { y: 0, x: 0 },
  };
  const d = dirMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: d.y, x: d.x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  className = "",
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return (
    <span ref={ref}>
      {count.toLocaleString("fa-AF")}
      {suffix}
    </span>
  );
}

function ParallaxSection({
  children,
  speed = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

function GlowOrb({
  color,
  size,
  top,
  right,
  left,
}: {
  color: string;
  size: string;
  top?: string;
  right?: string;
  left?: string;
}) {
  return (
    <div
      className={`absolute ${top} ${right} ${left} w-[${size}] h-[${size}] rounded-full opacity-20 blur-3xl pointer-events-none`}
      style={{
        background: color,
        width: size,
        height: size,
        top,
        right,
        left,
        filter: "blur(80px)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   MAIN LANDING PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "ویژگی‌ها", href: "#features" },
    { label: "داشبورد", href: "#dashboard" },
    { label: "نظرات", href: "#testimonials" },
    { label: "قیمت‌ها", href: "#pricing" },
    { label: "سوالات", href: "#faq" },
  ];

  const features = [
    {
      icon: <Globe className="w-7 h-7" />,
      title: "کاملاً به زبان دری",
      desc: "تمام رابط کاربری، گزارش‌ها و تنظیمات به زبان دری و پشتو طراحی شده است.",
    },
    {
      icon: <CalendarDays className="w-7 h-7" />,
      title: "تقویم هجری شمسی",
      desc: "تمام تاریخ‌ها و گزارش‌ها به تاریخ شمسی نمایش داده می‌شوند.",
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "ساده برای همه",
      desc: "حتی بدون دانش حسابداری می‌توانید به راحتی کار کنید.",
    },
    {
      icon: <Receipt className="w-7 h-7" />,
      title: "صدور فاکتور",
      desc: "با چند کلیک فاکتورهای حرفه‌ای صادر کنید و ارسال نمایید.",
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "گزارش‌های هوشمند",
      desc: "داشبورد با نمودارهای زیبا و قابل فهم، لحظه‌ای و دقیق.",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "امنیت کامل",
      desc: "رمزگذاری پیشرفته و پشتیبان‌گیری خودکار روزانه.",
    },
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "هر جا، هر وقت",
      desc: "از موبایل، تبلت یا کامپیوتر به حسابداری خود دسترسی داشته باشید.",
    },
    {
      icon: <Wallet className="w-7 h-7" />,
      title: "پول افغانی",
      desc: "تمام محاسبات به واحد پول افغانی بدون نیاز به تبدیل ارز.",
    },
  ];

  const bentoFeatures = [
    {
      span: "md:col-span-2 md:row-span-2",
      icon: <BarChart3 className="w-10 h-10" />,
      title: "داشبورد مدیریتی هوشمند",
      desc: "با یک نگاه، تصویر کامل مالی کسب‌وکار خود را ببینید. نمودارهای تعاملی، شاخص‌های کلیدی و گزارش‌های لحظه‌ای همه در یک صفحه.",
      gradient: true,
    },
    {
      span: "md:col-span-1",
      icon: <Receipt className="w-7 h-7" />,
      title: "فاکتور آنی",
      desc: "در کمتر از ۳۰ ثانیه فاکتور حرفه‌ای بسازید.",
    },
    {
      span: "md:col-span-1",
      icon: <Shield className="w-7 h-7" />,
      title: "پشتیبان‌گیری خودکار",
      desc: "اطلاعات شما هر روز به صورت خودکار ذخیره می‌شود.",
    },
    {
      span: "md:col-span-1",
      icon: <Globe className="w-7 h-7" />,
      title: "پشتیبانی محلی",
      desc: "تیم پشتیبانی به زبان دری همیشه در دسترس است.",
    },
    {
      span: "md:col-span-1",
      icon: <CalendarDays className="w-7 h-7" />,
      title: "تقویم هجری",
      desc: "تاریخ‌ها و گزارش‌ها به تقویم شمسی.",
    },
  ];

  const testimonials = [
    {
      name: "محمد احمد رحیمی",
      role: "صاحب فروشگاه لوازم الکترونیک، کابل",
      text: "قبل از آسان حساب، حسابداری فروشگاهم را در دفترچه یادداشت می‌کردم. حالا همه چیز راحت و مرتب است. واقعاً زندگیم را تغییر داد!",
      rating: 5,
      city: "کابل",
    },
    {
      name: "فاطمه نوری",
      role: "مدیر شرکت بازرگانی، هرات",
      text: "به عنوان یک زن کارآفرین، داشتن نرم‌افزار حسابداری به زبان دری برای من خیلی مهم بود. آسان حساب بهترین انتخاب من بود.",
      rating: 5,
      city: "هرات",
    },
    {
      name: "حاجی عبدالسلام",
      role: "صاحب شرکت حمل و نقل، مزار شریف",
      text: "من هیچ دانش حسابداری ندارم ولی با آسان حساب به راحتی درآمد و هزینه‌های شرکت حمل‌ونقل‌ام را مدیریت می‌کنم. عالی است!",
      rating: 5,
      city: "مزار شریف",
    },
    {
      name: "زهرا موسوی",
      role: "دارنده بوتیک پوشاک، قندهار",
      text: "تقویم هجری شمسی و زبان دری باعث شد آسان حساب را انتخاب کنم. خیلی راحت فاکتور صادر می‌کنم و مشتریانم راضی هستند.",
      rating: 5,
      city: "قندهار",
    },
    {
      name: "غلام حیدر",
      role: "صاحب رستوران، جلال‌آباد",
      text: "آسان حساب کمک کرد تا هزینه‌های رستورانم را کنترل کنم و سودآوری‌ام را افزایش دهم.",
      rating: 5,
      city: "جلال‌آباد",
    },
    {
      name: "مریم صدیقی",
      role: "مدیر موسسه آموزشی، بامیان",
      text: "مدیریت شهریه دانش‌آموزان و هزینه‌های موسسه قبل از آسان حساب خیلی سخت بود. حالا همه چیز سیستماتیک و شفاف است.",
      rating: 5,
      city: "بامیان",
    },
  ];

  const pricingPlans = [
    {
      name: "پایه",
      price: "۲,۵۰۰",
      period: "افغانی / ماهانه",
      desc: "کسب‌وکارهای کوچک",
      features: [
        "یک کاربر",
        "صدور فاکتور نامحدود",
        "گزارش سود و زیان",
        "تقویم هجری شمسی",
        "پشتیبانی آنلاین",
      ],
      cta: "شروع رایگان",
      popular: false,
    },
    {
      name: "حرفه‌ای",
      price: "۵,۵۰۰",
      period: "افغانی / ماهانه",
      desc: "کسب‌وکارهای متوسط",
      features: [
        "۵ کاربر",
        "تمام امکانات پایه",
        "مدیریت موجودی انبار",
        "گزارش‌های پیشرفته",
        "دسترسی موبایل و دسکتاپ",
        "پشتیبانی تلفنی ۲۴/۷",
        "بکاپ خودکار روزانه",
      ],
      cta: "شروع رایگان",
      popular: true,
    },
    {
      name: "سازمانی",
      price: "۱۲,۰۰۰",
      period: "افغانی / ماهانه",
      desc: "شرکت‌ها و سازمان‌ها",
      features: [
        "کاربران نامحدود",
        "تمام امکانات حرفه‌ای",
        "گزارش مالیاتی",
        "مدیریت چند شعبه",
        "API اختصاصی",
        "آموزش تیم",
        "پشتیبانی VIP",
      ],
      cta: "تماس بگیرید",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "آیا استفاده از آسان حساب نیاز به دانش حسابداری دارد؟",
      a: "خیر، اصلاً! آسان حساب مخصوص افرادی طراحی شده که هیچ دانش حسابداری ندارند. رابط کاربری به زبان دری و بسیار ساده است. با چند کلیک می‌توانید فاکتور صادر کنید و گزارش‌ها را ببینید. ویدیوهای آموزشی رایگان به زبان دری نیز موجود است.",
    },
    {
      q: "آیا تقویم هجری شمسی پشتیبانی می‌شود؟",
      a: "بله، به صورت کامل. تمام تاریخ‌ها، گزارش‌ها، فاکتورها و صورت‌حساب‌ها به تاریخ شمسی نمایش داده می‌شوند. امکان تبدیل تاریخ بین شمسی و میلادی نیز وجود دارد.",
    },
    {
      q: "آیا می‌توانم از موبایل استفاده کنم؟",
      a: "بله! آسان حساب روی تمام دستگاه‌ها کار می‌کند. فقط کافیست مرورگر خود را باز کنید و وارد حساب کاربری شوید.",
    },
    {
      q: "اطلاعات مالی من چقدر امن است؟",
      a: "بالاترین سطح امنیت: رمزگذاری پیشرفته، پشتیبان‌گیری خودکار روزانه، سرورهای امن. اطلاعات شما با هیچ شخص ثالثی به اشتراک گذاشته نمی‌شود.",
    },
    {
      q: "آیا نسخه رایگان وجود دارد؟",
      a: "بله! ۱۴ روز رایگان试用 با تمام امکانات. بدون کارت بانکی و بدون تعهد.",
    },
  ];

  const stats = [
    { value: 5000, suffix: "+", label: "کاربر فعال" },
    { value: 120000, suffix: "+", label: "فاکتور صادر شده" },
    { value: 34, suffix: "", label: "ولایت تحت پوشش" },
    { value: 99, suffix: "٪", label: "رضایت مشتریان" },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* ══════════ NAVBAR ══════════ */}
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-brand-deep/5 border-b border-brand-pale/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 md:h-20">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src="/logo-asanhesab.png"
                alt="آسان حساب"
                className="w-11 h-11 rounded-full shadow-lg shadow-brand-mid/25"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <span className="text-xl font-black text-gradient">آسان حساب</span>
                <span className="text-[10px] text-gray-400 block -mt-0.5 tracking-wider">
                  ASANHESAB
                </span>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-500 hover:text-brand-deep transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-0 h-0.5 gradient-brand rounded-full group-hover:w-6 transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-brand-deep"
              >
                ورود
              </Button>
              <Button className="gradient-brand hover:opacity-90 text-white border-0 px-6 rounded-full shadow-lg shadow-brand-mid/25 hover:shadow-brand-mid/40 transition-all duration-300 hover:scale-105">
                <Zap className="w-4 h-4 ml-2" />
                شروع رایگان
              </Button>
            </div>

            <button
              className="md:hidden p-2 rounded-xl hover:bg-brand-surface transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-brand-deep" />
              ) : (
                <Menu className="w-6 h-6 text-brand-deep" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-brand-pale/50 shadow-xl"
            >
              <div className="px-4 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block text-gray-600 hover:text-brand-deep hover:bg-brand-surface py-3 px-4 rounded-xl text-sm font-medium transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-100 flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-xl">
                    ورود
                  </Button>
                  <Button className="flex-1 gradient-brand text-white border-0 rounded-xl">
                    شروع رایگان
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ══════════ HERO — ULTRA-CREATIVE SHOWCASE ══════════ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Layered animated background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-bl from-[#f0f7ff] via-white to-[#e8f0fe]" />
          {/* Animated mesh gradients */}
          <motion.div
            className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,127,255,0.12) 0%, transparent 70%)",
              animation: "float 14s ease-in-out infinite",
            }}
          />
          <motion.div
            className="absolute bottom-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,71,171,0.08) 0%, transparent 70%)",
              animation: "float 18s ease-in-out infinite 3s",
            }}
          />
          <motion.div
            className="absolute top-[40%] left-[50%] w-[500px] h-[500px] blob"
            style={{
              background: "radial-gradient(circle, rgba(93,173,226,0.06) 0%, transparent 70%)",
              animationDuration: "12s",
            }}
          />
          {/* Animated grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs>
              <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0047AB" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGrid)" />
          </svg>
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-brand-mid/30"
              style={{
                top: `${15 + (i * 7) % 70}%`,
                left: `${10 + (i * 11) % 80}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 md:py-16">
          <div className="grid lg:grid-cols-12 gap-10 items-center">

            {/* Left content — span 5 */}
            <div className="lg:col-span-5 text-center lg:text-right order-2 lg:order-1">
              {/* Badge */}
              <FadeIn>
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-brand-pale/50 rounded-full px-5 py-2.5 mb-8 shadow-sm"
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(0,71,171,0.12)" }}
                >
                  <motion.span
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-brand-mid" />
                  </motion.span>
                  <span className="text-sm font-semibold text-brand-deep">
                    مخصوص بازار افغانستان
                  </span>
                </motion.div>
              </FadeIn>

              {/* Heading — word-by-word animation */}
              <FadeIn delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black leading-[1.08] mb-6">
                  <motion.span
                    className="block text-gray-900"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    حسابداری
                  </motion.span>
                  <motion.span
                    className="block relative mt-1"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <span className="text-gradient">را آسان</span>
                    <motion.span
                      className="absolute -bottom-1 right-0 h-3 w-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #007FFF, #5DADE2)" }}
                      initial={{ scaleX: 0, originX: 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    />
                  </motion.span>
                  <motion.span
                    className="block text-gray-900 mt-1"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    کنید!
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ rotate: [0, 15, 0, -15, 0] }}
                      transition={{ duration: 2, delay: 1.2, repeat: Infinity }}
                    >
                      <Sparkles className="w-8 h-8 text-brand-mid/40 -mt-2" />
                    </motion.span>
                  </motion.span>
                </h1>
              </FadeIn>

              {/* Description */}
              <FadeIn delay={0.2}>
                <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 lg:mr-0">
                  اولین نرم‌افزار حسابداری به{" "}
                  <span className="text-brand-deep font-bold">زبان دری</span> با{" "}
                  <span className="text-brand-deep font-bold">تقویم هجری شمسی</span>.
                  بدون نیاز به دانش حسابداری!
                </p>
              </FadeIn>

              {/* CTA Buttons */}
              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      className="gradient-brand text-white border-0 px-8 py-6 text-base rounded-2xl shadow-xl shadow-brand-mid/30 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        <Zap className="w-5 h-5 ml-2" />
                        ۱۴ روز رایگان شروع کنید
                        <ArrowLeft className="w-5 h-5 mr-2" />
                      </span>
                      <motion.div
                        className="absolute inset-0 shimmer"
                        repeatCount={Infinity}
                      />
                      {/* Ripple rings */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-white/20"
                        animate={{ scale: [1, 1.15], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 py-6 text-base rounded-2xl border-brand-pale bg-white/60 backdrop-blur-md hover:border-brand-mid hover:bg-brand-surface transition-all shadow-sm"
                    >
                      <PlayCircleIcon className="w-5 h-5 ml-2 text-brand-mid" />
                      تماشای ویدیو
                    </Button>
                  </motion.div>
                </div>
              </FadeIn>

              {/* Trust signals */}
              <FadeIn delay={0.4}>
                <div className="flex items-center gap-5 mt-8 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-mid" />
                    <span className="text-xs text-gray-400">بدون کارت بانکی</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-mid" />
                    <span className="text-xs text-gray-400">بدون تعهد</span>
                  </div>
                </div>
              </FadeIn>

              {/* Social proof strip */}
              <FadeIn delay={0.6}>
                <motion.div
                  className="mt-8 flex items-center gap-3 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex -space-x-2 space-x-reverse">
                    {["م", "ف", "ح", "ز"].map((letter, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, hsl(${210 + i * 15}, 70%, ${50 + i * 5}%), hsl(${220 + i * 15}, 60%, ${40 + i * 5}%))`,
                          zIndex: 4 - i,
                        }}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-gray-700">+۵,۰۰۰</span>{" "}
                    <span className="text-gray-400">کاربر راضی</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            </div>

            {/* Right content — ultra-creative visual showcase span 7 */}
            <div className="lg:col-span-7 relative order-1 lg:order-2">
              <div className="relative">
                {/* Glowing backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] rounded-[2rem] blur-3xl bg-brand-mid/15" />

                {/* Main visual container */}
                <ParallaxSection speed={0.12}>
                  <div className="relative">
                    {/* Rotating ring behind image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%]">
                      <motion.div
                        className="w-full h-full rounded-3xl border-2 border-dashed border-brand-pale/50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    {/* Counter-rotating ring */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[90%]">
                      <motion.div
                        className="w-full h-full rounded-[2rem] border border-brand-light/20"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                      />
                    </div>

                    {/* Main dashboard image card */}
                    <motion.div
                      className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-deep/15 border border-white/50"
                      style={{ perspective: "1000px" }}
                      initial={{ opacity: 0, y: 50, rotateY: -8, rotateX: 5 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/10 to-transparent z-10 pointer-events-none" />
                      <img
                        src="/hero-accounting.png"
                        alt="آسان حساب - نرم‌افزار حسابداری"
                        className="w-full relative"
                      />
                    </motion.div>

                    {/* Floating logo badge — top left */}
                    <motion.div
                      className="absolute -top-3 -right-3 md:top-4 md:-right-4 z-20"
                      initial={{ opacity: 0, scale: 0, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    >
                      <motion.div
                        className="relative"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-brand-deep/15 p-1 border border-brand-pale/40">
                          <img
                            src="/logo-asanhesab.png"
                            alt="آسان حساب"
                            className="w-full h-full rounded-xl object-contain"
                          />
                        </div>
                        {/* Pulse */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-brand-mid/30"
                          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Floating stat: Revenue — bottom right */}
                    <motion.div
                      className="absolute -bottom-4 right-4 md:bottom-6 md:right-8 z-20"
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                    >
                      <motion.div
                        className="bg-white rounded-2xl shadow-xl shadow-brand-deep/10 p-4 border border-brand-pale/40"
                        style={{ animation: "float 6s ease-in-out infinite" }}
                        whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(0,71,171,0.15)" }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 gradient-brand rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400">رشد درآمد</p>
                            <p className="text-xl font-black text-brand-deep">+۴۷٪</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Floating stat: Rating — top right area */}
                    <motion.div
                      className="absolute top-8 right-8 z-20 hidden md:block"
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 1.2, type: "spring" }}
                    >
                      <motion.div
                        className="bg-white rounded-2xl shadow-xl shadow-brand-deep/10 p-3.5 border border-brand-pale/40"
                        style={{ animation: "float 7s ease-in-out infinite 1.5s" }}
                        whileHover={{ scale: 1.08 }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400">رضایت</p>
                            <p className="text-lg font-black text-gray-900">۴.۹/۵</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Floating mini card: Invoice — bottom left */}
                    <motion.div
                      className="absolute -bottom-4 left-4 md:bottom-10 md:-left-4 z-20 hidden sm:block"
                      initial={{ opacity: 0, x: -20, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: 1.4, type: "spring" }}
                    >
                      <motion.div
                        className="bg-white rounded-2xl shadow-xl shadow-brand-deep/10 p-3.5 border border-brand-pale/40"
                        style={{ animation: "float 8s ease-in-out infinite 2s" }}
                        whileHover={{ scale: 1.08 }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center">
                            <Receipt className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400">فاکتور امروز</p>
                            <p className="text-lg font-black text-brand-deep">۱۲ عدد</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Orbiting icons */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 hidden lg:block">
                      <motion.div
                        className="w-9 h-9 gradient-brand rounded-xl shadow-lg flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "180px center" }}
                      >
                        <Calculator className="w-4 h-4 text-white" />
                      </motion.div>
                      <motion.div
                        className="w-8 h-8 bg-white rounded-lg shadow-lg flex items-center justify-center border border-brand-pale/40"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "200px center" }}
                      >
                        <CalendarDays className="w-3.5 h-3.5 text-brand-mid" />
                      </motion.div>
                      <motion.div
                        className="w-7 h-7 bg-amber-50 rounded-lg shadow-lg flex items-center justify-center border border-amber-200/40"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "160px center" }}
                      >
                        <Wallet className="w-3 h-3 text-amber-500" />
                      </motion.div>
                    </div>
                  </div>
                </ParallaxSection>
              </div>
            </div>
          </div>

          {/* Inline stats bar — bridging hero to next section */}
          <FadeIn delay={0.8}>
            <motion.div
              className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="glass-card rounded-2xl p-4 text-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,71,171,0.1)" }}
                >
                  <p className="text-2xl font-black text-brand-deep">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] text-gray-300 tracking-wider">SCROLL</span>
          <div className="w-5 h-8 border-2 border-gray-200 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1 bg-brand-mid rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ══════════ MARQUEE TRUST BAR ══════════ */}
      <section className="py-6 bg-white border-y border-brand-pale/40 overflow-hidden">
        <div className="flex" style={{ animation: "marquee 30s linear infinite", width: "max-content" }}>
          {[...stats, ...stats, ...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-brand-deep">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </span>
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {s.label}
                </span>
              </div>
              <div className="w-1 h-1 bg-brand-pale rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ PROBLEM / PAIN SECTION ══════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GlowOrb color="#007FFF" size="400px" top="-100px" left="-100px" />
        <GlowOrb color="#0047AB" size="300px" bottom="-50px" right="-50px" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge className="mb-4 bg-red-50 text-red-500 border-red-200/60 px-4 py-2 rounded-full text-sm font-medium">
              آیا شما هم این مشکلات را دارید؟
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              مشکلاتی که کسب‌وکار شما را
              <span className="text-red-500"> متوقف</span> می‌کند
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
            {[
              { icon: <FileText />, problem: "حساب و کتاب کاغذی", desc: "دفترچه‌های پراکنده که پیدا کردن یک فاکتور را غیرممکن می‌کند." },
              { icon: <Globe />, problem: "نرم‌افزارهای انگلیسی", desc: "نرم‌افزار خارجی که زبان و تقویمش با شما فرق دارد." },
              { icon: <PieChart />, problem: "عدم شفافیت مالی", desc: "نمی‌دانید چقدر سود کرده‌اید و وضعیت مالی‌تان چیست." },
              { icon: <Clock />, problem: "هدر رفتن وقت", desc: "ساعت‌ها وقت صرف محاسبات دستی می‌کنید." },
              { icon: <Receipt />, problem: "فاکتورهای غیرحرفه‌ای", desc: "فاکتورهای دستی که اعتبار شما را زیر سوال می‌برند." },
              { icon: <Shield />, problem: "خطر از دست رفتن اطلاعات", desc: "یک ورقه گم‌شده اطلاعات مهم مالی را نابود می‌کند." },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="bg-white rounded-2xl p-6 border border-gray-100 h-full hover:border-red-200 hover:shadow-xl hover:shadow-red-100/30 transition-all duration-500 group cursor-default"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.problem}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════ FEATURES — ASYMMETRIC ICON GRID ══════════ */}
      <section id="features" className="py-20 md:py-28 gradient-brand-soft relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #0047AB 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge className="mb-4 bg-white text-brand-deep border-brand-pale px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <Award className="w-4 h-4 ml-1" />
              ویژگی‌های قدرتمند
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              همه چیز آن چیزی است که
              <span className="text-gradient"> نیاز دارید</span>
            </h2>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.06}>
            {features.map((f, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 h-full hover:shadow-2xl hover:shadow-brand-deep/10 transition-all duration-500 group cursor-default"
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <motion.div
                    className="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-brand-mid/20"
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {f.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════ BENTO GRID FEATURES ══════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              یک نگاه به قدرت{" "}
              <span className="text-gradient">آسان حساب</span>
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-5 auto-rows-[minmax(180px,auto)]" stagger={0.1}>
            {bentoFeatures.map((f, i) => (
              <StaggerItem key={i} className={f.span}>
                <motion.div
                  className={`rounded-3xl p-8 h-full flex flex-col justify-between relative overflow-hidden group cursor-default transition-all duration-500 ${
                    f.gradient
                      ? "gradient-brand text-white"
                      : "bg-white border border-gray-100 hover:border-brand-pale hover:shadow-xl hover:shadow-brand-deep/5"
                  }`}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  {f.gradient && (
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                        f.gradient ? "bg-white/20" : "bg-brand-surface text-brand-deep"
                      }`}
                    >
                      {f.icon}
                    </div>
                    <h3
                      className={`text-xl font-bold mb-3 ${
                        f.gradient ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {f.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        f.gradient ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      {f.desc}
                    </p>
                  </div>
                  {f.gradient && (
                    <motion.div
                      className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full"
                      whileHover={{ scale: 1.5 }}
                    />
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════ DASHBOARD SHOWCASE ══════════ */}
      <section id="dashboard" className="py-20 md:py-28 gradient-brand-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              داشبورد ساده و قدرتمند
            </h2>
            <p className="text-brand-light/60 text-lg max-w-2xl mx-auto">
              با یک نگاه، وضعیت کامل مالی کسب‌وکار خود را ببینید
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-brand-mid/20 rounded-[2rem] blur-3xl" />
              {/* Browser mockup frame */}
              <div className="relative bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-2xl">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#16162a] border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white/5 rounded-lg px-4 py-1 text-xs text-white/30">
                      app.asanhesab.af/dashboard
                    </div>
                  </div>
                </div>
                <img
                  src="/dashboard-preview.png"
                  alt="داشبورد آسان حساب"
                  className="w-full"
                />
              </div>
            </motion.div>
          </FadeIn>

          {/* Feature pills floating below */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {[
                "تقویم هجری شمسی",
                "گزارش لحظه‌ای",
                "فاکتور خودکار",
                "نمودارهای تعاملی",
              ].map((tag, i) => (
                <motion.span
                  key={i}
                  className="glass px-4 py-2 rounded-full text-sm text-white/80"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS — CREATIVE TIMELINE ══════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge className="mb-4 bg-brand-surface text-brand-deep border-brand-pale px-4 py-2 rounded-full text-sm font-medium">
              شروع آسان
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              در سه قدم شروع کنید
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 right-1/2 translate-x-1/2 w-px bg-gradient-to-b from-brand-pale via-brand-mid to-brand-pale hidden md:block" />

            {[
              {
                step: "۱",
                title: "ثبت‌نام ۳۰ ثانیه‌ای",
                desc: "با شماره تلفن ثبت‌نام کنید. بدون نیاز به اطلاعات پیچیده.",
                icon: <Users />,
              },
              {
                step: "۲",
                title: "تنظیم کسب‌وکار",
                desc: "ویزارد هوشمند به شما کمک می‌کند تا اطلاعات اولیه را وارد کنید.",
                icon: <Building2 />,
              },
              {
                step: "۳",
                title: "شروع حسابداری",
                desc: "فاکتور صادر کنید، گزارش ببینید. همین امروز!",
                icon: <TrendingUp />,
              },
            ].map((item, i) => (
              <FadeIn
                key={i}
                delay={i * 0.2}
                direction={i % 2 === 0 ? "right" : "left"}
                className={`mb-12 last:mb-0 md:flex items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2 md:px-8">
                  <motion.div
                    className={`bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:shadow-brand-deep/5 transition-all duration-500 ${
                      i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    } max-w-sm`}
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-brand-mid/20">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Center node */}
                <div className="hidden md:flex md:w-0 justify-center relative z-10">
                  <motion.div
                    className="w-14 h-14 gradient-brand rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl shadow-brand-mid/30"
                    whileHover={{ scale: 1.2 }}
                  >
                    {item.step}
                  </motion.div>
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute w-14 h-14 gradient-brand rounded-full opacity-30"
                    animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="md:w-1/2" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BUSINESS TYPES — HORIZONTAL SCROLL CARDS ══════════ */}
      <section className="py-20 md:py-28 gradient-brand-soft relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              مناسب برای هر نوع کسب‌وکار
            </h2>
          </FadeIn>

          <StaggerContainer className="flex flex-wrap justify-center gap-4" stagger={0.06}>
            {[
              { icon: <Store />, label: "فروشگاه‌ها" },
              { icon: <Truck />, label: "حمل‌ونقل" },
              { icon: <Building2 />, label: "بازرگانی" },
              { icon: <Receipt />, label: "رستوران‌ها" },
              { icon: <FileText />, label: "موسسات آموزشی" },
              { icon: <Users />, label: "کلینیک‌ها" },
            ].map((biz, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="bg-white rounded-2xl px-6 py-5 flex items-center gap-4 border border-white/50 cursor-default"
                  whileHover={{ y: -4, scale: 1.03, shadow: "0 20px 40px rgba(0,71,171,0.1)" }}
                >
                  <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white shadow-md shadow-brand-mid/20">
                    {biz.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-700">{biz.label}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS — CREATIVE CAROUSEL GRID ══════════ */}
      <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge className="mb-4 bg-brand-surface text-brand-deep border-brand-pale px-4 py-2 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4 ml-1" />
              صدای مشتریان
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              آن‌ها آسان حساب را{" "}
              <span className="text-gradient">دوست دارند</span>
            </h2>
          </FadeIn>

          {/* Creative grid: 2 large + 4 small */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Large card */}
            <FadeIn className="md:col-span-2 md:row-span-2">
              <motion.div
                className="gradient-brand rounded-3xl p-8 md:p-10 h-full text-white relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
              >
                <div className="absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-amber-300 text-amber-300" />
                    ))}
                  </div>
                  <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-8 text-white/95">
                    &ldquo;{testimonials[0].text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl font-black backdrop-blur-sm">
                      {testimonials[0].name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{testimonials[0].name}</p>
                      <p className="text-white/50 text-sm">{testimonials[0].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Small cards */}
            {testimonials.slice(1).map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-6 border border-gray-100 h-full hover:shadow-xl hover:shadow-brand-deep/5 transition-all duration-500 group"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 border-t border-gray-50 pt-3">
                    <div className="w-9 h-9 gradient-brand rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{t.name}</p>
                      <p className="text-xs text-gray-400 truncate">{t.city}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PRICING — CREATIVE CARDS ══════════ */}
      <section id="pricing" className="py-20 md:py-28 gradient-brand-soft relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #0047AB 1px, transparent 1px)",
            backgroundSize: "25px 25px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge className="mb-4 bg-white text-brand-deep border-brand-pale px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              قیمت‌گذاری منصفانه
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              پلنی مناسب هر کسب‌وکار
            </h2>
            <p className="text-gray-400 text-lg">
              ۱۴ روز رایگان — بدون کارت بانکی
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {pricingPlans.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.div
                  className={`relative rounded-3xl overflow-hidden ${
                    plan.popular ? "md:-mt-4 md:mb-4" : ""
                  }`}
                  whileHover={{ y: -6 }}
                >
                  {plan.popular && (
                    <div className="gradient-brand text-white text-center py-2 text-sm font-bold">
                      محبوب‌ترین انتخاب
                    </div>
                  )}
                  <div
                    className={`bg-white p-8 border ${
                      plan.popular
                        ? "border-brand-mid/30 shadow-2xl shadow-brand-deep/10"
                        : "border-gray-100"
                    }`}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-black text-gray-900 mb-1">{plan.name}</h3>
                      <p className="text-xs text-gray-400 mb-5">{plan.desc}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-black text-gradient">{plan.price}</span>
                        <span className="text-xs text-gray-400">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-brand-mid flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-500">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className={`w-full py-5 rounded-xl text-sm font-bold transition-all ${
                          plan.popular
                            ? "gradient-brand text-white border-0 shadow-lg shadow-brand-mid/25"
                            : "border-2 border-brand-pale text-brand-deep hover:bg-brand-surface hover:border-brand-mid"
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              سوالات متداول
            </h2>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <motion.div
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  whileHover={{ shadow: "0 4px 20px rgba(0,71,171,0.05)" }}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 md:p-6 text-right"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-bold text-gray-900 text-sm md:text-base">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-brand-mid flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-400 text-sm leading-relaxed border-t border-gray-50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA — DRAMATIC ══════════ */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 gradient-brand" />
        {/* Animated decorations */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-white/5 rounded-full"
            style={{ animation: "float 8s ease-in-out infinite" }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[10%] w-[200px] h-[200px] bg-white/5 rounded-full"
            style={{ animation: "float 10s ease-in-out infinite 2s" }}
          />
          <motion.div
            className="absolute top-[50%] left-[50%] w-[500px] h-[500px] bg-white/3 blob"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <motion.div
              className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20 p-2"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <img
                src="/logo-asanhesab.png"
                alt="آسان حساب"
                className="w-full h-full rounded-2xl object-contain"
              />
            </motion.div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              آینده مالی کسب‌وکارتان
              <br />
              از همین لحظه شروع می‌شود
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              هزاران کاربر افغان پیش از شما این تصمیم را گرفته‌اند.
              به آن‌ها بپیوندید و مدیریت مالی خود را برای همیشه متحول کنید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="bg-white text-brand-deep hover:bg-gray-50 border-0 px-10 py-7 text-lg rounded-2xl shadow-2xl font-bold transition-all"
                >
                  <Zap className="w-5 h-5 ml-2" />
                  شروع رایگان ۱۴ روزه
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-7 text-lg rounded-2xl backdrop-blur-sm transition-all"
                >
                  <Headphones className="w-5 h-5 ml-2" />
                  تماس با ما
                </Button>
              </motion.div>
            </div>
            <p className="text-white/30 text-sm mt-8">
              بدون کارت بانکی &bull; بدون تعهد &bull; کنسل هر وقت بخواهید
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-[#0a0a1a] text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo-asanhesab.png"
                  alt="آسان حساب"
                  className="w-10 h-10 rounded-full shadow-lg"
                />
                <div>
                  <span className="text-lg font-black text-white">آسان حساب</span>
                  <span className="text-[10px] text-gray-600 block -mt-0.5 tracking-wider">
                    ASANHESAB
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 mb-4">
                اولین نرم‌افزار حسابداری به زبان دری با تقویم هجری شمسی، مخصوص بازار افغانستان.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">محصول</h4>
              <ul className="space-y-3 text-sm">
                {["ویژگی‌ها", "قیمت‌ها", "آپدیت‌ها", "API"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand-light transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">شرکت</h4>
              <ul className="space-y-3 text-sm">
                {["درباره ما", "تماس با ما", "بلاگ", "فرصت‌ها"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand-light transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">پشتیبانی</h4>
              <ul className="space-y-3 text-sm">
                {["مرکز راهنما", "آموزش ویدیویی", "سوالات متداول", "تماس تلفنی"].map(
                  (l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-brand-light transition-colors">
                        {l}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              تمام حقوق محفوظ است &copy; آسان حساب ۱۴۰۴
            </p>
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="hover:text-brand-light transition-colors">
                حریم خصوصی
              </a>
              <a href="#" className="hover:text-brand-light transition-colors">
                شرایط استفاده
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Custom Icons ─── */
function PlayCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  );
}
