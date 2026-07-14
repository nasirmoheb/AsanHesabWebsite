"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { AsanHesabLogo } from "./logo";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * Footer — clean utility footer with brand, links, contact, copyright.
 */
export function Footer() {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <footer
      id="contact"
      className="relative mt-auto bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5" aria-label={t.brand.name}>
              <AsanHesabLogo size={40} />
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">{t.brand.name}</span>
            </a>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              {t.footer.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://wa.me/937000000000"
                aria-label="WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href="tel:+937000000000"
                aria-label={t.footer.colContact}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@asanhesab.af"
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <nav aria-label={t.footer.colProduct}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.footer.colProduct}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: t.footer.linkFeatures, href: "#features" },
                { label: t.footer.linkHow, href: "#how" },
                { label: t.footer.linkAudiences, href: "#audiences" },
                { label: t.footer.linkPricing, href: "#pricing" },
                { label: t.footer.linkFaq, href: "#faq" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.footer.colContact}</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{t.footer.contactLocation}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span dir="ltr">{formatNumber("+93 70 000 0000")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span dir="ltr">hello@asanhesab.af</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="h-4 w-4 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.footer.contactSupport}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Patriotic + copyright */}
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-center text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
            {t.footer.patriotic}
          </p>
          <p className="mt-3 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
