"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Footer — clean utility footer with brand, links, contact, copyright.
 * The final conversion CTA lives in <FinalCTA /> above the footer.
 */
export function Footer() {
  return (
    <footer
      dir="rtl"
      id="contact"
      className="relative mt-auto bg-white border-t border-slate-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5" aria-label="آسان حساب">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-extrabold text-lg shadow-premium">
                A
              </span>
              <span className="text-lg font-extrabold text-slate-900">آسان حساب</span>
            </a>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-md">
              سیستم حسابداری و فروشگاهی مدرن، آفلاین و قابل اطمینان — ساخته شده
              ویژه دکانداران، عمده‌فروشان و داروخانه‌های افغانستان.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://wa.me/937000000000"
                aria-label="واتساپ"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href="tel:+937000000000"
                aria-label="تلفن"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@asanhesab.af"
                aria-label="ایمیل"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links column 1 */}
          <nav aria-label="محصول">
            <h3 className="text-sm font-bold text-slate-900">محصول</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: "امکانات", href: "#features" },
                { label: "چگونه کار می‌کند", href: "#how" },
                { label: "برای چه کسی", href: "#audiences" },
                { label: "قیمت‌گذاری", href: "#pricing" },
                { label: "سوالات متداول", href: "#faq" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-slate-600 hover:text-blue-700 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">تماس</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" />
                <span>کابل، افغانستان</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" />
                <span dir="ltr" className="num-fa">+93 70 000 0000</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-blue-600 shrink-0" />
                <span dir="ltr">hello@asanhesab.af</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="h-4 w-4 mt-0.5 text-emerald-600 shrink-0" />
                <span>پشتیبانی واتساپ · ۸ صبح تا ۱۰ شب</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Patriotic message + copyright */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-center text-sm sm:text-base font-semibold text-slate-700">
            تجارت شما ارزش پیشرفت را دارد. با افتخار ساخته شده در افغانستان{" "}
            <span aria-label="پرچم افغانستان">🇦🇫</span>
          </p>
          <p className="mt-3 text-center text-xs sm:text-sm text-slate-500 num-fa">
            © ۱۴۰۵ دانا سیستم. تمام حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
