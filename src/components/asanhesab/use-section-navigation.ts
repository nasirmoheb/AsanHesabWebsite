"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const PENDING_KEY = "asanhesab-scroll-target";
const NAVBAR_OFFSET = 80;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  return true;
}

export function useSectionNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#") || href.length <= 1) return;
      e.preventDefault();
      const id = href.slice(1);
      if (pathname === "/") {
        scrollToSection(id);
        window.history.replaceState(null, "", href);
        return;
      }
      try {
        sessionStorage.setItem(PENDING_KEY, id);
      } catch {}
      router.push("/");
    },
    [pathname, router]
  );
}

export function usePendingSectionScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    let id: string | null = null;
    try {
      id = sessionStorage.getItem(PENDING_KEY);
      if (id) sessionStorage.removeItem(PENDING_KEY);
    } catch {}
    if (!id) return;
    const timer = window.setTimeout(() => {
      scrollToSection(id as string);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [pathname]);
}
