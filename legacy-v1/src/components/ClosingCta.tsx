import type React from "react";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";

export function ClosingCta() {
  const scrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("product-demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-28 sm:py-36 bg-[#f8fafc] relative overflow-hidden border-t border-[#e6e9ee]">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-teal-100/50 via-blue-100/40 to-slate-100/30 blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-[#0f223a] tracking-tight leading-[1.06]">
          Ready to run your clinic with clarity?
        </h2>
        <p className="mt-5 text-lg sm:text-xl text-[#5b6472] max-w-2xl mx-auto leading-relaxed">
          Switch from chaotic paperwork and disconnected software to one cohesive workspace built specifically for modern dental clinics.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            href="https://app.healvo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[16px] font-bold text-white bg-[#0f223a] hover:bg-[#182f4d] rounded-xl transition-all shadow-md hover:shadow-xl active:scale-[0.99]"
          >
            <span>Start your 7-day free trial</span>
            <ArrowRight size={17} className="text-teal-300" />
          </a>

          <a
            href="#product-demo"
            onClick={scrollToDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-[15.5px] font-semibold text-[#0f223a] bg-white hover:bg-slate-50 border border-[#cbd5e1] rounded-xl transition-all shadow-xs"
          >
            <Play size={14} className="text-teal-600 fill-teal-600" />
            <span>Explore Healvo</span>
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-[13.5px] font-medium text-[#6b7684]">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#0f8a5f]" />
            <span>7-day free trial</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#0f8a5f]" />
            <span>No credit card required</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#0f8a5f]" />
            <span>Instant clinic setup</span>
          </div>
        </div>
      </div>
    </section>
  );
}
