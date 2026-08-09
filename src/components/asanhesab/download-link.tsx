"use client";

import { track } from "@vercel/analytics";
import { type AnchorHTMLAttributes, type MouseEvent } from "react";

/**
 * Anchor that fires a Vercel Analytics custom event when the AsanHesab
 * installer (.exe) download link is clicked. Pass-through of all anchor
 * props; existing onClick handlers still run before tracking.
 */
export function DownloadLink({
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (props.href && props.href.includes("releases/download")) {
      track("download", {
        file: props.href.split("/").pop() ?? "AsanHesab-Setup.exe",
        platform: "windows",
      });
    }
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
