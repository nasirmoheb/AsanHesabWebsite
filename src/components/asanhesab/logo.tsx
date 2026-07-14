"use client";

import Image from "next/image";

/**
 * AsanHesabLogo — uses the uploaded brand logo.
 *
 * Props:
 *  - size: pixel size of the square logo tile (default 40)
 *  - className: extra classes
 *
 * The text wordmark lives next to the logo in the parent component,
 * localized via useT().brand.name.
 */
export function AsanHesabLogo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden shadow-premium shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/asanhesab-logo.png"
        alt="آسان حساب لوگو"
        width={size}
        height={size}
        priority
        className="h-full w-full object-cover"
      />
      {/* Status dot overlay (emerald) */}
      <span className="absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
    </span>
  );
}
