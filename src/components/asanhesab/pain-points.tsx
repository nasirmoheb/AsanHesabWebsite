"use client";

import { BookX, Wallet, FileWarning, Users, ArrowDown } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/**
 * PainPoints — problem agitation.
 * "تجارت شما سخت‌تر از چیست که باید باشد؟"
 * 4 cards naming real pain points Afghan shopkeepers feel every day.
 * Then a transition arrow leading to the Solution section.
 */
export function PainPoints() {
  const pains = [
    {
      icon: <BookX className="h-6 w-6" />,
      tone: "rose" as const,
      title: "دفترچه‌های گم‌شده",
      body: "قرض‌ها در دفترچه‌های کاغذی ثبت می‌شوند که گم می‌شوند، خیس می‌شوند، یا خواندنشان سخت می‌شود. چه کسی چقدر به شما قرض دارد؟ نمی‌دانید.",
    },
    {
      icon: <FileWarning className="h-6 w-6" />,
      tone: "amber" as const,
      title: "موجودی نا‌معلوم",
      body: "نمی‌دانید دقیقاً چند جنس در گدام دارید. یک‌روز جنس تمام می‌شود و مشتری می‌رود دست خالی. خرید اضافی هم پول شما را بلااستفاده می‌گیرد.",
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      tone: "violet" as const,
      title: "فایده نامعلوم",
      body: "در پایان ماه نمی‌دانید چقدر فایده کرده‌اید و چقدن خرج. آیا تجارت شما رو به جلو است یا رو به عقب؟ حدس می‌زنید، نمی‌دانید.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      tone: "blue" as const,
      title: "اعتماد از دست‌رفته",
      body: "مشتری وقتی می‌بیند قرضش ثبت نیست یا بل اشتباه است، اعتمادش را از دست می‌دهد. یک اشتباه کوچک، یک مشتری دایمی را از دست می‌دهد.",
    },
  ];

  return (
    <section
      dir="rtl"
      className="relative bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28"
      aria-labelledby="pain-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="مشکلات آشنا؟"
          eyebrowIcon={FileWarning}
          title="تجارت شما سخت‌تر از چیست که"
          highlight="باید باشد؟"
          highlightClass="text-rose-600"
          subtitle="بیشتر دکانداران افغان هر روز با همین مشکلات دست‌وپنجه نرم می‌کنند. این مشکلات فقط وقت شما را نمی‌گیرند — پول و اعتماد مشتری را هم می‌برند."
          tone="amber"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <PainCard {...p} />
            </Reveal>
          ))}
        </div>

        {/* Transition arrow → Solution */}
        <Reveal delay={200}>
          <div className="mt-14 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <span className="h-px w-8 bg-slate-300" />
              خبر خوب
              <span className="h-px w-8 bg-slate-300" />
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-premium-lg animate-float-slow">
              <ArrowDown className="h-5 w-5" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PainCard({
  icon,
  tone,
  title,
  body,
}: {
  icon: React.ReactNode;
  tone: "rose" | "amber" | "violet" | "blue";
  title: string;
  body: string;
}) {
  const tones = {
    rose:   { bg: "bg-rose-50",    border: "border-rose-100",    icon: "from-rose-500 to-rose-600 text-white",       accent: "text-rose-600" },
    amber:  { bg: "bg-amber-50",   border: "border-amber-100",   icon: "from-amber-500 to-amber-600 text-white",    accent: "text-amber-600" },
    violet: { bg: "bg-violet-50",  border: "border-violet-100",  icon: "from-violet-500 to-violet-600 text-white",  accent: "text-violet-600" },
    blue:   { bg: "bg-blue-50",    border: "border-blue-100",    icon: "from-blue-500 to-blue-600 text-white",      accent: "text-blue-600" },
  } as const;
  const t = tones[tone];

  return (
    <article
      className={`group relative h-full rounded-2xl border ${t.border} ${t.bg} p-6 transition-all duration-300 hover:shadow-premium`}
    >
      <span
        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${t.icon} shadow-premium`}
      >
        {icon}
      </span>
      <h3 className={`mt-4 text-lg font-extrabold text-slate-900`}>
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{body}</p>
    </article>
  );
}
