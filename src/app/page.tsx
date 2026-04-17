"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
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
  Bell,
  ArrowUp,
  MessageCircle,
  Home as HomeIcon,
  LayoutDashboard,
  Settings,
  LogOut,
  FileSpreadsheet,
  Search,
  ClipboardList,
  Download,
  FilePlus2,
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
   ROTATING PHRASE — ANIMATED MARKETING LINE
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   TERMINAL-STYLE ROTATING PHRASE
   ═══════════════════════════════════════════ */

function TerminalRotatingPhrase() {
  const phrases = [
    "به زبان دری",
    "بدون اینترنت",
    "تقویم شمسی",
    "ساده و آسان",
    "کاملاً آفلاین",
  ];
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
      <span className="text-base md:text-lg text-gray-500 leading-relaxed">
        نرم‌افزار حسابداری
      </span>
      {/* Terminal prompt container */}
      <span className="relative inline-flex items-center min-w-[155px] h-[2.2rem] md:min-w-[195px] md:h-[2.7rem]">
        <span className="absolute inset-0 rounded-xl terminal-prompt" />
        {/* Terminal header dots */}
        <span className="absolute right-2 top-1.5 flex gap-1 opacity-60">
          <span className="w-[5px] h-[5px] rounded-full bg-red-400/80" />
          <span className="w-[5px] h-[5px] rounded-full bg-yellow-400/80" />
          <span className="w-[5px] h-[5px] rounded-full bg-green-400/80" />
        </span>
        <span className="flex items-center gap-1 px-3.5 pl-2 w-full relative z-10" style={{ direction: "ltr" }}>
          <span className="text-emerald-400 text-xs font-bold font-mono shrink-0">~$</span>
          <span className="text-white/90 text-sm font-mono leading-relaxed whitespace-nowrap">
            {displayed}
          </span>
          {/* Blinking cursor */}
          <motion.span
            className="w-[7px] h-[14px] bg-brand-light rounded-sm shrink-0"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
            style={{ boxShadow: "0 0 6px rgba(93,173,226,0.6), 0 0 12px rgba(93,173,226,0.2)" }}
          />
        </span>
      </span>
      <span className="text-base md:text-lg text-gray-500 leading-relaxed">
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
      className="relative z-10 mx-auto w-[280px] sm:w-[360px] md:w-[420px]"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showParticles, setShowParticles] = useState(false);

  const { scrollYProgress } = useScroll();

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
      icon: <Monitor className="w-7 h-7" />,
      title: "نصب آسان",
      desc: "به راحتی روی کامپیوتر خود نصب کنید و بدون نیاز به اینترنت کار کنید.",
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
      desc: "پشتیبان‌گیری خودکار اطلاعات روی کامپیوتر شما انجام می‌شود.",
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
        "پشتیبانی تلفنی",
      ],
      cta: "دانلود رایگان",
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
        "نصب روی چند کامپیوتر",
        "پشتیبانی تلفنی ۲۴/۷",
        "بکاپ خودکار روزانه",
      ],
      cta: "دانلود رایگان",
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
      q: "آیا برای استفاده نیاز به اینترنت دارم؟",
      a: "خیر! آسان حساب کاملاً آفلاین کار می‌کند. بدون نیاز به اینترنت، تمام عملیات حسابداری، صدور فاکتور و گزارش‌گیری را انجام دهید. اطلاعات شما فقط روی کامپیوتر خودتان ذخیره می‌شود.",
    },
    {
      q: "اطلاعات مالی من چقدر امن است؟",
      a: "بالاترین سطح امنیت: رمزگذاری پیشرفته اطلاعات، پشتیبان‌گیری خودکار روی کامپیوتر شما، بدون ارسال اطلاعات به اینترنت. تمام داده‌های مالی شما فقط روی دستگاه خودتان ذخیره می‌شود.",
    },
    {
      q: "آیا نسخه رایگان وجود دارد؟",
      a: "بله! نسخه آزمایشی رایگان با تمام امکانات. بدون نیاز به اینترنت و بدون تعهد.",
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
                دانلود رایگان
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
                    دانلود رایگان
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
          <div className="absolute inset-0 bg-gradient-to-bl from-[#f0f7ff] via-white to-[#e8f0fe]" />
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
          {[...Array(15)].map((_, i) => (
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

              {/* Heading — ultra creative with typewriter char reveal */}
              <FadeIn delay={0.1}>
                <div className="relative mb-6" style={{ direction: 'rtl' }}>
                  {/* Decorative floating shapes around heading */}
                  <motion.div
                    className="absolute -top-4 -right-2 md:-top-6 md:-right-6 w-10 h-10 md:w-14 md:h-14 rounded-2xl border-2 border-brand-mid/15 hidden sm:block"
                    animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -top-2 -left-3 md:-top-3 md:-left-8 w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-light/30 hidden sm:block"
                    animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute bottom-4 -right-6 md:bottom-2 md:-right-10 w-4 h-4 md:w-6 md:h-6 rounded-lg bg-brand-mid/10 hidden sm:block"
                    animate={{ rotate: [0, -45, 0, 45, 0], y: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Particle burst on heading complete */}
                  <ParticleBurst show={showParticles} />

                  <h1 style={{ lineHeight: 1.05 }}>
                    {/* Line 1: حسابداری — char by char reveal */}
                    <span className="block font-black text-gray-900 relative" style={{ fontSize: "clamp(2.8rem, 7.5vw, 5.8rem)", letterSpacing: "-0.02em" }}>
                      <CharReveal
                        text="حسابداری"
                        delayStart={0.4}
                        charDelay={0.06}
                      />
                    </span>

                    {/* Line 2: را آسان — with pulsing glow */}
                    <span className="block relative mt-1" style={{ fontSize: "clamp(3.4rem, 9vw, 7rem)", letterSpacing: "-0.03em" }}>
                      {/* Pulsing glow behind text */}
                      <motion.span
                        className="absolute inset-0 font-black pointer-events-none"
                        aria-hidden
                        style={{
                          fontSize: "clamp(3.4rem, 9vw, 7rem)",
                          letterSpacing: "-0.03em",
                          background: "linear-gradient(135deg, #0047AB, #007FFF, #5DADE2)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        animate={{
                          filter: [
                            "blur(12px) brightness(1)",
                            "blur(20px) brightness(1.3)",
                            "blur(12px) brightness(1)",
                          ],
                          opacity: [0.25, 0.45, 0.25],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                      >
                        را آسان
                      </motion.span>
                      <span className="text-gradient-hero font-black">
                        <CharReveal
                          text="را آسان"
                          delayStart={0.85}
                          charDelay={0.07}
                        />
                      </span>
                      {/* Animated gradient underline */}
                      <motion.span
                        className="absolute -bottom-2 right-0 h-[7px] w-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #0047AB 0%, #007FFF 40%, #5DADE2 70%, #D6EEFF 100%)",
                        }}
                        initial={{ scaleX: 0, originX: 1, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 0.55 }}
                        transition={{ duration: 1, delay: 1.6, ease: [0.25, 0.4, 0.25, 1] }}
                      />
                      {/* Secondary thinner underline */}
                      <motion.span
                        className="absolute -bottom-[11px] right-4 h-[3px] rounded-full"
                        style={{
                          background: "linear-gradient(90deg, transparent 0%, #007FFF 30%, #5DADE2 100%)",
                          width: "55%",
                        }}
                        initial={{ scaleX: 0, originX: 1, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 0.25 }}
                        transition={{ duration: 1.2, delay: 1.8, ease: [0.25, 0.4, 0.25, 1] }}
                      />
                    </span>

                    {/* Line 3: کنید! — with wiggle animation */}
                    <motion.span
                      className="block relative mt-1"
                      animate={{
                        rotate: [0, 0, 0, 0, -3, 3, -2, 2, -1, 1, 0, 0],
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 2.2,
                        ease: "easeInOut",
                        repeat: 0,
                        times: [0, 0.15, 0.3, 0.4, 0.45, 0.55, 0.6, 0.7, 0.75, 0.85, 0.9, 1],
                      }}
                    >
                      <span className="font-black text-gray-900" style={{ fontSize: "clamp(2.8rem, 7.5vw, 5.8rem)", letterSpacing: "-0.02em" }}>
                        <CharReveal
                          text="کنید!"
                          delayStart={1.3}
                          charDelay={0.06}
                          onComplete={() => setShowParticles(true)}
                        />
                      </span>
                      {/* Animated sparkle burst */}
                      <motion.span
                        className="inline-block mr-1 relative"
                        animate={{ rotate: [0, 12, 0, -12, 0] }}
                        transition={{ duration: 3, delay: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Sparkles className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 text-brand-mid/25 -mt-1" />
                      </motion.span>
                    </motion.span>
                  </h1>
                </div>
              </FadeIn>

              {/* Description — Terminal Rotating Phrases */}
              <FadeIn delay={0.2}>
                <div className="mb-8">
                  <TerminalRotatingPhrase />
                  <motion.p
                    className="text-sm text-gray-400 mt-2 max-w-lg mx-auto lg:mx-0 lg:mr-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    بدون نیاز به دانش حسابداری — همین امروز شروع کنید!
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
                        دانلود رایگان نسخه آزمایشی
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

              {/* Trust signals */}
              <FadeIn delay={0.4}>
                <div className="flex items-center gap-5 mt-8 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-mid" />
                    <span className="text-xs text-gray-400">بدون نیاز به اینترنت</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-mid" />
                    <span className="text-xs text-gray-400">کاملاً آفلاین</span>
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
                    { Icon: CalendarDays, dist: 240, duration: 38, size: "w-9 h-9", bg: "bg-white border border-brand-pale/50", delay: 3, iconColor: "text-brand-mid" },
                    { Icon: Wallet, dist: 190, duration: 32, size: "w-8 h-8", bg: "bg-amber-50 border border-amber-200/50", delay: 6, iconColor: "text-amber-500" },
                    { Icon: BarChart3, dist: 260, duration: 45, size: "w-9 h-9", bg: "bg-white border border-brand-pale/50", delay: 1.5, iconColor: "text-brand-deep" },
                    { Icon: Shield, dist: 225, duration: 34, size: "w-7 h-7", bg: "bg-emerald-50 border border-emerald-200/50", delay: 4.5, iconColor: "text-emerald-500" },
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
                    className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-4 border border-brand-pale/40"
                    style={{ animation: "float 6s ease-in-out infinite" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 gradient-brand rounded-xl flex items-center justify-center shadow-md shadow-brand-mid/20">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-medium">رشد درآمد</p>
                        <p className="text-xl font-black text-brand-deep">+۴۷٪</p>
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
                    className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-4 border border-brand-pale/40"
                    style={{ animation: "float 7s ease-in-out infinite 1.5s" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-medium">رضایت مشتری</p>
                        <p className="text-xl font-black text-gray-900">۴.۹/۵</p>
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
                    className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-3.5 border border-brand-pale/40"
                    style={{ animation: "float 8s ease-in-out infinite 2s" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center shadow-md shadow-brand-mid/20">
                        <Receipt className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-medium">فاکتور امروز</p>
                        <p className="text-lg font-black text-brand-deep">۱۲ عدد</p>
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
                    className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-3 border border-brand-pale/40"
                    style={{ animation: "float 9s ease-in-out infinite 2.5s" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <Shield className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400">SSL امن</p>
                        <p className="text-xs font-bold text-emerald-600">محافظت شده</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
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

      </section>

      {/* Gradient divider — hero to marquee */}
      <div className="gradient-divider-section" />

      {/* ══════════ MARQUEE TRUST BAR ══════════ */}
      <section className="py-6 bg-white overflow-hidden">
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

      <div className="gradient-divider-section" />

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

      <div className="gradient-divider-section" />

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

      <div className="gradient-divider-section" />

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

      <div className="gradient-divider-section" />

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
                      آسان حساب — داشبورد مدیریت
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

      <div className="gradient-divider-section" />

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
                title: "دانلود و نصب",
                desc: "نرم‌افزار را دانلود و در کمتر از یک دقیقه نصب کنید. بدون نیاز به اینترنت.",
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

      <div className="gradient-divider-section" />

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

      <div className="gradient-divider-section" />

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

      <div className="gradient-divider-section" />

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
              نسخه آزمایشی رایگان — بدون نیاز به اینترنت
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

      <div className="gradient-divider-section" />

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

      <div className="gradient-divider-section" />

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
                  دانلود رایگان
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
              بدون نیاز به اینترنت • کاملاً آفلاین • هر وقت بخواهید
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="relative text-gray-400 pt-16 pb-8 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0a0a1a 0%, #0d1225 40%, #0a1628 100%)" }} />
        {/* Subtle glow accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, #007FFF 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top CTA strip */}
          <motion.div
            className="gradient-brand rounded-2xl p-6 md:p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-1">آماده شروع هستید؟</h3>
              <p className="text-white/70 text-sm">همین حالا آسان حساب را دانلود و شروع کنید.</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-white text-brand-deep hover:bg-gray-50 border-0 px-8 py-5 rounded-xl text-sm font-bold shadow-lg">
                <Zap className="w-4 h-4 ml-2" />
                دانلود رایگان
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img
                    src="/logo-asanhesab.png"
                    alt="آسان حساب"
                    className="w-10 h-10 rounded-full shadow-lg"
                  />
                  <div className="absolute -inset-1 rounded-full border border-brand-mid/20" />
                </div>
                <div>
                  <span className="text-lg font-black text-white">آسان حساب</span>
                  <span className="text-[10px] text-gray-600 block -mt-0.5 tracking-wider">
                    ASANHESAB
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 mb-5">
                اولین نرم‌افزار حسابداری به زبان دری با تقویم هجری شمسی، مخصوص بازار افغانستان.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {[
                  { label: "Facebook", icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  )},
                  { label: "Telegram", icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  )},
                  { label: "Instagram", icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  )},
                  { label: "YouTube", icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  )},
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300 hover:bg-white/10"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            {/* Product column */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
                <span className="w-1 h-4 rounded-full gradient-brand inline-block" />
                محصول
              </h4>
              <ul className="space-y-3 text-sm">
                {["ویژگی‌ها", "قیمت‌ها", "آپدیت‌ها", "نسخه دسکتاپ"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand-light transition-colors inline-flex items-center gap-1 group">
                      <span className="w-0 group-hover:w-2 h-px bg-brand-light transition-all duration-300" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Company column */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
                <span className="w-1 h-4 rounded-full gradient-brand inline-block" />
                شرکت
              </h4>
              <ul className="space-y-3 text-sm">
                {["درباره ما", "تماس با ما", "بلاگ", "فرصت‌ها"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand-light transition-colors inline-flex items-center gap-1 group">
                      <span className="w-0 group-hover:w-2 h-px bg-brand-light transition-all duration-300" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Support column */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
                <span className="w-1 h-4 rounded-full gradient-brand inline-block" />
                پشتیبانی
              </h4>
              <ul className="space-y-3 text-sm">
                {["مرکز راهنما", "آموزش ویدیویی", "سوالات متداول", "تماس تلفنی"].map(
                  (l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-brand-light transition-colors inline-flex items-center gap-1 group">
                        <span className="w-0 group-hover:w-2 h-px bg-brand-light transition-all duration-300" />
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

      {/* WhatsApp-style Contact Button */}
      <motion.a
        href="https://wa.me/93XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-emerald-500 rounded-full shadow-xl shadow-emerald-500/30 flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
      >
        <MessageCircle className="w-7 h-7" />
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
