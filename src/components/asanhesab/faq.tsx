"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./whatsapp-icon";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * FAQ — accordion with 8 common objections answered.
 *
 * Polish pass:
 *  - Removed SectionHeading eyebrow; inline heading with solid violet highlight.
 *  - Persian digit numbered bubbles removed — FAQ items are not a sequence;
 *    ordering carries no information. Numbers were scaffolding by reflex, not
 *    voice. Open/closed state + question text provide sufficient differentiation.
 *    The open item now uses a filled blue dot as a minimal visual anchor.
 *  - Answer indent: arbitrary pr-[3.75rem] removed (was offsetting under the
 *    now-removed number bubble). Padding unified to ps-5 pe-14 for clean text
 *    alignment under the question.
 *  - FAQ list wrapped in <ul>/<li> for proper list semantics.
 *  - Contact callout: bg-gradient-to-br → bg-linear-to-br (Tailwind v4).
 *  - Contact CTA: href fixed from .exe download → WhatsApp link (was a
 *    functional bug — label says واتساپ, href was GitHub release).
 *  - CTA: focus-visible ring + active:scale-[0.98] added.
 *  - dir from language context.
 *  - Unused HelpCircle, SectionHeading imports removed.
 */
export function FAQ() {
  const t = useT();
  const { dir } = useLanguage();

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

  return (
    <section
      id="faq"
      dir={dir}
      className="relative bg-white dark:bg-slate-950 py-20 sm:py-28"
      aria-labelledby="faq-headline"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Inline heading — avoids SectionHeading gradient-text default */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Reveal>
            <h2
              id="faq-headline"
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {t.faq.title}{" "}
              <span className="text-violet-700 dark:text-violet-400">{t.faq.highlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {t.faq.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Accordion list */}
        <ul className="mt-10 sm:mt-12 space-y-3" role="list">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            const panelId = `faq-panel-${i}`;

            return (
              <Reveal key={i} as="li" delay={i * 40}>
                <div
                  className={[
                    "rounded-2xl border bg-white dark:bg-slate-900 transition-all duration-300",
                    isOpen
                      ? "border-blue-200 dark:border-blue-700 shadow-premium"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600",
                  ].join(" ")}
                >
                  {/* Trigger */}
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-4 p-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded-2xl"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      {/*
                       * Replaced Persian digit bubble (numbered scaffolding by
                       * reflex — FAQ order carries no information) with a minimal
                       * open/closed dot indicator.
                       */}
                      <span
                        className={[
                          "inline-flex h-2 w-2 shrink-0 rounded-full transition-colors duration-300",
                          isOpen ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600",
                        ].join(" ")}
                        aria-hidden
                      />
                      <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white text-start">
                        {faq.q}
                      </span>
                    </span>

                    <ChevronDown
                      className={[
                        "h-5 w-5 shrink-0 transition-all duration-300",
                        isOpen
                          ? "rotate-180 text-blue-600 dark:text-blue-400"
                          : "text-slate-400 dark:text-slate-500",
                      ].join(" ")}
                      aria-hidden
                    />
                  </button>

                  {/* Panel — CSS grid height animation; no layout property abuse */}
                  <div
                    id={panelId}
                    role="region"
                    className={[
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="ps-5 pe-14 pb-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
                        style={{ textWrap: "pretty" } as React.CSSProperties}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        {/* Contact callout */}
        <Reveal delay={200}>
          <div className="mt-10 rounded-2xl bg-linear-to-br from-blue-50 to-emerald-50/40 dark:from-blue-950/30 dark:to-emerald-950/20 border border-blue-100 dark:border-blue-900/50 p-6 text-center">
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium">
              {t.faq.contactPrompt}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.faq.contactBody}
            </p>
            {/*
             * href fixed: was GitHub .exe download, now WhatsApp link.
             * Label explicitly says "سوال خود را در واتساپ بپرسید".
             * Replace 93700000000 with the actual WhatsApp number.
             */}
            <a
              href="https://wa.me/93700000000"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-premium hover:shadow-[0_0_32px_-6px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <WhatsAppIcon className="h-4 w-4" aria-hidden />
              {t.faq.contactCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
