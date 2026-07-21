"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Download } from "lucide-react";
import { useT } from "./i18n/language-context";

/**
 * FloatingActions — combines:
 *  - Back-to-top button (appears after scrolling past 2 viewports)
 *  - Mobile-only sticky bottom CTA bar (always visible on mobile after hero)
 *
 * Desktop: only back-to-top button (bottom-right)
 * Mobile: sticky bottom bar + back-to-top above it
 */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);
  const t = useT();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowTop(y > window.innerHeight * 1.5);
      setShowMobileBar(y > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      
      {/* Mobile sticky bottom CTA bar */}
      <div
        dir="rtl"
        className={`sm:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
          showMobileBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 py-3 shadow-premium-lg">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {t.premium.mobileCta}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {t.premium.mobileCtaSub}
              </p>
            </div>
            <a
              href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-premium glow-blue shrink-0"
            >
              <Download className="h-4 w-4" />
              {t.premium.mobileCta}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
