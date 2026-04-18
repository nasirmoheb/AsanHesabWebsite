"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animation-components";
import { Award } from "lucide-react";

interface FeaturesSectionProps {
  features: { icon: React.ReactNode; title: string; desc: string }[];
  bentoFeatures: { span: string; icon: React.ReactNode; title: string; desc: string; gradient: boolean }[];
}

export default function FeaturesSection({ features, bentoFeatures }: FeaturesSectionProps) {
  const { t, dir } = useI18n();

  return (
    <>
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
                  className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 dark:border-gray-700/30 h-full hover:shadow-2xl hover:shadow-brand-deep/10 transition-all duration-500 group cursor-default"
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <motion.div
                    className="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-brand-mid/20"
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {f.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2" style={{ direction: dir }}>{f.title}</h3>
                  <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed" style={{ direction: dir }}>{f.desc}</p>
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
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
              {t("bento.heading_before")}{" "}
              <span className="text-gradient">{t("bento.title_highlight")}</span>
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-5 auto-rows-[minmax(180px,auto)]" stagger={0.1}>
            {bentoFeatures.map((f, i) => (
              <StaggerItem key={i} className={f.span}>
                <motion.div
                  className={`rounded-3xl p-8 h-full flex flex-col justify-between relative overflow-hidden group cursor-default transition-all duration-500 ${
                    f.gradient
                      ? "gradient-brand text-white"
                      : "bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 hover:border-brand-pale hover:shadow-xl hover:shadow-brand-deep/5"
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
                        f.gradient ? "bg-white/20" : "bg-brand-surface dark:bg-gray-800 text-brand-deep dark:text-brand-light"
                      }`}
                    >
                      {f.icon}
                    </div>
                    <h3
                      className={`text-xl font-bold mb-3 ${
                        f.gradient ? "text-white" : "text-gray-900 dark:text-white"
                      }`}
                      style={{ direction: dir }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        f.gradient ? "text-white/80" : "text-gray-400 dark:text-gray-300"
                      }`}
                      style={{ direction: dir }}
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
    </>
  );
}
