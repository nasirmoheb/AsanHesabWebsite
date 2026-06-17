"use client";

import { Reveal } from "./reveal";

/**
 * SectionHeading — consistent eyebrow + title + subtitle pattern.
 * RTL-aware, centered by default.
 */
export function SectionHeading({
  eyebrow,
  eyebrowIcon: Icon,
  title,
  highlight,
  highlightClass = "text-gradient-blue",
  subtitle,
  align = "center",
  tone = "blue",
}: {
  eyebrow?: string;
  eyebrowIcon?: React.ComponentType<{ className?: string }>;
  title: string;
  highlight?: string;
  highlightClass?: string;
  subtitle?: string;
  align?: "center" | "start";
  tone?: "blue" | "emerald" | "amber" | "violet";
}) {
  const tones = {
    blue:    "border-blue-200 bg-blue-50/80 text-blue-700",
    emerald: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
    amber:   "border-amber-200 bg-amber-50/80 text-amber-700",
    violet:  "border-violet-200 bg-violet-50/80 text-violet-700",
  } as const;
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-start items-start";

  return (
    <div className={`flex flex-col ${alignCls} max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
      {eyebrow && (
        <Reveal>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={60}>
        <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2]">
          {title} {highlight && <span className={highlightClass}>{highlight}</span>}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={120}>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
