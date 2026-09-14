import type { ReactNode } from "react";

export type Tone = "slate" | "blue" | "amber" | "mint";

const TONE: Record<Tone, string> = {
  slate: "bg-[#eef1f4] text-[#5b6472]",
  blue: "bg-[#eaf1fd] text-[#2563eb]",
  amber: "bg-[#fdf1e7] text-[#c2660c]",
  mint: "bg-[#e6f7f1] text-[#0f8a5f]",
};

export function Badge({ tone, children, className = "" }: { tone: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11.5px] font-semibold whitespace-nowrap ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export type VisitStatus = "scheduled" | "checked-in" | "in-treatment" | "completed";

// Same status → label/tone mapping as the product's VisitStatusBadge.
export const VISIT_META: Record<VisitStatus, { label: string; tone: Tone }> = {
  scheduled: { label: "Scheduled", tone: "slate" },
  "checked-in": { label: "Checked in", tone: "blue" },
  "in-treatment": { label: "In treatment", tone: "amber" },
  completed: { label: "Completed", tone: "mint" },
};

export function Avatar({ initials, className = "" }: { initials: string; className?: string }) {
  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e3f4f1] text-[11px] font-bold text-[#0ea5b7] ${className}`}
    >
      {initials}
    </span>
  );
}

/** A slice of the Healvo app chrome: wordmark, breadcrumb, avatar. */
export function AppFrame({ crumb, children, className = "" }: { crumb: string; children: ReactNode; className?: string }) {
  return (
    <div className={`w-full overflow-hidden rounded-2xl bg-white text-[#0f223a] shadow-scene ${className}`}>
      <div className="flex h-11 items-center gap-3 border-b border-[#e6e9ee] px-4">
        <span className="wordmark text-[15px]">
          Heal<span className="text-[#0ea5b7]">vo</span>
        </span>
        <span className="h-4 w-px bg-[#e6e9ee]" />
        <span className="truncate text-[12px] text-[#6b7684]">
          Clinic <span className="mx-1">/</span>
          <span className="font-medium text-[#0f223a]">{crumb}</span>
        </span>
        <span className="ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e3f4f1] text-[9.5px] font-bold text-[#0ea5b7]">
          DA
        </span>
      </div>
      {children}
    </div>
  );
}
