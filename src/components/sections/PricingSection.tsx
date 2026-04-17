"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/animation-components";
import { CheckCircle2 } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
}

export default function PricingSection({ pricingPlans }: PricingSectionProps) {
  const { t } = useI18n();

  return (
    <section id="pricing" className="py-20 md:py-28 gradient-brand-soft relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #0047AB 1px, transparent 1px)",
          backgroundSize: "25px 25px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <Badge className="mb-4 bg-white dark:bg-gray-800 text-brand-deep dark:text-brand-light border-brand-pale dark:border-brand-mid/30 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
            {t("pricing.badge")}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-gray-400 dark:text-gray-500 text-lg">
            {t("pricing.subtitle")}
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {pricingPlans.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <motion.div
                className={`relative rounded-3xl overflow-hidden ${
                  plan.popular ? "md:-mt-4 md:mb-4" : ""
                }`}
                whileHover={{ y: -6 }}
              >
                {plan.popular && (
                  <div className="gradient-brand text-white text-center py-2 text-sm font-bold">
                    {t("pricing.popular")}
                  </div>
                )}
                <div
                  className={`bg-white dark:bg-gray-800/60 p-8 border ${
                    plan.popular
                      ? "border-brand-mid/30 shadow-2xl shadow-brand-deep/10"
                      : "border-gray-100 dark:border-gray-700/50"
                  }`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">{plan.desc}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black text-gradient">{plan.price}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-brand-mid flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className={`w-full py-5 rounded-xl text-sm font-bold transition-all ${
                        plan.popular
                          ? "gradient-brand text-white border-0 shadow-lg shadow-brand-mid/25"
                          : "border-2 border-brand-pale dark:border-brand-mid/30 text-brand-deep dark:text-brand-light hover:bg-brand-surface dark:hover:bg-gray-700 hover:border-brand-mid"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
