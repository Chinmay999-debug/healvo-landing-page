import { CheckCircle2, ArrowRight, ArrowRightCircle } from "lucide-react";

export function ConsultationAndBilling() {
  const steps = [
    { label: "1. Patient Arrival", sub: "Priya Sharma (#1042)" },
    { label: "2. Examination", sub: "Caries Tooth #46" },
    { label: "3. Treatment & Rx", sub: "Composite Restoration" },
    { label: "4. Auto Tax Invoice", sub: "INV-1023 (SAC 999312)" },
    { label: "5. Settled Payment", sub: "₹2,500 via UPI (Paid)" }
  ];

  return (
    <section id="features" className="py-28 sm:py-36 bg-[#f1f5f9] border-t border-[#e2e8f0] relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563eb] text-[12px] font-extrabold uppercase tracking-wider mb-5">
            <span>Connected Clinical & Financial Loop</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0f223a] tracking-tight leading-[1.08]">
            From chairside diagnosis <br className="hidden sm:inline" />
            to settled invoice in seconds.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-[#5b6472] font-normal leading-relaxed">
            Eliminate receptionist confusion and lost revenue. When you complete a dental procedure during consultation, it automatically links to patient records and creates a clean tax invoice.
          </p>
        </div>

        {/* 5-Stage Visual Workflow Track */}
        <div className="max-w-5xl mx-auto mb-16 hidden md:block">
          <div className="bg-white rounded-2xl p-4 border border-[#cbd5e1] shadow-sm flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center">
                <div className="text-center px-3">
                  <div className="text-[13px] font-extrabold text-[#0f223a]">{step.label}</div>
                  <div className="text-[11.5px] font-medium text-[#0ea5b7]">{step.sub}</div>
                </div>
                {idx < steps.length - 1 && (
                  <ArrowRightCircle size={18} className="text-slate-300 mx-1 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Unified Side-by-Side Real UI Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-14">
          {/* Left: Consultation UI */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#cbd5e1] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-extrabold text-[#0ea5b7] uppercase tracking-wider">
                  Chairside Clinical Notes
                </span>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                  Auto-Saved Rx
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#0f223a] mb-2">
                1. Examination & Treatment
              </h3>
              <p className="text-[14.5px] text-[#5b6472] mb-6 leading-relaxed">
                Capture chief complaints, oral findings, treatment items, and prescription medications with standardized clinical templates.
              </p>

              <div className="rounded-2xl overflow-hidden border border-[#cbd5e1] bg-slate-50 shadow-inner">
                <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-[11.5px] font-mono text-slate-500 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>Consultation Workspace · Priya Sharma</span>
                </div>
                <div className="aspect-[16/10.5] overflow-hidden">
                  <img
                    src="/assets/real-product/demo_consultation.png"
                    alt="Real Healvo Consultation Interface with clinical diagnosis and prescription items"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-[13px] font-semibold text-[#0f8a5f]">
              <CheckCircle2 size={16} />
              <span>One-click clinic-branded prescription PDF ready for WhatsApp</span>
            </div>
          </div>

          {/* Right: Real-time Invoicing UI */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#cbd5e1] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-extrabold text-[#2563eb] uppercase tracking-wider">
                  Automated Billing Engine
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  STATUS: PAID
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#0f223a] mb-2">
                2. Instant GST Invoicing
              </h3>
              <p className="text-[14.5px] text-[#5b6472] mb-6 leading-relaxed">
                Treatments recorded in consultation automatically populate invoice line items with your clinic GSTIN and SAC dental codes.
              </p>

              <div className="rounded-2xl overflow-hidden border border-[#cbd5e1] bg-slate-50 shadow-inner">
                <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-[11.5px] font-mono text-slate-500 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>Tax Invoice INV-1023 · Auto-Generated</span>
                </div>
                <div className="aspect-[16/10.5] overflow-hidden">
                  <img
                    src="/assets/real-product/demo_bill_detail.png"
                    alt="Real Healvo Invoice Detail showing line item procedures, GST and payment status"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#0f223a]">
                Tracks Cash, UPI, and Card splits in real time
              </span>
              <a
                href="https://app.healvo.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-bold text-[#0ea5b7] hover:underline inline-flex items-center gap-1"
              >
                <span>View Billing OS</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
