"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./whatsapp-icon";
import { useT } from "./i18n/language-context";

/**
 * FAQ — accordion with 8 common objections answered.
 */
export function FAQ() {
  const t = useT();

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
    { q: t.faq.q7, a: t.faq.a7 },
    { q: t.faq.q8, a: t.faq.a8 },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const persianDigits = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸"];

  return (
    <section
      id="faq"
      className="relative bg-white dark:bg-slate-950 py-20 sm:py-28"
      aria-labelledby="faq-headline"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          eyebrowIcon={HelpCircle}
          title={t.faq.title}
          highlight={t.faq.highlight}
          subtitle={t.faq.subtitle}
          tone="violet"
        />

        <div className="mt-10 sm:mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={i} delay={i * 40}>
                <div
                  className={`rounded-2xl border bg-white dark:bg-slate-900 transition-all duration-300 ${
                    isOpen
                      ? "border-blue-200 dark:border-blue-700 shadow-premium"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 p-5 text-right"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span
                        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          isOpen
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {persianDigits[i]}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {faq.q}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pr-[3.75rem] text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50/40 dark:from-blue-950/30 dark:to-emerald-950/20 border border-blue-100 dark:border-blue-900/50 p-6 text-center">
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium">
              {t.faq.contactPrompt}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.faq.contactBody}
            </p>
            <a
              href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-premium hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.faq.contactCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
