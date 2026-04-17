"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/animation-components";
import {
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";

export default function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <Badge className="mb-4 bg-brand-surface dark:bg-gray-800 text-brand-deep dark:text-brand-light border-brand-pale dark:border-brand-mid/30 px-4 py-2 rounded-full text-sm font-medium">
            {t("how.badge")}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
            {t("how.title")}
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 right-1/2 translate-x-1/2 w-px bg-gradient-to-b from-brand-pale via-brand-mid to-brand-pale hidden md:block" />

          {[
            {
              step: t("how.step1_num"),
              title: t("how.step1_title"),
              desc: t("how.step1_desc"),
              icon: <Users />,
            },
            {
              step: t("how.step2_num"),
              title: t("how.step2_title"),
              desc: t("how.step2_desc"),
              icon: <Building2 />,
            },
            {
              step: t("how.step3_num"),
              title: t("how.step3_title"),
              desc: t("how.step3_desc"),
              icon: <TrendingUp />,
            },
          ].map((item, i) => (
            <FadeIn
              key={i}
              delay={i * 0.2}
              direction={i % 2 === 0 ? "right" : "left"}
              className={`mb-12 last:mb-0 md:flex items-center ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 md:px-8">
                <motion.div
                  className={`bg-white dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-brand-deep/5 transition-all duration-500 ${
                    i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  } max-w-sm`}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-brand-mid/20">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </div>

              {/* Center node */}
              <div className="hidden md:flex md:w-0 justify-center relative z-10">
                <motion.div
                  className="w-14 h-14 gradient-brand rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl shadow-brand-mid/30"
                  whileHover={{ scale: 1.2 }}
                >
                  {item.step}
                </motion.div>
                {/* Pulse ring */}
                <motion.div
                  className="absolute w-14 h-14 gradient-brand rounded-full opacity-30"
                  animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="md:w-1/2" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
