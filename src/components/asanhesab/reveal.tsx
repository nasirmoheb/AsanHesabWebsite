"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useReveal — IntersectionObserver-based scroll reveal.
 * Returns a ref to attach + a boolean "visible" flag.
 * Triggers once when the element enters the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; once?: boolean }
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } =
    options ?? {};
  const ref = useRef<T | null>(null);
  // SSR-safe initial value: assume not visible until we can observe.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fallback for environments without IntersectionObserver (SSR/old browsers).
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible } as const;
}

/**
 * Reveal — wrapper that applies a fade-up entrance on scroll.
 *
 * Content is VISIBLE by default (no `opacity-0` before JS runs).
 * The animation is progressive enhancement: when JS fires and the
 * component mounts, it briefly "arms" the hidden state and then
 * triggers the entrance as soon as the element enters the viewport.
 * This prevents content from shipping blank on slow JS, backgrounded
 * tabs, or headless renderers.
 *
 * Reduced motion: collapses to a simple opacity crossfade (no translate).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  // "armed" becomes true after first paint so we never flash hidden on SSR.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    // Arm on the next animation frame so the element paints once at full
    // opacity before we apply the entrance state.
    const id = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Tag
      ref={ref}
      className={[
        // Motion-reduced: crossfade only, no translate
        "motion-reduce:transition-opacity motion-reduce:duration-500",
        // Standard motion
        "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out",
        // State: armed+invisible → armed+visible | not armed (SSR) → fully visible
        armed && !visible
          ? "opacity-0 motion-safe:translate-y-6"
          : "opacity-100 motion-safe:translate-y-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transitionDelay: armed ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

/**
 * useSpotlight — tracks mouse position over an element for spotlight hover effect.
 * Returns a ref to attach + onMouseMove handler.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const handleMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };
  return { ref, handleMouseMove };
}
