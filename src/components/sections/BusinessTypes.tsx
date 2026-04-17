"use client";

import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animation-components";
import {
  Store,
  Truck,
  Building2,
  Receipt,
  FileText,
  Users,
} from "lucide-react";

export default function BusinessTypes() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-28 gradient-brand-soft relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
            {t("biz.title")}
          </h2>
        </FadeIn>

        <StaggerContainer className="flex flex-wrap justify-center gap-4" stagger={0.06}>
          {[
            { icon: <Store />, label: t("biz.stores") },
            { icon: <Truck />, label: t("biz.transport") },
            { icon: <Building2 />, label: t("biz.trade") },
            { icon: <Receipt />, label: t("biz.restaurants") },
            { icon: <FileText />, label: t("biz.education") },
            { icon: <Users />, label: t("biz.clinics") },
          ].map((biz, i) => (
            <StaggerItem key={i}>
              <motion.div
                className="bg-white dark:bg-gray-800/50 rounded-2xl px-6 py-5 flex items-center gap-4 border border-white/50 dark:border-gray-700/30 cursor-default"
                whileHover={{ y: -4, scale: 1.03, shadow: "0 20px 40px rgba(0,71,171,0.1)" }}
              >
                <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white shadow-md shadow-brand-mid/20">
                  {biz.icon}
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{biz.label}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
