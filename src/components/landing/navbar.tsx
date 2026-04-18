"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n";
import { Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const { t, dir } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = useMemo(() => [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.dashboard"), href: "#dashboard" },
    { label: t("nav.testimonials"), href: "#testimonials" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.faq"), href: "#faq" },
  ], [t]);

  return (
    <motion.nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-brand-deep/5 border-b border-brand-pale/50 dark:border-brand-mid/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <motion.div className="scroll-progress-bar" style={{ scaleX: scrollYProgress }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
            <motion.img
              src="/logo.svg"
              alt="آسان حساب"
              className="w-11 h-11 rounded-full shadow-lg shadow-brand-mid/25"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            />
            <div>
              <span className="text-xl font-black text-gradient">آسان حساب</span>
              <span className="text-[10px] text-gray-400 block -mt-0.5 tracking-wider">ASANHESAB</span>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-brand-deep dark:hover:text-brand-light transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-0 h-0.5 gradient-brand rounded-full group-hover:w-6 transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button className="gradient-brand hover:opacity-90 text-white border-0 px-6 rounded-full shadow-lg shadow-brand-mid/25 hover:shadow-brand-mid/40 transition-all duration-300 hover:scale-105">
              <Zap className="w-4 h-4 me-2" />
              {t("nav.download")}
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-1.5">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-brand-surface dark:hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-brand-deep dark:text-brand-light" />
              ) : (
                <Menu className="w-5 h-5 text-brand-deep dark:text-brand-light" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-brand-pale/50 dark:border-brand-mid/20 shadow-xl"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block text-gray-600 dark:text-gray-300 hover:text-brand-deep dark:hover:text-brand-light hover:bg-brand-surface dark:hover:bg-white/5 py-3 px-4 rounded-xl text-sm font-medium transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                <Button className="w-full gradient-brand text-white border-0 rounded-xl">
                  <Zap className="w-4 h-4 me-2" />
                  {t("nav.download")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
