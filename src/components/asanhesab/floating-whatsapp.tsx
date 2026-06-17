"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { useT } from "./i18n/language-context";

/**
 * FloatingWhatsApp — sticky bottom-right WhatsApp support button.
 *
 * Features:
 *  - Appears after scrolling past hero
 *  - Expandable preview card with support promise
 *  - Pulse halo to draw attention
 *  - Dismissible (reappears after 60s)
 *  - Mobile: positioned above sticky CTA bar
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const t = useT();

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  // Re-show after 60s if dismissed
  useEffect(() => {
    if (!dismissed) return;
    const id = setTimeout(() => setDismissed(false), 60000);
    return () => clearTimeout(id);
  }, [dismissed]);

  // Auto-expand after 4s of being visible (once per session)
  useEffect(() => {
    if (!visible || dismissed) return;
    const id = setTimeout(() => setExpanded(true), 4000);
    return () => clearTimeout(id);
  }, [visible, dismissed]);

  if (!visible) return null;

  return (
    <div
      dir="rtl"
      className={`fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Expanded preview card */}
      {expanded && !dismissed && (
        <div className="absolute bottom-16 left-0 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-premium-lg p-4 animate-soft-fade-up">
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Close"
            className="absolute top-2 left-2 h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="flex items-start gap-3">
            <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-premium">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{t.premium.floatingWhatsapp}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {t.premium.floatingWhatsappSub}
              </p>
              <a
                href="https://wa.me/937000000000"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 px-3 py-2 text-xs font-bold text-white hover:shadow-emerald-500/30 transition-all"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                {t.faq.contactCta}
              </a>
            </div>
          </div>
          {/* Tail */}
          <div className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-white dark:bg-slate-900 border-l border-b border-slate-200 dark:border-slate-700" />
        </div>
      )}

      {/* Main button */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-label={t.premium.floatingWhatsapp}
        className="relative group inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-premium-lg glow-emerald hover:scale-110 transition-all duration-300"
      >
        {/* Pulse halo */}
        <span aria-hidden className="absolute inset-0 rounded-full bg-emerald-400 animate-ping-soft opacity-50" />
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7 relative" />
        {/* Notification dot */}
        <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
      </button>
    </div>
  );
}
