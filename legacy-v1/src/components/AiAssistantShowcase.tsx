import { Sparkles, ShieldCheck, Database, Search } from "lucide-react";

export function AiAssistantShowcase() {
  const sampleQueries = [
    {
      q: "Summarize Priya Sharma's clinical findings and outstanding balance.",
      a: "Priya Sharma (Patient #1042) had composite restoration on tooth #46 on Sep 12. Current balance is ₹0 (INV-1023 paid in full). Follow-up scheduled in 6 months."
    },
    {
      q: "What were yesterday's gross collections across UPI and cash?",
      a: "Yesterday's total collection was ₹24,800 across 8 settled invoices: ₹18,200 via UPI and ₹6,600 in cash."
    },
    {
      q: "List all patients with pending RCT appointments this week.",
      a: "3 patients have pending RCT stages: Rajesh Verma (Tooth #36, Obturation), Sunita Rao (Tooth #14, Canal Prep), and Amit Patel (Tooth #21, Final Crown)."
    }
  ];

  return (
    <section id="ai-assistant" className="py-28 sm:py-36 bg-[#0c1929] text-white border-t border-slate-800 relative overflow-hidden">
      {/* Subtle atmospheric ambient glow behind AI showcase */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-teal-500/15 via-cyan-500/10 to-indigo-500/10 blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-[#2dd4bf] text-[12px] font-extrabold uppercase tracking-wider mb-5">
            <Sparkles size={13} className="text-[#2dd4bf]" />
            <span>The Intelligence Layer</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-black text-white tracking-tight leading-[1.04]">
            Healvo AI Copilot. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-[#2dd4bf] to-cyan-400">
              Trained on your clinic, not the internet.
            </span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Zero generic chatbot chatter. Healvo AI is a pragmatic assistant that reads your actual clinic database to synthesize clinical summaries, verify financial balances, and locate schedule gaps.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Real AI Screenshot in Luminous Frame */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-teal-500/30 bg-slate-900/90 intelligence-glow-frame overflow-hidden">
              <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-[13px] font-semibold text-slate-200 flex items-center gap-2">
                    <Sparkles size={14} className="text-[#2dd4bf]" /> Healvo AI Copilot
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-teal-300 bg-teal-950/80 border border-teal-500/30 px-2.5 py-1 rounded">
                  Clinical Drawer Active
                </span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src="/assets/real-product/demo_ai_open.png"
                  alt="Real Healvo AI Assistant drawer querying patient records and clinical history"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Interactions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-black text-white">
                Pragmatic queries doctors actually ask
              </h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                Instead of searching through multiple screens to check past procedures and dues, simply ask your copilot:
              </p>
            </div>

            <div className="space-y-3.5">
              {sampleQueries.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-2.5 text-[13.5px] hover:border-teal-500/30 transition-colors"
                >
                  <div className="flex items-start gap-2.5 text-teal-200 font-bold">
                    <Search size={16} className="text-[#2dd4bf] shrink-0 mt-0.5" />
                    <span>"{item.q}"</span>
                  </div>
                  <div className="text-slate-300 pl-6 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-[13px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-emerald-400" />
                <span>Zero medical hallucination</span>
              </div>
              <div className="flex items-center gap-2">
                <Database size={17} className="text-[#2dd4bf]" />
                <span>Strict row-level clinic isolation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
