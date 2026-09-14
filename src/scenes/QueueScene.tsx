import { Plus } from "lucide-react";
import { useTimeline } from "../lib/motion";
import { AppFrame, Avatar, Badge, VISIT_META, type Tone, type VisitStatus } from "./ui";

interface Row {
  id: string;
  time: string;
  name: string;
  initials: string;
  reason: string;
  status: VisitStatus;
  walkIn?: boolean;
}

const DURATIONS = [1400, 1600, 1600, 1900, 1600, 2800];
/** Which row changed at each step, for the highlight flash. */
const CHANGED: Record<number, string> = { 1: "r", 2: "p", 3: "w", 4: "r" };

function rowsFor(step: number): Row[] {
  const rows: Row[] = [
    { id: "a", time: "09:30", name: "Amit Gupta", initials: "AG", reason: "Crown consultation", status: "completed" },
    {
      id: "p",
      time: "10:00",
      name: "Priya Sharma",
      initials: "PS",
      reason: "Follow-up cleaning",
      status: step >= 2 ? "completed" : "in-treatment",
    },
    {
      id: "r",
      time: "10:30",
      name: "Rahul Verma",
      initials: "RV",
      reason: "Dental pain",
      status: step >= 4 ? "in-treatment" : step >= 1 ? "checked-in" : "scheduled",
    },
    { id: "n", time: "11:00", name: "Neha Iyer", initials: "NI", reason: "Cleaning", status: "scheduled" },
    { id: "f", time: "11:30", name: "Farhan Qureshi", initials: "FQ", reason: "Tooth sensitivity", status: "scheduled" },
  ];
  if (step >= 3) {
    rows.splice(3, 0, {
      id: "w",
      time: "10:36",
      name: "Sanjay Kulkarni",
      initials: "SK",
      reason: "Walk-in · Tooth pain",
      status: "checked-in",
      walkIn: true,
    });
  }
  return rows;
}

export function QueueScene({ active }: { active: boolean }) {
  const step = useTimeline(active, DURATIONS);
  const rows = rowsFor(step);
  const count = (s: VisitStatus) => rows.filter((r) => r.status === s).length;

  return (
    <AppFrame crumb="Today" className="max-w-[590px]">
      <div className="p-4 sm:p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h4 className="text-[22px] font-bold tracking-tight">Today</h4>
            <p className="text-[12.5px] text-[#6b7684]">Monday, 14 Sept · {rows.length} visits</p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12.5px] font-semibold text-white transition-all duration-300 ${
              step === 3 ? "scale-95 bg-[#0ea5b7] ring-4 ring-[#0ea5b7]/25" : "bg-[#0f223a]"
            }`}
          >
            <Plus size={14} /> Walk-in
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat label="Waiting" value={count("checked-in")} tone="blue" />
          <Stat label="In treatment" value={count("in-treatment")} tone="amber" />
          <Stat label="Completed" value={count("completed")} tone="mint" />
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-[#e6e9ee]">
          <div className="grid grid-cols-[46px_1fr_auto] gap-3 bg-[#f6f8fa] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#6b7684]">
            <span>Time</span>
            <span>Patient</span>
            <span>Status</span>
          </div>
          {rows.map((r) => (
            <div key={r.id} className={r.walkIn && step === 3 ? "row-in" : ""}>
              <div
                className={`grid grid-cols-[46px_1fr_auto] items-center gap-3 border-t border-[#eef1f4] px-3.5 py-2.5 transition-colors duration-700 ${
                  CHANGED[step] === r.id ? "bg-[#effafb]" : "bg-white"
                }`}
              >
                <span className="font-mono text-[11.5px] text-[#6b7684]">{r.time}</span>
                <span className="flex min-w-0 items-center gap-2.5">
                  <Avatar initials={r.initials} />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold">{r.name}</span>
                    <span className="block truncate text-[11.5px] text-[#6b7684]">{r.reason}</span>
                  </span>
                </span>
                <Badge key={r.status} tone={VISIT_META[r.status].tone} className="pop-in">
                  {VISIT_META[r.status].label}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

const DOT: Record<Tone, string> = {
  slate: "bg-[#97a1ad]",
  blue: "bg-[#2563eb]",
  amber: "bg-[#c2660c]",
  mint: "bg-[#0f8a5f]",
};

function Stat({ label, value, tone }: { label: string; value: number; tone: Tone }) {
  return (
    <div className="rounded-xl border border-[#e6e9ee] px-3 py-2.5">
      <p className="flex items-center gap-1.5 text-[11px] text-[#6b7684]">
        <span className={`h-1.5 w-1.5 rounded-full ${DOT[tone]}`} />
        {label}
      </p>
      <p key={value} className="pop-in mt-0.5 text-[22px] font-bold tabular-nums">
        {value}
      </p>
    </div>
  );
}
