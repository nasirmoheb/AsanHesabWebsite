import { Navbar } from "@/components/asanhesab/navbar";
import { Hero } from "@/components/asanhesab/hero";
import { StatsBand } from "@/components/asanhesab/stats-band";
import { PainPoints } from "@/components/asanhesab/pain-points";
import { SolutionIntro } from "@/components/asanhesab/solution-intro";
import { Features } from "@/components/asanhesab/features";
import { HowItWorks } from "@/components/asanhesab/how-it-works";
import { Audiences } from "@/components/asanhesab/audiences";
import { Comparison } from "@/components/asanhesab/comparison";
import { Pricing } from "@/components/asanhesab/pricing";
import { Testimonials } from "@/components/asanhesab/testimonials";
import { FAQ } from "@/components/asanhesab/faq";
import { FinalCTA } from "@/components/asanhesab/final-cta";
import { Footer } from "@/components/asanhesab/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hook — attention + interest */}
        <Hero />

        {/* Social proof band */}
        <StatsBand />

        {/* Problem agitation */}
        <PainPoints />

        {/* Solution reveal + before/after */}
        <SolutionIntro />

        {/* Detailed features */}
        <Features />

        {/* How it works — reduce effort anxiety */}
        <HowItWorks />

        {/* Personalization — speak to each audience */}
        <Audiences />

        {/* Differentiation vs alternatives */}
        <Comparison />

        {/* Pricing — desire + action */}
        <Pricing />

        {/* More social proof */}
        <Testimonials />

        {/* Objection handling */}
        <FAQ />

        {/* Closing argument + primary action */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
