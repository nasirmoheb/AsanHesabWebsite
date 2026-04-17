"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/animation-components";

export default function DashboardShowcase() {
  const { t } = useI18n();

  return (
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
            {t("dashboard.title")}
          </h2>
          <p className="text-brand-light/60 text-lg max-w-2xl mx-auto">
            {t("dashboard.desc")}
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
              t("dashboard.pill1"),
              t("dashboard.pill2"),
              t("dashboard.pill3"),
              t("dashboard.pill4"),
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
  );
}
