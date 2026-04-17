import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

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
    icon: "/logo-asanhesab.png",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased bg-background text-foreground"
        style={{ fontFamily: "'Vazirmatn', sans-serif" }}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
