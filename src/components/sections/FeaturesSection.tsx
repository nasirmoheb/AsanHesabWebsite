"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animation-components";
import { Award, Sparkles, Zap, TrendingUp, ArrowUpRight, CheckCircle2, Shield, Star, Clock, Globe, Receipt, CalendarDays, BarChart3, Cpu, Layers, Activity } from "lucide-react";

// Brand colors from globals.css
const BRAND = {
  deep: "#0047AB",
  primary: "#0056D6",
  mid: "#007FFF",
  light: "#5DADE2",
  pale: "#D6EEFF",
  surface: "#EBF5FF",
  dark: "#002d6e",
};

interface FeaturesSectionProps {
  features: { icon: React.ReactNode; title: string; desc: string }[];
  bentoFeatures: { span: string; icon: React.ReactNode; title: string; desc: string; gradient: boolean }[];
}

// ═══════════════════════════════════════════════════════════════
// CREATIVE COMPONENTS FOR BENTO GRID
// ═══════════════════════════════════════════════════════════════

// Animated gradient mesh background
const GradientMesh = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(0, 127, 255, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(93, 173, 226, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(0, 71, 171, 0.08) 0%, transparent 60%)
        `,
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
  </div>
);

// Floating particles
const FloatingParticles = ({ count = 20, color = "white" }: { count?: number; color?: string }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full bg-${color}/20`}
        style={{
          width: Math.random() * 4 + 2,
          height: Math.random() * 4 + 2,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Animated wave lines
const WaveLines = () => (
  <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
    <motion.path
      d="M0 100 Q 50 50, 100 100 T 200 100 T 300 100 T 400 100"
      fill="none"
      stroke="white"
      strokeWidth="0.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
    />
    <motion.path
      d="M0 150 Q 75 100, 150 150 T 300 150 T 450 150"
      fill="none"
      stroke="white"
      strokeWidth="0.3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: "loop" }}
    />
  </svg>
);

// 3D Tilt card wrapper
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// Animated counter with glow
const GlowingCounter = ({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) => {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev >= value ? value : prev + 1);
    }, 30);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 blur-xl bg-brand-mid/30 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="relative text-center">
        <p className="text-4xl font-black text-white">
          {count}{suffix}
        </p>
        <p className="text-xs text-white/60 mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

// Animated chart with bars
const AnimatedBarChart = () => (
  <div className="flex items-end gap-1.5 h-16 mt-4">
    {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85].map((h, i) => (
      <motion.div
        key={i}
        className="flex-1 bg-white/30 rounded-t-sm"
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ delay: 0.1 * i, duration: 0.5, ease: "easeOut" }}
      />
    ))}
  </div>
);

// Orbiting icons around a center
const OrbitingIcons = () => {
  const icons = [
    { Icon: Receipt, delay: 0 },
    { Icon: CalendarDays, delay: 0.5 },
    { Icon: Shield, delay: 1 },
    { Icon: Globe, delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: item.delay,
          }}
          style={{
            transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateX(120px)`,
          }}
        >
          <motion.div
            className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: item.delay,
            }}
          >
            <item.Icon className="w-4 h-4 text-white/60" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Pulsing rings
const PulsingRings = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute w-32 h-32 border border-white/10 rounded-full"
        animate={{
          scale: [1, 2],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 1,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

// Morphing blob background
const MorphingBlob = ({ color = BRAND.mid }: { color?: string }) => (
  <motion.div
    className="absolute -z-10 opacity-20 blur-3xl"
    style={{
      width: 300,
      height: 300,
      background: color,
      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
    }}
    animate={{
      borderRadius: [
        "60% 40% 30% 70% / 60% 30% 70% 40%",
        "30% 60% 70% 40% / 50% 60% 30% 60%",
        "60% 40% 30% 70% / 60% 30% 70% 40%",
      ],
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Glowing icon wrapper
const GlowingIcon = ({ children, color = "brand" }: { children: React.ReactNode; color?: string }) => {
  const colorMap: Record<string, string> = {
    brand: BRAND.mid,
    amber: "#F59E0B",
    emerald: "#10B981",
    purple: "#A855F7",
    blue: "#3B82F6",
  };
  
  return (
    <motion.div className="relative">
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl"
        style={{ background: colorMap[color] || BRAND.mid }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
};

// Animated progress bar
const AnimatedProgress = ({ value, color = "white" }: { value: number; color?: string }) => (
  <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
    <motion.div
      className={`absolute inset-y-0 left-0 bg-${color} rounded-full`}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
    />
    <motion.div
      className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent to-white/30 rounded-full"
      animate={{ x: ["-100%", "200%"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Mini stat card
const MiniStat = ({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) => (
  <motion.div
    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl backdrop-blur-sm"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
  >
    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
      <Icon className="w-4 h-4 text-white/70" />
    </div>
    <div>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] text-white/50">{label}</p>
    </div>
  </motion.div>
);

// Feature tag with animation
const FeatureTag = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <motion.span
    className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full text-[10px] text-white/70"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
  >
    <CheckCircle2 className="w-3 h-3" />
    {text}
  </motion.span>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function FeaturesSection({ features, bentoFeatures }: FeaturesSectionProps) {
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <>
      {/* ══════════ FEATURES — ASYMMETRIC ICON GRID ══════════ */}
      <section id="features" className="py-20 md:py-28 gradient-brand-soft relative overflow-hidden">
        {/* Animated background */}
        <GradientMesh />
        
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-brand-mid/10 rounded-full hidden lg:block"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 border border-brand-light/15 rounded-xl hidden lg:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge className="mb-4 bg-white dark:bg-gray-800 text-brand-deep dark:text-brand-light border-brand-pale dark:border-brand-mid/30 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <Award className="w-4 h-4 me-1" />
              {t("features.badge")}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
              {t("features.title_before")}
              <span className="text-gradient"> {t("features.title_highlight")}</span>
            </h2>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.06}>
            {features.map((f, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 dark:border-gray-700/30 h-full hover:shadow-2xl hover:shadow-brand-deep/10 transition-all duration-500 group cursor-default relative overflow-hidden"
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <motion.div
                    className="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-brand-mid/20 relative z-10"
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {f.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 relative z-10" style={{ direction: dir }}>{f.title}</h3>
                  <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed relative z-10" style={{ direction: dir }}>{f.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="gradient-divider-section" />

      {/* ══════════ BENTO GRID — ULTRA CREATIVE SHOWCASE ══════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `radial-gradient(ellipse at 30% 20%, ${BRAND.mid}10 0%, transparent 50%)`,
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <MorphingBlob color={BRAND.mid} />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand-mid/20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
              {t("bento.heading_before")}{" "}
              <span className="text-gradient">{t("bento.title_highlight")}</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              امکانات قدرتمند که کسب‌وکار شما را متحول می‌کند
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-5 auto-rows-[minmax(180px,auto)]">
            
            {/* ══════════ MAIN DASHBOARD CARD (2x2) ══════════ */}
            <motion.div
              className="md:col-span-2 md:row-span-2 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <TiltCard className="h-full">
                <motion.div
                  className="h-full rounded-3xl p-8 relative overflow-hidden group cursor-default"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.deep} 0%, ${BRAND.mid} 40%, ${BRAND.light} 70%, ${BRAND.pale} 100%)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Animated layers */}
                  <FloatingParticles count={15} />
                  <WaveLines />
                  <PulsingRings />
                  <OrbitingIcons />
                  
                  {/* Content */}
                  <div className="relative z-10" style={{ transform: "translateZ(40px)", direction: dir }}>
                    <GlowingIcon>
                      <motion.div
                        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {bentoFeatures[0].icon}
                      </motion.div>
                    </GlowingIcon>
                    
                    <h3 className="text-2xl md:text-3xl font-black text-white mt-6 mb-3" style={{ direction: dir }}>
                      {bentoFeatures[0].title}
                    </h3>
                    <p className="text-white/80 text-base leading-relaxed max-w-md" style={{ direction: dir }}>
                      {bentoFeatures[0].desc}
                    </p>
                    
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <GlowingCounter value={47} suffix="%" label="رشد" />
                      <GlowingCounter value={5000} suffix="+" label="کاربر" />
                      <GlowingCounter value={99} suffix="%" label="رضایت" />
                    </div>
                    
                    <AnimatedBarChart />
                  </div>

                  {/* Decorative elements - RTL aware */}
                  <motion.div
                    className={`absolute top-6 ${isRtl ? "left-6" : "right-6"} w-16 h-16 border border-white/20 rounded-2xl`}
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className={`absolute bottom-6 ${isRtl ? "right-6" : "left-6"} w-10 h-10 border border-white/15 rounded-full`}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  {/* Corner accent - RTL aware */}
                  <div className={`absolute top-0 ${isRtl ? "left-0 rounded-br-full" : "right-0 rounded-bl-full"} w-32 h-32 bg-white/5`} />
                </motion.div>
              </TiltCard>
            </motion.div>

            {/* ══════════ INVOICE CARD ══════════ */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="h-full rounded-3xl p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-yellow-950/30 border border-amber-100/50 dark:border-amber-900/30 relative overflow-hidden group cursor-default"
                whileHover={{ y: -6, scale: 1.02 }}
                onHoverStart={() => setHoveredIndex(1)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <MorphingBlob color="#F59E0B" />
                
                <div className="relative z-10" style={{ direction: dir }}>
                  <GlowingIcon color="amber">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      {bentoFeatures[1].icon}
                    </motion.div>
                  </GlowingIcon>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2" style={{ direction: dir }}>
                    {bentoFeatures[1].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed" style={{ direction: dir }}>
                    {bentoFeatures[1].desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <FeatureTag text="فوری" delay={0.3} />
                    <FeatureTag text="PDF" delay={0.4} />
                    <FeatureTag text="چند زبانه" delay={0.5} />
                  </div>
                </div>

                {/* Floating badge - RTL aware */}
                <motion.div
                  className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} px-3 py-1.5 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-400/30`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">سریع</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ══════════ BACKUP CARD ══════════ */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="h-full rounded-3xl p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 border border-emerald-100/50 dark:border-emerald-900/30 relative overflow-hidden group cursor-default"
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <MorphingBlob color="#10B981" />
                
                <div className="relative z-10" style={{ direction: dir }}>
                  <GlowingIcon color="emerald">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {bentoFeatures[2].icon}
                    </motion.div>
                  </GlowingIcon>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2" style={{ direction: dir }}>
                    {bentoFeatures[2].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed" style={{ direction: dir }}>
                    {bentoFeatures[2].desc}
                  </p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">پشتیبان‌گیری</span>
                      <span className="text-emerald-600 font-medium">روزانه</span>
                    </div>
                    <AnimatedProgress value={100} color="emerald-400" />
                  </div>
                </div>

                {/* Animated shield - RTL aware */}
                <motion.div
                  className={`absolute bottom-4 ${isRtl ? "left-4" : "right-4"}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-500/50" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ══════════ LOCAL SUPPORT CARD ══════════ */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="h-full rounded-3xl p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-violet-950/30 border border-blue-100/50 dark:border-blue-900/30 relative overflow-hidden group cursor-default"
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <MorphingBlob color="#3B82F6" />
                
                <div className="relative z-10" style={{ direction: dir }}>
                  <GlowingIcon color="blue">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      {bentoFeatures[3].icon}
                    </motion.div>
                  </GlowingIcon>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2" style={{ direction: dir }}>
                    {bentoFeatures[3].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed" style={{ direction: dir }}>
                    {bentoFeatures[3].desc}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex -space-x-2 space-x-reverse">
                      {["ک", "ه", "م", "ب"].map((letter, i) => (
                        <motion.div
                          key={i}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white dark:border-gray-800"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          {letter}
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">پشتیبانی محلی</span>
                  </div>
                </div>

                {/* Rotating globe - RTL aware */}
                <motion.div
                  className={`absolute bottom-4 ${isRtl ? "left-4" : "right-4"}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-12 h-12 border-2 border-blue-300/30 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border border-blue-300/20 rounded-full" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ══════════ SOLAR CALENDAR CARD ══════════ */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className="h-full rounded-3xl p-6 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 dark:from-purple-950/30 dark:via-fuchsia-950/30 dark:to-pink-950/30 border border-purple-100/50 dark:border-purple-900/30 relative overflow-hidden group cursor-default"
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <MorphingBlob color="#A855F7" />
                
                <div className="relative z-10" style={{ direction: dir }}>
                  <GlowingIcon color="purple">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {bentoFeatures[4].icon}
                    </motion.div>
                  </GlowingIcon>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2" style={{ direction: dir }}>
                    {bentoFeatures[4].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed" style={{ direction: dir }}>
                    {bentoFeatures[4].desc}
                  </p>
                </div>

                {/* Calendar display - RTL aware */}
                <motion.div
                  className={`absolute bottom-4 ${isRtl ? "left-4" : "right-4"} bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-purple-100 dark:border-purple-900/50`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center">
                    <p className="text-2xl font-black text-purple-600 dark:text-purple-400">۱۴۰۴</p>
                    <p className="text-xs text-purple-500 dark:text-purple-500">فروردین</p>
                    <div className="flex gap-1 mt-2 justify-center">
                      {[1, 2, 3, 4, 5].map((d) => (
                        <div
                          key={d}
                          className={`w-5 h-5 rounded text-[8px] flex items-center justify-center ${
                            d === 3 ? "bg-purple-500 text-white" : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                          }`}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
