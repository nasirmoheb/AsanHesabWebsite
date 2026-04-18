"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n";
import {
  Calculator, CalendarDays, FileText, BarChart3, Shield, Users, Globe,
  CheckCircle2, Star, ArrowLeft, Menu, X, TrendingUp, Wallet, Receipt,
  PieChart, Clock, Headphones, Award, Zap, Heart, ChevronDown, Building2,
  Truck, Store, Sparkles, Layers, Lock, Database, Monitor, WifiOff, Bell,
  ArrowUp, Home as HomeIcon, LayoutDashboard, Settings, FileSpreadsheet,
  Download, PlayCircle,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter, ParallaxSection, GlowOrb, LiveClock, KpiCounter } from "./shared-components";

/* ═══════════════════════════════════════════
   ROTATING PHRASE
   ═══════════════════════════════════════════ */

const RotatingPhrase = React.memo(function RotatingPhrase() {
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
      timeout = setTimeout(() => setDisplayed(currentPhrase.slice(0, displayed.length + 1)), 90 + Math.random() * 40);
    } else if (!isDeleting && displayed.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(currentPhrase.slice(0, displayed.length - 1)), 40 + Math.random() * 20);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex, started, phrases]);

  return (
    <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap" dir="rtl">
      <span className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
        {t("hero.accounting_sw")}
      </span>
      <span className="relative inline-flex items-center justify-center min-w-[155px] h-[2.2rem] md:min-w-[195px] md:h-[2.7rem]">
        <span className="absolute inset-0 rounded-full bg-gradient-to-l from-brand-pale/70 to-brand-surface/80 border border-brand-pale/60" />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-mid/30" />
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-mid/30" />
        <AnimatePresence mode="wait">
          <motion.span
            key={phraseIndex + (isDeleting ? "del" : "ins")}
            initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative text-sm md:text-base font-black text-gradient-glow leading-relaxed whitespace-nowrap z-10"
          >
            {displayed}
          </motion.span>
        </AnimatePresence>
        <motion.span
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-brand-mid rounded-full z-10"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "steps(2)" }}
          style={{ boxShadow: "0 0 6px rgba(0,127,255,0.6), 0 0 12px rgba(0,127,255,0.2)" }}
        />
      </span>
      <span className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
        {t("hero.for_your_biz")}
      </span>
    </div>
  );
});

/* ═══════════════════════════════════════════
   HERO TILT CARD
   ═══════════════════════════════════════════ */

function LiveTransactionFeed() {
  const transactions = [
    { name: "فروشگاه نور الکترونیک", amount: "+۱۵,۵۰۰", type: "income", icon: <Store className="w-2.5 h-2.5" /> },
    { name: "خرید مواد اولیه", amount: "-۸,۲۰۰", type: "expense", icon: <Truck className="w-2.5 h-2.5" /> },
    { name: "فاکتور #۱۰۴۷", amount: "+۲۳,۰۰۰", type: "income", icon: <Receipt className="w-2.5 h-2.5" /> },
    { name: "حقوق کارمندان", amount: "-۴۵,۰۰۰", type: "expense", icon: <Users className="w-2.5 h-2.5" /> },
    { name: "سفارش #۲۳۱", amount: "+۷,۸۰۰", type: "income", icon: <Store className="w-2.5 h-2.5" /> },
    { name: "اجاره مغازه", amount: "-۱۲,۰۰۰", type: "expense", icon: <Building2 className="w-2.5 h-2.5" /> },
    { name: "فروش عمده #۳۱۲", amount: "+۵۶,۰۰۰", type: "income", icon: <Receipt className="w-2.5 h-2.5" /> },
    { name: "خرید لوازم اداری", amount: "-۳,۵۰۰", type: "expense", icon: <Building2 className="w-2.5 h-2.5" /> },
  ];
  const VISIBLE_SLOTS = 4;
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setStartIndex((prev) => (prev + 1) % transactions.length), 2200);
    return () => clearInterval(timer);
  }, []);
  const visibleItems = Array.from({ length: VISIBLE_SLOTS }, (_, i) => transactions[(startIndex + i) % transactions.length]);
  return (
    <div className="relative" style={{ height: `${VISIBLE_SLOTS * 30 + 16}px` }}>
      <div className="flex items-center gap-1.5 mb-1">
        <motion.div className="w-1 h-1 rounded-full bg-emerald-400" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <span className="text-[7px] text-emerald-400/80 font-medium">ثبت خودکار</span>
      </div>
      <div className="space-y-0.5 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((tx, i) => (
            <motion.div
              key={startIndex + i}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1], delay: i * 0.04 }}
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
    { label: "ثبت مشتری", icon: <Users className="w-3 h-3" />, progress: 30 },
    { label: "افزودن اقلام", icon: <Layers className="w-3 h-3" />, progress: 60 },
    { label: "تایید و ارسال", icon: <CheckCircle2 className="w-3 h-3" />, progress: 100 },
  ];
  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % steps.length), 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-2.5 md:p-3 border border-brand-pale/40 dark:border-gray-700/40 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 gradient-brand rounded-md flex items-center justify-center text-white"><Receipt className="w-3 h-3" /></div>
          <div>
            <p className="text-[9px] font-bold text-gray-800 dark:text-gray-200">فاکتور جدید</p>
            <p className="text-[7px] text-gray-400">۱۴۰۴/۰۱/۱۵</p>
          </div>
        </div>
        <span className="text-[7px] text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full font-bold">{steps[step].label}</span>
      </div>
      <div className="h-1 bg-gray-100 dark:bg-gray-700 rounded-full mb-2 overflow-hidden">
        <motion.div className="h-full gradient-brand rounded-full" animate={{ width: `${steps[step].progress}%` }} transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }} />
      </div>
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <motion.div key={i} className="flex items-center gap-1" animate={{ opacity: i <= step ? 1 : 0.35 }} transition={{ duration: 0.4 }}>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${i <= step ? "gradient-brand text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}>
              {i < step ? <CheckCircle2 className="w-2.5 h-2.5" /> : <span className="text-[7px] font-bold">{i + 1}</span>}
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 text-center">
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
            style={{ background: i === bars.length - 1 ? "linear-gradient(180deg, #007FFF 0%, #0047AB 100%)" : i >= bars.length - 3 ? "linear-gradient(180deg, #5DADE2 0%, #007FFF 100%)" : "linear-gradient(180deg, #D6EEFF 0%, #5DADE2 100%)" }}
            initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.8, delay: 0.8 + i * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
          />
          <span className="text-[5px] text-gray-400 hidden md:block">{months[i]}</span>
        </div>
      ))}
    </div>
  );
}

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
      <motion.path d={areaPath} fill="url(#sparkGrad)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 1.5 }} />
      <motion.path d={`M ${pathData}`} fill="none" stroke="#007FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1, ease: "easeOut" }} />
      <motion.circle cx={(data.length - 1) * 7} cy={42 - data[data.length - 1]} r="2" fill="#007FFF" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.8, type: "spring" }} />
    </svg>
  );
}

const HeroTiltCard = React.memo(function HeroTiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [holoKey, setHoloKey] = useState(0);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setTilt({ x: -((e.clientY - centerY) / rect.height) * 6, y: ((e.clientX - centerX) / rect.width) * 8 });
  };
  const handleMouseEnter = () => { setIsHovered(true); setHoloKey((k) => k + 1); };
  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setIsHovered(false); };
  const sidebarIcons = [
    { Icon: HomeIcon, active: true }, { Icon: LayoutDashboard, active: true }, { Icon: Receipt, active: false }, { Icon: FileSpreadsheet, active: false }, { Icon: BarChart3, active: false }, { Icon: Users, active: false },
  ];

  return (
    <motion.div ref={cardRef} className="relative z-10 mx-auto w-[340px] sm:w-[400px] md:w-[460px]" onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} initial={{ opacity: 0, y: 60, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }} style={{ perspective: "1200px" }}>
      <motion.div className="rounded-2xl md:rounded-3xl overflow-hidden relative" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: isHovered ? "0 30px 60px rgba(0,71,171,0.18), 0 0 40px rgba(0,127,255,0.08), inset 0 1px 0 rgba(255,255,255,0.8)" : "0 20px 40px rgba(0,71,171,0.12), 0 0 0 1px rgba(255,255,255,0.6)" }} animate={{ rotateX: tilt.x, rotateY: tilt.y }} transition={{ type: "spring", stiffness: 150, damping: 20 }}>
        {isHovered && (<div key={holoKey} className="absolute inset-0 rounded-2xl md:rounded-3xl z-30 pointer-events-none overflow-hidden"><div className="absolute inset-0 holo-shine" /></div>)}
        <motion.div className="absolute inset-0 rounded-2xl md:rounded-3xl z-20 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(0,127,255,0.08) 100%)", border: "1px solid rgba(255,255,255,0.3)" }} />
        <div className="relative z-20 px-3 py-2 flex items-center justify-between" style={{ background: "linear-gradient(180deg, rgba(248,250,252,0.8) 0%, rgba(235,245,255,0.6) 100%)", borderBottom: "1px solid rgba(0,127,255,0.08)" }}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <motion.div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" whileHover={{ scale: 1.2 }} />
              <motion.div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" whileHover={{ scale: 1.2 }} />
              <motion.div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" whileHover={{ scale: 1.2 }} />
            </div>
            <div className="w-px h-3 bg-gray-300/60 mx-1" />
            <span className="text-[9px] text-gray-500 font-medium truncate">آسان حساب — داشبورد</span>
          </div>
          <div className="flex items-center gap-1.5"><LiveClock /><div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm"><Calculator className="w-2.5 h-2.5 text-white" /></div></div>
        </div>
        <div className="flex" style={{ height: "auto" }}>
          <motion.div className="w-9 md:w-10 shrink-0 flex flex-col items-center py-2 gap-2 relative" style={{ background: "linear-gradient(180deg, rgba(235,245,255,0.6) 0%, rgba(214,238,255,0.4) 100%)", backdropFilter: "blur(12px)", borderLeft: "1px solid rgba(0,127,255,0.06)" }}>
            {sidebarIcons.map((item, i) => (
              <motion.div key={i} className={`w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center cursor-default transition-all duration-300 ${item.active ? "gradient-brand text-white shadow-md shadow-brand-mid/20" : "bg-white/60 text-gray-400 hover:bg-white hover:text-gray-600"}`} whileHover={{ scale: 1.15 }} animate={isHovered ? { y: [0, -3, 0] } : {}} transition={{ duration: 0.4, delay: isHovered ? i * 0.08 : 0, ease: "easeInOut" }} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><item.Icon className="w-3 h-3 md:w-3.5 md:h-3.5" /></motion.div>
            ))}
            <div className="flex-1" />
            <motion.div className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center bg-white/60 text-gray-400 hover:text-red-400 cursor-default" whileHover={{ scale: 1.15 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}><Settings className="w-3 h-3 md:w-3.5 md:h-3.5" /></motion.div>
          </motion.div>
          <div className="flex-1 p-1.5 md:p-2 space-y-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="min-w-0"><p className="text-[9px] md:text-[10px] font-bold text-gray-800 dark:text-gray-200 truncate">داشبورد مدیریت</p><p className="text-[6px] md:text-[7px] text-gray-400">۱۴۰۴/۰۱/۱۵ - اسد</p></div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="px-1.5 py-0.5 bg-blue-50/80 dark:bg-blue-900/30 rounded-full text-[6px] md:text-[7px] text-blue-600 dark:text-blue-400 font-bold" style={{ backdropFilter: "blur(4px)" }}>آفلاین</div>
                <div className="relative w-5 h-5 rounded-full bg-brand-pale/80 flex items-center justify-center"><Bell className="w-2.5 h-2.5 text-brand-deep" /><motion.span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-[6px] text-white font-bold border border-white" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>۳</motion.span></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[
                { label: "درآمد کل", value: 850000, unit: "Afs", color: "from-brand-deep/[0.08] to-brand-mid/[0.05]", iconColor: "from-brand-deep to-brand-mid", icon: <TrendingUp className="w-2.5 h-2.5" /> },
                { label: "فاکتورها", value: 124, unit: "عدد", color: "from-emerald-50 to-emerald-100/50 dark:from-emerald-900/30 to-emerald-800/20", iconColor: "from-emerald-500 to-emerald-400", icon: <Receipt className="w-2.5 h-2.5" /> },
                { label: "مشتریان", value: 86, unit: "نفر", color: "from-amber-50 to-amber-100/50 dark:from-amber-900/30 to-amber-800/20", iconColor: "from-amber-500 to-amber-400", icon: <Users className="w-2.5 h-2.5" /> },
              ].map((kpi, i) => (
                <motion.div key={i} className={`bg-gradient-to-br ${kpi.color} rounded-xl p-1.5 border border-white/40`} style={{ backdropFilter: "blur(4px)" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.12 }}>
                  <div className={`w-4 h-4 rounded-md bg-gradient-to-br ${kpi.iconColor} flex items-center justify-center text-white mb-1`}>{kpi.icon}</div>
                  <p className="text-[6px] text-gray-400 leading-none">{kpi.label}</p>
                  <p className="text-[10px] md:text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5 leading-tight"><KpiCounter target={kpi.value} /> <span className="text-[6px] text-gray-400 font-normal">{kpi.unit}</span></p>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-1">
              <motion.div className="col-span-3 bg-gradient-to-b from-brand-surface/20 to-white/60 dark:from-brand-surface/10 to-gray-800/40 rounded-xl p-1.5 border border-brand-pale/15" style={{ backdropFilter: "blur(4px)" }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
                <div className="flex items-center justify-between mb-0.5"><p className="text-[7px] font-bold text-gray-700 dark:text-gray-300">نمودار ماهانه</p><span className="text-[6px] text-brand-mid font-bold bg-brand-pale/40 px-1 py-0.5 rounded-full">+۴۷٪</span></div>
                <div className="h-10 md:h-13"><AnimatedBarChart /></div>
              </motion.div>
              <motion.div className="col-span-2 bg-white/60 dark:bg-gray-800/40 rounded-xl p-1.5 border border-white/40" style={{ backdropFilter: "blur(4px)" }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}>
                <p className="text-[7px] font-bold text-gray-700 dark:text-gray-300 mb-0.5">فعالیت هفتگی</p>
                <div className="h-9 md:h-11"><AnimatedSparkline /></div>
              </motion.div>
            </div>
            <div className="grid grid-cols-5 gap-1">
              <motion.div className="col-span-3 bg-gradient-to-b from-[#0d1117]/90 to-[#161b22]/90 rounded-xl p-1.5 border border-gray-800/40 overflow-hidden" style={{ backdropFilter: "blur(4px)" }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
                <div className="flex items-center justify-between mb-1"><div className="flex items-center gap-1"><motion.div className="w-1 h-1 rounded-full bg-emerald-400" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} /><p className="text-[7px] font-bold text-gray-300">آخرین تراکنش‌ها</p></div><span className="text-[6px] text-gray-500 bg-gray-800/60 px-1 py-0.5 rounded-full">امروز</span></div>
                <LiveTransactionFeed />
              </motion.div>
              <motion.div className="col-span-2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}><LiveInvoicePreview /></motion.div>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-l from-brand-deep via-brand-mid to-brand-light opacity-50 relative z-10" />
      </motion.div>
      <motion.div className="absolute -inset-4 rounded-[2rem] blur-2xl -z-10" style={{ background: "linear-gradient(135deg, rgba(0,127,255,0.12) via rgba(0,71,171,0.06) to rgba(93,173,226,0.08)" }} animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-brand-mid/30 rounded-tr-lg" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-brand-mid/30 rounded-bl-lg" animate={{ opacity: [0.5, 0.3, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
    </motion.div>
  );
});

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */

export default function HeroSection() {
  const { t, dir, locale } = useI18n();
  const isRtl = dir === "rtl";

  const stats = useMemo(() => [
    { value: 5000, suffix: "+", label: t("stat.active_users") },
    { value: 120000, suffix: "+", label: t("stat.invoices") },
    { value: 34, suffix: "", label: t("stat.provinces") },
    { value: 99, suffix: "٪", label: t("stat.satisfaction") },
  ], [t]);

  const { scrollYProgress } = useScroll();

  return (
    <section className="relative pt-24 pb-4 md:pt-28 md:pb-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#f0f7ff] dark:from-[#0a1628] via-white dark:via-[#0f172a] to-[#e8f0fe] dark:to-[#0d1b30]" />
        <div className="absolute inset-0 hero-aurora" />
        <ParallaxSection speed={0.15} className="absolute top-[-20%] right-[-10%]">
          <div className="w-[800px] h-[800px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,127,255,0.12) 0%, transparent 70%)", animation: "float 14s ease-in-out infinite" }} />
        </ParallaxSection>
        <ParallaxSection speed={0.2} className="absolute bottom-[-15%] left-[-10%]">
          <div className="w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,71,171,0.08) 0%, transparent 70%)", animation: "float 18s ease-in-out infinite 3s" }} />
        </ParallaxSection>
        <ParallaxSection speed={0.1} className="absolute top-[40%] left-[50%]">
          <div className="w-[500px] h-[500px] blob" style={{ background: "radial-gradient(circle, rgba(93,173,226,0.06) 0%, transparent 70%)", animationDuration: "12s" }} />
        </ParallaxSection>
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="none"><defs><pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0047AB" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#heroGrid)" /></svg>
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] hidden lg:block">
          <motion.path d="M0 200 Q 400 100 800 250 T 1600 200" fill="none" stroke="#007FFF" strokeWidth="0.8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }} />
          <motion.path d="M0 400 Q 500 300 1000 450 T 1600 350" fill="none" stroke="#5DADE2" strokeWidth="0.6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 1, ease: "easeInOut" }} />
          <motion.path d="M0 600 Q 300 500 800 650 T 1600 550" fill="none" stroke="#0047AB" strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }} />
        </svg>
        {[...Array(isRtl ? 6 : 15)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-brand-mid/20" style={{ top: `${10 + (i * 7) % 80}%`, left: `${5 + (i * 11) % 90}%`, width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px` }} animate={{ y: [0, -25 - (i % 2) * 15, 0], opacity: [0.15, 0.5, 0.15], scale: [1, 1.5, 1] }} transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3 }} />
        ))}
        <motion.div className="absolute top-[15%] right-[8%] w-16 h-16 border border-brand-mid/10 rounded-xl hidden lg:block" animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute bottom-[20%] left-[5%] w-12 h-12 border border-brand-light/15 rounded-full hidden lg:block" animate={{ rotate: [360, 0], y: [0, -10, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute top-[60%] right-[12%] w-3 h-3 bg-brand-mid/10 rounded-full hidden lg:block" animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 text-center lg:text-right order-1 lg:order-2" style={{ direction: "rtl" }}>
            <FadeIn>
              <motion.div className="inline-flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-brand-pale/50 rounded-full px-5 py-2.5 mb-8 shadow-sm" whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(0,71,171,0.12)" }}>
                <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2.5, repeat: Infinity }}><Sparkles className="w-4 h-4 text-brand-mid" /></motion.span>
                <span className="text-sm font-semibold text-brand-deep">{t("hero.badge")}</span>
              </motion.div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative mb-6" style={{ direction: "rtl" }}>
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[140%] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at 65% 45%, rgba(0,127,255,0.06) 0%, rgba(0,71,171,0.04) 40%, transparent 70%)" }} animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
                <motion.div className="absolute -top-3 -right-1 md:-top-4 md:-right-4 w-8 h-8 md:w-10 md:h-10 rounded-xl border border-brand-mid/15 bg-brand-surface/40 hidden sm:flex items-center justify-center pointer-events-none" animate={{ y: [0, -6, 0], rotate: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><Sparkles className="w-3.5 h-3.5 text-brand-mid/40" /></motion.div>
                <h1 className="relative" style={{ lineHeight: 1.25 }}>
                  <motion.div className="relative z-10" initial={{ clipPath: "circle(0% at 70% 45%)" }} animate={{ clipPath: "circle(150% at 70% 45%)" }} transition={{ delay: 0.4, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
                    <span className="block font-bold text-gray-600" style={{ fontSize: "clamp(1.5rem, 3.8vw, 2.6rem)", letterSpacing: "-0.01em" }}>{t("hero.line1")},</span>
                    <span className="block font-black text-gray-900 dark:text-white mt-1" style={{ fontSize: "clamp(2.6rem, 7.5vw, 5rem)", letterSpacing: "-0.03em" }}>
                      {t("hero.line2_before")}{" "}
                      <span className="relative inline-block">
                        <motion.span className="absolute inset-0 blur-2xl opacity-40 pointer-events-none" style={{ background: "linear-gradient(135deg, #0047AB, #007FFF, #5DADE2, #D6EEFF)" }} animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.06, 1] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
                        <span className="relative" style={{ background: "linear-gradient(135deg, #0047AB 0%, #007FFF 25%, #5DADE2 55%, #89CFF0 80%, #D6EEFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                          آسان‌تر
                        </span>
                      </span>{" "}{t("hero.line2_after")}
                    </span>
                  </motion.div>
                  <div className="relative z-10 mt-3 flex items-center gap-3">
                    <motion.span className="h-[3px] rounded-full flex-1" style={{ background: "linear-gradient(90deg, transparent 0%, #0047AB 20%, #007FFF 50%, transparent 100%)" }} initial={{ scaleX: 0, originX: 0.5 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: 1, ease: [0.25, 0.4, 0.25, 1] }} />
                    <motion.span className="w-2 h-2 rounded-full bg-brand-mid/50 shrink-0" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.9, type: "spring", stiffness: 200 }} />
                    <motion.span className="h-[2px] rounded-full w-8" style={{ background: "linear-gradient(90deg, #5DADE2, transparent)" }} initial={{ scaleX: 0, originX: 1 }} animate={{ scaleX: 1 }} transition={{ delay: 2.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }} />
                  </div>
                </h1>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mb-8"><RotatingPhrase /><motion.p className="text-sm text-gray-400 mt-2 max-w-lg mx-auto lg:mx-0 lg:mr-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>{t("hero.sub_desc")}</motion.p></div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="gradient-brand text-white border-0 px-8 py-6 text-base rounded-2xl shadow-xl shadow-brand-mid/30 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center"><Zap className="w-5 h-5 ml-2" />{t("hero.cta_primary")}<ArrowLeft className="w-5 h-5 mr-2" /></span>
                    <motion.div className="absolute inset-0 shimmer" repeatCount={Infinity} />
                    <motion.div className="absolute inset-0 rounded-2xl border-2 border-white/20" animate={{ scale: [1, 1.15], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="px-8 py-6 text-base rounded-2xl border-brand-pale bg-white/60 dark:bg-gray-800/60 backdrop-blur-md hover:border-brand-mid hover:bg-brand-surface dark:hover:bg-gray-700/60 transition-all shadow-sm">
                    <PlayCircle className="w-5 h-5 ml-2 text-brand-mid" />{t("hero.cta_secondary")}
                  </Button>
                </motion.div>
              </div>
            </FadeIn>
            <motion.div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10" initial={{ opacity: 0, x: -30, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 1.8, type: "spring", stiffness: 150 }}>
              <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 gradient-brand rounded-full flex items-center justify-center text-white shadow-md"><Users className="w-5 h-5" /></div>
                <div><p className="text-sm font-black text-brand-deep">+۵,۰۰۰</p><p className="text-[10px] text-gray-400">{t("trust.users_label")}</p></div>
                <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              </div>
            </motion.div>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-8 justify-center lg:justify-start">
                {[
                  { icon: <Download className="w-3.5 h-3.5" />, text: t("trust.install") },
                  { icon: <WifiOff className="w-3.5 h-3.5" />, text: t("trust.offline") },
                  { icon: <Headphones className="w-3.5 h-3.5" />, text: t("trust.support") },
                  { icon: <Shield className="w-3.5 h-3.5" />, text: t("trust.secure") },
                ].map((item, i) => (
                  <motion.div key={i} className="flex items-center gap-2 bg-brand-surface/40 dark:bg-gray-800/40 rounded-full px-3.5 py-2 border border-brand-pale/50 dark:border-gray-700/40 backdrop-blur-sm" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }} whileHover={{ scale: 1.04, borderColor: "rgba(0,127,255,0.3)" }}>
                    <span className="text-brand-mid">{item.icon}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.6}>
              <motion.div className="mt-8 flex items-center gap-3 justify-center lg:justify-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                <div className="flex -space-x-2 space-x-reverse">
                  {["م", "ف", "ح", "ز"].map((letter, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 flex items-center justify-center text-[10px] font-bold text-white shadow-sm" style={{ background: `linear-gradient(135deg, hsl(${210 + i * 15}, 70%, ${50 + i * 5}%), hsl(${220 + i * 15}, 60%, ${40 + i * 5}%))`, zIndex: 4 - i }}>{letter}</div>
                  ))}
                </div>
                <div className="text-xs"><span className="font-bold text-gray-700 dark:text-gray-300">+۵,۰۰۰</span> <span className="text-gray-400 dark:text-gray-500">{t("trust.satisfied_users")}</span></div>
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />))}</div>
              </motion.div>
            </FadeIn>
          </div>

          {/* Right content — Hero Card */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div className="w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full border border-brand-pale/30" animate={{ rotate: 360, scale: [1, 1.03, 1] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[440px] md:h-[440px] rounded-full border border-dashed border-brand-light/25" animate={{ rotate: -360 }} transition={{ duration: 55, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-brand-mid/15" animate={{ rotate: 360, scale: [1, 0.97, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-[2.5rem] blur-[80px] bg-gradient-to-br from-brand-mid/20 via-brand-deep/10 to-brand-light/15 pointer-events-none" />
              <HeroTiltCard />
              {/* Floating stat cards */}
              <motion.div className="absolute -top-2 right-0 md:top-2 md:-right-2 z-20" initial={{ opacity: 0, scale: 0, rotate: 12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1, type: "spring", stiffness: 180 }}>
                <motion.div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-4 border border-brand-pale/40 dark:border-gray-700/40" style={{ animation: "float 6s ease-in-out infinite" }} whileHover={{ scale: 1.1 }}>
                  <div className="flex items-center gap-3"><div className="w-11 h-11 gradient-brand rounded-xl flex items-center justify-center shadow-md shadow-brand-mid/20"><TrendingUp className="w-5 h-5 text-white" /></div><div><p className="text-[10px] text-gray-400 font-medium">{t("float.revenue_growth")}</p><p className="text-xl font-black text-brand-deep">+۴۷٪</p></div></div>
                  <svg viewBox="0 0 80 24" className="w-full h-5 mt-2"><motion.path d="M0 20 L12 16 L24 18 L36 10 L48 12 L60 4 L72 6 L80 2" fill="none" stroke="#007FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.5, ease: "easeOut" }} /><motion.path d="M0 20 L12 16 L24 18 L36 10 L48 12 L60 4 L72 6 L80 2 L80 24 L0 24Z" fill="url(#sparkFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.5 }} /><defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#007FFF" stopOpacity="0.2" /><stop offset="100%" stopColor="#007FFF" stopOpacity="0" /></linearGradient></defs></svg>
                </motion.div>
              </motion.div>
              <motion.div className="absolute -bottom-2 left-0 md:bottom-4 md:-left-6 z-20" initial={{ opacity: 0, scale: 0, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1.3, type: "spring", stiffness: 180 }}>
                <motion.div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-4 border border-brand-pale/40 dark:border-gray-700/40" style={{ animation: "float 7s ease-in-out infinite 1.5s" }} whileHover={{ scale: 1.1 }}>
                  <div className="flex items-center gap-3"><div className="w-11 h-11 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center"><Star className="w-5 h-5 text-amber-400 fill-amber-400" /></div><div><p className="text-[10px] text-gray-400 font-medium">{t("float.customer_satisfaction")}</p><p className="text-xl font-black text-gray-900 dark:text-white">۴.۹/۵</p></div></div>
                  <div className="flex gap-0.5 mt-2">{[100, 100, 100, 100, 80].map((w, i) => (<motion.div key={i} className="h-1.5 rounded-full bg-amber-400" initial={{ width: 0 }} animate={{ width: `${w}%` }} transition={{ duration: 0.8, delay: 1.8 + i * 0.1, ease: "easeOut" }} />))}</div>
                </motion.div>
              </motion.div>
              <motion.div className="absolute top-4 -left-2 md:top-8 md:-left-8 z-20 hidden sm:block" initial={{ opacity: 0, x: -30, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 1.5, type: "spring" }}>
                <motion.div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-3.5 border border-brand-pale/40 dark:border-gray-700/40" style={{ animation: "float 8s ease-in-out infinite 2s" }} whileHover={{ scale: 1.1 }}>
                  <div className="flex items-center gap-2.5"><div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center shadow-md shadow-brand-mid/20"><Receipt className="w-4 h-4 text-white" /></div><div><p className="text-[10px] text-gray-400 font-medium">{t("float.today_invoices")}</p><p className="text-lg font-black text-brand-deep">{t("float.invoice_count")}</p></div></div>
                </motion.div>
              </motion.div>
              <motion.div className="absolute -bottom-4 right-4 md:bottom-0 md:right-0 z-20 hidden md:block" initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.7, type: "spring" }}>
                <motion.div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-3 border border-brand-pale/40 dark:border-gray-700/40" style={{ animation: "float 9s ease-in-out infinite 2.5s" }} whileHover={{ scale: 1.1 }}>
                  <div className="flex items-center gap-2"><div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center"><Shield className="w-3.5 h-3.5 text-emerald-500" /></div><div><p className="text-[9px] text-gray-400">{t("float.ssl")}</p><p className="text-xs font-bold text-emerald-600">{t("float.protected")}</p></div></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.8}>
          <motion.div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            {stats.map((s, i) => (
              <motion.div key={i} className="rounded-2xl p-3 md:p-4 text-center bg-white/80 dark:bg-gray-800/50 border border-brand-pale/40 dark:border-brand-mid/20 shadow-sm md:shadow-md" whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,71,171,0.1)" }}>
                <p className="text-xl md:text-2xl font-black text-brand-deep tabular-nums">{s.value.toLocaleString("fa-AF")}{s.suffix}</p>
                <p className="text-[11px] md:text-xs text-gray-400 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </FadeIn>
      </section>
  );
}
