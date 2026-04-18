"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/animation-components";
import {
  Users,
  Building2,
  TrendingUp,
  Download,
  Settings,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

// Brand colors
const BRAND = {
  deep: "#0047AB",
  primary: "#0056D6",
  mid: "#007FFF",
  light: "#5DADE2",
  pale: "#D6EEFF",
  surface: "#EBF5FF",
  dark: "#002d6e",
};

// Animated background gradient
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%]"
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${BRAND.mid}08 0%, transparent 50%)`,
      }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear",
      }}
    />
    <motion.div
      className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl"
      style={{ background: `${BRAND.light}10` }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    <motion.div
      className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-3xl"
      style={{ background: `${BRAND.mid}08` }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 10, repeat: Infinity, delay: 2 }}
    />
  </div>
);

// Floating particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: 4 + (i % 3) * 2,
          height: 4 + (i % 3) * 2,
          background: i % 2 === 0 ? BRAND.mid : BRAND.light,
          left: `${10 + (i * 8) % 80}%`,
          top: `${15 + (i * 12) % 70}%`,
          opacity: 0.15,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, (i % 2 === 0 ? 10 : -10), 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4 + (i % 3),
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Animated path connector
const PathConnector = ({ isRtl }: { isRtl: boolean }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={BRAND.pale} stopOpacity="0.5" />
        <stop offset="50%" stopColor={BRAND.mid} stopOpacity="1" />
        <stop offset="100%" stopColor={BRAND.pale} stopOpacity="0.5" />
      </linearGradient>
    </defs>
    <motion.path
      d={isRtl 
        ? "M50% 0 Q 30% 15%, 50% 30 T 50% 60 T 50% 100"
        : "M50% 0 Q 70% 15%, 50% 30 T 50% 60 T 50% 100"
      }
      fill="none"
      stroke="url(#pathGradient)"
      strokeWidth="2"
      strokeDasharray="8 4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  </svg>
);

// Glowing step number
const GlowingStepNumber = ({ number, delay }: { number: string; delay: number }) => (
  <div className="relative">
    {/* Outer glow rings */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute inset-0 rounded-full gradient-brand"
        animate={{
          scale: [1, 2],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 1 + delay,
          ease: "easeOut",
        }}
      />
    ))}
    
    {/* Main circle */}
    <motion.div
      className="relative w-20 h-20 gradient-brand rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl"
      style={{ boxShadow: `0 0 40px ${BRAND.mid}40` }}
      whileHover={{ scale: 1.15 }}
      animate={{
        boxShadow: [
          `0 0 20px ${BRAND.mid}30`,
          `0 0 40px ${BRAND.mid}50`,
          `0 0 20px ${BRAND.mid}30`,
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {number}
    </motion.div>
    
    {/* Inner glow */}
    <motion.div
      className="absolute inset-2 rounded-full bg-white/20"
      animate={{ opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </div>
);

// Feature card with 3D effect
const StepCard = ({
  item,
  index,
  isRtl,
  dir,
}: {
  item: {
    step: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
    features?: string[];
  };
  index: number;
  isRtl: boolean;
  dir: "rtl" | "ltr";
}) => {
  const isEven = index % 2 === 0;
  const flipRow = isRtl ? !isEven : isEven;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative mb-16 last:mb-0 md:flex items-center ${
        flipRow ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Card */}
      <div className={`md:w-1/2 md:px-10 ${flipRow ? "md:ms-auto" : "md:me-auto"}`}>
        <motion.div
          className="relative bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-100/50 dark:border-gray-700/30 max-w-md shadow-xl shadow-gray-200/20 dark:shadow-black/10"
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            boxShadow: `0 25px 50px -12px ${BRAND.mid}15`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative corner */}
          <div className={`absolute top-0 ${flipRow ? "left-0 rounded-br-3xl" : "right-0 rounded-bl-3xl"} w-20 h-20 opacity-10`}>
            <div className="w-full h-full gradient-brand" />
          </div>
          
          {/* Icon with glow */}
          <motion.div
            className="relative w-16 h-16 gradient-brand rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg"
            style={{ boxShadow: `0 10px 30px ${BRAND.mid}30` }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {item.icon}
            <motion.div
              className="absolute inset-0 rounded-2xl gradient-brand opacity-50 blur-xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Content */}
          <h3 
            className="text-xl font-black text-gray-900 dark:text-white mb-3"
            style={{ direction: dir }}
          >
            {item.title}
          </h3>
          <p 
            className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4"
            style={{ direction: dir }}
          >
            {item.desc}
          </p>
          
          {/* Feature tags */}
          {item.features && (
            <div className="flex flex-wrap gap-2">
              {item.features.map((f, i) => (
                <motion.span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-surface/50 dark:bg-gray-700/50 rounded-full text-xs font-medium text-brand-deep dark:text-brand-light"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {f}
                </motion.span>
              ))}
            </div>
          )}
          
          {/* Arrow indicator */}
          <motion.div
            className={`absolute bottom-6 ${flipRow ? "left-6" : "right-6"} opacity-20`}
            animate={{ x: [0, flipRow ? -5 : 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className={`w-5 h-5 text-brand-mid ${isRtl ? "rotate-180" : ""}`} />
          </motion.div>
        </motion.div>
      </div>

      {/* Center node - Step number */}
      <div className="hidden md:flex md:w-24 justify-center relative z-10">
        <GlowingStepNumber number={item.step} delay={index * 0.3} />
      </div>
      
      {/* Mobile step number */}
      <div className="md:hidden flex justify-center mb-4">
        <GlowingStepNumber number={item.step} delay={index * 0.3} />
      </div>
      
      <div className="md:w-1/2" />
    </motion.div>
  );
};

// Progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <motion.div
      className="absolute top-0 bottom-0 right-1/2 translate-x-1/2 w-1 bg-gray-100 dark:bg-gray-800 rounded-full hidden md:block"
      style={{ originY: 0 }}
    >
      <motion.div
        className="w-full gradient-brand rounded-full"
        style={{ scaleY, height: "100%" }}
      />
    </motion.div>
  );
};

export default function HowItWorks() {
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";

  const steps = [
    {
      step: t("how.step1_num"),
      title: t("how.step1_title"),
      desc: t("how.step1_desc"),
      icon: <Download className="w-7 h-7" />,
      features: ["رایگان", "سریع", "آسان"],
    },
    {
      step: t("how.step2_num"),
      title: t("how.step2_title"),
      desc: t("how.step2_desc"),
      icon: <Settings className="w-7 h-7" />,
      features: ["سفارشی", "انعطاف‌پذیر"],
    },
    {
      step: t("how.step3_num"),
      title: t("how.step3_title"),
      desc: t("how.step3_desc"),
      icon: <BarChart3 className="w-7 h-7" />,
      features: ["گزارش", "تحلیل", "هدایت"],
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand-mid/20"
              animate={{ 
                rotate: [0, 5, -5, 0],
                boxShadow: [
                  `0 10px 20px ${BRAND.mid}20`,
                  `0 15px 30px ${BRAND.mid}30`,
                  `0 10px 20px ${BRAND.mid}20`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
          
          <Badge className="mb-4 bg-brand-surface dark:bg-gray-800 text-brand-deep dark:text-brand-light border-brand-pale dark:border-brand-mid/30 px-4 py-2 rounded-full text-sm font-medium">
            {t("how.badge")}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
            {t("how.title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            در سه قدم ساده، حسابداری حرفه‌ای خود را شروع کنید
          </p>
        </FadeIn>

        {/* Steps */}
        <div className="relative">
          {/* Background line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-pale to-transparent hidden md:block"
            style={{ [isRtl ? "right" : "left"]: "50%", transform: "translateX(50%)" }}
          />
          
          {steps.map((item, i) => (
            <StepCard
              key={i}
              item={item}
              index={i}
              isRtl={isRtl}
              dir={dir}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 p-2 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-100/50 dark:border-gray-700/30 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 px-4">
              <div className="flex -space-x-2 space-x-reverse">
                {[Zap, Shield, Clock].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 gradient-brand rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                شروع در کمتر از ۵ دقیقه
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
