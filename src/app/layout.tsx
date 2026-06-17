import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

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
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
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
      <body
        className={`${vazirmatn.variable} font-sans antialiased bg-white text-slate-900`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
