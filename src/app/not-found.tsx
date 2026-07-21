"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useLanguage, useT } from "@/components/asanhesab/i18n/language-context";

export default function NotFound() {
  const t = useT();
  const { dir } = useLanguage();
  const isRtl = dir === "rtl";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-soft-radial relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-soft pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        {/* Large 404 Display */}
        <h1 className="text-8xl sm:text-9xl font-black text-slate-200 dark:text-slate-800 tracking-tighter select-none num-fa">
          {t.notFound.title}
        </h1>

        {/* Floating Accent Graphic (Subtle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" aria-hidden />

        {/* Content */}
        <div className="relative mt-8 sm:mt-12 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            {t.notFound.heading}
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {t.notFound.description}
          </p>

          <div className="pt-8 flex justify-center">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm sm:text-base font-medium text-primary-foreground shadow-premium transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background min-h-11"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span className="whitespace-nowrap">{t.notFound.backHome}</span>
              {isRtl ? (
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
              ) : (
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
