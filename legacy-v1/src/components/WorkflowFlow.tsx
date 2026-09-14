import { useState } from "react";
import { UserCheck, Stethoscope, FileText, Receipt, Sparkles, CheckCircle2 } from "lucide-react";

interface WorkflowStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof UserCheck;
  image: string;
  details: string[];
}

const STEPS: WorkflowStep[] = [
  {
    id: "checkin",
    number: "01",
    title: "Patient Arrival & Identity",
    subtitle: "Complete clinical history in two keystrokes",
    description: "Search patients by mobile number or name. Immediately surface active medical alerts (allergies, diabetes, hypertension), previous treatments, and pending appointments before they even sit in the chair.",
    icon: UserCheck,
    image: "/assets/real-product/demo_priya_record.png",
    details: [
      "Instant fuzzy search by phone number or name",
      "Prominent medical condition alerts & allergies",
      "Complete chronological timeline of prior clinic visits"
    ]
  },
  {
    id: "charting",
    number: "02",
    title: "FDI Anatomical Dental Chart",
    subtitle: "Tooth-by-tooth status with adult & pediatric views",
    description: "Interactive 32-tooth FDI international notation. Mark caries, existing restorations, missing teeth, endodontic treatments, and crowns with surface-level precision across Mesial, Occlusal, Distal, Buccal, and Lingual facets.",
    icon: Stethoscope,
    image: "/assets/real-product/demo_dental_chart.png",
    details: [
      "Standard FDI two-digit tooth numbering system",
      "Surface-specific tracking (MO, DO, MOD, Incisal)",
      "Permanent & deciduous (primary) dentition support"
    ]
  },
  {
    id: "consultation",
    number: "03",
    title: "Chairside Consultation & Rx",
    subtitle: "Clinical notes and prescriptions in seconds",
    description: "Record chief complaints, clinical examination findings, and confirmed diagnoses. Prescribe medications with automated dosage templates and generate professional clinic-branded printouts or WhatsApp PDFs.",
    icon: FileText,
    image: "/assets/real-product/demo_consultation.png",
    details: [
      "Fast clinical complaints & diagnosis selectors",
      "Medication dosage, frequency, and duration presets",
      "One-click PDF generation with clinic letterhead"
    ]
  },
  {
    id: "billing",
    number: "04",
    title: "Automated GST Invoicing",
    subtitle: "Clinical treatments flow straight into billing",
    description: "No double entry. Completed procedures automatically populate line items on tax invoices. Track advance deposits, split payments (UPI, Cash, Card), and monitor overdue balances without separate accounting software.",
    icon: Receipt,
    image: "/assets/real-product/demo_bill_detail.png",
    details: [
      "GST-compliant dental invoices with clinic GSTIN",
      "Real-time payment status (Paid, Partial, Overdue)",
      "Itemized treatment fee breakdown and discounts"
    ]
  },
  {
    id: "intelligence",
    number: "05",
    title: "Healvo AI Copilot",
    subtitle: "Natural language answers from your clinic data",
    description: "Query your clinic in plain English. Ask Healvo AI to summarize complex multi-visit treatment plans, calculate this month's gross collections, or review a patient's pending RCT procedures.",
    icon: Sparkles,
    image: "/assets/real-product/demo_ai_open.png",
    details: [
      "Grounded only in your clinic's actual records",
      "Zero medical hallucination — administrative & clinical copilot",
      "Instant query results without manual spreadsheet math"
    ]
  }
];

export function WorkflowFlow() {
  const [activeStepId, setActiveStepId] = useState<string>(STEPS[0].id);
  const activeStep = STEPS.find((s) => s.id === activeStepId) || STEPS[0];

  return (
    <section id="workflow" className="py-28 sm:py-36 bg-[#f8fafc] border-t border-[#e6e9ee] relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-[#0891b2] text-[12px] font-extrabold uppercase tracking-wider mb-5">
            <span>The Clinic in One Flow</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0f223a] tracking-tight leading-[1.08]">
            One connected loop. <br className="hidden sm:inline" />
            Not five disconnected tools.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-[#5b6472] font-normal leading-relaxed">
            Most dental clinics juggle paper charts, separate billing software, and physical registers.
            Healvo links every step — from reception check-in to dental charting, prescription, and final invoice.
          </p>
        </div>

        {/* Interactive Step Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-10">
          {STEPS.map((step) => {
            const isActive = step.id === activeStepId;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepId(step.id)}
                className={`flex flex-col text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white border-[#0ea5b7] shadow-lg ring-2 ring-[#0ea5b7]/20 scale-[1.02]"
                    : "bg-white/70 hover:bg-white border-[#e2e8f0] hover:border-[#cbd5e1] shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`text-[12px] font-extrabold tracking-wider ${isActive ? "text-[#0ea5b7]" : "text-slate-400"}`}>
                    {step.number}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? "bg-teal-50 text-[#0ea5b7]" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon size={17} />
                  </div>
                </div>
                <h3 className={`text-[15px] font-bold leading-snug line-clamp-1 ${isActive ? "text-[#0f223a]" : "text-[#475467]"}`}>
                  {step.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Expansive Step Deep Dive Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#d8dde4] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Text Description Column */}
          <div className="lg:col-span-4 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#e6e9ee] bg-white">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[12.5px] font-extrabold text-[#0ea5b7] uppercase tracking-wider">
                  Step {activeStep.number}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-[12.5px] font-semibold text-slate-500">Live in Healvo</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0f223a] tracking-tight leading-snug">
                {activeStep.title}
              </h3>
              <p className="mt-2 text-[15px] font-bold text-[#0891b2]">
                {activeStep.subtitle}
              </p>

              <p className="mt-5 text-[15px] text-[#5b6472] leading-relaxed">
                {activeStep.description}
              </p>

              <div className="mt-8 pt-7 border-t border-[#f1f5f9] space-y-3.5">
                {activeStep.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#0f8a5f] shrink-0 mt-0.5" />
                    <span className="text-[14px] font-semibold text-[#334155]">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-7 border-t border-[#f1f5f9]">
              <a
                href="https://app.healvo.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14.5px] font-bold text-[#0ea5b7] hover:text-[#0891b2] inline-flex items-center gap-2 transition-colors"
              >
                <span>Try this workflow in free trial</span>
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>

          {/* Colossal Real Software UI Showcase Column */}
          <div className="lg:col-span-8 bg-[#f8fafc] p-4 sm:p-8 lg:p-10 flex items-center justify-center">
            <div className="w-full rounded-2xl overflow-hidden border border-[#cbd5e1] shadow-xl bg-white">
              {/* Browser Bar */}
              <div className="px-4 py-3 bg-[#edf2f7] border-b border-[#cbd5e1] flex items-center justify-between text-[12px] text-slate-500 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[12px] text-slate-700 font-sans font-semibold">Healvo Clinic OS · Active Patient Record</span>
                </div>
                <span className="hidden sm:inline text-slate-400 font-sans text-[11px]">app.healvo.in</span>
              </div>

              {/* Real Product Screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                <img
                  src={activeStep.image}
                  alt={`Healvo ${activeStep.title} real product interface`}
                  className="w-full h-full object-cover object-top transition-opacity duration-300"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
