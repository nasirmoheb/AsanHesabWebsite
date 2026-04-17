"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  ParallaxSection,
  GlowOrb,
} from "@/components/ui/animation-components";
import {
  Calculator,
  CalendarDays,
  BarChart3,
  Shield,
  Users,
  Globe,
  CheckCircle2,
  Star,
  ArrowLeft,
  Menu,
  X,
  TrendingUp,
  Wallet,
  Receipt,
  Headphones,
  Zap,
  Building2,
  Truck,
  Store,
  Sparkles,
  Layers,
  Monitor,
  WifiOff,
  Bell,
  ArrowUp,
  Home as HomeIcon,
  LayoutDashboard,
  Settings,
  FileSpreadsheet,
  Download,
  PlayCircle,
} from "lucide-react";

/* ─── Dynamic imports for below-fold sections ─── */
const MarqueeSection = dynamic(() => import("@/components/sections/MarqueeSection"), { ssr: false });
const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection"), { ssr: false });
const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection"), { ssr: false });
const DashboardShowcase = dynamic(() => import("@/components/sections/DashboardShowcase"), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), { ssr: false });
const BusinessTypes = dynamic(() => import("@/components/sections/BusinessTypes"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), { ssr: false });
const PricingSection = dynamic(() => import("@/components/sections/PricingSection"), { ssr: false });
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), { ssr: false });
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"), { ssr: false });

/* ═══════════════════════════════════════════
   UTILITY COMPONENTS now imported from
   @/components/ui/animation-components
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   ROTATING PHRASE — ANIMATED MARKETING LINE
   ═══════════════════════════════════════════ */

function RotatingPhrase() {
  const { t } = useI18n();
  const phrases = useMemo(() => [
    t("phrase.in_dari"),
    t("phrase.no_internet"),
    t("phrase.solar_calendar"),
    t("phrase.simple"),
    t("phrase.offline"),
  ], [t]);
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startDelay = setTimeout(() => setStarted(true), 1500);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!started) return;
    const currentPhrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentPhrase.slice(0, displayed.length + 1));
      }, 90 + Math.random() * 40);
    } else if (!isDeleting && displayed.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentPhrase.slice(0, displayed.length - 1));
      }, 40 + Math.random() * 20);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex, started, phrases]);

  return (
    <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap" dir="rtl">
      <span className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
        نرم‌افزار حسابداری
      </span>
      {/* Clean pill container */}
      <span className="relative inline-flex items-center justify-center min-w-[155px] h-[2.2rem] md:min-w-[195px] md:h-[2.7rem]">
        {/* Pill background */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-l from-brand-pale/70 to-brand-surface/80 border border-brand-pale/60" />
        {/* Decorative side accent dots */}
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-mid/30" />
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-mid/30" />
        <AnimatePresence mode="wait">
          <motion.span
            key={phraseIndex + (isDeleting ? 'del' : 'ins')}
            initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative text-sm md:text-base font-black text-gradient-glow leading-relaxed whitespace-nowrap z-10"
          >
            {displayed}
          </motion.span>
        </AnimatePresence>
        {/* Glowing blinking cursor */}
        <motion.span
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-brand-mid rounded-full z-10"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "steps(2)" }}
          style={{ boxShadow: "0 0 6px rgba(0,127,255,0.6), 0 0 12px rgba(0,127,255,0.2)" }}
        />
      </span>
      <span className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
        مخصوص کسب‌وکار شما
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CHAR REVEAL — TYPEWRITER CHAR-BY-CHAR
   ═══════════════════════════════════════════ */

function CharReveal({
  text,
  className,
  delayStart = 0,
  charDelay = 0.04,
  onComplete,
}: {
  text: string;
  className?: string;
  delayStart?: number;
  charDelay?: number;
  onComplete?: () => void;
}) {
  const chars = text.split("");
  const [revealedCount, setRevealedCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const startTimer = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setRevealedCount(count);
        if (count >= chars.length) {
          clearInterval(interval);
          onComplete?.();
        }
      }, charDelay * 1000);
      return () => clearInterval(interval);
    }, delayStart * 1000);

    return () => clearTimeout(startTimer);
  }, [text]);

  return (
    <span className={className} style={{ display: "inline-block" }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{
            opacity: i < revealedCount ? 1 : 0,
            y: i < revealedCount ? 0 : 20,
            filter: i < revealedCount ? "blur(0px)" : "blur(8px)",
          }}
          transition={{ duration: 0.25 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════
   PARTICLE BURST — ON HEADING COMPLETE
   ═══════════════════════════════════════════ */

function ParticleBurst({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const distance = 60 + Math.random() * 80;
        const size = 2 + Math.random() * 4;
        const colors = ["#0047AB", "#007FFF", "#5DADE2", "#D6EEFF"];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              background: colors[i % colors.length],
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 1,
            }}
            transition={{ duration: 0.8 + Math.random() * 0.4, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ANIMATED SPARKLINE — SVG
   ═══════════════════════════════════════════ */

function AnimatedSparkline() {
  const data = [8, 15, 12, 22, 18, 28, 24, 32, 26, 35, 30, 38];
  const pathData = data.map((p, i) => `${i * 7},${42 - p}`).join(" L ");
  const areaPath = `M 0,42 L ${data.map((p, i) => `${i * 7},${42 - p}`).join(" L ")} L ${data.length * 7 - 7},42 Z`;

  return (
    <svg viewBox="0 0 80 42" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#007FFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#007FFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Filled area */}
      <motion.path
        d={areaPath}
        fill="url(#sparkGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
      />
      {/* Line */}
      <motion.path
        d={`M ${pathData}`}
        fill="none"
        stroke="#007FFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1, ease: "easeOut" }}
      />
      {/* End dot */}
      <motion.circle
        cx={(data.length - 1) * 7}
        cy={42 - data[data.length - 1]}
        r="2"
        fill="#007FFF"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8, type: "spring" }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   LIVE CLOCK
   ═══════════════════════════════════════════ */

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="text-[7px] md:text-[8px] text-gray-400 font-mono tabular-nums">
      {time}
    </span>
  );
}

/* ═══════════════════════════════════════════
   HERO TILT CARD — CODE-ONLY DASHBOARD
   ═══════════════════════════════════════════ */

function KpiCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
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

function LiveTransactionFeed() {
  const transactions = [
    { name: "فروشگاه نور الکترونیک", amount: "+۱۵,۵۰۰", type: "income", time: "۱۰:۳۰", icon: <Store className="w-2.5 h-2.5" /> },
    { name: "خرید مواد اولیه", amount: "-۸,۲۰۰", type: "expense", time: "۱۱:۱۵", icon: <Truck className="w-2.5 h-2.5" /> },
    { name: "فاکتور #۱۰۴۷", amount: "+۲۳,۰۰۰", type: "income", time: "۱۲:۰۰", icon: <Receipt className="w-2.5 h-2.5" /> },
    { name: "حقوق کارمندان", amount: "-۴۵,۰۰۰", type: "expense", time: "۰۱:۳۰", icon: <Users className="w-2.5 h-2.5" /> },
    { name: "سفارش #۲۳۱", amount: "+۷,۸۰۰", type: "income", time: "۰۲:۴۵", icon: <Store className="w-2.5 h-2.5" /> },
    { name: "اجاره مغازه", amount: "-۱۲,۰۰۰", type: "expense", time: "۰۳:۰۰", icon: <Building2 className="w-2.5 h-2.5" /> },
    { name: "فروش عمده #۳۱۲", amount: "+۵۶,۰۰۰", type: "income", time: "۰۳:۳۰", icon: <Receipt className="w-2.5 h-2.5" /> },
    { name: "خرید لوازم اداری", amount: "-۳,۵۰۰", type: "expense", time: "۰۴:۰۰", icon: <Building2 className="w-2.5 h-2.5" /> },
  ];

  const VISIBLE_SLOTS = 4;
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % transactions.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const visibleItems = Array.from({ length: VISIBLE_SLOTS }, (_, i) => transactions[(startIndex + i) % transactions.length]);

  return (
    <div className="relative" style={{ height: `${VISIBLE_SLOTS * 30 + 16}px` }}>
      {/* Pulse dot indicator */}
      <div className="flex items-center gap-1.5 mb-1">
        <motion.div className="w-1 h-1 rounded-full bg-emerald-400" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <span className="text-[7px] text-emerald-400/80 font-medium">ثبت خودکار</span>
      </div>
      {/* Fixed-height viewport */}
      <div className="space-y-0.5 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((tx, i) => (
            <motion.div
              key={startIndex + i}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{
                duration: 0.45,
                ease: [0.25, 0.4, 0.25, 1],
                delay: i * 0.04,
              }}
              className="flex items-center gap-2 py-[5px] px-2 rounded-lg"
              style={{ height: "30px" }}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${tx.type === "income" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-400/15 text-red-400"}`}>
                {tx.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] text-gray-300 font-medium truncate leading-tight">{tx.name}</p>
              </div>
              <div className="text-left shrink-0">
                <p className={`text-[9px] font-bold leading-tight ${tx.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                  {tx.amount} <span className="text-[6px] text-gray-500 font-normal">Afs</span>
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LiveInvoicePreview() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "ثبت مشتری", sub: "محمد احمد رحیمی", icon: <Users className="w-3 h-3" />, progress: 30 },
    { label: "افزودن اقلام", sub: "۳ قلم کالا", icon: <Layers className="w-3 h-3" />, progress: 60 },
    { label: "تایید و ارسال", sub: "فاکتور #۱۰۴۷", icon: <CheckCircle2 className="w-3 h-3" />, progress: 100 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl p-2.5 md:p-3 border border-brand-pale/40 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 gradient-brand rounded-md flex items-center justify-center text-white">
            <Receipt className="w-3 h-3" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-800">فاکتور جدید</p>
            <p className="text-[7px] text-gray-400">۱۴۰۴/۰۱/۱۵</p>
          </div>
        </div>
        <span className="text-[7px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-bold">
          {steps[step].label}
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-1 bg-gray-100 rounded-full mb-2 overflow-hidden">
        <motion.div
          className="h-full gradient-brand rounded-full"
          animate={{ width: `${steps[step].progress}%` }}
          transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </div>
      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-1"
            animate={{ opacity: i <= step ? 1 : 0.35 }}
            transition={{ duration: 0.4 }}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${i <= step ? "gradient-brand text-white" : "bg-gray-100 text-gray-400"}`}>
              {i < step ? <CheckCircle2 className="w-2.5 h-2.5" /> : <span className="text-[7px] font-bold">{i + 1}</span>}
            </div>
            <span className="text-[7px] text-gray-600 hidden sm:block">{s.sub}</span>
          </motion.div>
        ))}
      </div>
      {/* Amount reveal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="mt-2 text-center"
        >
          <span className="text-xs text-gray-400">مبلغ کل: </span>
          <span className="text-sm font-black text-brand-deep">۲۳,۰۰۰ <span className="text-[8px] text-gray-400 font-normal">افغانی</span></span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AnimatedBarChart() {
  const bars = [35, 55, 42, 72, 60, 85, 68, 90, 75, 95, 82, 100];
  const months = ["حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبله", "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت"];

  return (
    <div className="flex items-end gap-[3px] h-full px-1">
      {bars.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
          <motion.div
            className="w-full rounded-t-sm min-w-[4px]"
            style={{
              background: i === bars.length - 1
                ? "linear-gradient(180deg, #007FFF 0%, #0047AB 100%)"
                : i >= bars.length - 3
                ? "linear-gradient(180deg, #5DADE2 0%, #007FFF 100%)"
                : "linear-gradient(180deg, #D6EEFF 0%, #5DADE2 100%)",
            }}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.8, delay: 0.8 + i * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
          />
          <span className="text-[5px] text-gray-400 hidden md:block">{months[i]}</span>
        </div>
      ))}
    </div>
  );
}

function AnimatedDonutChart() {
  const segments = [
    { value: 45, color: "#0047AB", label: "درآمد" },
    { value: 25, color: "#007FFF", label: "هزینه" },
    { value: 20, color: "#5DADE2", label: "سود" },
    { value: 10, color: "#D6EEFF", label: "سایر" },
  ];
  let cumulative = 0;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 72 72" className="w-16 h-16 md:w-20 md:h-20">
        {segments.map((seg, i) => {
          const offset = (cumulative / 100) * circumference;
          cumulative += seg.value;
          const dashLength = (seg.value / 100) * circumference;
          return (
            <motion.circle
              key={i}
              cx="36" cy="36" r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 36 36)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
            />
          );
        })}
        <text x="36" y="34" textAnchor="middle" fill="#0047AB" fontSize="10" fontWeight="800">۴۷٪</text>
        <text x="36" y="44" textAnchor="middle" fill="#999" fontSize="5">سود</text>
      </svg>
      <div className="flex flex-col gap-1.5">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: seg.color }} />
            <span className="text-[8px] md:text-[9px] text-gray-500">{seg.label}</span>
            <span className="text-[8px] md:text-[9px] font-bold text-gray-700">{seg.value}٪</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroTiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [holoKey, setHoloKey] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / rect.width) * 8;
    const rotateX = -((e.clientY - centerY) / rect.height) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoloKey((k) => k + 1);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const sidebarIcons = [
    { Icon: HomeIcon, active: true },
    { Icon: LayoutDashboard, active: true },
    { Icon: Receipt, active: false },
    { Icon: FileSpreadsheet, active: false },
    { Icon: BarChart3, active: false },
    { Icon: Users, active: false },
  ];

  return (
    <motion.div
      ref={cardRef}
      className="relative z-10 mx-auto w-[340px] sm:w-[400px] md:w-[460px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="rounded-2xl md:rounded-3xl overflow-hidden relative"
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: isHovered
            ? "0 30px 60px rgba(0,71,171,0.18), 0 0 40px rgba(0,127,255,0.08), inset 0 1px 0 rgba(255,255,255,0.8)"
            : "0 20px 40px rgba(0,71,171,0.12), 0 0 0 1px rgba(255,255,255,0.6)",
        }}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {/* Holographic shine overlay on hover */}
        {isHovered && (
          <div key={holoKey} className="absolute inset-0 rounded-2xl md:rounded-3xl z-30 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 holo-shine" />
          </div>
        )}

        {/* Glassmorphism border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl md:rounded-3xl z-20 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(0,127,255,0.08) 100%)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        />

        {/* Desktop App Title Bar */}
        <div className="relative z-20 px-3 py-2 flex items-center justify-between" style={{
          background: "linear-gradient(180deg, rgba(248,250,252,0.8) 0%, rgba(235,245,255,0.6) 100%)",
          borderBottom: "1px solid rgba(0,127,255,0.08)",
        }}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <motion.div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" whileHover={{ scale: 1.2 }} />
              <motion.div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" whileHover={{ scale: 1.2 }} />
              <motion.div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" whileHover={{ scale: 1.2 }} />
            </div>
            <div className="w-px h-3 bg-gray-300/60 mx-1" />
            <span className="text-[9px] text-gray-500 font-medium truncate">آسان حساب — داشبورد</span>
          </div>
          <div className="flex items-center gap-1.5">
            <LiveClock />
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm">
              <Calculator className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex" style={{ height: "auto" }}>
          {/* Frosted Glass Sidebar with wave animation */}
          <motion.div
            className="w-9 md:w-10 shrink-0 flex flex-col items-center py-2 gap-2 relative"
            style={{
              background: "linear-gradient(180deg, rgba(235,245,255,0.6) 0%, rgba(214,238,255,0.4) 100%)",
              backdropFilter: "blur(12px)",
              borderLeft: "1px solid rgba(0,127,255,0.06)",
            }}
          >
            {sidebarIcons.map((item, i) => (
              <motion.div
                key={i}
                className={`w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center cursor-default transition-all duration-300 ${
                  item.active
                    ? "gradient-brand text-white shadow-md shadow-brand-mid/20"
                    : "bg-white/60 text-gray-400 hover:bg-white hover:text-gray-600"
                }`}
                whileHover={{ scale: 1.15 }}
                animate={isHovered ? {
                  y: [0, -3, 0],
                } : {}}
                transition={{
                  duration: 0.4,
                  delay: isHovered ? i * 0.08 : 0,
                  ease: "easeInOut",
                }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <item.Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
              </motion.div>
            ))}
            <div className="flex-1" />
            <motion.div
              className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center bg-white/60 text-gray-400 hover:text-red-400 cursor-default"
              whileHover={{ scale: 1.15 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Settings className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </motion.div>
          </motion.div>

          {/* Main Content Area — tighter padding */}
          <div className="flex-1 p-1.5 md:p-2 space-y-1 min-w-0">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[9px] md:text-[10px] font-bold text-gray-800 truncate">داشبورد مدیریت</p>
                <p className="text-[6px] md:text-[7px] text-gray-400">۱۴۰۴/۰۱/۱۵ - اسد</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="px-1.5 py-0.5 bg-blue-50/80 rounded-full text-[6px] md:text-[7px] text-blue-600 font-bold" style={{ backdropFilter: "blur(4px)" }}>آفلاین</div>
                <div className="relative w-5 h-5 rounded-full bg-brand-pale/80 flex items-center justify-center">
                  <Bell className="w-2.5 h-2.5 text-brand-deep" />
                  <motion.span
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-[6px] text-white font-bold border border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ۳
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Compact KPI Row */}
            <div className="grid grid-cols-3 gap-1">
              {[
                { label: "درآمد کل", value: 850000, unit: "Afs", color: "from-brand-deep/[0.08] to-brand-mid/[0.05]", iconColor: "from-brand-deep to-brand-mid", icon: <TrendingUp className="w-2.5 h-2.5" /> },
                { label: "فاکتورها", value: 124, unit: "عدد", color: "from-emerald-50 to-emerald-100/50", iconColor: "from-emerald-500 to-emerald-400", icon: <Receipt className="w-2.5 h-2.5" /> },
                { label: "مشتریان", value: 86, unit: "نفر", color: "from-amber-50 to-amber-100/50", iconColor: "from-amber-500 to-amber-400", icon: <Users className="w-2.5 h-2.5" /> },
              ].map((kpi, i) => (
                <motion.div
                  key={i}
                  className={`bg-gradient-to-br ${kpi.color} rounded-xl p-1.5 border border-white/40`}
                  style={{ backdropFilter: "blur(4px)" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                >
                  <div className={`w-4 h-4 rounded-md bg-gradient-to-br ${kpi.iconColor} flex items-center justify-center text-white mb-1`}>
                    {kpi.icon}
                  </div>
                  <p className="text-[6px] text-gray-400 leading-none">{kpi.label}</p>
                  <p className="text-[10px] md:text-xs font-black text-gray-900 mt-0.5 leading-tight">
                    <KpiCounter target={kpi.value} />{" "}
                    <span className="text-[6px] text-gray-400 font-normal">{kpi.unit}</span>
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Charts + Sparkline Row */}
            <div className="grid grid-cols-5 gap-1">
              <motion.div
                className="col-span-3 bg-gradient-to-b from-brand-surface/20 to-white/60 rounded-xl p-1.5 border border-brand-pale/15"
                style={{ backdropFilter: "blur(4px)" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[7px] font-bold text-gray-700">نمودار ماهانه</p>
                  <span className="text-[6px] text-brand-mid font-bold bg-brand-pale/40 px-1 py-0.5 rounded-full">+۴۷٪</span>
                </div>
                <div className="h-10 md:h-13">
                  <AnimatedBarChart />
                </div>
              </motion.div>
              <motion.div
                className="col-span-2 bg-white/60 rounded-xl p-1.5 border border-white/40"
                style={{ backdropFilter: "blur(4px)" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-[7px] font-bold text-gray-700 mb-0.5">فعالیت هفتگی</p>
                <div className="h-9 md:h-11">
                  <AnimatedSparkline />
                </div>
              </motion.div>
            </div>

            {/* Bottom Row — compact */}
            <div className="grid grid-cols-5 gap-1">
              <motion.div
                className="col-span-3 bg-gradient-to-b from-[#0d1117]/90 to-[#161b22]/90 rounded-xl p-1.5 border border-gray-800/40 overflow-hidden"
                style={{ backdropFilter: "blur(4px)" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <motion.div className="w-1 h-1 rounded-full bg-emerald-400" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <p className="text-[7px] font-bold text-gray-300">آخرین تراکنش‌ها</p>
                  </div>
                  <span className="text-[6px] text-gray-500 bg-gray-800/60 px-1 py-0.5 rounded-full">امروز</span>
                </div>
                <LiveTransactionFeed />
              </motion.div>
              <motion.div
                className="col-span-2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                <LiveInvoicePreview />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="h-1 bg-gradient-to-l from-brand-deep via-brand-mid to-brand-light opacity-50 relative z-10" />
      </motion.div>

      {/* Breathing ambient glow behind card */}
      <motion.div
        className="absolute -inset-4 rounded-[2rem] blur-2xl -z-10"
        style={{ background: "linear-gradient(135deg, rgba(0,127,255,0.12) via rgba(0,71,171,0.06) to rgba(93,173,226,0.08))" }}
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Decorative corner accents */}
      <motion.div
        className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-brand-mid/30 rounded-tr-lg"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-brand-mid/30 rounded-bl-lg"
        animate={{ opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN LANDING PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const { t, dir } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isRtl = dir === "rtl";

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = useMemo(() => [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.dashboard"), href: "#dashboard" },
    { label: t("nav.testimonials"), href: "#testimonials" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.faq"), href: "#faq" },
  ], [t]);

  const features = [
    {
      icon: <Globe className="w-7 h-7" />,
      title: t("features.f1_title"),
      desc: t("features.f1_desc"),
    },
    {
      icon: <CalendarDays className="w-7 h-7" />,
      title: t("features.f2_title"),
      desc: t("features.f2_desc"),
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: t("features.f3_title"),
      desc: t("features.f3_desc"),
    },
    {
      icon: <Receipt className="w-7 h-7" />,
      title: t("features.f4_title"),
      desc: t("features.f4_desc"),
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: t("features.f5_title"),
      desc: t("features.f5_desc"),
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: t("features.f6_title"),
      desc: t("features.f6_desc"),
    },
    {
      icon: <Monitor className="w-7 h-7" />,
      title: t("features.f7_title"),
      desc: t("features.f7_desc"),
    },
    {
      icon: <Wallet className="w-7 h-7" />,
      title: t("features.f8_title"),
      desc: t("features.f8_desc"),
    },
  ];

  const bentoFeatures = [
    {
      span: "md:col-span-2 md:row-span-2",
      icon: <BarChart3 className="w-10 h-10" />,
      title: t("bento.smart_dashboard"),
      desc: t("bento.smart_dashboard_desc"),
      gradient: true,
    },
    {
      span: "md:col-span-1",
      icon: <Receipt className="w-7 h-7" />,
      title: t("bento.instant_invoice"),
      desc: t("bento.instant_invoice_desc"),
    },
    {
      span: "md:col-span-1",
      icon: <Shield className="w-7 h-7" />,
      title: t("bento.auto_backup"),
      desc: t("bento.auto_backup_desc"),
    },
    {
      span: "md:col-span-1",
      icon: <Globe className="w-7 h-7" />,
      title: t("bento.local_support"),
      desc: t("bento.local_support_desc"),
    },
    {
      span: "md:col-span-1",
      icon: <CalendarDays className="w-7 h-7" />,
      title: t("bento.solar_cal"),
      desc: t("bento.solar_cal_desc"),
    },
  ];

  const testimonials = [
    {
      name: "محمد احمد رحیمی",
      role: t("t1.role"),
      text: "قبل از آسان حساب، حسابداری فروشگاهم را در دفترچه یادداشت می‌کردم. حالا همه چیز راحت و مرتب است. واقعاً زندگیم را تغییر داد!",
      rating: 5,
      city: "کابل",
    },
    {
      name: "فاطمه نوری",
      role: t("t2.role"),
      text: "به عنوان یک زن کارآفرین، داشتن نرم‌افزار حسابداری به زبان دری برای من خیلی مهم بود. آسان حساب بهترین انتخاب من بود.",
      rating: 5,
      city: "هرات",
    },
    {
      name: "حاجی عبدالسلام",
      role: t("t3.role"),
      text: "من هیچ دانش حسابداری ندارم ولی با آسان حساب به راحتی درآمد و هزینه‌های شرکت حمل‌ونقل‌ام را مدیریت می‌کنم. عالی است!",
      rating: 5,
      city: "مزار شریف",
    },
    {
      name: "زهرا موسوی",
      role: t("t4.role"),
      text: "تقویم هجری شمسی و زبان دری باعث شد آسان حساب را انتخاب کنم. خیلی راحت فاکتور صادر می‌کنم و مشتریانم راضی هستند.",
      rating: 5,
      city: "قندهار",
    },
    {
      name: "غلام حیدر",
      role: t("t5.role"),
      text: "آسان حساب کمک کرد تا هزینه‌های رستورانم را کنترل کنم و سودآوری‌ام را افزایش دهم.",
      rating: 5,
      city: "جلال‌آباد",
    },
    {
      name: "مریم صدیقی",
      role: t("t6.role"),
      text: "مدیریت شهریه دانش‌آموزان و هزینه‌های موسسه قبل از آسان حساب خیلی سخت بود. حالا همه چیز سیستماتیک و شفاف است.",
      rating: 5,
      city: "بامیان",
    },
  ];

  const pricingPlans = [
    {
      name: t("pricing.basic"),
      price: "۲,۵۰۰",
      period: "افغانی / ماهانه",
      desc: t("pricing.basic_desc"),
      features: [
        "یک کاربر",
        "صدور فاکتور نامحدود",
        "گزارش سود و زیان",
        "تقویم هجری شمسی",
        "پشتیبانی تلفنی",
      ],
      cta: t("pricing.download"),
      popular: false,
    },
    {
      name: t("pricing.pro"),
      price: "۵,۵۰۰",
      period: "افغانی / ماهانه",
      desc: t("pricing.pro_desc"),
      features: [
        "۵ کاربر",
        "تمام امکانات پایه",
        "مدیریت موجودی انبار",
        "گزارش‌های پیشرفته",
        "نصب روی چند کامپیوتر",
        "پشتیبانی تلفنی ۲۴/۷",
        "بکاپ خودکار روزانه",
      ],
      cta: "دانلود رایگان",
      popular: true,
    },
    {
      name: t("pricing.org"),
      price: "۱۲,۰۰۰",
      period: "افغانی / ماهانه",
      desc: t("pricing.org_desc"),
      features: [
        "کاربران نامحدود",
        "تمام امکانات حرفه‌ای",
        "گزارش مالیاتی",
        "مدیریت چند شعبه",
        "API اختصاصی",
        "آموزش تیم",
        "پشتیبانی VIP",
      ],
      cta: t("pricing.contact"),
      popular: false,
    },
  ];

  const faqs = [
    {
      q: t("faq.q1"),
      a: "خیر، اصلاً! آسان حساب مخصوص افرادی طراحی شده که هیچ دانش حسابداری ندارند. رابط کاربری به زبان دری و بسیار ساده است. با چند کلیک می‌توانید فاکتور صادر کنید و گزارش‌ها را ببینید. ویدیوهای آموزشی رایگان به زبان دری نیز موجود است.",
    },
    {
      q: t("faq.q2"),
      a: "بله، به صورت کامل. تمام تاریخ‌ها، گزارش‌ها، فاکتورها و صورت‌حساب‌ها به تاریخ شمسی نمایش داده می‌شوند. امکان تبدیل تاریخ بین شمسی و میلادی نیز وجود دارد.",
    },
    {
      q: t("faq.q3"),
      a: "خیر! آسان حساب کاملاً آفلاین کار می‌کند. بدون نیاز به اینترنت، تمام عملیات حسابداری، صدور فاکتور و گزارش‌گیری را انجام دهید. اطلاعات شما فقط روی کامپیوتر خودتان ذخیره می‌شود.",
    },
    {
      q: t("faq.q4"),
      a: "بالاترین سطح امنیت: رمزگذاری پیشرفته اطلاعات، پشتیبان‌گیری خودکار روی کامپیوتر شما، بدون ارسال اطلاعات به اینترنت. تمام داده‌های مالی شما فقط روی دستگاه خودتان ذخیره می‌شود.",
    },
    {
      q: t("faq.q5"),
      a: "بله! نسخه آزمایشی رایگان با تمام امکانات. بدون نیاز به اینترنت و بدون تعهد.",
    },
  ];

  const stats = [
    { value: 5000, suffix: "+", label: t("stat.active_users") },
    { value: 120000, suffix: "+", label: t("stat.invoices") },
    { value: 34, suffix: "", label: t("stat.provinces") },
    { value: 99, suffix: "٪", label: t("stat.satisfaction") },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground" style={{ direction: dir }}>
      {/* ══════════ NAVBAR ══════════ */}
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-brand-deep/5 border-b border-brand-pale/50 dark:border-brand-mid/20"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="scroll-progress-bar"
          style={{ scaleX: scrollYProgress }}
        />
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
                  className="relative px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-brand-deep dark:hover:text-brand-light transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-0 h-0.5 gradient-brand rounded-full group-hover:w-6 transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button className="gradient-brand hover:opacity-90 text-white border-0 px-6 rounded-full shadow-lg shadow-brand-mid/25 hover:shadow-brand-mid/40 transition-all duration-300 hover:scale-105">
                <Zap className="w-4 h-4 ml-2" />
                {t("nav.download")}
              </Button>
            </div>

            <button
              className={`w-6 h-6 ${isRtl ? "ml-2" : "mr-2"} rounded-xl hover:bg-brand-surface dark:hover:bg-white/10 transition-colors`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-brand-deep dark:text-brand-light" />
              ) : (
                <Menu className="w-6 h-6 text-brand-deep dark:text-brand-light" />
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
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-brand-pale/50 dark:border-brand-mid/20 shadow-xl"
            >
              <div className="px-4 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block text-gray-600 dark:text-gray-300 hover:text-brand-deep dark:hover:text-brand-light hover:bg-brand-surface dark:hover:bg-white/5 py-3 px-4 rounded-xl text-sm font-medium transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between px-4 mb-4">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                  <Button className="w-full gradient-brand text-white border-0 rounded-xl">
                    <Zap className="w-4 h-4 ml-2" />
                    {t("nav.download")}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ══════════ HERO — CODE-ONLY CREATIVE SHOWCASE ══════════ */}
      <section className="relative pt-24 pb-4 md:pt-28 md:pb-6 overflow-hidden">
        {/* Layered animated background */}
        <div className="absolute inset-0">
          {/* Base gradient + Aurora */}
          <div className="absolute inset-0 bg-gradient-to-bl from-[#f0f7ff] dark:from-[#0a1628] via-white dark:via-[#0f172a] to-[#e8f0fe] dark:to-[#0d1b30]" />
          <div className="absolute inset-0 hero-aurora" />
          {/* Animated mesh gradients with parallax */}
          <ParallaxSection speed={0.15} className="absolute top-[-20%] right-[-10%]">
          <div
            className="w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,127,255,0.12) 0%, transparent 70%)",
              animation: "float 14s ease-in-out infinite",
            }}
          />
          </ParallaxSection>
          <ParallaxSection speed={0.2} className="absolute bottom-[-15%] left-[-10%]">
          <div
            className="w-[700px] h-[700px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,71,171,0.08) 0%, transparent 70%)",
              animation: "float 18s ease-in-out infinite 3s",
            }}
          />
          </ParallaxSection>
          <ParallaxSection speed={0.1} className="absolute top-[40%] left-[50%]">
          <div
            className="w-[500px] h-[500px] blob"
            style={{
              background: "radial-gradient(circle, rgba(93,173,226,0.06) 0%, transparent 70%)",
              animationDuration: "12s",
            }}
          />
          </ParallaxSection>
          {/* Animated grid lines with perspective */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="none">
            <defs>
              <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0047AB" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGrid)" />
          </svg>
          {/* Animated SVG mesh lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06] hidden lg:block">
            <motion.path
              d="M0 200 Q 400 100 800 250 T 1600 200"
              fill="none"
              stroke="#007FFF"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M0 400 Q 500 300 1000 450 T 1600 350"
              fill="none"
              stroke="#5DADE2"
              strokeWidth="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
            />
            <motion.path
              d="M0 600 Q 300 500 800 650 T 1600 550"
              fill="none"
              stroke="#0047AB"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
            />
          </svg>
          {/* Floating particles with varying sizes */}
          {[...Array(isRtl ? 6 : 15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-brand-mid/20"
              style={{
                top: `${10 + (i * 7) % 80}%`,
                left: `${5 + (i * 11) % 90}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
              }}
              animate={{
                y: [0, -25 - (i % 2) * 15, 0],
                opacity: [0.15, 0.5, 0.15],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
          {/* Geometric accent shapes */}
          <motion.div
            className="absolute top-[15%] right-[8%] w-16 h-16 border border-brand-mid/10 rounded-xl hidden lg:block"
            animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[5%] w-12 h-12 border border-brand-light/15 rounded-full hidden lg:block"
            animate={{ rotate: [360, 0], y: [0, -10, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-[60%] right-[12%] w-3 h-3 bg-brand-mid/10 rounded-full hidden lg:block"
            animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left content — span 7 on desktop for wider text */}
            <div className="lg:col-span-7 text-center lg:text-right order-1 lg:order-2" style={{ direction: 'rtl' }}>
              {/* Badge */}
              <FadeIn>
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/10 backdrop-blur-md border border-brand-pale/50 dark:border-brand-mid/30 rounded-full px-5 py-2.5 mb-8 shadow-sm"
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(0,71,171,0.12)" }}
                >
                  <motion.span
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-brand-mid" />
                  </motion.span>
                  <span className="text-sm font-semibold text-brand-deep">
                    {t("hero.badge")}
                  </span>
                </motion.div>
              </FadeIn>

              {/* Heading — Cinematic Circle-Reveal with Brand Blue Highlight */}
              <FadeIn delay={0.1}>
                <div className="relative mb-6" style={{ direction: 'rtl' }}>
                  {/* Soft ambient glow behind heading */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[140%] rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at 65% 45%, rgba(0,127,255,0.06) 0%, rgba(0,71,171,0.04) 40%, transparent 70%)",
                    }}
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Subtle floating accent — top-right */}
                  <motion.div
                    className="absolute -top-3 -right-1 md:-top-4 md:-right-4 w-8 h-8 md:w-10 md:h-10 rounded-xl border border-brand-mid/15 bg-brand-surface/40 hidden sm:flex items-center justify-center pointer-events-none"
                    animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-mid/40" />
                  </motion.div>

                  <h1 className="relative" style={{ lineHeight: 1.25 }}>
                    {/* Clip-path circle reveal animation */}
                    <motion.div
                      className="relative z-10"
                      initial={{ clipPath: "circle(0% at 70% 45%)" }}
                      animate={{ clipPath: "circle(150% at 70% 45%)" }}
                      transition={{ delay: 0.4, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Line 1 — management text */}
                      <span
                        className="block font-bold text-gray-600 dark:text-gray-300"
                        style={{ fontSize: "clamp(1.5rem, 3.8vw, 2.6rem)", letterSpacing: "-0.01em" }}
                      >
                        {t("hero.line1")},
                      </span>

                      {/* Line 2 — bold with brand-blue highlighted "آسان‌تر" */}
                      <span
                        className="block font-black text-gray-900 dark:text-gray-100 mt-1"
                        style={{ fontSize: "clamp(2.6rem, 7.5vw, 5rem)", letterSpacing: "-0.03em" }}
                      >
                        {t("hero.line2_before")}{" "}
                        {/* Brand-blue highlighted "آسان‌تر" */}
                        <span className="relative inline-block">
                          {/* Pulsing brand glow */}
                          <motion.span
                            className="absolute inset-0 blur-2xl opacity-40 pointer-events-none"
                            style={{
                              background: "linear-gradient(135deg, #0047AB, #007FFF, #5DADE2, #D6EEFF)",
                            }}
                            animate={{
                              opacity: [0.2, 0.4, 0.2],
                              scale: [1, 1.06, 1],
                            }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                          />
                          {/* The actual gradient text */}
                          <span
                            className="relative"
                            style={{
                              background: "linear-gradient(135deg, #0047AB 0%, #007FFF 25%, #5DADE2 55%, #89CFF0 80%, #D6EEFF 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            آسان‌تر
                          </span>
                        </span>
                        {" "}{t("hero.line2_after")}
                      </span>
                    </motion.div>

                    {/* Animated accent line under heading */}
                    <div className="relative z-10 mt-3 flex items-center gap-3">
                      <motion.span
                        className="h-[3px] rounded-full flex-1"
                        style={{
                          background: "linear-gradient(90deg, transparent 0%, #0047AB 20%, #007FFF 50%, transparent 100%)",
                        }}
                        initial={{ scaleX: 0, originX: 0.5 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.5, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-brand-mid/50 shrink-0"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.9, type: "spring", stiffness: 200 }}
                      />
                      <motion.span
                        className="h-[2px] rounded-full w-8"
                        style={{
                          background: "linear-gradient(90deg, #5DADE2, transparent)",
                        }}
                        initial={{ scaleX: 0, originX: 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 2.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                      />
                    </div>
                  </h1>
                </div>
              </FadeIn>

              {/* Description — Rotating Phrases */}
              <FadeIn delay={0.2}>
                <div className="mb-8">
                  <RotatingPhrase />
                  <motion.p
                    className="text-sm text-gray-400 dark:text-gray-500 mt-2 max-w-lg mx-auto lg:mx-0 lg:mr-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    {t("hero.sub_desc")}
                  </motion.p>
                </div>
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
                        {t("hero.cta_primary")}
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
                      className="px-8 py-6 text-base rounded-2xl border-brand-pale dark:border-brand-mid/30 bg-white/60 dark:bg-white/10 backdrop-blur-md hover:border-brand-mid hover:bg-brand-surface transition-all shadow-sm"
                    >
                      <PlayCircle className="w-5 h-5 ml-2 text-brand-mid" />
                      {t("hero.cta_secondary")}
                    </Button>
                  </motion.div>
                </div>
              </FadeIn>

              {/* Floating user counter badge */}
              <motion.div
                className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10"
                initial={{ opacity: 0, x: -30, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.8, type: "spring", stiffness: 150 }}
              >
                <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
                  <div className="w-10 h-10 gradient-brand rounded-full flex items-center justify-center text-white shadow-md">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-brand-deep">+۵,۰۰۰</p>
                    <p className="text-[10px] text-gray-400">کاربر فعال</p>
                  </div>
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Trust signals with icons */}
              <FadeIn delay={0.4}>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-8 justify-center lg:justify-start">
                  {[
                    { icon: <Download className="w-3.5 h-3.5" />, text: t("trust.install") },
                    { icon: <WifiOff className="w-3.5 h-3.5" />, text: t("trust.offline") },
                    { icon: <Headphones className="w-3.5 h-3.5" />, text: t("trust.support") },
                    { icon: <Shield className="w-3.5 h-3.5" />, text: t("trust.secure") },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 bg-brand-surface/40 dark:bg-white/5 rounded-full px-3.5 py-2 border border-brand-pale/50 dark:border-brand-mid/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.04, borderColor: "rgba(0,127,255,0.3)" }}
                    >
                      <span className="text-brand-mid">{item.icon}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
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
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
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
                    <span className="font-bold text-gray-700 dark:text-gray-300">+۵,۰۰۰</span>{" "}
                    <span className="text-gray-400 dark:text-gray-500">کاربر راضی</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            </div>

            {/* Right content — CODE-ONLY CREATIVE HERO VISUAL span 5 */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative">

                {/* ── Floating 3D Aura Rings ── */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <motion.div
                    className="w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full border border-brand-pale/30"
                    animate={{ rotate: 360, scale: [1, 1.03, 1] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[440px] md:h-[440px] rounded-full border border-dashed border-brand-light/25"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-brand-mid/15"
                    animate={{ rotate: 360, scale: [1, 0.97, 1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* ── Glowing Mesh Background ── */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-[2.5rem] blur-[80px] bg-gradient-to-br from-brand-mid/20 via-brand-deep/10 to-brand-light/15 pointer-events-none" />

                {/* ── Main 3D Tilt Card ── */}
                <HeroTiltCard />

                {/* ── Floating Node Network (Connecting Dots) ── */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                    <defs>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#007FFF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#5DADE2" stopOpacity="0.08" />
                      </linearGradient>
                    </defs>
                    {/* Animated connecting lines */}
                    <motion.line x1="15%" y1="20%" x2="45%" y2="35%" stroke="url(#lineGrad)" strokeWidth="1" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
                    <motion.line x1="75%" y1="15%" x2="55%" y2="40%" stroke="url(#lineGrad)" strokeWidth="1" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }} />
                    <motion.line x1="85%" y1="70%" x2="60%" y2="55%" stroke="url(#lineGrad)" strokeWidth="1" animate={{ opacity: [0.15, 0.5, 0.15] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} />
                    <motion.line x1="20%" y1="80%" x2="40%" y2="60%" stroke="url(#lineGrad)" strokeWidth="1" animate={{ opacity: [0.2, 0.55, 0.2] }} transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }} />
                  </svg>
                  {/* Animated data nodes */}
                  {[{ x: "15%", y: "20%", d: 0 }, { x: "75%", y: "15%", d: 0.8 }, { x: "85%", y: "70%", d: 1.6 }, { x: "20%", y: "80%", d: 2.4 }, { x: "45%", y: "35%", d: 0.4 }, { x: "55%", y: "40%", d: 1.2 }, { x: "60%", y: "55%", d: 2 }, { x: "40%", y: "60%", d: 2.8 }].map((node, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-brand-mid/60"
                      style={{ left: node.x, top: node.y }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.4, 0.9, 0.4],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: node.d }}
                    />
                  ))}
                </div>

                {/* ── Orbiting Feature Icons on Circular Path ── */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 hidden lg:block" style={{ zIndex: 10 }}>
                  {[
                    { Icon: Calculator, dist: 210, duration: 28, size: "w-10 h-10", bg: "gradient-brand", delay: 0 },
                    { Icon: CalendarDays, dist: 240, duration: 38, size: "w-9 h-9", bg: "bg-white dark:bg-gray-800 border border-brand-pale/50 dark:border-brand-mid/20", delay: 3, iconColor: "text-brand-mid" },
                    { Icon: Wallet, dist: 190, duration: 32, size: "w-8 h-8", bg: "bg-amber-50 dark:bg-amber-900/30 border border-amber-200/50 dark:border-amber-700/30", delay: 6, iconColor: "text-amber-500" },
                    { Icon: BarChart3, dist: 260, duration: 45, size: "w-9 h-9", bg: "bg-white dark:bg-gray-800 border border-brand-pale/50 dark:border-brand-mid/20", delay: 1.5, iconColor: "text-brand-deep dark:text-brand-light" },
                    { Icon: Shield, dist: 225, duration: 34, size: "w-7 h-7", bg: "bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200/50 dark:border-emerald-700/30", delay: 4.5, iconColor: "text-emerald-500" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className={`${item.size} ${item.bg} rounded-xl shadow-lg flex items-center justify-center absolute`}
                      animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                      transition={{ duration: item.duration, repeat: Infinity, ease: "linear", delay: item.delay * 0.1 }}
                      style={{ transformOrigin: `${item.dist}px center` }}
                    >
                      <item.Icon className={`w-4 h-4 ${item.iconColor || "text-white"}`} />
                    </motion.div>
                  ))}
                </div>

                {/* ── Floating Stat Cards ── */}
                {/* Revenue Card — top right */}
                <motion.div
                  className="absolute -top-2 right-0 md:top-2 md:-right-2 z-20"
                  initial={{ opacity: 0, scale: 0, rotate: 12 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1, type: "spring", stiffness: 180 }}
                >
                  <motion.div
                    className="bg-white/90 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-4 border border-brand-pale/40 dark:border-brand-mid/20"
                    style={{ animation: "float 6s ease-in-out infinite" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 gradient-brand rounded-xl flex items-center justify-center shadow-md shadow-brand-mid/20">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{t("float.revenue_growth")}</p>
                        <p className="text-xl font-black text-brand-deep dark:text-brand-light">+۴۷٪</p>
                      </div>
                    </div>
                    {/* Mini sparkline */}
                    <svg viewBox="0 0 80 24" className="w-full h-5 mt-2">
                      <motion.path
                        d="M0 20 L12 16 L24 18 L36 10 L48 12 L60 4 L72 6 L80 2"
                        fill="none"
                        stroke="#007FFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
                      />
                      <motion.path
                        d="M0 20 L12 16 L24 18 L36 10 L48 12 L60 4 L72 6 L80 2 L80 24 L0 24Z"
                        fill="url(#sparkFill)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2.5 }}
                      />
                      <defs>
                        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#007FFF" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#007FFF" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Rating Card — bottom left */}
                <motion.div
                  className="absolute -bottom-2 left-0 md:bottom-4 md:-left-6 z-20"
                  initial={{ opacity: 0, scale: 0, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1.3, type: "spring", stiffness: 180 }}
                >
                  <motion.div
                    className="bg-white/90 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-4 border border-brand-pale/40 dark:border-brand-mid/20"
                    style={{ animation: "float 7s ease-in-out infinite 1.5s" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{t("float.customer_satisfaction")}</p>
                        <p className="text-xl font-black text-gray-900 dark:text-white">۴.۹/۵</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mt-2">
                      {[100, 100, 100, 100, 80].map((w, i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 rounded-full bg-amber-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${w}%` }}
                          transition={{ duration: 0.8, delay: 1.8 + i * 0.1, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Invoice Card — top left */}
                <motion.div
                  className="absolute top-4 -left-2 md:top-8 md:-left-8 z-20 hidden sm:block"
                  initial={{ opacity: 0, x: -30, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 1.5, type: "spring" }}
                >
                  <motion.div
                    className="bg-white/90 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-3.5 border border-brand-pale/40 dark:border-brand-mid/20"
                    style={{ animation: "float 8s ease-in-out infinite 2s" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center shadow-md shadow-brand-mid/20">
                        <Receipt className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{t("float.today_invoices")}</p>
                        <p className="text-lg font-black text-brand-deep dark:text-brand-light">۱۲ عدد</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Security Card — bottom right */}
                <motion.div
                  className="absolute -bottom-4 right-4 md:bottom-0 md:right-0 z-20 hidden md:block"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.7, type: "spring" }}
                >
                  <motion.div
                    className="bg-white/90 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-3 border border-brand-pale/40 dark:border-brand-mid/20"
                    style={{ animation: "float 9s ease-in-out infinite 2.5s" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                        <Shield className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400 dark:text-gray-500">{t("float.ssl")}</p>
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{t("float.protected")}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Inline stats bar — inside max-w-7xl for proper padding */}
          <FadeIn delay={0.8}>
            <motion.div
              className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="rounded-2xl p-3 md:p-4 text-center bg-white/80 dark:bg-gray-800/50 border border-brand-pale/40 dark:border-brand-mid/20 shadow-sm md:shadow-md"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,71,171,0.1)" }}
                >
                  <p className="text-xl md:text-2xl font-black text-brand-deep tabular-nums">
                    {s.value.toLocaleString("fa-AF")}{s.suffix}
                  </p>
                  <p className="text-[11px] md:text-xs text-gray-400 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </FadeIn>
        </div>

      </section>

      {/* Gradient divider — hero to marquee */}
      <div className="gradient-divider-section" />

      {/* ══════════ ENHANCED MARQUEE TRUST BAR ══════════ */}
      <MarqueeSection stats={stats} />

      <div className="gradient-divider-section" />

      {/* ══════════ PROBLEM / PAIN SECTION ══════════ */}
      <ProblemSection />

      <div className="gradient-divider-section" />

      {/* ══════════ FEATURES + BENTO GRID ══════════ */}
      <FeaturesSection features={features} bentoFeatures={bentoFeatures} />

      <div className="gradient-divider-section" />

      {/* ══════════ DASHBOARD SHOWCASE ══════════ */}
      <DashboardShowcase />

      <div className="gradient-divider-section" />

      {/* ══════════ HOW IT WORKS — CREATIVE TIMELINE ══════════ */}
      <HowItWorks />

      <div className="gradient-divider-section" />

      {/* ══════════ BUSINESS TYPES — HORIZONTAL SCROLL CARDS ══════════ */}
      <BusinessTypes />

      <div className="gradient-divider-section" />

      {/* ══════════ TESTIMONIALS — CREATIVE CAROUSEL GRID ══════════ */}
      <TestimonialsSection testimonials={testimonials} />

      <div className="gradient-divider-section" />

      {/* ══════════ PRICING — CREATIVE CARDS ══════════ */}
      <PricingSection pricingPlans={pricingPlans} />

      <div className="gradient-divider-section" />

      {/* ══════════ FAQ ══════════ */}
      <FAQSection faqs={faqs} />

      <div className="gradient-divider-section" />

      {/* ══════════ FINAL CTA + FOOTER ══════════ */}
      <FinalCTA />
      {/* ══════════ FLOATING BUTTONS ══════════ */}
      {/* Back to Top Button */}
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

      {/* WhatsApp Contact Button */}
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
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
