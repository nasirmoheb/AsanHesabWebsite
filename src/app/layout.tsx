import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-vazirmatn",
  preload: true,
});

export const metadata: Metadata = {
  title: "آسان حساب | نرم‌افزار حسابداری آسان برای افغانستان",
  description:
    "آسان حساب - نرم‌افزار حسابداری ساده و قدرتمند به زبان دری، با تقویم هجری شمسی، مخصوص بازار افغانستان. محاسبات مالی خود را آسان کنید!",
  keywords: [
    "حسابداری",
    "افغانستان",
    "نرم‌افزار حسابداری",
    "آسان حساب",
    "AsanHesab",
    "دری",
    "هجری شمسی",
    "حسابداری آسان",
  ],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className={vazirmatn.variable}>
      <body
        className={`antialiased bg-background text-foreground ${vazirmatn.className}`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
