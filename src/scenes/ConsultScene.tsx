import { Check } from "lucide-react";
import { useTimeline, useTypewriter } from "../lib/motion";
import { LOWER_ARCH } from "../lib/teeth";
import { ToothCrown, ToothDefs } from "../lib/Tooth";
import { AppFrame, Avatar, Badge } from "./ui";

const WORDS = "Sharp pain on the lower right when I chew. Worse with cold water.";
const NOTES = "46: deep distal caries, tender on percussion. RCT advised, 2 sittings discussed.";
const RX = "Tab. Ibuprofen 400 mg, after food, SOS";
const DURATIONS = [600, 2300, 2900, 1400, 1700, 3000];
const TABS = ["Overview", "Consultation", "Dental chart", "Documents", "History", "Billing"];

export function ConsultScene({ active }: { active: boolean }) {
  const step = useTimeline(active, DURATIONS);
  const words = useTypewriter(WORDS, active && step >= 1, 30);
  const notes = useTypewriter(NOTES, active && step >= 2, 30);
  const rx = useTypewriter(RX, active && step >= 4, 34);
  const toothOn = step >= 3;
  const saved = step >= 5;

  return (
    <AppFrame crumb="Rahul Verma" className="max-w-[590px]">
      <div className="px-4 pt-4 sm:px-5">
        <div className="flex items-center gap-3">
          <Avatar initials="RV" className="h-10 w-10 text-[13px]" />
          <div className="min-w-0">
            <p className="text-[16px] font-bold tracking-tight">Rahul Verma</p>
            <p className="truncate text-[11.5px] text-[#6b7684]">Age 34 · Male · +91 98450 21734</p>
          </div>
          <Badge tone="amber" className="ml-auto">
            In treatment
          </Badge>
        </div>
        <div className="mt-3 flex gap-4 overflow-hidden border-b border-[#e6e9ee] text-[12px] whitespace-nowrap">
          {TABS.map((t) => (
            <span
              key={t}
              className={`-mb-px border-b-2 pb-2 ${
                t === "Consultation" ? "border-[#0ea5b7] font-semibold text-[#0f223a]" : "border-transparent text-[#6b7684]"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3 px-4 py-4 sm:px-5">
        <FormField
          label="Patient's words"
          hint="What is the patient experiencing?"
          value={words}
          typing={active && step >= 1 && words.length < WORDS.length}
        />
        <FormField
          label="Clinical notes"
          hint="Record your findings, diagnosis, treatment and advice."
          value={notes}
          typing={active && step >= 2 && notes.length < NOTES.length}
        />

        <div>
          <p className="text-[12.5px] font-bold">Dental chart</p>
          <p className="text-[11.5px] text-[#6b7684]">Select teeth involved in this consultation.</p>
          <div className="mt-1.5 flex items-center gap-3 rounded-lg border border-[#e6e9ee] bg-[#fffdf9] px-2 py-1">
            <MiniQuadrant selected={toothOn} />
            {toothOn && (
              <span className="pop-in ml-auto hidden rounded-md bg-[#effafb] px-2 py-1 text-[11.5px] font-semibold whitespace-nowrap text-[#0b7f8d] sm:inline">
                46 · First molar
              </span>
            )}
          </div>
        </div>

        <FormField label="Prescription" value={rx} typing={active && step >= 4 && rx.length < RX.length} />

        <div className="flex items-center justify-between pt-1">
          <span
            className={`flex items-center gap-1.5 text-[12px] text-[#0f8a5f] transition-opacity duration-500 ${
              saved ? "opacity-100" : "opacity-0"
            }`}
          >
            <Check size={14} /> Saved to today's visit
          </span>
          <span
            className={`rounded-lg px-3.5 py-2 text-[12.5px] font-semibold transition-colors duration-500 ${
              saved ? "bg-[#e6f7f1] text-[#0f8a5f]" : "bg-[#0f223a] text-white"
            }`}
          >
            {saved ? "Saved" : "Save consultation"}
          </span>
        </div>
      </div>
    </AppFrame>
  );
}

function FormField({ label, hint, value, typing }: { label: string; hint?: string; value: string; typing: boolean }) {
  return (
    <div>
      <p className="text-[12.5px] font-bold">{label}</p>
      {hint && <p className="text-[11.5px] text-[#6b7684]">{hint}</p>}
      <div
        className={`mt-1.5 min-h-[38px] rounded-lg border px-3 py-2 text-[12.5px] leading-relaxed transition-colors ${
          typing ? "border-[#0ea5b7] ring-2 ring-[#0ea5b7]/15" : "border-[#e6e9ee]"
        }`}
      >
        <span className={typing ? "caret" : ""}>{value}</span>
      </div>
    </div>
  );
}

function MiniQuadrant({ selected }: { selected: boolean }) {
  // Lower-right quadrant: 48 47 46 45 44 43 42 41
  const teeth = LOWER_ARCH.slice(0, 8);
  return (
    <svg viewBox="0 0 336 74" className="h-[58px] w-auto max-w-full" aria-hidden>
      <ToothDefs id="consult" />
      {teeth.map((meta, i) => {
        const on = selected && meta.fdi === "46";
        return (
          <g key={meta.fdi} transform={`translate(${24 + i * 41} 28) scale(.76)`}>
            <ToothCrown meta={meta} status={on ? "treatment-planned" : "normal"} id="consult" selected={on} />
            <text
              y={48}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              fill={on ? "#0b7f8d" : "#8f8a80"}
              className="font-mono"
            >
              {meta.fdi}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
