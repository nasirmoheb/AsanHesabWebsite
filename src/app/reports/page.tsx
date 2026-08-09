"use client";

import type { CSSProperties } from "react";
import {
  ArrowLeft,
  Clock,
  FileText,
  Scale,
  BarChart3,
  Banknote,
  ShoppingCart,
  ReceiptText,
  Users,
  TrendingUp,
  Store,
  Package,
  DollarSign,
  AlertTriangle,
  Download,
} from "lucide-react";
import { Navbar } from "@/components/asanhesab/navbar";
import { Footer } from "@/components/asanhesab/footer";
import { DownloadLink } from "@/components/asanhesab/download-link";
import { FloatingWhatsApp } from "@/components/asanhesab/floating-whatsapp";
import { FloatingActions } from "@/components/asanhesab/floating-actions";
import { Reveal } from "@/components/asanhesab/reveal";
import { useLanguage, useT } from "@/components/asanhesab/i18n/language-context";

const prettyText = { textWrap: "pretty" } as CSSProperties;
const balanceText = { textWrap: "balance" } as CSSProperties;

// ─── Category colours ──────────────────────────────────────────────────────────
type CategoryTone = "blue" | "emerald" | "violet" | "amber" | "rose";

const categoryStyles: Record<
  CategoryTone,
  {
    section: string;
    orb: string;
    badge: string;
    iconBg: string;
    tagBg: string;
    tagText: string;
    cardBorder: string;
    cardHover: string;
  }
> = {
  blue: {
    section: "from-blue-50/60 to-transparent dark:from-blue-950/20",
    orb: "bg-blue-400/15 dark:bg-blue-400/10",
    badge: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
    iconBg: "bg-blue-600 text-white",
    tagBg: "bg-blue-50 dark:bg-blue-950/50",
    tagText: "text-blue-700 dark:text-blue-300",
    cardBorder: "border-blue-100/80 hover:border-blue-200 dark:border-blue-900/40 dark:hover:border-blue-800",
    cardHover: "hover:shadow-blue-100/40 dark:hover:shadow-blue-900/20",
  },
  emerald: {
    section: "from-emerald-50/60 to-transparent dark:from-emerald-950/20",
    orb: "bg-emerald-400/15 dark:bg-emerald-400/10",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    iconBg: "bg-emerald-600 text-white",
    tagBg: "bg-emerald-50 dark:bg-emerald-950/50",
    tagText: "text-emerald-700 dark:text-emerald-300",
    cardBorder: "border-emerald-100/80 hover:border-emerald-200 dark:border-emerald-900/40 dark:hover:border-emerald-800",
    cardHover: "hover:shadow-emerald-100/40 dark:hover:shadow-emerald-900/20",
  },
  violet: {
    section: "from-violet-50/60 to-transparent dark:from-violet-950/20",
    orb: "bg-violet-400/15 dark:bg-violet-400/10",
    badge: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
    iconBg: "bg-violet-600 text-white",
    tagBg: "bg-violet-50 dark:bg-violet-950/50",
    tagText: "text-violet-700 dark:text-violet-300",
    cardBorder: "border-violet-100/80 hover:border-violet-200 dark:border-violet-900/40 dark:hover:border-violet-800",
    cardHover: "hover:shadow-violet-100/40 dark:hover:shadow-violet-900/20",
  },
  amber: {
    section: "from-amber-50/60 to-transparent dark:from-amber-950/20",
    orb: "bg-amber-400/15 dark:bg-amber-400/10",
    badge: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
    iconBg: "bg-amber-500 text-white",
    tagBg: "bg-amber-50 dark:bg-amber-950/50",
    tagText: "text-amber-700 dark:text-amber-300",
    cardBorder: "border-amber-100/80 hover:border-amber-200 dark:border-amber-900/40 dark:hover:border-amber-800",
    cardHover: "hover:shadow-amber-100/40 dark:hover:shadow-amber-900/20",
  },
  rose: {
    section: "from-rose-50/60 to-transparent dark:from-rose-950/20",
    orb: "bg-rose-400/15 dark:bg-rose-400/10",
    badge: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300",
    iconBg: "bg-rose-600 text-white",
    tagBg: "bg-rose-50 dark:bg-rose-950/50",
    tagText: "text-rose-700 dark:text-rose-300",
    cardBorder: "border-rose-100/80 hover:border-rose-200 dark:border-rose-900/40 dark:hover:border-rose-800",
    cardHover: "hover:shadow-rose-100/40 dark:hover:shadow-rose-900/20",
  },
};

// ─── Report card data type ─────────────────────────────────────────────────────
type BadgeVariant = "license" | "permission" | "feature" | "dateRange" | "entity";

interface ReportCardData {
  titleKey: string;
  descKey: string;
  tagKey: string;
  icon: React.ComponentType<{ className?: string }>;
  badges: BadgeVariant[];
}

// ─── Main page component ───────────────────────────────────────────────────────
export default function ReportsPage() {
  const t = useT();
  const { dir } = useLanguage();
  const r = t.reportsPage;

  const financialReports: ReportCardData[] = [
    { titleKey: "dailyRoznamchaTitle", descKey: "dailyRoznamchaDesc", tagKey: "dailyRoznamchaTag", icon: Clock, badges: ["dateRange"] },
    { titleKey: "generalJournalTitle", descKey: "generalJournalDesc", tagKey: "generalJournalTag", icon: FileText, badges: ["dateRange"] },
    { titleKey: "generalLedgerTitle", descKey: "generalLedgerDesc", tagKey: "generalLedgerTag", icon: FileText, badges: ["dateRange"] },
    { titleKey: "trialBalanceTitle", descKey: "trialBalanceDesc", tagKey: "trialBalanceTag", icon: Scale, badges: ["license"] },
    { titleKey: "balanceSheetTitle", descKey: "balanceSheetDesc", tagKey: "balanceSheetTag", icon: FileText, badges: ["license"] },
    { titleKey: "profitAndLossTitle", descKey: "profitAndLossDesc", tagKey: "profitAndLossTag", icon: BarChart3, badges: ["dateRange", "permission"] },
    { titleKey: "cashFlowTitle", descKey: "cashFlowDesc", tagKey: "cashFlowTag", icon: Banknote, badges: ["dateRange"] },
  ];

  const salesReports: ReportCardData[] = [
    { titleKey: "salesByProductTitle", descKey: "salesByProductDesc", tagKey: "salesByProductTag", icon: ShoppingCart, badges: ["dateRange"] },
    { titleKey: "productProfitabilityTitle", descKey: "productProfitabilityDesc", tagKey: "productProfitabilityTag", icon: ReceiptText, badges: ["dateRange", "permission"] },
    { titleKey: "salesByCustomerTitle", descKey: "salesByCustomerDesc", tagKey: "salesByCustomerTag", icon: Users, badges: ["dateRange"] },
    { titleKey: "salesTrendTitle", descKey: "salesTrendDesc", tagKey: "salesTrendTag", icon: TrendingUp, badges: ["dateRange"] },
  ];

  const purchaseReports: ReportCardData[] = [
    { titleKey: "purchasesBySupplierTitle", descKey: "purchasesBySupplierDesc", tagKey: "purchasesBySupplierTag", icon: Store, badges: ["dateRange"] },
    { titleKey: "purchasesByProductTitle", descKey: "purchasesByProductDesc", tagKey: "purchasesByProductTag", icon: Package, badges: ["dateRange"] },
    { titleKey: "purchasesTrendTitle", descKey: "purchasesTrendDesc", tagKey: "purchasesTrendTag", icon: TrendingUp, badges: ["dateRange"] },
  ];

  const inventoryReports: ReportCardData[] = [
    { titleKey: "stockLevelTitle", descKey: "stockLevelDesc", tagKey: "stockLevelTag", icon: Package, badges: [] },
    { titleKey: "inventoryValueTitle", descKey: "inventoryValueDesc", tagKey: "inventoryValueTag", icon: DollarSign, badges: [] },
    { titleKey: "slowMovingTitle", descKey: "slowMovingDesc", tagKey: "slowMovingTag", icon: Clock, badges: [] },
    { titleKey: "expiryTitle", descKey: "expiryDesc", tagKey: "expiryTag", icon: AlertTriangle, badges: ["feature"] },
  ];

  const accountReports: ReportCardData[] = [
    { titleKey: "customerDebtTitle", descKey: "customerDebtDesc", tagKey: "customerDebtTag", icon: Users, badges: [] },
    { titleKey: "supplierDebtTitle", descKey: "supplierDebtDesc", tagKey: "supplierDebtTag", icon: Store, badges: [] },
    { titleKey: "expenseBreakdownTitle", descKey: "expenseBreakdownDesc", tagKey: "expenseBreakdownTag", icon: BarChart3, badges: ["dateRange"] },
    { titleKey: "accountStatementTitle", descKey: "accountStatementDesc", tagKey: "accountStatementTag", icon: FileText, badges: ["entity"] },
    { titleKey: "taxSummaryTitle", descKey: "taxSummaryDesc", tagKey: "taxSummaryTag", icon: Scale, badges: ["dateRange"] },
    { titleKey: "auditTrailTitle", descKey: "auditTrailDesc", tagKey: "auditTrailTag", icon: Clock, badges: ["dateRange", "permission"] },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-background" dir={dir}>
      <Navbar />
      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-linear-to-b from-blue-50/50 via-white to-white pt-28 pb-16 dark:from-blue-950/20 dark:via-slate-950 dark:to-slate-950 sm:pt-36 sm:pb-24">
          {/* Decorative orb */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-125 w-175 rounded-full bg-blue-100/40 dark:bg-blue-900/20 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Reveal>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-1"
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
                  aria-hidden
                />
                {r.backHome}
              </a>
            </Reveal>

            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <Reveal>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 mb-4">
                  {r.eyebrow}
                </span>
              </Reveal>

              <Reveal delay={60}>
                <h1
                  className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
                  style={balanceText}
                >
                  {r.title}{" "}
                  <span className="text-blue-600 dark:text-blue-400">{r.highlight}</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p
                  className="mt-5 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
                  style={prettyText}
                >
                  {r.subtitle}
                </p>
              </Reveal>

              <Reveal delay={180}>
                <DownloadLink
                  href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
                  className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-[0_0_30px_-6px_rgba(37,99,235,0.4)] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Download className="h-5 w-5" aria-hidden />
                  <span>{r.downloadCta}</span>
                </DownloadLink>
              </Reveal>

              <Reveal delay={220}>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{r.downloadSub}</p>
              </Reveal>
            </div>

            {/* Stats strip */}
            <Reveal delay={260}>
              <div className="mt-14 sm:mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
                {[
                  { value: "24", label: dir === "rtl" ? "راپور آماده" : "Ready reports" },
                  { value: "5", label: dir === "rtl" ? "دسته‌بندی" : "Categories" },
                  { value: "1", label: dir === "rtl" ? "کلیک" : "Click" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Report Categories ────────────────────────────────────────────── */}
        <ReportCategory
          categoryTitle={r.categoryFinancial}
          categoryDesc={r.categoryFinancialDesc}
          tone="blue"
          reports={financialReports}
          r={r}
        />
        <ReportCategory
          categoryTitle={r.categorySales}
          categoryDesc={r.categorySalesDesc}
          tone="emerald"
          reports={salesReports}
          r={r}
        />
        <ReportCategory
          categoryTitle={r.categoryPurchases}
          categoryDesc={r.categoryPurchasesDesc}
          tone="violet"
          reports={purchaseReports}
          r={r}
        />
        <ReportCategory
          categoryTitle={r.categoryInventory}
          categoryDesc={r.categoryInventoryDesc}
          tone="amber"
          reports={inventoryReports}
          r={r}
        />
        <ReportCategory
          categoryTitle={r.categoryAccounts}
          categoryDesc={r.categoryAccountsDesc}
          tone="rose"
          reports={accountReports}
          r={r}
        />

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <section className="relative bg-linear-to-br from-blue-600 to-blue-700 py-16 sm:py-20 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]"
          />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <Reveal>
              <h2
                className="text-2xl sm:text-4xl font-extrabold text-white leading-tight"
                style={balanceText}
              >
                {r.downloadCta}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-4 text-blue-100 text-sm sm:text-base">{r.downloadSub}</p>
            </Reveal>
            <Reveal delay={140}>
              <DownloadLink
                href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
                className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-base font-bold text-blue-700 hover:bg-blue-50 active:scale-[0.98] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
              >
                <Download className="h-5 w-5" aria-hidden />
                {r.heroCta}
              </DownloadLink>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-3 text-xs text-blue-200">{r.heroCtaSub}</p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <FloatingActions />
    </div>
  );
}

// ─── Report Category Section ───────────────────────────────────────────────────
function ReportCategory({
  categoryTitle,
  categoryDesc,
  tone,
  reports,
  r,
}: {
  categoryTitle: string;
  categoryDesc: string;
  tone: CategoryTone;
  reports: ReportCardData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  r: any;
}) {
  const styles = categoryStyles[tone];

  return (
    <section className={`relative py-16 sm:py-20 bg-linear-to-b ${styles.section}`}>
      {/* Decorative orb */}
      <div
        aria-hidden
        className={`pointer-events-none absolute top-0 inset-e-0 h-64 w-64 rounded-full blur-3xl opacity-60 ${styles.orb}`}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category header */}
        <div className="mb-10 sm:mb-12">
          <Reveal>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles.badge}`}
            >
              {categoryTitle}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <p
              className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xl"
              style={prettyText}
            >
              {categoryDesc}
            </p>
          </Reveal>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {reports.map((report, i) => (
            <Reveal key={report.titleKey} delay={i * 60}>
              <ReportCard report={report} tone={tone} styles={styles} r={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Single Report Card ────────────────────────────────────────────────────────
function ReportCard({
  report,
  styles,
  r,
}: {
  report: ReportCardData;
  tone: CategoryTone;
  styles: (typeof categoryStyles)[CategoryTone];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  r: any;
}) {
  const Icon = report.icon;
  const title = r[report.titleKey];
  const desc = r[report.descKey];
  const tag = r[report.tagKey];

  const badgeLabels: Record<BadgeVariant, string> = {
    license: r.requiresLicenseBadge,
    permission: r.requiresPermissionBadge,
    feature: r.requiresFeatureBadge,
    dateRange: r.dateRangeBadge,
    entity: r.entityBadge,
  };

  const badgeColors: Record<BadgeVariant, string> = {
    license: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
    permission: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
    feature: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800",
    dateRange: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    entity: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  };

  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-5 sm:p-6",
        "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 motion-reduce:transform-none",
        "dark:bg-slate-900",
        "shadow-sm hover:shadow-lg",
        styles.cardBorder,
        styles.cardHover,
      ].join(" ")}
    >
      {/* Subtle background tint on hover */}
      <div
        aria-hidden
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.orb} blur-2xl z-0 rounded-2xl`}
      />

      {/* Icon + tag row */}
      <div className="relative flex items-start justify-between gap-3 mb-4">
        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm ${styles.iconBg}`}
          aria-hidden
        >
          <Icon className="h-5 w-5" />
        </span>

        <span
          className={`mt-0.5 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${styles.tagBg} ${styles.tagText}`}
        >
          {tag}
        </span>
      </div>

      {/* Title */}
      <h3
        className="relative text-base font-extrabold text-slate-900 dark:text-white leading-snug"
        style={balanceText}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
        style={prettyText}
      >
        {desc}
      </p>

      {/* Requirement badges */}
      {report.badges.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {report.badges.map((badge) => (
            <span
              key={badge}
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badgeColors[badge]}`}
            >
              {badgeLabels[badge]}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
