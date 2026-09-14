import type React from "react";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { ProductShowcase } from "./ProductShowcase/ProductShowcase";

export function Hero() {
  const scrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("product-demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative pt-36 sm:pt-44 lg:pt-52 pb-24 md:pb-36 overflow-hidden hero-atmosphere">
      {/* Subtle background atmospheric glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[480px] bg-gradient-to-tr from-teal-200/35 via-blue-200/25 to-indigo-100/20 blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Hero Header Content */}
        <div className="max-w-4xl mx-auto text-center animate-hero-fade">
          {/* Bold, commanding headline with presence */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[86px] font-black text-[#0f223a] tracking-[-0.035em] leading-[1.03] text-balance">
            Run your dental clinic.{" "}
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#0f223a] via-[#0ea5b7] to-[#0891b2]">
              Without the chaos.
            </span>
          </h1>

          {/* Concise supporting message with balanced scale */}
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-[#475467] font-normal leading-relaxed max-w-3xl mx-auto text-balance">
            Patients, appointments, dental charts, clinical consultations, billing and AI — all in one beautifully simple workspace.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://app.healvo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[16px] font-bold text-white bg-[#0f223a] hover:bg-[#182f4d] rounded-xl transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-slate-900/15 active:scale-[0.99] select-none"
            >
              <span>Start your 7-day free trial</span>
              <ArrowRight size={17} className="text-teal-300" />
            </a>

            <a
              href="#product-demo"
              onClick={scrollToDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-[15.5px] font-semibold text-[#0f223a] bg-white/95 hover:bg-white border border-[#d8dde4] rounded-xl transition-all duration-200 shadow-xs hover:border-[#b0bac6] active:scale-[0.99] select-none"
            >
              <Play size={15} className="text-teal-600 fill-teal-600" />
              <span>Explore Healvo</span>
            </a>
          </div>

          {/* Reassurance */}
          <div className="mt-5 flex items-center justify-center gap-5 text-[13.5px] font-medium text-[#6b7684]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#0f8a5f]" />
              <span>7-day free trial</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#0f8a5f]" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>

        {/* HERO VISUAL: COLOSSAL REAL PRODUCT EXPERIENCE */}
        <div id="product-demo" className="mt-14 sm:mt-18 lg:mt-22 animate-showcase-reveal scroll-mt-24">
          <ProductShowcase />
        </div>
      </div>
    </section>
  );
}
