import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/asanhesab/theme-provider";
import { LanguageProvider } from "@/components/asanhesab/i18n/language-context";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

// Default metadata — runtime is overridden by LanguageProvider on the client.
export const metadata: Metadata = {
  title: "آسان حساب — سیستم حسابداری و فروشگاهی مدرن برای دکانداران افغانستان",
  description:
    "آسان حساب، سیستم حسابداری و POS آفلاین برای تجار افغان. ثبت دقیق فروشات، مدیریت قرض‌ها، پشتیبانی از دری، پشتو و تاریخ هجری شمسی. ویندوز ۱۰ و ۱۱.",
  keywords: [
    "آسان حساب",
    "حسابداری افغانستان",
    "POS افغانستان",
    "نرم‌افزار فروشگاهی",
    "مدیریت قرض",
    "گدام",
    "فروشگاهی",
  ],
  authors: [{ name: "دانا سیستم" }],
  icons: {
    icon: "/asanhesab-logo.png",
  },
  openGraph: {
    title: "آسان حساب — حسابداری آسان شده برای دکانداران افغانستان",
    description:
      "سیستم حسابداری و فروشگاهی مدرن برای تجار افغان. ۱۰۰٪ آفلاین، بدون نیاز به اینترنت.",
    siteName: "آسان حساب",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Pre-set theme class before hydration to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('asanhesab-theme');if(!t){t='light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){document.documentElement.classList.remove('dark');}})();`,
          }}
        />
      </head>
      <body
        className={`${vazirmatn.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
