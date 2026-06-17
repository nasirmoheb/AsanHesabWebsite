"use client";

import { Check, X, Minus, FileSpreadsheet, BookX, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/**
 * Comparison — side-by-side table: AsanHesab vs Excel vs Paper notebook.
 * Highlights gaps that justify switching.
 */
export function Comparison() {
  const rows: { label: string; asan: boolean | "partial"; excel: boolean | "partial"; paper: boolean | "partial" }[] = [
    { label: "ثبت سریع فروش با بارکد",          asan: true,  excel: "partial", paper: false },
    { label: "چاپ بل خودکار",                  asan: true,  excel: false,    paper: "partial" },
    { label: "مدیریت قرض با یادآوری خودکار",    asan: true,  excel: "partial", paper: false },
    { label: "هشدار کمبود موجودی گدام",         asan: true,  excel: "partial", paper: false },
    { label: "راپور فایده خالص در یک کلیک",     asan: true,  excel: "partial", paper: false },
    { label: "پشتیبانی از تاریخ هجری شمسی",      asan: true,  excel: false,    paper: "partial" },
    { label: "چند زبانه (دری، پشتو)",          asan: true,  excel: false,    paper: "partial" },
    { label: "کارکرد آفلاین کامل",             asan: true,  excel: true,     paper: true },
    { label: "بکاپ اتوماتیک",                  asan: true,  excel: false,    paper: false },
    { label: "نیاز نداشتن به دانش کامپیوتر",     asan: true,  excel: false,    paper: true },
  ];

  return (
    <section
      dir="rtl"
      className="relative bg-white py-20 sm:py-28"
      aria-labelledby="comparison-headline"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="مقایسه"
          eyebrowIcon={FileSpreadsheet}
          title="چرا آسان حساب بهتر از"
          highlight="اکسل یا دفتر است؟"
          subtitle="جدول زیر تفاوت‌های کلیدی آسان حساب با روش‌های سنتی را نشان می‌دهد. هر خانه، یک ساعت از وقت شماست که هر روز صرفه می‌شود."
          tone="blue"
        />

        {/* Table (desktop) */}
        <Reveal delay={120}>
          <div className="mt-12 hidden md:block overflow-hidden rounded-2xl border border-slate-200 shadow-premium">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80">
                  <th scope="col" className="text-right p-4 font-bold text-slate-700 w-1/2">
                    امکانات
                  </th>
                  <th scope="col" className="p-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white px-3 py-1 text-xs font-bold shadow-premium">
                        <Sparkles className="h-3.5 w-3.5" />
                        آسان حساب
                      </span>
                      <span className="text-[10px] text-blue-700 font-semibold">پیشنهاد ما</span>
                    </div>
                  </th>
                  <th scope="col" className="p-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1.5 text-slate-700 text-xs font-bold">
                        <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
                        اکسل
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="p-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1.5 text-slate-700 text-xs font-bold">
                        <BookX className="h-3.5 w-3.5 text-slate-400" />
                        دفتر کاغذی
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
                  >
                    <td className="p-4 text-right text-slate-700 font-medium">{row.label}</td>
                    <td className="p-4 text-center bg-blue-50/40">
                      <Cell value={row.asan} highlight />
                    </td>
                    <td className="p-4 text-center">
                      <Cell value={row.excel} />
                    </td>
                    <td className="p-4 text-center">
                      <Cell value={row.paper} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Stacked cards (mobile) */}
        <div className="mt-12 md:hidden space-y-4">
          {rows.map((row, i) => (
            <Reveal key={row.label} delay={i * 40}>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-premium">
                <p className="text-sm font-bold text-slate-800 mb-3">{row.label}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <p className="text-[10px] font-bold text-blue-700 mb-1">آسان حساب</p>
                    <Cell value={row.asan} highlight />
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2">
                    <p className="text-[10px] font-bold text-slate-600 mb-1">اکسل</p>
                    <Cell value={row.excel} />
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2">
                    <p className="text-[10px] font-bold text-slate-600 mb-1">دفتر</p>
                    <Cell value={row.paper} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ value, highlight }: { value: boolean | "partial"; highlight?: boolean }) {
  if (value === true) {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          highlight ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600"
        }`}
        aria-label="دارد"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600"
        aria-label="نیمه‌کاره"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400"
      aria-label="ندارد"
    >
      <X className="h-3.5 w-3.5" strokeWidth={3} />
    </span>
  );
}
