"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/animation-components";
import { Heart, Star } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: {
    name: string;
    role: string;
    text: string;
    rating: number;
    city: string;
  }[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { t } = useI18n();

  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <Badge className="mb-4 bg-brand-surface dark:bg-gray-800 text-brand-deep dark:text-brand-light border-brand-pale dark:border-brand-mid/30 px-4 py-2 rounded-full text-sm font-medium">
            <Heart className="w-4 h-4 ml-1" />
            {t("testimonials.badge")}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
            {t("testimonials.title_before")}{" "}
            <span className="text-gradient">{t("testimonials.title_highlight")}</span>
          </h2>
        </FadeIn>

        {/* Creative grid: 2 large + 4 small */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Large card */}
          <FadeIn className="md:col-span-2 md:row-span-2">
            <motion.div
              className="gradient-brand rounded-3xl p-8 md:p-10 h-full text-white relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-300 text-amber-300" />
                  ))}
                </div>
                <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-8 text-white/95">
                  &ldquo;{testimonials[0].text}&rdquo;
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-xl font-black backdrop-blur-sm">
                    {testimonials[0].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{testimonials[0].name}</p>
                    <p className="text-white/50 text-sm">{testimonials[0].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Small cards */}
          {testimonials.slice(1).map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 h-full hover:shadow-xl hover:shadow-brand-deep/5 transition-all duration-500 group"
                whileHover={{ y: -3 }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-gray-50 dark:border-gray-700/50 pt-3">
                  <div className="w-9 h-9 gradient-brand rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{t.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
