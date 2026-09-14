import { useState } from "react";
import { Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  const features = [
    "Full FDI Two-Digit Dental Charting (Adult & Deciduous)",
    "Chairside Clinical Notes & Digital Prescription PDF",
    "Automated GST Invoicing with SAC Dental Codes",
    "Healvo AI Copilot for Record & Billing Lookups",
    "Public Patient Online Booking Portal (Dedicated URL)",
    "Unlimited Patient Records & Timeline History",
    "Multi-Staff Access: Doctor & Reception Roles",
    "Daily Appointment Queue & Real-Time Schedule",
    "Encrypted Cloud Backups & Export Support"
  ];

  return (
    <section id="pricing" className="py-28 sm:py-36 bg-[#f8fafc] border-t border-[#e6e9ee] relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-[#0891b2] text-[12px] font-extrabold uppercase tracking-wider mb-5">
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0f223a] tracking-tight leading-[1.08]">
            Simple, honest pricing. <br />
            No hidden setup charges.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-[#5b6472] font-normal leading-relaxed max-w-xl mx-auto">
            Try Healvo free for 7 days with full access to all clinical and billing features. No credit card required to start.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="mt-9 inline-flex items-center p-1.5 rounded-2xl bg-white border border-[#cbd5e1] shadow-xs">
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2.5 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-[#0f223a] text-white shadow-sm"
                  : "text-[#5b6472] hover:text-[#0f223a]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                Annual Plan
                <span className={`text-[11.5px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  billingCycle === "annual" ? "bg-teal-400/25 text-teal-200" : "bg-teal-50 text-teal-700 border border-teal-200"
                }`}>
                  14 Mos (2 Free)
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-xl text-[14px] font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#0f223a] text-white shadow-sm"
                  : "text-[#5b6472] hover:text-[#0f223a]"
              }`}
            >
              Monthly Plan
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Plan Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-[#0ea5b7] p-8 sm:p-12 shadow-xl relative flex flex-col justify-between">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-10 bg-[#0ea5b7] text-white text-[12px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Full Clinical OS Access</span>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-3xl font-black text-[#0f223a]">Healvo Dental</h3>
                  <p className="text-[15px] text-[#5b6472] mt-1">Complete dental practice management workspace</p>
                </div>
                <div className="text-left sm:text-right">
                  {billingCycle === "annual" ? (
                    <div>
                      <div className="text-5xl sm:text-6xl font-black text-[#0f223a] tracking-tight">
                        ₹5,988
                      </div>
                      <div className="text-[13px] font-bold text-[#0891b2] mt-1">
                        per year + applicable GST (14 months access)
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-5xl sm:text-6xl font-black text-[#0f223a] tracking-tight">
                        ₹499
                      </div>
                      <div className="text-[13px] font-bold text-[#5b6472] mt-1">
                        per month + applicable GST
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Special Offer Alert for Annual */}
              {billingCycle === "annual" && (
                <div className="my-6 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-[13.5px] text-[#0f223a] font-semibold flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0ea5b7] shrink-0" />
                  <span>
                    <strong>14 Months Total Access:</strong> 12 months paid upfront + 2 additional bonus months included at no extra cost.
                  </span>
                </div>
              )}

              {/* Features List */}
              <div className="mt-8 pt-7 border-t border-[#e2e8f0] grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-100 text-[#0891b2] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <span className="text-[14px] font-semibold text-[#334155]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-7 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href="https://app.healvo.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[16px] font-bold text-white bg-[#0f223a] hover:bg-[#182f4d] rounded-xl transition-all shadow-md hover:shadow-xl active:scale-[0.99]"
              >
                <span>Start 7-day free trial</span>
                <ArrowRight size={17} className="text-teal-300" />
              </a>
              <div className="text-[13px] font-semibold text-slate-500">
                Instant activation · No credit card required
              </div>
            </div>
          </div>

          {/* Trial / Guarantee Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#cbd5e1] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 text-[#0ea5b7] flex items-center justify-center">
                <ShieldCheck size={26} />
              </div>
              <h4 className="text-2xl font-black text-[#0f223a]">
                Why start with our 7-day trial?
              </h4>
              <ul className="space-y-4 text-[14px] text-[#5b6472]">
                <li className="flex items-start gap-2.5">
                  <span className="text-teal-600 font-bold text-base">✓</span>
                  <span><strong>Zero financial risk:</strong> No payment details collected upfront.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-teal-600 font-bold text-base">✓</span>
                  <span><strong>Full capabilities:</strong> Test actual dental charting, consultation notes, and billing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-teal-600 font-bold text-base">✓</span>
                  <span><strong>Your data is yours:</strong> Seamlessly export patient records whenever you want.</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-[#e2e8f0] text-[13px] text-slate-400 leading-relaxed">
              Need assistance setting up your clinic? Our team helps you import existing patient records smoothly without disrupting patient care.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
