"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import {
  Download,
  Info,
  ShieldCheck,
  CircleAlert,
  MonitorPlay,
} from "lucide-react";
import { useLanguage, useT } from "./i18n/language-context";
import { WhatsAppIcon } from "./whatsapp-icon";
import { AsanHesabLogo } from "./logo";
import { InstallGuideDemo, startInstallerDownload } from "./install-guide-demo";
import { INSTALLER_URL, INSTALLER_FILE_NAME } from "@/lib/installer";

const WHATSAPP_URL = "https://wa.me/93799422717";

export function InstallGuideContent() {
  const t = useT();
  const g = t.guide;
  const { formatNumber } = useLanguage();
  const downloadStartedRef = useRef(false);

  useEffect(() => {
    if (downloadStartedRef.current) return;
    downloadStartedRef.current = true;
    const id = window.setTimeout(() => startInstallerDownload(), 500);
    return () => window.clearTimeout(id);
  }, []);

  const stepBadges = [1, 2, 3, 4].map(
    (n) => `${g.stepWord} ${formatNumber(n)}`
  ) as [string, string, string, string];
  const stepTexts = [
    g.step1Text,
    g.step2Text,
    g.step3Text,
    g.step4Text,
  ] as [string, string, string, string];

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-background bg-soft-radial pt-24 pb-20 sm:pt-28">
        <div className="absolute inset-0 bg-grid-soft pointer-events-none" aria-hidden />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <AsanHesabLogo size={72} className="rounded-3xl" />

            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/40 px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
              {g.badge}
            </span>

            <h1 className="mt-6 mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug text-balance">
              {g.title}
            </h1>

            <p className="mt-5 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed text-pretty">
              {g.subtitle}
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/30 px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/60">
              <Download className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-bounce" aria-hidden />
            </div>
            <div className="flex-1 text-center sm:text-start">
              <p className="text-sm sm:text-base font-bold text-emerald-900 dark:text-emerald-200 num-ltr" dir="auto">
                {INSTALLER_FILE_NAME}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                {g.downloadStartedDesc}
              </p>
            </div>
            <a
              href={INSTALLER_URL}
              onClick={() =>
                track("download", {
                  file: INSTALLER_FILE_NAME,
                  platform: "windows",
                })
              }
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-premium transition-[transform,box-shadow,background-color] duration-200 ease-out hover:bg-primary/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 min-h-11"
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              {g.downloadAgain}
            </a>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-premium-lg">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <p className="flex min-w-0 items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                <MonitorPlay className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="truncate">{g.demoCaption}</span>
              </p>
            </div>
            <div className="bg-slate-950 p-3 sm:p-6">
              <InstallGuideDemo stepBadges={stepBadges} stepTexts={stepTexts} />
            </div>
          </div>

          <section className="mt-14" aria-labelledby="guide-steps-title">
            <h2
              id="guide-steps-title"
              className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
            >
              {g.stepsTitle}
            </h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {stepTexts.map((text, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 px-5 py-4 transition-shadow duration-200 hover:shadow-premium"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground num-fa">
                    {formatNumber(i + 1)}
                  </span>
                  <span className="pt-1 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                    {text}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/30 px-5 py-5">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden />
                <h3 className="text-base font-bold text-blue-900 dark:text-blue-200">{g.noteTitle}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-blue-800 dark:text-blue-300">
                {g.noteDesc}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/50 bg-white dark:bg-slate-900/70 px-5 py-5 flex flex-col shadow-premium">
              <div className="flex items-center gap-2">
                <CircleAlert className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{g.helpTitle}</h3>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {g.helpDesc}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 min-h-11"
              >
                <WhatsAppIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
                {g.helpCta}
              </a>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
