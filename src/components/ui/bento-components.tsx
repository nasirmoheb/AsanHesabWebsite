"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { CheckCircle2, Receipt, CalendarDays, Shield, Globe } from "lucide-react";

const BRAND = {
  deep: "#0047AB",
  mid: "#007FFF",
  light: "#5DADE2",
  pale: "#D6EEFF",
};

/* ─── Gradient mesh background ─── */
export const GradientMesh = () => (
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
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

/* ─── Floating particles ─── */
export const FloatingParticles = ({ count = 20, color = "white" }: { count?: number; color?: string }) => (
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

/* ─── Animated SVG wave lines ─── */
export const WaveLines = () => (
  <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
    <motion.path
      d="M0 100 Q 50 50, 100 100 T 200 100 T 300 100 T 400 100"
      fill="none" stroke="white" strokeWidth="0.5"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
    />
    <motion.path
      d="M0 150 Q 75 100, 150 150 T 300 150 T 450 150"
      fill="none" stroke="white" strokeWidth="0.3"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: "loop" }}
    />
  </svg>
);

/* ─── 3D tilt card wrapper ─── */
export const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]);
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

/* ─── Animated counter with glow ─── */
export const GlowingCounter = ({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev >= value ? value : prev + 1);
    }, 30);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <motion.div className="relative" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
      <motion.div
        className="absolute inset-0 blur-xl bg-brand-mid/30 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="relative text-center">
        <p className="text-4xl font-black text-white">{count}{suffix}</p>
        <p className="text-xs text-white/60 mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

/* ─── Animated bar chart (bento version) ─── */
export const BentoBarChart = () => (
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

/* ─── Orbiting icons ─── */
export const OrbitingIcons = () => {
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
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear", delay: item.delay }}
          style={{ transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateX(120px)` }}
        >
          <motion.div
            className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear", delay: item.delay }}
          >
            <item.Icon className="w-4 h-4 text-white/60" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Pulsing rings ─── */
export const PulsingRings = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute w-32 h-32 border border-white/10 rounded-full"
        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
      />
    ))}
  </div>
);

/* ─── Morphing blob ─── */
export const MorphingBlob = ({ color = BRAND.mid }: { color?: string }) => (
  <motion.div
    className="absolute -z-10 opacity-20 blur-3xl"
    style={{ width: 300, height: 300, background: color, borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
    animate={{
      borderRadius: [
        "60% 40% 30% 70% / 60% 30% 70% 40%",
        "30% 60% 70% 40% / 50% 60% 30% 60%",
        "60% 40% 30% 70% / 60% 30% 70% 40%",
      ],
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360],
    }}
    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ─── Glowing icon wrapper ─── */
export const GlowingIcon = ({ children, color = "brand" }: { children: React.ReactNode; color?: string }) => {
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

/* ─── Animated progress bar ─── */
export const AnimatedProgress = ({ value, color = "white" }: { value: number; color?: string }) => (
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

/* ─── Mini stat card ─── */
export const MiniStat = ({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) => (
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

/* ─── Feature tag ─── */
export const FeatureTag = ({ text, delay = 0 }: { text: string; delay?: number }) => (
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
