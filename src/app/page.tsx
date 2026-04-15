"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

/* ─── Fade-in wrapper ─── */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stats counter ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
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

  /* ─── NAV ─── */
  const navLinks = [
    { label: "ویژگی‌ها", href: "#features" },
    { label: "چگونه کار می‌کند", href: "#how-it-works" },
    { label: "نظرات مشتریان", href: "#testimonials" },
    { label: "قیمت‌ها", href: "#pricing" },
    { label: "سوالات متداول", href: "#faq" },
  ];

  /* ─── FEATURES ─── */
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "کاملاً به زبان دری",
      desc: "تمام رابط کاربری، گزارش‌ها و تنظیمات به زبان دری و پشتو طراحی شده است. شما بدون نیاز به دانش زبان انگلیسی می‌توانید از تمام امکانات نرم‌افزار بهره‌مند شوید.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <CalendarDays className="w-8 h-8" />,
      title: "تقویم هجری شمسی",
      desc: "تقویم هجری شمسی به صورت کامل در نرم‌افزار تعبیه شده است. تاریخ‌ها، گزارش‌ها و فاکتورها همه به تاریخ شمسی نمایش داده می‌شوند تا با زندگی شما هماهنگ باشد.",
      color: "from-emerald-600 to-emerald-500",
    },
    {
      icon: <SmileIcon />,
      title: "ساده برای همه",
      desc: "حتی اگر هیچ دانش حسابداری ندارید، می‌توانید با آسان حساب کار کنید. رابط کاربری بسیار ساده و بصری طراحی شده تا هر کسی بتواند به راحتی از آن استفاده کند.",
      color: "from-teal-500 to-emerald-400",
    },
    {
      icon: <Receipt className="w-8 h-8" />,
      title: "صدور فاکتور آسان",
      desc: "با چند کلیک ساده، فاکتورهای حرفه‌ای صادر کنید. قالب‌های آماده، چاپ مستقیم و ارسال فاکتور از طریق شبکه‌های اجتماعی امکان‌پذیر است.",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "گزارش‌های هوشمند",
      desc: "داشبورد مدیریتی با نمودارهای زیبا و قابل فهم. سود و زیان، بدهکاری و طلبکاری، وضعیت صندوق و ده‌ها گزارش دیگر به صورت لحظه‌ای.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "امنیت کامل",
      desc: "اطلاعات مالی شما با بالاترین سطح امنیت محافظت می‌شود. پشتیبان‌گیری خودکار روزانه و رمزگذاری پیشرفته اطلاعات تضمین می‌کند که داده‌های شما در امان هستند.",
      color: "from-emerald-600 to-teal-600",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "دسترسی از هر جا",
      desc: "از موبایل، تبلت یا کامپیوتر به حسابداری خود دسترسی داشته باشید. آسان حساب روی تمام دستگاه‌ها به صورت آنلاین کار می‌کند.",
      color: "from-teal-500 to-green-500",
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "پول افغانی",
      desc: "تمام محاسبات به واحد پول افغانی انجام می‌شود. بدون نیاز به تبدیل ارز و با دقت کامل، حساب‌های خود را مدیریت کنید.",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  /* ─── HOW IT WORKS ─── */
  const steps = [
    {
      step: "۱",
      title: "ثبت‌نام آسان",
      desc: "با شماره تلفن یا ایمیل خود در کمتر از ۳۰ ثانیه ثبت‌نام کنید. هیچ نیاز به اطلاعات پیچیده ندارد.",
      icon: <Users className="w-10 h-10" />,
    },
    {
      step: "۲",
      title: "تنظیم کسب‌وکار",
      desc: "نام کسب‌وکار، نوع فعالیت و اطلاعات اولیه را وارد کنید. ویزاردهای آماده به شما کمک می‌کند.",
      icon: <Building2 className="w-10 h-10" />,
    },
    {
      step: "۳",
      title: "شروع حسابداری",
      desc: "فاکتور صادر کنید، هزینه‌ها را ثبت کنید و گزارش‌های هوشمند ببینید. همین امروز شروع کنید!",
      icon: <TrendingUp className="w-10 h-10" />,
    },
  ];

  /* ─── TESTIMONIALS ─── */
  const testimonials = [
    {
      name: "محمد احمد رحیمی",
      role: "صاحب فروشگاه لوازم الکترونیک، کابل",
      text: "قبل از آسان حساب، حسابداری فروشگاهم را در دفترچه یادداشت می‌کردم. حالا همه چیز راحت و مرتب است. واقعاً زندگیم را تغییر داد!",
      rating: 5,
    },
    {
      name: "فاطمه نوری",
      role: "مدیر شرکت بازرگانی، هرات",
      text: "به عنوان یک زن کارآفرین، داشتن نرم‌افزار حسابداری به زبان دری برای من خیلی مهم بود. آسان حساب بهترین انتخاب من بود. از وقتی استفاده می‌کنم، کنترل مالی شرکت‌ام بهتر شده.",
      rating: 5,
    },
    {
      name: "حاجی عبدالسلام",
      role: "صاحب شرکت حمل و نقل، مزار شریف",
      text: "من هیچ دانش حسابداری ندارم ولی با آسان حساب به راحتی درآمد و هزینه‌های شرکت حمل‌ونقل‌ام را مدیریت می‌کنم. عالی است!",
      rating: 5,
    },
    {
      name: "زهرا موسوی",
      role: "دارنده بوتیک پوشاک، قندهار",
      text: "تقویم هجری شمسی و زبان دری باعث شد آسان حساب را انتخاب کنم. خیلی راحت فاکتور صادر می‌کنم و مشتریانم راضی هستند.",
      rating: 5,
    },
    {
      name: "غلام حیدر",
      role: "صاحب رستوران، جلال‌آباد",
      text: "آسان حساب کمک کرد تا هزینه‌های رستورانم را کنترل کنم و سودآوری‌ام را افزایش دهم. بسیار ممنون از تیم آسان حساب.",
      rating: 5,
    },
    {
      name: "مریم صدیقی",
      role: "مدیر موسسه آموزشی، بامیان",
      text: "مدیریت شهریه دانش‌آموزان و هزینه‌های موسسه قبل از آسان حساب خیلی سخت بود. حالا همه چیز سیستماتیک و شفاف است.",
      rating: 5,
    },
  ];

  /* ─── PRICING ─── */
  const pricingPlans = [
    {
      name: "پایه",
      price: "۲,۵۰۰",
      period: "افغانی / ماهانه",
      desc: "مناسب کسب‌وکارهای کوچک",
      features: [
        "یک کاربر",
        "صدور فاکتور نامحدود",
        "گزارش سود و زیان",
        "تقویم هجری شمسی",
        "پشتیبانی آنلاین",
        "حسابداری به زبان دری",
      ],
      cta: "شروع رایگان",
      popular: false,
    },
    {
      name: "حرفه‌ای",
      price: "۵,۵۰۰",
      period: "افغانی / ماهانه",
      desc: "مناسب کسب‌وکارهای متوسط",
      features: [
        "۵ کاربر",
        "تمام امکانات پایه",
        "مدیریت موجودی انبار",
        "گزارش‌های پیشرفته",
        "دسترسی موبایل و دسکتاپ",
        "پشتیبانی تلفنی ۲۴/۷",
        "صدور فاکتور حرفه‌ای",
        "بکاپ خودکار روزانه",
      ],
      cta: "شروع رایگان",
      popular: true,
    },
    {
      name: "سازمانی",
      price: "۱۲,۰۰۰",
      period: "افغانی / ماهانه",
      desc: "مناسب شرکت‌ها و سازمان‌ها",
      features: [
        "کاربران نامحدود",
        "تمام امکانات حرفه‌ای",
        "گزارش مالیاتی",
        "مدیریت چند شعبه",
        "API اختصاصی",
        "آموزش اختصاصی تیم",
        "مدیر قراردادها",
        "پشتیبانی ویژه VIP",
      ],
      cta: "تماس بگیرید",
      popular: false,
    },
  ];

  /* ─── FAQ ─── */
  const faqs = [
    {
      q: "آیا استفاده از آسان حساب نیاز به دانش حسابداری دارد؟",
      a: "خیر، اصلاً! آسان حساب مخصوص افرادی طراحی شده که هیچ دانش حسابداری ندارند. رابط کاربری به زبان دری و بسیار ساده است. با چند کلیک می‌توانید فاکتور صادر کنید، هزینه‌ها را ثبت کنید و گزارش‌های هوشمند ببینید. ما همچنین ویدیوهای آموزشی رایگان به زبان دری تهیه کرده‌ایم.",
    },
    {
      q: "آیا تقویم هجری شمسی پشتیبانی می‌شود؟",
      a: "بله، آسان حساب به صورت کامل از تقویم هجری شمسی پشتیبانی می‌کند. تمام تاریخ‌ها، گزارش‌ها، فاکتورها و صورت‌حساب‌ها به تاریخ شمسی نمایش داده می‌شوند. همچنین امکان تبدیل تاریخ بین شمسی و میلادی وجود دارد.",
    },
    {
      q: "آیا می‌توانم از موبایل استفاده کنم؟",
      a: "بله! آسان حساب روی تمام دستگاه‌ها شامل موبایل، تبلت و کامپیوتر کار می‌کند. فقط کافیست مرورگر خود را باز کنید و وارد حساب کاربری خود شوید. هیچ نیاز به نصب برنامه جداگانه نیست.",
    },
    {
      q: "اطلاعات مالی من چقدر امن است؟",
      a: "ما بالاترین سطح امنیت را برای اطلاعات شما در نظر گرفته‌ایم. تمام داده‌ها با رمزگذاری پیشرفته محافظت می‌شوند، پشتیبان‌گیری خودکار روزانه انجام می‌شود و سرورهای ما در مکان‌های امن قرار دارند. اطلاعات شما با هیچ شخص ثالثی به اشتراک گذاشته نمی‌شود.",
    },
    {
      q: "آیا نسخه رایگان وجود دارد؟",
      a: "بله! شما می‌توانید به صورت رایگان试用 کنید و تمام امکانات را در مدت ۱۴ روز آزمایش کنید. بدون نیاز به کارت بانکی و بدون هیچ تعهدی. اگر راضی بودید، می‌توانید یکی از پلن‌های اشتراک را انتخاب کنید.",
    },
  ];

  /* ─── Businesses served ─── */
  const businessTypes = [
    { icon: <Store className="w-8 h-8" />, label: "فروشگاه‌ها" },
    { icon: <Truck className="w-8 h-8" />, label: "شرکت‌های حمل‌ونقل" },
    { icon: <Building2 className="w-8 h-8" />, label: "شرکت‌های بازرگانی" },
    { icon: <Receipt className="w-8 h-8" />, label: "رستوران‌ها و کافه‌ها" },
    { icon: <FileText className="w-8 h-8" />, label: "موسسات آموزشی" },
    { icon: <Users className="w-8 h-8" />, label: "کلینیک‌ها و مطب‌ها" },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* ══════════ NAVBAR ══════════ */}
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logo-asanhesab.png"
                alt="آسان حساب"
                className="w-10 h-10 rounded-xl object-contain"
              />
              <div>
                <span className="text-xl font-bold text-emerald-700">آسان حساب</span>
                <span className="text-xs text-gray-400 block -mt-1">AsanHesab</span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                ورود
              </Button>
              <Button className="gradient-emerald hover:opacity-90 text-white border-0 px-6 rounded-full shadow-lg shadow-emerald-200">
                <Zap className="w-4 h-4 ml-2" />
                شروع رایگان
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-xl"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-gray-600 hover:text-emerald-600 py-2 text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 border-t flex gap-3">
                  <Button variant="outline" className="flex-1" size="sm">
                    ورود
                  </Button>
                  <Button className="flex-1 gradient-emerald text-white border-0" size="sm">
                    شروع رایگان
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <FadeInSection className="text-center lg:text-right">
              <Badge className="mb-6 bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-2 text-sm font-medium rounded-full">
                <SparkleIcon className="w-4 h-4 ml-2" />
                مخصوص بازار افغانستان
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
                <span className="text-gray-900">حسابداری را</span>
                <br />
                <span className="text-gradient">آسان کنید!</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 lg:mr-0">
                آسان حساب اولین نرم‌افزار حسابداری به{" "}
                <strong className="text-emerald-600">زبان دری</strong> با{" "}
                <strong className="text-emerald-600">تقویم هجری شمسی</strong>،
                مخصوص کسب‌وکارهای افغانستان. بدون نیاز به دانش حسابداری!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="gradient-emerald hover:opacity-90 text-white border-0 px-8 py-6 text-lg rounded-full shadow-xl shadow-emerald-200 pulse-glow"
                >
                  <Zap className="w-5 h-5 ml-2" />
                  ۱۴ روز رایگان شروع کنید
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-full border-gray-200 hover:border-emerald-300"
                >
                  <PlayIcon className="w-5 h-5 ml-2" />
                  تماشای ویدیو معرفی
                </Button>
              </div>

              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  بدون نیاز به کارت بانکی
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  بدون تعهد
                </div>
              </div>
            </FadeInSection>

            {/* Hero Image */}
            <FadeInSection delay={0.3} className="relative">
              <div className="relative float-animation">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-3xl blur-2xl opacity-40" />
                <img
                  src="/hero-accounting.png"
                  alt="آسان حساب - نرم‌افزار حسابداری"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-white rounded-2xl shadow-xl p-4 border border-emerald-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-emerald rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">رشد درآمد</p>
                    <p className="text-xl font-bold text-emerald-600">+۴۷٪</p>
                  </div>
                </div>
              </motion.div>
              {/* Another floating badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -left-4 md:top-4 md:-left-8 bg-white rounded-2xl shadow-xl p-4 border border-emerald-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">رضایت مشتریان</p>
                    <p className="text-xl font-bold text-amber-600">۴.۹ از ۵</p>
                  </div>
                </div>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ══════════ TRUST BAR ══════════ */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <p className="text-center text-gray-400 text-sm mb-6 font-medium">
              بیش از ۵,۰۰۰ کسب‌وکار در سراسر افغانستان به آسان حساب اعتماد کرده‌اند
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: 5000, suffix: "+", label: "کاربر فعال" },
                { value: 120000, suffix: "+", label: "فاکتور صادر شده" },
                { value: 34, suffix: "", label: "ولایت تحت پوشش" },
                { value: 99, suffix: "٪", label: "رضایت مشتریان" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-black text-emerald-600">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ══════════ PROBLEM SECTION ══════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge className="mb-4 bg-red-50 text-red-600 border-red-200 px-4 py-2 rounded-full text-sm">
              آیا شما هم این مشکلات را دارید؟
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              مشکلاتی که کسب‌وکار شما را متوقف می‌کند
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              بسیاری از کسب‌وکارها در افغانستان با چالش‌های مشابه روبرو هستند. آیا شما هم یکی از این مشکلات را تجربه کرده‌اید؟
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                problem: "حساب و کتاب کاغذی و گیج‌کننده",
                desc: "دفترچه‌ها و برگه‌های پراکنده که پیدا کردن یک فاکتور قدیمی را غیرممکن می‌کند.",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                problem: "نرم‌افزارهای انگلیسی‌زبان",
                desc: "نرم‌افزارهای خارجی که زبانشان را نمی‌فهمید و تقویمشان با تقویم شما فرق دارد.",
              },
              {
                icon: <PieChart className="w-6 h-6" />,
                problem: "عدم شفافیت مالی",
                desc: "نمی‌دانید دقیقاً چقدر سود کرده‌اید، چقدر بدهکارید و وضعیت مالی کسب‌وکارتان چیست.",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                problem: "هدر رفتن وقت",
                desc: "ساعت‌ها وقت صرف محاسبات دستی می‌کنید که می‌تواند در چند دقیقه انجام شود.",
              },
              {
                icon: <Receipt className="w-6 h-6" />,
                problem: "فاکتورهای غیرحرفه‌ای",
                desc: "فاکتورهای دستی که اعتبار کسب‌وکار شما را زیر سوال می‌برند.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                problem: "خطر از دست رفتن اطلاعات",
                desc: "یک ورقه گم‌شده یا دفترچه پاره‌شده می‌تواند اطلاعات مهم مالی شما را برای همیشه نابود کند.",
              },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-500 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.problem}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="text-center mt-12">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 inline-flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              <p className="text-emerald-700 font-medium">
                آسان حساب تمام این مشکلات را حل کرده است!
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section id="features" className="py-20 md:py-28 bg-gradient-to-b from-white to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-50 text-emerald-600 border-emerald-200 px-4 py-2 rounded-full text-sm">
              <Award className="w-4 h-4 ml-1" />
              ویژگی‌های قدرتمند
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              همه چیز آن چیزی است که نیاز دارید
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              آسان حساب با ویژگی‌های متنوع و کاربردی، تمام نیازهای حسابداری کسب‌وکار شما را پوشش می‌دهد
            </p>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <FadeInSection key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 group">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DASHBOARD PREVIEW ══════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              داشبورد ساده و زیبا
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              با یک نگاه، وضعیت کامل مالی کسب‌وکار خود را ببینید
            </p>
          </FadeInSection>

          <FadeInSection>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 rounded-3xl blur-xl opacity-30" />
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <img
                  src="/dashboard-preview.png"
                  alt="داشبورد آسان حساب"
                  className="w-full"
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-50 text-emerald-600 border-emerald-200 px-4 py-2 rounded-full text-sm">
              شروع آسان
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              در سه مرحله شروع کنید
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              شروع حسابداری با آسان حساب خیلی ساده است. حتی یک فرد بدون دانش فنی می‌تواند در کمتر از ۵ دقیقه شروع کند
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-24 right-1/6 left-1/6 h-0.5 bg-gradient-to-l from-emerald-300 via-emerald-400 to-emerald-300" />

            {steps.map((step, i) => (
              <FadeInSection key={i} delay={i * 0.2}>
                <div className="text-center relative">
                  <div className="w-20 h-20 mx-auto mb-6 gradient-emerald rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-200 relative z-10">
                    <span className="text-3xl font-black">{step.step}</span>
                  </div>
                  <div className="w-14 h-14 mx-auto mb-4 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">{step.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BUSINESS TYPES ══════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              مناسب برای هر نوع کسب‌وکار
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              از فروشگاه کوچک تا شرکت بزرگ، آسان حساب نیاز همه را برآورده می‌کند
            </p>
          </FadeInSection>

          <FadeInSection>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {businessTypes.map((biz, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-emerald-500 group-hover:scale-110 transition-transform mb-3 flex justify-center">
                    {biz.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">{biz.label}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section id="testimonials" className="py-20 md:py-28 gradient-dark relative overflow-hidden">
        {/* Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500 rounded-full blur-3xl opacity-10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-800/50 text-emerald-300 border-emerald-700 px-4 py-2 rounded-full text-sm">
              <Heart className="w-4 h-4 ml-1" />
              صدای مشتریان ما
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              آن‌ها آسان حساب را دوست دارند
            </h2>
            <p className="text-emerald-200/70 text-lg max-w-2xl mx-auto">
              هزاران کاربر در سراسر افغانستان با آسان حساب حسابداری خود را متحول کرده‌اند
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-emerald-50/90 text-sm leading-relaxed mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="w-10 h-10 gradient-emerald rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{t.name}</p>
                      <p className="text-emerald-300/60 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-50 text-emerald-600 border-emerald-200 px-4 py-2 rounded-full text-sm">
              قیمت‌گذاری منصفانه
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              پلنی مناسب برای هر کسب‌وکار
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              قیمت‌های ما مخصوص بازار افغانستان تنظیم شده است. ۱۴ روز رایگان试用 کنید!
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div
                  className={`relative rounded-2xl p-8 h-full flex flex-col ${
                    plan.popular
                      ? "bg-white border-2 border-emerald-500 shadow-2xl shadow-emerald-100 scale-105"
                      : "bg-white border border-gray-200 hover:shadow-lg"
                  } transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 right-1/2 translate-x-1/2">
                      <Badge className="gradient-emerald text-white border-0 px-4 py-1 rounded-full shadow-lg">
                        محبوب‌ترین
                      </Badge>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{plan.desc}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black text-emerald-600">{plan.price}</span>
                      <span className="text-sm text-gray-400">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-5 rounded-full text-base font-bold transition-all ${
                      plan.popular
                        ? "gradient-emerald text-white border-0 shadow-lg shadow-emerald-200 hover:opacity-90"
                        : "border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="text-center mt-10">
            <p className="text-sm text-gray-400">
              تمام پلن‌ها شامل ۱۴ روز رایگان trial هستند. بدون نیاز به کارت بانکی.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-50 text-emerald-600 border-emerald-200 px-4 py-2 rounded-full text-sm">
              سوالات متداول
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              سوالات شما را پاسخ می‌دهیم
            </h2>
          </FadeInSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeInSection key={i} delay={i * 0.08}>
                <div
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-right"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-bold text-gray-900 text-sm md:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-emerald" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-5" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-5" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              آینده مالی کسب‌وکارتان
              <br />
              از امروز شروع می‌شود
            </h2>
            <p className="text-emerald-100/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              هزاران کاربر افغان پیش از شما این تصمیم را گرفته‌اند. به آن‌ها بپیوندید و
              مدیریت مالی کسب‌وکارتان را برای همیشه متحول کنید. همین حالا رایگان شروع کنید!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50 border-0 px-10 py-7 text-lg rounded-full shadow-2xl font-bold"
              >
                <Zap className="w-5 h-5 ml-2" />
                شروع رایگان ۱۴ روزه
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/30 hover:bg-white/10 px-10 py-7 text-lg rounded-full"
              >
                <Headphones className="w-5 h-5 ml-2" />
                تماس با ما
              </Button>
            </div>
            <p className="text-emerald-200/50 text-sm mt-6">
              بدون نیاز به کارت بانکی &bull; بدون تعهد &bull; کنسل کردن هر وقت بخواهید
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo-asanhesab.png"
                  alt="آسان حساب"
                  className="w-10 h-10 rounded-xl object-contain"
                />
                <div>
                  <span className="text-lg font-bold text-white">آسان حساب</span>
                  <span className="text-xs text-gray-500 block -mt-1">AsanHesab</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 mb-4">
                اولین و بهترین نرم‌افزار حسابداری به زبان دری با تقویم هجری شمسی، مخصوص
                بازار افغانستان.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-4">محصول</h4>
              <ul className="space-y-3 text-sm">
                {["ویژگی‌ها", "قیمت‌ها", " integrations", "آپدیت‌ها"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-emerald-400 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">شرکت</h4>
              <ul className="space-y-3 text-sm">
                {["درباره ما", "تماس با ما", "بلاگ", "فرصت‌های شغلی"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-emerald-400 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">پشتیبانی</h4>
              <ul className="space-y-3 text-sm">
                {["مرکز راهنما", "آموزش‌های ویدیویی", "سوالات متداول", "تماس تلفنی"].map(
                  (l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-emerald-400 transition-colors">
                        {l}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              تمام حقوق محفوظ است &copy; آسان حساب ۱۴۰۴
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                حریم خصوصی
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                شرایط استفاده
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Custom SVG icons ─── */
function SparkleIcon({ className }: { className?: string }) {
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
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function SmileIcon({ className }: { className?: string }) {
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
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}
