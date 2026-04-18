"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n";
import {
  Calculator, CalendarDays, BarChart3, Shield, Users, Globe,
  CheckCircle2, Star, ArrowRight, TrendingUp, Wallet, Receipt,
  Headphones, Zap, Sparkles, Monitor, WifiOff,
  ArrowUp, Download, PlayCircle,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter, ParallaxSection, GlowOrb, LiveClock, KpiCounter } from "./shared-components";
import { HeroTiltCard } from "./hero-tilt-card";

/* ═══════════════════════════════════════════
   ROTATING PHRASE
   ═══════════════════════════════════════════ */

const RotatingPhrase = React.memo(function RotatingPhrase() {
  const { t, dir } = useI18n();
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
    <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap" dir={dir}>
      <span className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
        {t("hero.accounting_sw")}
      </span>
      <span className="relative inline-flex items-center justify-center min-w-[155px] h-[2.2rem] md:min-w-[195px] md:h-[2.7rem]">
        <span className="absolute inset-0 rounded-full bg-gradient-to-l from-brand-pale/70 to-brand-surface/80 border border-brand-pale/60" />
        <span className="absolute end-2.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-mid/30" />
        <span className="absolute start-2.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-mid/30" />
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
          className="absolute start-3.5 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-brand-mid rounded-full z-10"
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
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center" dir="ltr">
          {/* Left content */}
          <div className={`lg:col-span-7 text-center order-1 ${isRtl ? "lg:order-2 lg:text-right" : "lg:order-1 lg:text-left"}`} style={{ direction: dir }}>
            <FadeIn>
              <motion.div className="inline-flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-brand-pale/50 rounded-full px-5 py-2.5 mb-8 shadow-sm" whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(0,71,171,0.12)" }}>
                <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2.5, repeat: Infinity }}><Sparkles className="w-4 h-4 text-brand-mid" /></motion.span>
                <span className="text-sm font-semibold text-brand-deep">{t("hero.badge")}</span>
              </motion.div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative mb-6" style={{ direction: dir }}>
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
                          {t("hero.line2_highlight")}
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end rtl:lg:justify-start">
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="gradient-brand text-white border-0 px-8 py-6 text-base rounded-2xl shadow-xl shadow-brand-mid/30 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center"><Zap className="w-5 h-5 me-2" />{t("hero.cta_primary")}<ArrowRight className="w-5 h-5 ms-2 rtl:rotate-180" /></span>
                    <motion.div className="absolute inset-0 shimmer" repeatCount={Infinity} />
                    <motion.div className="absolute inset-0 rounded-2xl border-2 border-white/20" animate={{ scale: [1, 1.15], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="px-8 py-6 text-base rounded-2xl border-brand-pale bg-white/60 dark:bg-gray-800/60 backdrop-blur-md hover:border-brand-mid hover:bg-brand-surface dark:hover:bg-gray-700/60 transition-all shadow-sm">
                    <PlayCircle className="w-5 h-5 me-2 text-brand-mid" />{t("hero.cta_secondary")}
                  </Button>
                </motion.div>
              </div>
            </FadeIn>
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
          <div className={`lg:col-span-5 relative order-2 ${isRtl ? "lg:order-1" : "lg:order-2"}`}>
            {/* Floating user counter badge */}
            <motion.div className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 z-50 ${isRtl ? "-end-4" : "-start-4"}`} initial={{ opacity: 0, x: -30, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 1.8, type: "spring", stiffness: 150 }}>
              <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 gradient-brand rounded-full flex items-center justify-center text-white shadow-md"><Users className="w-5 h-5" /></div>
                <div><p className="text-sm font-black text-brand-deep">+۵,۰۰۰</p><p className="text-[10px] text-gray-400">{t("trust.users_label")}</p></div>
                <motion.div className="w-2 h-2 rounded-full bg-emerald-400" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              </div>
            </motion.div>
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div className="w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full border border-brand-pale/30" animate={{ rotate: 360, scale: [1, 1.03, 1] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[440px] md:h-[440px] rounded-full border border-dashed border-brand-light/25" animate={{ rotate: -360 }} transition={{ duration: 55, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-brand-mid/15" animate={{ rotate: 360, scale: [1, 0.97, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-[2.5rem] blur-[80px] bg-gradient-to-br from-brand-mid/20 via-brand-deep/10 to-brand-light/15 pointer-events-none" />
              <HeroTiltCard />
              {/* Floating stat cards */}
              <motion.div className="absolute -top-2 end-0 md:top-2 md:-end-2 z-20" initial={{ opacity: 0, scale: 0, rotate: 12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1, type: "spring", stiffness: 180 }}>
                <motion.div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-4 border border-brand-pale/40 dark:border-gray-700/40" style={{ animation: "float 6s ease-in-out infinite" }} whileHover={{ scale: 1.1 }}>
                  <div className="flex items-center gap-3"><div className="w-11 h-11 gradient-brand rounded-xl flex items-center justify-center shadow-md shadow-brand-mid/20"><TrendingUp className="w-5 h-5 text-white" /></div><div><p className="text-[10px] text-gray-400 font-medium">{t("float.revenue_growth")}</p><p className="text-xl font-black text-brand-deep">+۴۷٪</p></div></div>
                  <svg viewBox="0 0 80 24" className="w-full h-5 mt-2"><motion.path d="M0 20 L12 16 L24 18 L36 10 L48 12 L60 4 L72 6 L80 2" fill="none" stroke="#007FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.5, ease: "easeOut" }} /><motion.path d="M0 20 L12 16 L24 18 L36 10 L48 12 L60 4 L72 6 L80 2 L80 24 L0 24Z" fill="url(#sparkFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.5 }} /><defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#007FFF" stopOpacity="0.2" /><stop offset="100%" stopColor="#007FFF" stopOpacity="0" /></linearGradient></defs></svg>
                </motion.div>
              </motion.div>
              <motion.div className="absolute -bottom-2 start-0 md:bottom-4 md:-start-6 z-20" initial={{ opacity: 0, scale: 0, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1.3, type: "spring", stiffness: 180 }}>
                <motion.div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-4 border border-brand-pale/40 dark:border-gray-700/40" style={{ animation: "float 7s ease-in-out infinite 1.5s" }} whileHover={{ scale: 1.1 }}>
                  <div className="flex items-center gap-3"><div className="w-11 h-11 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center"><Star className="w-5 h-5 text-amber-400 fill-amber-400" /></div><div><p className="text-[10px] text-gray-400 font-medium">{t("float.customer_satisfaction")}</p><p className="text-xl font-black text-gray-900 dark:text-white">۴.۹/۵</p></div></div>
                  <div className="flex gap-0.5 mt-2">{[100, 100, 100, 100, 80].map((w, i) => (<motion.div key={i} className="h-1.5 rounded-full bg-amber-400" initial={{ width: 0 }} animate={{ width: `${w}%` }} transition={{ duration: 0.8, delay: 1.8 + i * 0.1, ease: "easeOut" }} />))}</div>
                </motion.div>
              </motion.div>
              <motion.div className="absolute top-4 -start-2 md:top-8 md:-start-8 z-20 hidden sm:block" initial={{ opacity: 0, x: -30, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 1.5, type: "spring" }}>
                <motion.div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-brand-deep/10 p-3.5 border border-brand-pale/40 dark:border-gray-700/40" style={{ animation: "float 8s ease-in-out infinite 2s" }} whileHover={{ scale: 1.1 }}>
                  <div className="flex items-center gap-2.5"><div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center shadow-md shadow-brand-mid/20"><Receipt className="w-4 h-4 text-white" /></div><div><p className="text-[10px] text-gray-400 font-medium">{t("float.today_invoices")}</p><p className="text-lg font-black text-brand-deep">{t("float.invoice_count")}</p></div></div>
                </motion.div>
              </motion.div>
              <motion.div className="absolute -bottom-4 end-4 md:bottom-0 md:end-0 z-20 hidden md:block" initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.7, type: "spring" }}>
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
      </div>
    </section>
  );
}
