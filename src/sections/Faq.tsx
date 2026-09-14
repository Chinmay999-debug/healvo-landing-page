import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "../lib/Reveal";

const FAQS: [string, string][] = [
  [
    "How does the free trial work?",
    "Your 7-day trial starts when you set up your clinic, with every feature switched on and nothing to pay. When it ends, choose the monthly or annual plan to keep going.",
  ],
  [
    "What do I get on the annual plan?",
    "Exactly the same product as monthly, paid once: ₹5,988 plus GST for 14 months of access. That's 12 months plus 2 months free.",
  ],
  [
    "Do patients need to download an app to book?",
    "No. Your booking page opens in any phone or desktop browser. Patients choose a reason, a day and an open slot, add their name and phone number, and they're booked. A slot can't be double-booked.",
  ],
  [
    "Is Healvo only for dental clinics?",
    "Yes, and that's the point. The chart uses FDI notation with a status and a note for every tooth, consultations record the teeth involved, and booking reasons are the ones dental patients actually come in with.",
  ],
  [
    "Who can see our patient records?",
    "Only the staff you add to your clinic. Each clinic's data is kept separate at the database level with row-level security, so one clinic can never read another clinic's patients, visits or bills.",
  ],
  [
    "What does Healvo AI actually know?",
    "It answers from your own clinic's records: today's schedule, who is waiting, and what has been collected. Ask in plain words, the way you'd ask your front desk.",
  ],
  [
    "Can I use Healvo on a phone or tablet?",
    "Yes. Healvo runs in the browser and works on desktop, tablet and phone, in light or dark mode.",
  ],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-[calc(4rem+env(safe-area-inset-top)+1rem)] md:scroll-mt-24 bg-paper">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:py-40">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <p className="eyebrow text-muted">Questions</p>
            <h2 className="mt-7 font-serif text-[clamp(2.7rem,5vw,4.4rem)] leading-[0.96] tracking-[-0.015em] text-ink">
              Straight <em className="text-teal-deep">answers.</em>
            </h2>
            <p className="mt-5 max-w-[320px] text-[15.5px] leading-relaxed text-ink-2">
              Still unsure? Start the trial and click around your own clinic. It's the fastest way to find out.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-line-strong lg:col-span-8">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="border-b border-line-strong">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="flex gap-5">
                    <span className="pt-2.5 font-mono text-[11.5px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-[25px] leading-tight text-ink transition-colors group-hover:text-teal-deep sm:text-[28px]">
                      {q}
                    </span>
                  </span>
                  <span
                    className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-ink bg-ink text-white" : "border-line-strong text-ink"
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[640px] pr-12 pb-7 pl-10 text-[16px] leading-relaxed text-ink-2">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
