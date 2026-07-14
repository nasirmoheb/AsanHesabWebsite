"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * ThemeProvider — wraps next-themes with sensible defaults.
 * - Strict light mode by default (design is light-first)
 * - Allow user toggle to dark via "class" strategy
 * - Persist to localStorage
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="asanhesab-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
