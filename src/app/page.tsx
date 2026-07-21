import { Navbar } from "@/components/asanhesab/navbar";
import { Hero } from "@/components/asanhesab/hero";
import { TrustBar } from "@/components/asanhesab/trust-bar";
import { StatsBand } from "@/components/asanhesab/stats-band";
import { PainPoints } from "@/components/asanhesab/pain-points";
import { SolutionIntro } from "@/components/asanhesab/solution-intro";
import { Features } from "@/components/asanhesab/features";
import { HowItWorks } from "@/components/asanhesab/how-it-works";
import { InvoicePreview } from "@/components/asanhesab/invoice-preview";
import { Comparison } from "@/components/asanhesab/comparison";
import { ROICalculator } from "@/components/asanhesab/roi-calculator";
import { Pricing } from "@/components/asanhesab/pricing";
import { Testimonials } from "@/components/asanhesab/testimonials";
import { MarqueeTestimonials } from "@/components/asanhesab/marquee-testimonials";
import { SecuritySection } from "@/components/asanhesab/security-section";
import { FAQ } from "@/components/asanhesab/faq";
import { FinalCTA } from "@/components/asanhesab/final-cta";
import { Footer } from "@/components/asanhesab/footer";
import { FloatingWhatsApp } from "@/components/asanhesab/floating-whatsapp";
import { FloatingActions } from "@/components/asanhesab/floating-actions";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hook — attention + interest */}
        <Hero />

        {/* Trust bar — credibility right after hero */}
        <TrustBar />

       

        {/* Problem agitation */}
        <PainPoints />

        {/* Solution reveal + before/after */}
        <SolutionIntro />

        {/* Detailed features */}
        <Features />

        {/* How it works — reduce effort anxiety */}
        <HowItWorks />

        {/* Invoice preview - showcase professional invoice design */}
        <InvoicePreview />

        {/* Differentiation vs alternatives */}
        <Comparison />



        {/* Pricing — desire + action */}
        <Pricing />

        {/* Scrolling mini-testimonials */}
        <MarqueeTestimonials />

        {/* More social proof */}
        <Testimonials />


        {/* Objection handling */}
        <FAQ />

        {/* Closing argument + primary action */}
        <FinalCTA />
      </main>
      <Footer />

      {/* Floating UI elements */}
      <FloatingWhatsApp />
      <FloatingActions />
    </div>
  );
}
