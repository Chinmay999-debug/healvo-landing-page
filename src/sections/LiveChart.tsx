import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { Check, RotateCcw } from "lucide-react";
import {
  ALL_TEETH,
  QUADRANT_LABEL,
  STATUS_META,
  STATUS_ORDER,
  TOOTH_TYPE_LABEL,
  archPoint,
  findTooth,
  type ToothStatus,
} from "../lib/teeth";
import { ToothCrown, ToothDefs } from "../lib/Tooth";
import { formatINR, useCountUp, useInView, usePrefersReducedMotion, useTypewriter } from "../lib/motion";

type Statuses = Record<string, ToothStatus>;

interface ChartState {
  statuses: Statuses;
  notes: Record<string, string>;
  selected: string | null;
  log: string[];
}

interface Step {
  cursor?: string;
  select?: string | null;
  set?: Statuses;
  note?: [string, string];
  log?: string;
  ms: number;
}

const VIEW_W = 820;
const VIEW_H = 376;
const CENTER_X = 410;
const UPPER_Y = 58;
const LOWER_Y = 250;
const PARK = { x: 640, y: 196 };

// Demo patient — fictional data, never connected to a real clinic.
const BASE: Statuses = {
  "18": "missing",
  "38": "missing",
  "16": "treatment-completed",
  "36": "treatment-completed",
  "24": "needs-attention",
};

/** The scripted "dentist at work" loop that plays until the visitor takes over. */
const SCRIPT: Step[] = [
  { ms: 2000 },
  { cursor: "46", ms: 950 },
  { cursor: "46", select: "46", ms: 900 },
  {
    cursor: "46",
    set: { "46": "needs-attention" },
    note: ["46", "Deep distal caries, tender on biting"],
    log: "46 · Needs attention",
    ms: 2700,
  },
  { cursor: "46", set: { "46": "treatment-planned" }, log: "46 · Root canal planned", ms: 1800 },
  { cursor: "24", ms: 950 },
  { cursor: "24", select: "24", ms: 900 },
  {
    cursor: "24",
    set: { "24": "treatment-completed" },
    note: ["24", "Composite restoration done today"],
    log: "24 · Treatment completed",
    ms: 2700,
  },
  { cursor: "11", ms: 950 },
  { cursor: "11", select: "11", note: ["11", "Small incisal chip. Review in 6 months"], log: "11 · Note added", ms: 3100 },
  { select: null, ms: 1500 },
];

function fold(upTo: number): ChartState {
  const statuses: Statuses = { ...BASE };
  const notes: Record<string, string> = {};
  const log: string[] = [];
  let selected: string | null = null;
  for (let i = 0; i <= upTo; i++) {
    const s = SCRIPT[i];
    if (s.set) Object.assign(statuses, s.set);
    if (s.note) notes[s.note[0]] = s.note[1];
    if (s.log) log.unshift(s.log);
    if (s.select !== undefined) selected = s.select;
  }
  return { statuses, notes, selected, log: log.slice(0, 3) };
}

function pointFor(fdi: string) {
  const meta = findTooth(fdi)!;
  return archPoint(meta, CENTER_X, meta.arch === "upper" ? UPPER_Y : LOWER_Y);
}

const PHRASE: [ToothStatus, string][] = [
  ["needs-attention", "need attention"],
  ["treatment-planned", "planned"],
  ["treatment-completed", "completed"],
  ["missing", "missing"],
];

export function LiveChart() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.05, once: false });
  const reduced = usePrefersReducedMotion();
  const [played, setPlayed] = useState(false);
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState<ChartState | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pointerInside, setPointerInside] = useState(false);
  const [tap, setTap] = useState<{ fdi: string; key: number } | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const userScrolled = useRef(false);

  useEffect(() => {
    if (inView) setPlayed(true);
  }, [inView]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  // Autoplay — pauses while a mouse is over the chart so it never fights the visitor.
  useEffect(() => {
    if (manual || !played || !inView || reduced || pointerInside) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % SCRIPT.length), SCRIPT[step].ms);
    return () => window.clearTimeout(id);
  }, [step, manual, played, inView, reduced, pointerInside]);

  // On phones the chart scrolls sideways: keep the demo cursor's tooth in view.
  useEffect(() => {
    const el = scrollerRef.current;
    const target = SCRIPT[step].cursor;
    if (!el || manual || reduced || !target || userScrolled.current) return;
    if (el.scrollWidth <= el.clientWidth + 1) return;
    const { x } = pointFor(target);
    el.scrollTo({ left: (x / VIEW_W) * el.scrollWidth - el.clientWidth / 2, behavior: "smooth" });
  }, [step, manual, reduced]);

  const scripted = useMemo(() => fold(reduced ? 7 : step), [step, reduced]);
  const view = manual ?? scripted;
  const current = SCRIPT[step];
  const autoplay = !manual && !reduced;

  const typingNote = autoplay && current.note && current.note[0] === view.selected ? current.note[1] : null;

  const visits = useCountUp(8, played, 900);
  const collected = useCountUp(13200, played, 1500);

  const selectTooth = (fdi: string) => {
    setManual((m) => ({ ...(m ?? scripted), selected: fdi }));
    setTap((t) => ({ fdi, key: (t?.key ?? 0) + 1 }));
  };

  const setStatus = (status: ToothStatus) =>
    setManual((m) => {
      const base = m ?? scripted;
      if (!base.selected) return base;
      return {
        ...base,
        statuses: { ...base.statuses, [base.selected]: status },
        log: [`${base.selected} · ${STATUS_META[status].label}`, ...base.log].slice(0, 3),
      };
    });

  const setNote = (text: string) =>
    setManual((m) => (m && m.selected ? { ...m, notes: { ...m.notes, [m.selected]: text } } : m));

  const replay = () => {
    setManual(null);
    setTap(null);
    setStep(0);
  };

  const cursor = autoplay && current.cursor ? pointFor(current.cursor) : null;
  const ringAt = autoplay && typeof current.select === "string" ? pointFor(current.select) : null;

  const counts = Object.values(view.statuses);
  const summary = PHRASE.map(([status, phrase]) => [counts.filter((s) => s === status).length, phrase] as const)
    .filter(([n]) => n > 0)
    .map(([n, phrase]) => `${n} ${phrase}`)
    .join(" · ");

  const labels = (compact: boolean) => (
    <>
      <span>Fig. 1 · Priya Sharma's dental chart</span>
      {manual ? (
        <span className="flex items-center gap-4">
          <span className={compact ? "text-muted" : "hidden text-muted md:inline"}>Your turn · demo data, nothing is saved</span>
          <button type="button" onClick={replay} className="flex items-center gap-1.5 text-teal-deep hover:text-ink">
            <RotateCcw size={12} /> Replay demo
          </button>
        </span>
      ) : (
        <span className="flex items-center gap-2.5">
          <span className="live-dot" /> Live · tap any tooth to take over
        </span>
      )}
    </>
  );

  const hoverMeta = hovered && hovered !== view.selected ? findTooth(hovered) : undefined;

  return (
    <div ref={ref} id="chart" className="scroll-mt-24">
      <div className="mb-4 hidden items-end justify-between gap-4 px-1 font-mono text-[11px] tracking-[0.16em] text-muted uppercase sm:flex">
        {labels(false)}
      </div>

      <div
        className="relative overflow-hidden rounded-[22px] border border-line-strong/80 bg-[#fffdf9] shadow-board"
        onPointerEnter={(e: PointerEvent) => {
          if (e.pointerType === "mouse") setPointerInside(true);
        }}
        onPointerLeave={() => {
          setPointerInside(false);
          setHovered(null);
        }}
      >
        {/* Patient record header — mirrors the product */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-line px-5 py-3.5 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e3f4f1] text-[15px] font-bold text-teal">
              PS
            </span>
            <div>
              <p className="flex items-baseline gap-2.5 text-[17px] font-bold tracking-tight text-ink">
                Priya Sharma
                <span className="font-mono text-[9.5px] font-medium tracking-[0.16em] text-muted-soft uppercase">
                  Demo record
                </span>
              </p>
              <p className="text-[12.5px] text-muted">Age 27 · Female · +91 98765 43210</p>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-6 sm:ml-auto sm:gap-12">
            <Stat label="Visits" value={String(visits)} />
            <Stat label="Last visit" value="7 Sept" />
            <Stat label="Collected" value={formatINR(collected)} />
          </dl>
        </div>

        <div className="grid lg:grid-cols-[1fr_310px]">
          <div className="min-w-0 px-2 pt-4 pb-4 sm:px-6">
            <div
              ref={scrollerRef}
              onTouchStart={() => {
                userScrolled.current = true;
              }}
              className="overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] [scrollbar-width:none] sm:[mask-image:none]"
            >
              <div className="relative min-w-[620px] sm:min-w-0">
                <svg
                  viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                  className="block h-auto w-full select-none"
                  data-play={played ? "" : undefined}
                  role="group"
                  aria-label="Interactive demo dental chart in FDI notation"
                >
                  <ToothDefs id="hero" />
                  <line x1="410" y1="12" x2="410" y2="366" stroke="#0f223a" strokeOpacity=".08" strokeDasharray="2 5" />
                  <line x1="30" y1="193" x2="790" y2="193" stroke="#0f223a" strokeOpacity=".08" strokeDasharray="2 5" />
                  <text x="12" y="197" fontSize="10" fill="#a19c92" className="font-mono">
                    R
                  </text>
                  <text x="800" y="197" fontSize="10" fill="#a19c92" className="font-mono">
                    L
                  </text>

                  {ALL_TEETH.map((meta) => {
                    const p = archPoint(meta, CENTER_X, meta.arch === "upper" ? UPPER_Y : LOWER_Y);
                    const status = view.statuses[meta.fdi] ?? "normal";
                    const selected = view.selected === meta.fdi;
                    const isHovered = hovered === meta.fdi;
                    const hasNote = Boolean(view.notes[meta.fdi]);
                    const label = `Tooth ${meta.fdi}, ${TOOTH_TYPE_LABEL[meta.type]}, ${STATUS_META[status].label}`;
                    return (
                      <g
                        key={meta.fdi}
                        className="tooth-in"
                        style={
                          {
                            animationDelay: `${150 + Math.abs(meta.index - 7.5) * 60}ms`,
                            "--from": meta.arch === "upper" ? "-16px" : "16px",
                          } as CSSProperties
                        }
                      >
                        <g transform={`translate(${p.x} ${p.y}) rotate(${p.rotation})`}>
                          <g
                            className="tooth-btn"
                            role="button"
                            tabIndex={0}
                            aria-label={label}
                            aria-pressed={selected}
                            onClick={() => selectTooth(meta.fdi)}
                            onPointerEnter={(e: PointerEvent<SVGGElement>) => {
                              if (e.pointerType === "mouse") setHovered(meta.fdi);
                            }}
                            onPointerLeave={() => setHovered((h) => (h === meta.fdi ? null : h))}
                            onKeyDown={(e: KeyboardEvent<SVGGElement>) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                selectTooth(meta.fdi);
                              }
                            }}
                          >
                            <circle r={27} fill="transparent" />
                            {selected && <circle r={27} fill="url(#hero-halo)" className="halo-in" />}
                            <g className="tooth-hover">
                              <ToothCrown meta={meta} status={status} id="hero" selected={selected} halo={false} />
                            </g>
                            {hasNote && status !== "missing" && (
                              <circle cx={19} cy={-20} r={3.4} fill="#0ea5b7" stroke="#fff" strokeWidth={1} />
                            )}
                            <text
                              y={meta.arch === "upper" ? -34 : 35}
                              textAnchor="middle"
                              fontSize={10}
                              fontWeight={600}
                              fill={selected ? "#0b7f8d" : isHovered ? "#0f223a" : "#8f8a80"}
                              className="tooth-label pointer-events-none font-mono"
                              style={{ transition: "fill 200ms ease" }}
                            >
                              {meta.fdi}
                            </text>
                          </g>
                        </g>
                      </g>
                    );
                  })}

                  {ringAt && (
                    <circle
                      key={`ring-${step}`}
                      cx={ringAt.x}
                      cy={ringAt.y}
                      r={22}
                      fill="none"
                      stroke="#0ea5b7"
                      strokeWidth={2}
                      className="click-ring pointer-events-none"
                    />
                  )}

                  {manual && tap && (
                    <circle
                      key={`tap-${tap.key}`}
                      cx={pointFor(tap.fdi).x}
                      cy={pointFor(tap.fdi).y}
                      r={22}
                      fill="none"
                      stroke="#0ea5b7"
                      strokeWidth={2}
                      className="click-ring pointer-events-none"
                    />
                  )}

                  {autoplay && (
                    <g
                      pointerEvents="none"
                      style={{
                        transform: `translate(${(cursor?.x ?? PARK.x) + 4}px, ${(cursor?.y ?? PARK.y) + 6}px)`,
                        transition: "transform 850ms cubic-bezier(.65,0,.35,1), opacity 400ms",
                        opacity: played ? 1 : 0,
                      }}
                    >
                      <path
                        d="M0 0 L0 17 L4.6 13.2 L7.7 20.2 L10.6 19 L7.6 12.1 L13.4 12.1 Z"
                        fill="#0f223a"
                        stroke="#fff"
                        strokeWidth={1.4}
                        strokeLinejoin="round"
                      />
                    </g>
                  )}
                </svg>

                {/* Hover preview (mouse only) */}
                {hoverMeta && (
                  <HoverTip
                    fdi={hoverMeta.fdi}
                    upper={hoverMeta.arch === "upper"}
                    typeLabel={TOOTH_TYPE_LABEL[hoverMeta.type]}
                    status={view.statuses[hoverMeta.fdi] ?? "normal"}
                  />
                )}
              </div>
            </div>
            <p className="mt-1 text-center font-mono text-[10.5px] text-muted-soft sm:hidden">
              Swipe sideways for all 32 teeth
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line/80 px-1 pt-3">
              <p className="text-[13px] text-ink">
                <span className="font-bold">32 teeth</span> <span className="text-muted">{summary}</span>
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-muted">
                {STATUS_ORDER.map((s) => (
                  <li key={s} className="flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full border-[1.5px]"
                      style={{ borderColor: STATUS_META[s].stroke, borderStyle: STATUS_META[s].dashed ? "dashed" : "solid" }}
                    />
                    {STATUS_META[s].label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside
            aria-live="polite"
            className="flex min-h-[380px] flex-col border-t border-line bg-white/80 lg:border-t-0 lg:border-l"
          >
            <ToothPanel
              view={view}
              step={step}
              typingNote={typingNote}
              editable={Boolean(manual)}
              onStatus={setStatus}
              onNote={setNote}
            />
            <div className="mt-auto border-t border-line px-5 py-4">
              <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">Chart activity</p>
              <ul className="mt-2.5 space-y-1.5">
                {view.log.length === 0 && <li className="text-[12.5px] text-muted-soft">Nothing changed yet today</li>}
                {view.log.map((entry, i) => (
                  <li
                    key={`${entry}-${view.log.length}-${i}`}
                    className={`flex items-center gap-2 text-[12.5px] ${i === 0 ? "fade-up text-ink" : "text-muted"}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-teal" : "bg-line-strong"}`} />
                    {entry}
                    <span className="ml-auto font-mono text-[10.5px] text-muted-soft">{i === 0 ? "now" : "earlier"}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 px-1 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase sm:hidden">
        {labels(true)}
      </div>

      <ol className="mt-5 grid gap-x-8 gap-y-2 px-1 font-mono text-[11.5px] leading-relaxed text-muted sm:grid-cols-3">
        <li>
          <span className="text-ink">01</span> FDI two-digit notation, the way you were taught
        </li>
        <li>
          <span className="text-ink">02</span> Five clinical statuses per tooth, one tap each
        </li>
        <li>
          <span className="text-ink">03</span> Notes stay pinned to the tooth they belong to
        </li>
      </ol>
    </div>
  );
}

function HoverTip({ fdi, upper, typeLabel, status }: { fdi: string; upper: boolean; typeLabel: string; status: ToothStatus }) {
  const p = pointFor(fdi);
  return (
    <div
      className="pointer-events-none absolute z-10"
      style={{
        left: `${(p.x / VIEW_W) * 100}%`,
        top: `${((upper ? p.y + 36 : p.y - 36) / VIEW_H) * 100}%`,
        transform: `translate(-50%, ${upper ? "0" : "-100%"})`,
      }}
    >
      <div
        key={fdi}
        className="tip-in flex items-center gap-2 rounded-md bg-ink px-2.5 py-1.5 text-[11.5px] whitespace-nowrap text-white shadow-[0_10px_24px_-10px_rgba(15,34,58,0.55)]"
      >
        <span className="font-mono font-semibold">{fdi}</span>
        <span className="text-white/65">{typeLabel}</span>
        <span className="h-3 w-px bg-white/20" />
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: STATUS_META[status].stroke }} />
          {STATUS_META[status].label}
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10.5px] font-semibold tracking-[0.1em] text-muted uppercase">{label}</dt>
      <dd className="mt-0.5 text-[19px] font-bold tracking-tight text-ink tabular-nums">{value}</dd>
    </div>
  );
}

function Typed({ text }: { text: string }) {
  const out = useTypewriter(text, true, 34);
  return <span className={out.length < text.length ? "caret" : ""}>{out}</span>;
}

function ToothPanel({
  view,
  step,
  typingNote,
  editable,
  onStatus,
  onNote,
}: {
  view: ChartState;
  step: number;
  typingNote: string | null;
  editable: boolean;
  onStatus: (status: ToothStatus) => void;
  onNote: (text: string) => void;
}) {
  const meta = view.selected ? findTooth(view.selected) : undefined;

  if (!meta) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-10 text-center">
        <svg viewBox="0 0 32 48" className="h-12 w-8" aria-hidden>
          <path
            d="M2.5,5.5 C2.5,2.3 8,0 16,0 C24,0 29.5,2.3 29.5,5.5 L30.2,18 C30.5,25.5 29.5,32 26.8,35.7 C25,38.2 22.5,35.2 20,36.8 C18,38 14,38 12,36.8 C9.5,35.2 7,38.2 5.2,35.7 C2.5,32 1.5,25.5 1.8,18 Z"
            fill="#f6f1e7"
            stroke="#0ea5b7"
            strokeWidth="1.6"
            transform="translate(0 5)"
          />
        </svg>
        <p className="mt-4 text-[15px] font-semibold text-ink">Select a tooth</p>
        <p className="mt-1 max-w-[220px] text-[13px] leading-relaxed text-muted">
          Choose any tooth on the chart to view or update its status.
        </p>
      </div>
    );
  }

  const status = view.statuses[meta.fdi] ?? "normal";
  const note = view.notes[meta.fdi];

  return (
    <div key={meta.fdi} className="fade-up px-5 pt-5 pb-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">Tooth</p>
          <p className="font-serif text-[46px] leading-[0.95] text-ink">{meta.fdi}</p>
        </div>
        <span className="mt-1 rounded-md bg-[#eef1f4] px-2 py-1 text-[11.5px] font-semibold text-[#5b6472]">
          {QUADRANT_LABEL[meta.quadrant]}
        </span>
      </div>
      <p className="text-[13.5px] text-ink-2">{TOOTH_TYPE_LABEL[meta.type]}</p>

      <p className="mt-4 mb-1.5 text-[12px] font-semibold text-ink">Status</p>
      <div className="space-y-0.5">
        {STATUS_ORDER.map((s) => {
          const on = s === status;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={on}
              onClick={() => onStatus(s)}
              className={`flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-[6px] text-left text-[13px] transition-colors ${
                on ? "border-teal/40 bg-[#effafb] font-semibold text-ink" : "border-transparent text-ink-2 hover:bg-paper"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full border-[1.5px] transition-colors"
                style={{ borderColor: STATUS_META[s].stroke, background: on ? STATUS_META[s].stroke : "transparent" }}
              />
              {STATUS_META[s].label}
              {on && <Check key={`${s}-${step}`} size={14} className="pop-in ml-auto text-teal" />}
            </button>
          );
        })}
      </div>

      <p className="mt-4 mb-1.5 text-[12px] font-semibold text-ink">Note</p>
      {editable ? (
        <textarea
          value={note ?? ""}
          onChange={(e) => onNote(e.target.value)}
          placeholder="Add a note for this tooth…"
          rows={2}
          className="w-full resize-none rounded-lg border border-line bg-white px-3 py-2 text-[13px] leading-snug text-ink outline-none placeholder:text-muted-soft focus:border-teal"
        />
      ) : (
        <div className="min-h-[54px] rounded-lg border border-line bg-white px-3 py-2 text-[13px] leading-snug text-ink-2">
          {typingNote ? <Typed key={step} text={typingNote} /> : (note ?? <span className="text-muted-soft">No note yet</span>)}
        </div>
      )}
    </div>
  );
}
