"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Footer — clean, minimal, with patriotic message + copyright.
 */
export function Footer() {
  return (
    <footer
      dir="rtl"
      id="contact"
      className="relative mt-auto bg-white border-t border-slate-100"
    >
      {/* Top CTA band */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-700 to-blue-800 p-8 sm:p-12 text-center shadow-premium-lg">
          {/* Decorative pattern */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0, transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0, transparent 40%)",
            }}
          />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              آماده‌اید تجارت خود را مدرن کنید؟
            </h2>
            <p className="mt-3 text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
              همین حالا نسخه رایگان آسان حساب را دریافت کنید و در ۵ دقیقه شروع کنید.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-bold text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>دریافت نسخه رایگان</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-base font-bold text-white hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>صحبت با تیم پشتیبانی</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
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
                href="#"
                aria-label="واتساپ"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="تلفن"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="#"
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
                { label: "قیمت‌گذاری", href: "#pricing" },
                { label: "دانلود رایگان", href: "#download" },
                { label: "ویدیوی آموزشی", href: "#video" },
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
