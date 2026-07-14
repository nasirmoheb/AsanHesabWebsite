"use client";

import { useState, useEffect } from "react";
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


  if (!visible) return null;

  return (
    <div
      dir="rtl"
      className={`fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Main button — direct WhatsApp link */}
      <a
        href="https://wa.me/93799422717"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.premium.floatingWhatsapp}
        className="relative group inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-premium-lg glow-emerald hover:scale-110 transition-all duration-300"
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7 relative" />
        {/* Notification dot */}
        <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
      </a>
    </div>
  );
}
