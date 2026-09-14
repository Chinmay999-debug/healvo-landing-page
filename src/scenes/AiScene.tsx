import { ArrowUp } from "lucide-react";
import { formatINR, useCountUp, useTimeline, useTypewriter } from "../lib/motion";

// The suggested prompts shipped in the product's Healvo AI widget.
const PROMPTS = [
  "What's happening today?",
  "Who is waiting right now?",
  "Show me today's schedule",
  "How much did we collect today?",
];
const QUESTION = PROMPTS[3];
const ANSWER =
  "You've collected ₹18,400 today from 11 payments: ₹12,900 by UPI, ₹4,300 in cash and ₹1,200 by card. One bill is still partly unpaid: Neha Iyer, ₹600 due.";
const DURATIONS = [1600, 900, 700, 1400, 3900, 3400];

export function AiScene({ active }: { active: boolean }) {
  const step = useTimeline(active, DURATIONS);
  const answer = useTypewriter(ANSWER, active && step >= 4, 17);
  const collected = useCountUp(step >= 4 ? 18400 : 0, active, 1800);
  const showCard = step >= 4;

  return (
    <div className="relative flex w-full items-center justify-center">
      {/* Today's collection card */}
      <div
        className={`absolute top-6 left-0 hidden w-[220px] rounded-2xl bg-white p-4 text-[#0f223a] shadow-scene transition-all duration-700 sm:block xl:left-2 ${
          showCard ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="text-[11.5px] text-[#6b7684]">Today's collection</p>
        <p className="mt-1 text-[28px] font-bold tracking-tight tabular-nums">{formatINR(collected)}</p>
        <div className="mt-3 flex h-2 gap-0.5 overflow-hidden rounded-full bg-[#eef1f4]">
          {[
            [70, "bg-[#0ea5b7]"],
            [23, "bg-[#0f223a]"],
            [7, "bg-[#97a1ad]"],
          ].map(([w, c], i) => (
            <span
              key={i}
              className={`h-full transition-[width] duration-1000 ease-out ${c}`}
              style={{ width: showCard ? `${w}%` : "0%", transitionDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <div className="mt-2.5 space-y-1 text-[11px] text-[#6b7684]">
          {[
            ["UPI", "₹12,900", "bg-[#0ea5b7]"],
            ["Cash", "₹4,300", "bg-[#0f223a]"],
            ["Card", "₹1,200", "bg-[#97a1ad]"],
          ].map(([m, v, c]) => (
            <p key={m} className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${c}`} />
              {m}
              <span className="ml-auto font-mono text-[#0f223a]">{v}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-[380px] overflow-hidden rounded-2xl bg-white text-[#0f223a] shadow-scene sm:ml-52">
        <div className="flex items-center gap-3 border-b border-[#e6e9ee] px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0ea5b7] text-white">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 12a8 8 0 1 1 3.4 6.5L4 20l1.2-3.3A7.9 7.9 0 0 1 4 12Z" strokeLinejoin="round" />
              <path d="M9.5 10v3M14.5 10v3" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <p className="text-[14px] font-bold">Healvo AI</p>
            <p className="text-[11.5px] text-[#6b7684]">Your clinic assistant</p>
          </div>
        </div>

        <div className="flex h-[340px] flex-col gap-2.5 px-4 py-4 text-[13px] leading-relaxed">
          <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-[#f3f5f8] px-3.5 py-2.5">
            Good evening, Dr. Ananya. Ask me anything about your clinic today.
          </div>

          {step < 2 && (
            <div className="mt-auto flex flex-wrap gap-1.5">
              {PROMPTS.map((p) => (
                <span
                  key={p}
                  className={`rounded-lg border px-2.5 py-1.5 text-[12px] transition-all duration-300 ${
                    step === 1 && p === QUESTION
                      ? "scale-[1.03] border-[#0ea5b7] bg-[#effafb] text-[#0b7f8d]"
                      : "border-[#e6e9ee] text-[#3d4b5e]"
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>
          )}

          {step >= 2 && (
            <div className="fade-up ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-[#0f223a] px-3.5 py-2.5 text-white">
              {QUESTION}
            </div>
          )}
          {step === 3 && (
            <div className="dots fade-up flex w-fit gap-1 rounded-2xl rounded-tl-md bg-[#f3f5f8] px-3.5 py-3.5">
              <span />
              <span />
              <span />
            </div>
          )}
          {step >= 4 && (
            <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-[#f3f5f8] px-3.5 py-2.5">
              <span className={answer.length < ANSWER.length ? "caret" : ""}>{answer}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-[#e6e9ee] px-3 py-3">
          <span className="flex h-9 flex-1 items-center rounded-lg border border-[#d8dde4] px-3 text-[13px] text-[#97a1ad]">
            Ask Healvo AI...
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#0f223a] text-white">
            <ArrowUp size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}
