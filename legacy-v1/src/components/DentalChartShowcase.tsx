import { Check, ShieldCheck, Activity, Layers } from "lucide-react";

export function DentalChartShowcase() {
  const chartHighlights = [
    {
      icon: Activity,
      title: "FDI Two-Digit Notation",
      desc: "Full 32 permanent teeth and 20 primary deciduous teeth with standardized international FDI quadrants (11–48 and 51–85)."
    },
    {
      icon: Layers,
      title: "5-Surface Precision",
      desc: "Record exact lesion boundaries across Mesial, Occlusal, Distal, Buccal, and Lingual surfaces in a single click."
    },
    {
      icon: ShieldCheck,
      title: "Clinical Condition Status",
      desc: "Instant color codes for Caries, Existing Fillings, Missing teeth, Crowns, Bridges, and Root Canal Treatments."
    },
    {
      icon: Check,
      title: "Per-Tooth Treatment History",
      desc: "Every procedure is permanently indexed by tooth number, providing instant audit trails across years of patient visits."
    }
  ];

  return (
    <section id="dental-chart" className="py-28 sm:py-36 bg-white border-t border-[#e6e9ee] relative overflow-hidden">
      {/* Background atmospheric glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[550px] bg-gradient-to-r from-teal-50/70 via-blue-50/50 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#0f223a] text-[12px] font-extrabold uppercase tracking-wider mb-5">
            <span>Built Specifically for Dentistry</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-black text-[#0f223a] tracking-tight leading-[1.04]">
            Know every tooth. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5b7] to-[#0891b2]">
              Know every treatment.
            </span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-[#5b6472] font-normal leading-relaxed max-w-2xl mx-auto">
            Generic medical software lumps dental procedures into vague text notes. Healvo gives you a fast, interactive FDI anatomical dental chart directly inside each patient's record.
          </p>
        </div>

        {/* COLOSSAL DENTAL CHART SHOWCASE — FULL PRESENCE & CLARITY */}
        <div className="w-full max-w-[1300px] mx-auto mb-16">
          <div className="rounded-3xl border border-[#cbd5e1] bg-white shadow-2xl overflow-hidden product-showcase-frame">
            {/* Browser Bar */}
            <div className="px-5 py-3.5 bg-[#edf2f7] border-b border-[#cbd5e1] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[13px] font-semibold text-slate-700">
                  Patient: Priya Sharma · Interactive FDI Dental Chart
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11.5px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  Tooth #46 (Lower Right 1st Molar) Selected
                </span>
              </div>
            </div>

            {/* Massive Real FDI Chart UI Capture from healvo-main */}
            <div className="relative aspect-[16/9.5] overflow-hidden bg-slate-50">
              <img
                src="/assets/real-product/demo_dental_chart.png"
                alt="Real Healvo FDI Dental Chart Interface showing Tooth 46 caries, surface markings, and adult dentition"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            </div>

            {/* Bottom Status Bar */}
            <div className="px-6 py-4 bg-slate-50 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-4 text-[13px] text-[#475467]">
              <div className="flex items-center gap-6">
                <span className="inline-flex items-center gap-2 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Caries (Decay)
                </span>
                <span className="inline-flex items-center gap-2 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> Restoration Completed
                </span>
                <span className="inline-flex items-center gap-2 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> RCT Required
                </span>
              </div>
              <span className="font-bold text-[#0f223a]">Adult Dentition (32 Teeth) & Deciduous Mode</span>
            </div>
          </div>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chartHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:border-[#cbd5e1] hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0ea5b7] flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-[16px] font-bold text-[#0f223a] mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#5b6472] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
