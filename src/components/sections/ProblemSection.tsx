"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import {
  FileText,
  Globe,
  PieChart,
  Clock,
  Receipt,
  Shield,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ProblemSection() {
  const { t, dir } = useI18n();
  const [activeCard, setActiveCard] = useState(0);

  // Auto-cycle through cards
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const problems = [
    {
      icon: FileText,
      problem: t("problem.paper"),
      desc: t("problem.paper_desc"),
      gradient: "from-brand-deep to-brand-mid",
      bgLight: "bg-brand-surface/50",
      bgDark: "dark:bg-brand-deep/10",
      borderColor: "border-brand-pale/40 dark:border-brand-mid/20",
      glowColor: "rgba(0, 71, 171, 0.15)",
    },
    {
      icon: Globe,
      problem: t("problem.english_sw"),
      desc: t("problem.english_sw_desc"),
      gradient: "from-brand-mid to-brand-light",
      bgLight: "bg-brand-surface/50",
      bgDark: "dark:bg-brand-deep/10",
      borderColor: "border-brand-pale/40 dark:border-brand-mid/20",
      glowColor: "rgba(0, 127, 255, 0.15)",
    },
    {
      icon: PieChart,
      problem: t("problem.opacity"),
      desc: t("problem.opacity_desc"),
      gradient: "from-brand-light to-brand-pale",
      bgLight: "bg-brand-surface/50",
      bgDark: "dark:bg-brand-deep/10",
      borderColor: "border-brand-pale/40 dark:border-brand-mid/20",
      glowColor: "rgba(93, 173, 226, 0.15)",
    },
    {
      icon: Clock,
      problem: t("problem.time_waste"),
      desc: t("problem.time_waste_desc"),
      gradient: "from-brand-deep to-brand-light",
      bgLight: "bg-brand-surface/50",
      bgDark: "dark:bg-brand-deep/10",
      borderColor: "border-brand-pale/40 dark:border-brand-mid/20",
      glowColor: "rgba(0, 71, 171, 0.15)",
    },
    {
      icon: Receipt,
      problem: t("problem.unprofessional"),
      desc: t("problem.unprofessional_desc"),
      gradient: "from-brand-mid to-brand-light",
      bgLight: "bg-brand-surface/50",
      bgDark: "dark:bg-brand-deep/10",
      borderColor: "border-brand-pale/40 dark:border-brand-mid/20",
      glowColor: "rgba(0, 127, 255, 0.15)",
    },
    {
      icon: Shield,
      problem: t("problem.data_loss"),
      desc: t("problem.data_loss_desc"),
      gradient: "from-brand-deep to-brand-mid",
      bgLight: "bg-brand-surface/50",
      bgDark: "dark:bg-brand-deep/10",
      borderColor: "border-brand-pale/40 dark:border-brand-mid/20",
      glowColor: "rgba(0, 71, 171, 0.15)",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-surface/30 to-white dark:from-gray-950 dark:via-brand-deep/5 dark:to-gray-950" />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-brand-mid/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-brand-pale/20 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Badge className="bg-brand-surface dark:bg-brand-deep/20 text-brand-deep dark:text-brand-light border border-brand-pale/60 dark:border-brand-mid/30 px-5 py-2 rounded-full text-sm font-semibold shadow-sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {t("problem.badge")}
            </Badge>
          </motion.div>

          {/* Main heading with creative animation */}
          <div className="relative">
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-gray-100 leading-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="inline-block"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {t("problem.title_before")}
              </motion.span>
              <motion.span
                className="inline-block relative mx-2"
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-deep via-brand-mid to-brand-light">
                  {t("problem.title_highlight")}
                </span>
                <motion.span
                  className="absolute -inset-2 bg-brand-pale/50 dark:bg-brand-mid/20 rounded-lg -rotate-1"
                  animate={{ rotate: [-1, 1, -1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.span>
              <motion.span
                className="inline-block"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {t("problem.title_after")}
              </motion.span>
            </motion.h2>

            {/* Decorative underline */}
            <motion.div
              className="mt-6 flex justify-center gap-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-1 rounded-full bg-gradient-to-r from-brand-deep to-brand-mid"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {problems.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeCard === i;

            return (
              <motion.div
                key={i}
                className="group relative"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setActiveCard(i)}
              >
                {/* Card */}
                <motion.div
                  className={`relative h-full rounded-3xl p-6 md:p-7 overflow-hidden transition-all duration-500 ${item.bgLight} ${item.bgDark} border ${item.borderColor}`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{
                    boxShadow: isActive
                      ? `0 20px 40px -10px ${item.glowColor}, 0 0 0 1px rgba(0, 127, 255, 0.1)`
                      : "0 4px 20px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {/* Animated background gradient on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Top accent bar */}
                  <motion.div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} rounded-t-3xl`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon container */}
                  <motion.div
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-7 h-7 md:w-8 md:h-8" />

                    {/* Pulse effect */}
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient}`}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      {item.problem}
                      <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={isActive ? { x: [0, 5, 0] } : {}}
                        transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                      >
                        <ArrowRight className="w-4 h-4 text-brand-mid rtl:rotate-180" />
                      </motion.span>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Corner decoration */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10 text-brand-mid"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon className="w-full h-full" />
                  </motion.div>

                  {/* Floating particles on hover */}
                  {isActive && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(3)].map((_, p) => (
                        <motion.div
                          key={p}
                          className={`absolute w-2 h-2 rounded-full bg-gradient-to-br ${item.gradient}`}
                          initial={{ x: "50%", y: "50%", opacity: 0 }}
                          animate={{
                            x: `${30 + p * 20}%`,
                            y: `${20 + p * 25}%`,
                            opacity: [0, 0.6, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: p * 0.3 }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Glow effect behind card */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-brand-surface/80 to-brand-pale/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-brand-pale/30 dark:border-gray-700/50 shadow-sm"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5 text-brand-mid" />
            <span className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300">
              آسان حساب راه حل شماست
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4 text-brand-mid rtl:rotate-180" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-mid/30 dark:via-brand-mid/20 to-transparent" />
    </section>
  );
}
