import type { Metadata } from "next";
import { Navbar } from "@/components/asanhesab/navbar";
import { Footer } from "@/components/asanhesab/footer";
import { InstallGuideContent } from "@/components/asanhesab/install-guide-page";

export const metadata: Metadata = {
  title: "راهنمای نصب آسان حساب — رفع خطای SmartScreen",
  description:
    "راهنمای گام‌به‌گام نصب نرم‌افزار آسان حساب در ویندوز؛ رفع پیام آبی Windows protected your PC و اجرای فایل نصبی با گزینه More info و Run anyway.",
};

export default function InstallGuidePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Navbar />
      <InstallGuideContent />
      <Footer />
    </div>
  );
}
