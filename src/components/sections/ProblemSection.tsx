"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { FadeIn, StaggerContainer, StaggerItem, GlowOrb } from "@/components/ui/animation-components";
import {
  FileText,
  Globe,
  PieChart,
  Clock,
  Receipt,
  Shield,
} from "lucide-react";

export default function ProblemSection() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <GlowOrb color="#007FFF" size="400px" top="-100px" left="-100px" />
      <GlowOrb color="#0047AB" size="300px" bottom="-50px" right="-50px" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <Badge className="mb-4 bg-red-50 dark:bg-red-950 text-red-500 dark:text-red-400 border-red-200/60 dark:border-red-800/40 px-4 py-2 rounded-full text-sm font-medium">
            {t("problem.badge")}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
            {t("problem.title_before")}
            <span className="text-red-500"> {t("problem.title_highlight")}</span> {t("problem.title_after")}
          </h2>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {[
            { icon: <FileText />, problem: t("problem.paper"), desc: t("problem.paper_desc") },
            { icon: <Globe />, problem: t("problem.english_sw"), desc: t("problem.english_sw_desc") },
            { icon: <PieChart />, problem: t("problem.opacity"), desc: t("problem.opacity_desc") },
            { icon: <Clock />, problem: t("problem.time_waste"), desc: t("problem.time_waste_desc") },
            { icon: <Receipt />, problem: t("problem.unprofessional"), desc: t("problem.unprofessional_desc") },
            { icon: <Shield />, problem: t("problem.data_loss"), desc: t("problem.data_loss_desc") },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <motion.div
                className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 h-full hover:border-red-200 dark:hover:border-red-800/50 hover:shadow-xl hover:shadow-red-100/30 transition-all duration-500 group cursor-default"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.problem}
                </h3>
                <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
