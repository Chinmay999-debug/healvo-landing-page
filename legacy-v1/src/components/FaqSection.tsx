import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does the 7-day free trial work?",
    answer: "You get full, unrestricted access to every single feature in Healvo — including the interactive FDI dental chart, clinical consultations, automated GST billing, online patient booking, and Healvo AI copilot. No credit card is required to begin, and there are zero setup fees."
  },
  {
    question: "What is included in the annual plan's 14-month entitlement?",
    answer: "When you choose the annual plan at ₹5,988 + applicable GST, you receive 14 full months of clinic access instead of the standard 12 (12 months paid + 2 bonus months free). There are no hidden upgrade charges or surprise maintenance fees."
  },
  {
    question: "Can I import existing patient records from Excel or another software?",
    answer: "Yes. Healvo makes it straightforward to import existing patient profiles, contact numbers, and basic clinical records so your practice transition doesn't interrupt daily patient care."
  },
  {
    question: "Does Healvo support GST-compliant dental invoices and SAC codes?",
    answer: "Yes. You can add your clinic's GSTIN and address in Settings. All generated invoices automatically calculate CGST, SGST, or IGST, include dental SAC service codes, track multiple payment modes (UPI, Cash, Card, Net Banking), and produce clinic-branded PDFs."
  },
  {
    question: "Is patient and clinical data safe, backed up, and isolated?",
    answer: "Healvo enforces row-level security and strong database isolation. Your patient data is encrypted in transit and at rest, backed up automatically in the cloud, and accessible strictly by your authorized clinic staff."
  },
  {
    question: "Does patient booking require patients to download an application?",
    answer: "No. Your dedicated public booking URL (e.g. healvo.in/book/your-clinic) runs directly in any modern mobile or desktop browser. Patients simply select an available slot based on your clinic's operating hours and confirm with their phone number."
  }
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-28 sm:py-36 bg-white border-t border-[#e6e9ee]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#0f223a] text-[12px] font-extrabold uppercase tracking-wider mb-5">
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0f223a] tracking-tight">
            Clear answers for clinic owners.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5b6472]">
            Everything you need to know about getting started, pricing, security, and migration.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#cbd5e1] bg-white overflow-hidden transition-all duration-150"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-7 py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16.5px] font-bold text-[#0f223a]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#6b7684] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0ea5b7]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-7 pb-6 pt-1 text-[15px] text-[#5b6472] leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
