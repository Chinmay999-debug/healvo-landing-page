import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WorkflowFlow } from "./components/WorkflowFlow";
import { DentalChartShowcase } from "./components/DentalChartShowcase";
import { ConsultationAndBilling } from "./components/ConsultationAndBilling";
import { AiAssistantShowcase } from "./components/AiAssistantShowcase";
import { PublicBookingShowcase } from "./components/PublicBookingShowcase";
import { PricingSection } from "./components/PricingSection";
import { FaqSection } from "./components/FaqSection";
import { ClosingCta } from "./components/ClosingCta";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f223a] selection:bg-[#0ea5b7]/20 selection:text-[#0f223a]">
      {/* Integrated Header Navigation */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Hero & Real Product Walkthrough Video */}
        <Hero />

        {/* 2. The Connected Clinic Loop */}
        <WorkflowFlow />

        {/* 3. Dental Differentiation (FDI Anatomical Chart) */}
        <DentalChartShowcase />

        {/* 4. Consultation Notes & Real-Time Invoicing */}
        <ConsultationAndBilling />

        {/* 5. Grounded Healvo AI Copilot */}
        <AiAssistantShowcase />

        {/* 6. Online Patient Booking Front Door */}
        <PublicBookingShowcase />

        {/* 7. Transparent, Honest Pricing */}
        <PricingSection />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />

        {/* 9. Final High-Impact Conversion Callout */}
        <ClosingCta />
      </main>

      {/* Editorial SaaS Footer */}
      <Footer />
    </div>
  );
}
