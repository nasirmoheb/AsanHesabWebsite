"use client";

import { track } from "@vercel/analytics";
import { usePathname, useRouter } from "next/navigation";
import { type AnchorHTMLAttributes, type MouseEvent } from "react";

const INSTALL_GUIDE_PATH = "/install-guide";

/**
 * Anchor for the AsanHesab installer (.exe) download link.
 * Fires a Vercel Analytics custom event on click and routes the user to
 * the /install-guide page, which walks them through the Windows SmartScreen
 * steps while the download restarts automatically. If the outer onClick
 * already prevented default (e.g. the non-Windows warning in the hero),
 * that behavior wins. When already on the guide page the link downloads
 * directly.
 */
export function DownloadLink({
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const href = props.href ?? "";
    if (!href.includes("releases/download")) return;
    track("download", {
      file: href.split("/").pop() ?? "AsanHesab-Setup.exe",
      platform: "windows",
    });
    if (e.defaultPrevented || pathname === INSTALL_GUIDE_PATH) return;
    e.preventDefault();
    router.push(INSTALL_GUIDE_PATH);
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
