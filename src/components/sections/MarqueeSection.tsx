"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import {
  Shield,
  WifiOff,
  Globe,
  CalendarDays,
  Zap,
  Lock,
  Monitor,
  Database,
} from "lucide-react";

interface MarqueeSectionProps {
  stats: { value: number; suffix: string; label: string }[];
}

export default function MarqueeSection({ stats }: MarqueeSectionProps) {
  const { t } = useI18n();

  return (
    <section className="relative py-4 md:py-5 overflow-hidden bg-white dark:bg-gray-950">
      {/* Fade edges */}
      <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

      {/* Row 1 — Stats scrolling right-to-left */}
      <div className="relative">
        <div className="flex" style={{ animation: "marquee 35s linear infinite", width: "max-content" }}>
          {[...stats, ...stats, ...stats, ...stats, ...stats].map((s, i) => (
            <div key={`r1-${i}`} className="flex items-center gap-2.5 px-5 md:px-10">
              <div className="flex items-center gap-2 bg-brand-surface/50 rounded-full pl-3 pr-4 md:pl-4 md:pr-5 py-1.5 md:py-2 border border-brand-pale/30">
                <span className="text-lg md:text-2xl font-black text-brand-deep tabular-nums">
                  {s.value.toLocaleString("fa-AF")}{s.suffix}
                </span>
                <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap">
                  {s.label}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-mid/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — Trust keywords scrolling left-to-right */}
      <div className="relative mt-2">
        <div className="flex" style={{ animation: "marquee-reverse 28s linear infinite", width: "max-content" }}>
          {(() => {
            const trustItems = [
              { icon: <Shield className="w-3 h-3 md:w-3.5 md:h-3.5" />, text: t("marquee.secure") },
              { icon: <WifiOff className="w-3 h-3 md:w-3.5 md:h-3.5" />, text: t("marquee.no_internet") },
              { icon: <Globe className="w-3 h-3 md:w-3.5 md:h-3.5" />, text: t("marquee.dari") },
              { icon: <CalendarDays className="w-3 h-3 md:w-3.5 md:h-3.5" />, text: t("marquee.solar") },
              { icon: <Zap className="w-3 h-3 md:w-3.5 md:h-3.5" />, text: t("marquee.fast") },
              { icon: <Lock className="w-3 h-3 md:w-3.5 md:h-3.5" />, text: t("marquee.data_protection") },
              { icon: <Monitor className="w-3 h-3 md:w-3.5 md:h-3.5" />, text: t("marquee.desktop") },
              { icon: <Database className="w-3 h-3 md:w-3.5 md:h-3.5" />, text: t("marquee.offline_storage") },
            ];
            return [...trustItems, ...trustItems, ...trustItems, ...trustItems, ...trustItems].map((item, i) => (
              <div key={`r2-${i}`} className="flex items-center gap-4 md:gap-6 px-5 md:px-10">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-brand-surface/60 flex items-center justify-center text-brand-mid">
                    {item.icon}
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap">{item.text}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-brand-pale" />
              </div>
            ));
          })()}
        </div>
      </div>
    </section>
  );
}
