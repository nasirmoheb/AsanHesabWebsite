"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { LiveClock, KpiCounter } from "./shared-components";
import {
  Calculator, BarChart3, Users, Receipt, TrendingUp, Layers, CheckCircle2,
  Bell, Settings, Home as HomeIcon, LayoutDashboard, FileSpreadsheet,
  Store, Truck, Building2,
} from "lucide-react";

/* ─── Live Transaction Feed ─── */
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
              <div className="text-end shrink-0">
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

/* ─── Live Invoice Preview ─── */
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

/* ─── Animated Bar Chart (hero version) ─── */
function HeroBarChart() {
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

/* ─── Animated Sparkline ─── */
function HeroSparkline() {
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

/* ─── Hero Tilt Card ─── */
export const HeroTiltCard = React.memo(function HeroTiltCard() {
  const { dir } = useI18n();
  const isRtl = dir === "rtl";
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [holoKey, setHoloKey] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setTilt({
      x: -((e.clientY - rect.top - rect.height / 2) / rect.height) * 6,
      y: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 8,
    });
  };

  const sidebarIcons = [
    { Icon: HomeIcon, active: true }, { Icon: LayoutDashboard, active: true },
    { Icon: Receipt, active: false }, { Icon: FileSpreadsheet, active: false },
    { Icon: BarChart3, active: false }, { Icon: Users, active: false },
  ];

  return (
    <motion.div
      ref={cardRef}
      className="relative z-10 mx-auto w-[340px] sm:w-[400px] md:w-[460px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); setHoloKey((k) => k + 1); }}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
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
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {isHovered && (
          <div key={holoKey} className="absolute inset-0 rounded-2xl md:rounded-3xl z-30 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 holo-shine" />
          </div>
        )}
        <motion.div className="absolute inset-0 rounded-2xl md:rounded-3xl z-20 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(0,127,255,0.08) 100%)", border: "1px solid rgba(255,255,255,0.3)" }} />

        {/* Title bar */}
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
          <div className="flex items-center gap-1.5">
            <LiveClock />
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm">
              <Calculator className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex" style={{ direction: dir }}>
          {/* Sidebar */}
          <motion.div
            className={`w-9 md:w-10 shrink-0 flex flex-col items-center py-2 gap-2 ${isRtl ? "order-2" : "order-1"}`}
            style={{ background: "linear-gradient(180deg, rgba(235,245,255,0.6) 0%, rgba(214,238,255,0.4) 100%)", backdropFilter: "blur(12px)", borderInlineEnd: isRtl ? "none" : "1px solid rgba(0,127,255,0.06)", borderInlineStart: isRtl ? "1px solid rgba(0,127,255,0.06)" : "none" }}
          >
            {sidebarIcons.map((item, i) => (
              <motion.div
                key={i}
                className={`w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center cursor-default ${item.active ? "gradient-brand text-white shadow-md shadow-brand-mid/20" : "bg-white/60 text-gray-400"}`}
                whileHover={{ scale: 1.15 }}
                animate={isHovered ? { y: [0, -3, 0] } : {}}
                transition={{ duration: 0.4, delay: isHovered ? i * 0.08 : 0 }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <item.Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
              </motion.div>
            ))}
            <div className="flex-1" />
            <motion.div className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center bg-white/60 text-gray-400 cursor-default" whileHover={{ scale: 1.15 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <Settings className="w-3 h-3 md:w-3.5 md:h-3.5" />
            </motion.div>
          </motion.div>

          {/* Main content */}
          <div className={`flex-1 p-1.5 md:p-2 space-y-1 min-w-0 ${isRtl ? "order-1" : "order-2"}`}>
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[9px] md:text-[10px] font-bold text-gray-800 dark:text-gray-200 truncate">داشبورد مدیریت</p>
                <p className="text-[6px] md:text-[7px] text-gray-400">۱۴۰۴/۰۱/۱۵ - اسد</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="px-1.5 py-0.5 bg-blue-50/80 dark:bg-blue-900/30 rounded-full text-[6px] md:text-[7px] text-blue-600 dark:text-blue-400 font-bold">آفلاین</div>
                <div className="relative w-5 h-5 rounded-full bg-brand-pale/80 flex items-center justify-center">
                  <Bell className="w-2.5 h-2.5 text-brand-deep" />
                  <motion.span className="absolute -top-1 -end-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-[6px] text-white font-bold border border-white" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>۳</motion.span>
                </div>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-3 gap-1">
              {[
                { label: "درآمد کل", value: 850000, unit: "Afs", color: "from-brand-deep/[0.08] to-brand-mid/[0.05]", iconColor: "from-brand-deep to-brand-mid", icon: <TrendingUp className="w-2.5 h-2.5" /> },
                { label: "فاکتورها", value: 124, unit: "عدد", color: "from-emerald-50 to-emerald-100/50 dark:from-emerald-900/30 dark:to-emerald-800/20", iconColor: "from-emerald-500 to-emerald-400", icon: <Receipt className="w-2.5 h-2.5" /> },
                { label: "مشتریان", value: 86, unit: "نفر", color: "from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-800/20", iconColor: "from-amber-500 to-amber-400", icon: <Users className="w-2.5 h-2.5" /> },
              ].map((kpi, i) => (
                <motion.div key={i} className={`bg-gradient-to-br ${kpi.color} rounded-xl p-1.5 border border-white/40`} style={{ backdropFilter: "blur(4px)" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.12 }}>
                  <div className={`w-4 h-4 rounded-md bg-gradient-to-br ${kpi.iconColor} flex items-center justify-center text-white mb-1`}>{kpi.icon}</div>
                  <p className="text-[6px] text-gray-400 leading-none">{kpi.label}</p>
                  <p className="text-[10px] md:text-xs font-black text-gray-900 dark:text-gray-100 mt-0.5 leading-tight">
                    <KpiCounter target={kpi.value} /> <span className="text-[6px] text-gray-400 font-normal">{kpi.unit}</span>
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-5 gap-1">
              <motion.div className="col-span-3 bg-gradient-to-b from-brand-surface/20 to-white/60 dark:from-brand-surface/10 dark:to-gray-800/40 rounded-xl p-1.5 border border-brand-pale/15" style={{ backdropFilter: "blur(4px)" }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[7px] font-bold text-gray-700 dark:text-gray-300">نمودار ماهانه</p>
                  <span className="text-[6px] text-brand-mid font-bold bg-brand-pale/40 px-1 py-0.5 rounded-full">+۴۷٪</span>
                </div>
                <div className="h-10 md:h-13"><HeroBarChart /></div>
              </motion.div>
              <motion.div className="col-span-2 bg-white/60 dark:bg-gray-800/40 rounded-xl p-1.5 border border-white/40" style={{ backdropFilter: "blur(4px)" }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}>
                <p className="text-[7px] font-bold text-gray-700 dark:text-gray-300 mb-0.5">فعالیت هفتگی</p>
                <div className="h-9 md:h-11"><HeroSparkline /></div>
              </motion.div>
            </div>

            {/* Transactions + Invoice row */}
            <div className="grid grid-cols-5 gap-1">
              <motion.div className="col-span-3 bg-gradient-to-b from-[#0d1117]/90 to-[#161b22]/90 rounded-xl p-1.5 border border-gray-800/40 overflow-hidden" style={{ backdropFilter: "blur(4px)" }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <motion.div className="w-1 h-1 rounded-full bg-emerald-400" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <p className="text-[7px] font-bold text-gray-300">آخرین تراکنش‌ها</p>
                  </div>
                  <span className="text-[6px] text-gray-500 bg-gray-800/60 px-1 py-0.5 rounded-full">امروز</span>
                </div>
                <LiveTransactionFeed />
              </motion.div>
              <motion.div className="col-span-2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}>
                <LiveInvoicePreview />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-l from-brand-deep via-brand-mid to-brand-light opacity-50 relative z-10" />
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="absolute -inset-4 rounded-[2rem] blur-2xl -z-10"
        style={{ background: "linear-gradient(135deg, rgba(0,127,255,0.12), rgba(0,71,171,0.06), rgba(93,173,226,0.08))" }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute -top-3 -end-3 w-6 h-6 border-t-2 border-e-2 border-brand-mid/30 rounded-tr-lg rtl:rounded-tr-none rtl:rounded-tl-lg" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.div className="absolute -bottom-3 -start-3 w-6 h-6 border-b-2 border-s-2 border-brand-mid/30 rounded-bl-lg rtl:rounded-bl-none rtl:rounded-br-lg" animate={{ opacity: [0.5, 0.3, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
    </motion.div>
  );
});
