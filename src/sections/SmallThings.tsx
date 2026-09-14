import type { CSSProperties, ReactNode } from "react";
import { Check, Copy, Plus } from "lucide-react";
import { Reveal } from "../lib/Reveal";

const THINGS: { title: string; body: string; glyph: ReactNode }[] = [
  {
    title: "X-rays and photos, straight from the chair",
    body: "Capture with the device camera or upload an image or PDF. Every file is kept on the patient's record as an X-ray, photo, prescription or report.",
    glyph: <DocsGlyph />,
  },
  {
    title: "Walk-ins without the paper register",
    body: "Register a walk-in from the overview in a few taps and they join today's queue alongside booked patients.",
    glyph: (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-[12.5px] font-semibold text-white">
        <Plus size={14} /> Walk-in registration
      </span>
    ),
  },
  {
    title: "One login for the doctor, one for reception",
    body: "Add your team as Doctor or Reception. Everyone works from the same patients, visits and bills.",
    glyph: <RolesGlyph />,
  },
  {
    title: "Follow-ups that don't slip",
    body: "Mark a follow-up as recommended, with a note like “Review after 7 days”, right where the visit ends.",
    glyph: (
      <span className="inline-flex flex-col rounded-lg border border-line-strong bg-[#fffdf9] px-3 py-2 text-[12px]">
        <span className="flex items-center gap-1.5 font-semibold text-ink">
          <Check size={13} className="text-teal" /> Follow-up recommended
        </span>
        <span className="font-mono text-[11px] text-muted">Review after 7 days</span>
      </span>
    ),
  },
  {
    title: "Reports you can actually read",
    body: "Revenue and patient trends for the period you choose, including any custom date range.",
    glyph: <SparkGlyph />,
  },
  {
    title: "A booking link for WhatsApp and Instagram",
    body: "Your clinic gets its own booking page. Put it in your Instagram bio, your Google listing or a WhatsApp message.",
    glyph: (
      <span className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-[#fffdf9] px-3 py-2 font-mono text-[11.5px] text-ink-2">
        app.healvo.in/book/<span className="text-ink">sharma-dental</span>
        <Copy size={12} className="text-muted" />
      </span>
    ),
  },
];

export function SmallThings() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8 lg:py-40">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-muted">And the rest of the clinic</p>
            <h2 className="mt-7 font-serif text-[clamp(2.7rem,5.6vw,5rem)] leading-[0.96] tracking-[-0.015em] text-ink">
              The rest of the clinic, <em className="text-teal-deep">taken care of.</em>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:pb-2">
            <p className="text-[16.5px] leading-relaxed text-ink-2">
              From patient records and follow-ups to reports, bookings and your team, Healvo keeps the everyday work in one place.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-16 md:grid-cols-2 lg:mt-24">
          {THINGS.map((thing, i) => (
            <Reveal key={thing.title} delay={(i % 2) * 90} className="group border-t border-line-strong py-9 lg:py-11">
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex min-h-14 items-start">{thing.glyph}</div>
              </div>
              <h3 className="mt-6 max-w-[440px] font-serif text-[31px] leading-[1.06] text-ink">{thing.title}</h3>
              <p className="mt-3 max-w-[460px] text-[15.5px] leading-relaxed text-ink-2">{thing.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocsGlyph() {
  return (
    <div className="relative h-16 w-44">
      {["X-ray", "Photo", "Prescription", "Report"].map((tag, i) => (
        <span
          key={tag}
          className="absolute top-0 left-0 rounded-md border border-line-strong bg-[#fffdf9] px-2 py-1 font-mono text-[10.5px] text-ink-2 shadow-[0_2px_6px_-2px_rgba(15,34,58,0.15)] transition-transform duration-500 ease-out [transform:var(--a)] group-hover:[transform:var(--b)]"
          style={
            {
              "--a": `translate(${[0, 46, 16, 106][i]}px, ${[0, 4, 22, 26][i]}px) rotate(${[-2, 2, 1, -2][i]}deg)`,
              "--b": `translate(${[-2, 48, 14, 108][i]}px, ${[-2, 2, 24, 28][i]}px) rotate(${[-4, 4, 2, -4][i]}deg)`,
              zIndex: 4 - i,
            } as CSSProperties
          }
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function RolesGlyph() {
  return (
    <div className="flex flex-col gap-1.5 text-[12px]">
      {[
        ["DA", "Dr. Ananya", "Doctor"],
        ["MK", "Meera K.", "Reception"],
      ].map(([initials, name, role]) => (
        <span key={role} className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#e3f4f1] text-[9.5px] font-bold text-teal">
            {initials}
          </span>
          <span className="font-semibold text-ink">{name}</span>
          <span className="rounded bg-[#eef1f4] px-1.5 py-0.5 text-[10.5px] font-semibold text-[#5b6472]">{role}</span>
        </span>
      ))}
    </div>
  );
}

function SparkGlyph() {
  return (
    <svg viewBox="0 0 170 56" className="h-14 w-[170px]" aria-hidden>
      <path d="M2 54 H168" stroke="#d3cab9" strokeWidth="1" />
      <path
        d="M4 44 C 20 40, 26 46, 40 36 S 62 30, 74 34 S 96 18, 110 22 S 134 10, 146 12 S 160 6, 166 4"
        pathLength={1}
        fill="none"
        stroke="#0ea5b7"
        strokeWidth="2"
        strokeLinecap="round"
        className="draw"
      />
      <circle cx="166" cy="4" r="3" fill="#0ea5b7" />
    </svg>
  );
}
