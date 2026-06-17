import { Navbar } from "@/components/asanhesab/navbar";
import { Hero } from "@/components/asanhesab/hero";
import { Features } from "@/components/asanhesab/features";
import { Pricing } from "@/components/asanhesab/pricing";
import { Footer } from "@/components/asanhesab/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
