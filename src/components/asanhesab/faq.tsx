"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * FAQ — accordion answering the most common objections.
 * Each item opens/closes with smooth height animation.
 */
export function FAQ() {
  const faqs = [
    {
      q: "آیا واقعاً بدون اینترنت کار می‌کند؟",
      a: "بله، ۱۰۰٪ آفلاین. آسان حساب روی کامپیوتر ویندوز شما نصب می‌شود و تمام داده‌ها محلی ذخیره می‌شوند. اینترنت قطع شود هم، می‌توانید فروش ثبت کنید، راپور بگیرید، و بل چاپ کنید. اینترنت فقط برای دریافت آپدیت‌ها یا بکاپ ابری (اختیاری) لازم است.",
    },
    {
      q: "اگر کامپیوترم خراب شود، داده‌هایم چه می‌شود؟",
      a: "نسخه معیاری شامل بکاپ اتوماتیک ابری است — هر شب داده‌های شما به‌صورت رمزگذاری‌شده در سرور امن ما کپی می‌شود. اگر کامپیوتر خراب شود، در کمتر از ۵ دقیقه روی کامپیوتر جدید داده‌هایتان را برگردانید. در نسخه رایگان می‌توانید دستی هم بکاپ بگیرید.",
    },
    {
      q: "آیا برای نصب به دانش کامپیوتر نیاز دارم؟",
      a: "اصلاً. اگر می‌توانید یک فایل را با دابل‌کلیک باز کنید، می‌توانید آسان حساب را نصب کنید. کل پروسه نصب ۵ دقیقه طول می‌کشد و شامل فقط ۳ کلیک است. ویدیوی آموزشی هم در واتساپ برایتان می‌فرستیم. اگر باز هم مشکل داشتید، تیم پشتیبانی ما در واتساپ در کمتر از ۱۰ دقیقه پاسخ می‌دهد.",
    },
    {
      q: "آیا برای بارکدخوان باید دستگاه خاصی بخرم؟",
      a: "خیر. آسان حساب با هر بارکدخوان استاندارد USB کار می‌کند — حتی مدل‌های ارزان‌قیمت ۵۰۰ افغانی بازار ماندوی. همچنین می‌توانید بدون بارکدخوان هم کار کنید و با تایپ نام جنس یا کد، فروش ثبت کنید.",
    },
    {
      q: "اگر بعد از خرید از نسخه معیاری راضی نبودم چه می‌شود؟",
      a: "ضمانت ۷ روزه برگشت پول داریم. اگر در ۷ روز اول به هر دلیلی راضی نبودید، فقط یک پیام در واتساپ بفرستید و تمام پولتان را بدون هیچ سوال اضافی پس می‌گیرید. ما به محصولمان اطمینان داریم.",
    },
    {
      q: "آیا تاریخ هجری شمسی را واقعاً پشتیبانی می‌کند؟",
      a: "بله، تمام تاریخ‌ها در آسان حساب به‌صورت هجری شمسی نمایش داده می‌شوند — از فاکتورها تا راپورها. همچنین می‌توانید بین شمسی، میلادی و قمری سوییچ کنید. این یعنی راپور ماهانه شما با ماه‌های افغانی (حمل، ثور، جوزا…) هماهنگ است، نه با ژانویه و فبروری.",
    },
    {
      q: "آیا چند کاربر می‌توانند همزمان استفاده کنند؟",
      a: "بله. در نسخه معیاری، می‌توانید چند کاربر با سطوح دسترسی مختلف بسازید — مثلاً صاحب دکان همه چیز را می‌بیند، صندوق‌دار فقط فروش ثبت می‌کند، و گدام‌دار فقط موجودی را مدیریت می‌کند. تمام کاربران روی یک شبکه محلی به‌صورت همزمان کار می‌کنند.",
    },
    {
      q: "آیا برای آپدیت‌ها پول اضافی می‌گیرید؟",
      a: "خیر. با خرید نسخه معیاری، تمام آپدیت‌های ۱ سال اول رایگان هستند. بعد از ۱ سال، اگر خواستید آپدیت بگیرید می‌توانید با تخفیف ۵۰٪ تمدید کنید — اما این اختیاری است. نسخه فعلی شما همیشه کار می‌کند، حتی اگر تمدید نکنید.",
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      dir="rtl"
      className="relative bg-white py-20 sm:py-28"
      aria-labelledby="faq-headline"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="سوالات متداول"
          eyebrowIcon={HelpCircle}
          title="هر سوالی دارید،"
          highlight="اینجا پاسخ داریم"
          subtitle="اگر سوال شما در این لیست نیست، تیم پشتیبانی ما در واتساپ همیشه آماده پاسخگویی است."
          tone="violet"
        />

        {/* Accordion */}
        <div className="mt-10 sm:mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={i} delay={i * 40}>
                <div
                  className={`rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-blue-200 shadow-premium"
                      : "border-slate-200 hover:border-slate-300"
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
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span className="num-fa">{["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸"][i]}</span>
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {faq.q}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
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
                      <p className="px-5 pb-5 pr-[3.75rem] text-sm sm:text-base text-slate-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom contact CTA */}
        <Reveal delay={200}>
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50/40 border border-blue-100 p-6 text-center">
            <p className="text-sm sm:text-base text-slate-700 font-medium">
              سوال دیگری دارید که اینجا نیست؟
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              تیم پشتیبانی ما در واتساپ در کمتر از ۱۰ دقیقه پاسخ می‌دهد.
            </p>
            <a
              href="#download"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-premium hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <WhatsAppIcon className="h-4 w-4" />
              سوال خود را در واتساپ بپرسید
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
