"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/animation-components";
import {
  Zap,
  ArrowRight,
  Headphones,
} from "lucide-react";

export default function FinalCTA() {
  const { t, dir } = useI18n();

  return (
    <>
      {/* ══════════ FINAL CTA — DRAMATIC ══════════ */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 gradient-brand" />
        {/* Animated decorations */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-white/5 rounded-full"
            style={{ animation: "float 8s ease-in-out infinite" }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[10%] w-[200px] h-[200px] bg-white/5 rounded-full"
            style={{ animation: "float 10s ease-in-out infinite 2s" }}
          />
          <motion.div
            className="absolute top-[50%] left-[50%] w-[500px] h-[500px] bg-white/3 blob"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <motion.div
              className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20 p-2"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <img
                src="/logo.svg"
                alt="آسان حساب"
                className="w-full h-full rounded-2xl object-contain"
              />
            </motion.div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ direction: dir }}>
              {t("cta.title_line1")}
              <br />
              {t("cta.title_line2")}
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ direction: dir }}>
              {t("cta.social_proof")}{" "}
              {t("cta.social_proof_cta")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="bg-white text-brand-deep hover:bg-gray-50 border-0 px-10 py-7 text-lg rounded-2xl shadow-2xl font-bold transition-all"
                >
                  <Zap className="w-5 h-5 me-2" />
                  {t("cta.download_free")}
                  <ArrowRight className="w-5 h-5 ms-2 rtl:rotate-180" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-7 text-lg rounded-2xl backdrop-blur-sm transition-all"
                >
                  <Headphones className="w-5 h-5 me-2" />
                  {t("footer.company_contact")}
                </Button>
              </motion.div>
            </div>
            <p className="text-white/30 text-sm mt-8">
              {t("cta.offline_note")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="relative text-gray-400 pt-16 pb-8 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0a0a1a 0%, #0d1225 40%, #0a1628 100%)" }} />
        {/* Subtle glow accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, #007FFF 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top CTA strip */}
          <motion.div
            className="gradient-brand rounded-2xl p-6 md:p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-1" style={{ direction: dir }}>{t("footer.cta_title")}</h3>
              <p className="text-white/70 text-sm" style={{ direction: dir }}>{t("footer.cta_desc")}</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-white text-brand-deep hover:bg-gray-50 border-0 px-8 py-5 rounded-xl text-sm font-bold shadow-lg">
                <Zap className="w-4 h-4 me-2" />
                {t("cta.download_free")}
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img
                    src="/logo.svg"
                    alt="آسان حساب"
                    className="w-10 h-10 rounded-xl shadow-lg"
                  />
                  <div className="absolute -inset-1 rounded-full border border-brand-mid/20" />
                </div>
                <div>
                  <span className="text-lg font-black text-white">آسان حساب</span>
                  <span className="text-[10px] text-gray-600 block -mt-0.5 tracking-wider">
                    ASANHESAB
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 mb-5" style={{ direction: dir }}>
                {t("footer.brand_desc")}
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {[
                  { label: "Facebook", icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  )},
                  { label: "Telegram", icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  )},
                  { label: "Instagram", icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  )},
                  { label: "YouTube", icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  )},
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/10"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            {/* Product column */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
                <span className="w-1 h-4 rounded-full gradient-brand inline-block" />
                {t("footer.product")}
              </h4>
              <ul className="space-y-3 text-sm">
                {[t("footer.product_features"), t("footer.product_pricing"), t("footer.product_updates"), t("footer.product_desktop")].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand-light transition-colors inline-flex items-center gap-1 group">
                      <span className="w-0 group-hover:w-2 h-px bg-brand-light transition-all duration-300 rtl:order-last" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Company column */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
                <span className="w-1 h-4 rounded-full gradient-brand inline-block" />
                {t("footer.company")}
              </h4>
              <ul className="space-y-3 text-sm">
                {[t("footer.company_about"), t("footer.company_contact"), t("footer.company_blog"), t("footer.company_careers")].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand-light transition-colors inline-flex items-center gap-1 group">
                      <span className="w-0 group-hover:w-2 h-px bg-brand-light transition-all duration-300 rtl:order-last" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Support column */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
                <span className="w-1 h-4 rounded-full gradient-brand inline-block" />
                {t("footer.support")}
              </h4>
              <ul className="space-y-3 text-sm">
                {[t("footer.support_help"), t("footer.support_tutorials"), t("footer.support_faq"), t("footer.support_phone")].map(
                  (l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-brand-light transition-colors inline-flex items-center gap-1 group">
                        <span className="w-0 group-hover:w-2 h-px bg-brand-light transition-all duration-300 rtl:order-last" />
                        {l}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              {t("footer.copyright")} &copy; آسان حساب ۱۴۰۴
            </p>
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="hover:text-brand-light transition-colors">
                {t("footer.privacy")}
              </a>
              <a href="#" className="hover:text-brand-light transition-colors">
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
