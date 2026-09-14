import { useEffect, useState } from "react";
import { Calendar, FileText, IndianRupee, Users } from "lucide-react";
import { useInView, useMediaQuery, usePrefersReducedMotion } from "../lib/motion";

/**
 * The hero's brand visual: the clinic's journey turning around one tooth.
 *
 * Built from the approved reference in public/image.png — same composition, same
 * palette, same linework — but tightened into a mark rather than a diagram: the
 * tooth is the subject and everything else is a quiet frame around it. The tooth is
 * the reference's own wireframe artwork (public/assets/hero-tooth.png, background
 * unmixed to alpha); the ring, nodes, icons and labels are drawn.
 */

const VB_W = 600;
const VB_H = 480;

const CX = 290; // ring centre
const CY = 236;
const R = 210; // the journey ring
const NODE_R = 32;
const ICON = 27;
const GAP = 10; // degrees of clear air between an arc and the node it meets
const HEAD_GAP = 12; // arrowed legs stop a little shorter so the head tips the node

// Labels sit outside the ring and mirror each other, so they frame the tooth
// instead of ranging out to one side.
const LABEL_L = 96;
const LABEL_R = 484;

const INK = "#0f223a";
const TEAL = "#0ea5b7";
const LABEL = "#3d4b5e";
const NUMBER = "#a19c92";

const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (deg: number, r: number) => ({ x: CX + r * Math.cos(rad(deg)), y: CY + r * Math.sin(rad(deg)) });

/** Clockwise arc between two angles on radius `r`. */
function arcPath(a0: number, a1: number, r: number) {
  const p0 = pt(a0, r);
  const p1 = pt(a1, r);
  // Clockwise sweep, normalised so the 02 → 04 leg does not wrap the long way.
  const large = (((a1 - a0) % 360) + 360) % 360 > 180 ? 1 : 0;
  return `M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
}

/** Filled arrowhead sitting on the ring at `deg`, pointing along the clockwise tangent. */
function arrowHead(deg: number, size: number) {
  const p = pt(deg, R);
  return `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${deg + 90}) scale(${size})`;
}

interface Stage {
  n: string;
  lines: [string, string];
  deg: number;
  tx: number;
  ty: number;
  anchor: "start" | "end";
  Icon: typeof Calendar;
}

const TOP_Y = 45;
const BOTTOM_Y = 400;

const STAGES: Stage[] = [
  { n: "01", lines: ["PATIENT", "ARRIVES"], deg: 225, tx: LABEL_L, ty: TOP_Y, anchor: "end", Icon: Calendar },
  { n: "02", lines: ["CONSULTATION", "& TREATMENT"], deg: 315, tx: LABEL_R, ty: TOP_Y, anchor: "start", Icon: FileText },
  { n: "04", lines: ["BILLING", "& PAYMENTS"], deg: 45, tx: LABEL_R, ty: BOTTOM_Y, anchor: "start", Icon: IndianRupee },
  { n: "03", lines: ["FOLLOW UPS", "& RECORDS"], deg: 135, tx: LABEL_L, ty: BOTTOM_Y, anchor: "end", Icon: Users },
];

const DWELL = 6200;
const TRAVEL = 5200;

// The tooth's box inside the viewBox: centred on the ring, and sized to sit as the
// focal point without ever reaching the nodes at 225° and 135° (which end at x = 183).
const TOOTH = { w: 214, h: 327 };

export function HeroDiagram() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15, once: true });
  const reduced = usePrefersReducedMotion();
  const compact = useMediaQuery("(max-width: 767px)");
  const [time, setTime] = useState(0);
  const [replays, setReplays] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let start = performance.now();
    let frame: number;

    function tick(now: number) {
      const elapsed = now - start;
      if (elapsed >= DWELL) {
        start = now;
        setTime(0);
      } else {
        setTime(elapsed);
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, replays]);

  // Smooth timing: half-linear, half-sine for elegant start/stop without distorting the 1.3s rhythm too much
  const t = Math.min(time, TRAVEL);
  const progress = t / TRAVEL;
  const sine = -(Math.cos(Math.PI * progress) - 1) / 2;
  const p = progress * 0.5 + sine * 0.5;

  const currentAngle = 225 + p * 360;

  // Reduced motion gets the cycle's opening frame rather than a dead diagram: 01 lit,
  // everything else in its resting state.
  let activeIndex = reduced ? 0 : -1;
  if (!reduced && time < TRAVEL) {
    if (currentAngle < 315) activeIndex = 0;
    else if (currentAngle < 405) activeIndex = 1;
    else if (currentAngle < 495) activeIndex = 2;
    else activeIndex = 3;
  }

  const on = (delay: number, ms = 900): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transition: `opacity ${ms}ms ease ${delay}ms`,
  });

  const labelSize = compact ? "text-[12px]" : "text-[9.5px]";
  const numberSize = compact ? "text-[10.5px]" : "text-[8.5px]";

  return (
    <div ref={ref} className={compact ? "-mx-4 relative" : "relative"}>
      <svg
        viewBox={compact ? `0 18 ${VB_W} 448` : `0 0 ${VB_W} ${VB_H}`}
        className="block h-auto w-full select-none"
        role="img"
        aria-label="Healvo's clinic cycle turning around a molar: 01 patient arrives, 02 consultation and treatment, 03 follow ups and records, 04 billing and payments."
      >
        <line
          x1={CX}
          y1={0}
          x2={CX}
          y2={VB_H}
          stroke={INK}
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeDasharray="3 5"
          style={on(1000)}
        />

        {/* The journey ring, drawn leg by leg */}
        {STAGES.map((s, i) => {
          const next = STAGES[(i + 1) % STAGES.length];
          const arrowed = i === 1 || i === 3; // 02 → 04 (teal) and 03 → 01 (navy)
          const a0 = s.deg + GAP;
          const a1 = (s.deg === 135 ? 225 : next.deg) - (arrowed ? HEAD_GAP : GAP);
          return (
            <path
              key={`arc-${s.n}`}
              d={arcPath(a0, a1, R)}
              fill="none"
              stroke={INK}
              strokeOpacity="0.5"
              strokeWidth="1.1"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: inView ? 0 : 1,
                transition: `stroke-dashoffset 900ms cubic-bezier(.6,0,.2,1) ${300 + i * 180}ms`,
              }}
            />
          );
        })}

        {/* Teal waypoints at the top and bottom of the ring */}
        <g style={on(1200)}>
          <circle cx={pt(270, R).x} cy={pt(270, R).y} r={4.5} fill={TEAL} />
          <circle cx={pt(90, R).x} cy={pt(90, R).y} r={4.5} fill={TEAL} />
        </g>

        {/* Arrowheads: navy into 01, teal into 04 */}
        <g style={on(1250)}>
          <path d="M -6 -3.2 L 6 0 L -6 3.2 Z" transform={arrowHead(225 - HEAD_GAP, 1.5)} fill={INK} fillOpacity="0.88" />
          <path d="M -6 -4.4 L 6 0 L -6 4.4 Z" transform={arrowHead(45 - HEAD_GAP, 2.2)} fill={TEAL} />
        </g>

        {/* Flow progress dot */}
        {!reduced && (
          <g
            transform={`translate(${CX} ${CY}) rotate(${currentAngle})`}
            style={{
              opacity: time < TRAVEL && time > 0 ? 1 : 0,
              transition: "opacity 300ms ease"
            }}
          >
            <circle cx={R} cy={0} r={4.5} fill={TEAL} />
          </g>
        )}

        {/* The tooth: the constant at the centre of the cycle. Never animated. */}
        <image
          href="/assets/hero-tooth.png"
          x={CX - TOOTH.w / 2}
          y={CY - TOOTH.h / 2}
          width={TOOTH.w}
          height={TOOTH.h}
          style={{ opacity: inView ? 1 : 0, transition: "opacity 1100ms ease 260ms" }}
        />

        {/* Stage nodes */}
        {STAGES.map((s, i) => {
          const p = pt(s.deg, R);
          const lit = i === activeIndex;
          return (
            <g key={s.n} style={on(420 + i * 90, 700)}>
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R + 9}
                fill="none"
                stroke={TEAL}
                strokeWidth="1"
                style={{ opacity: lit ? 0.25 : 0, transition: "opacity 400ms ease" }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                fill="#faf7f1"
                stroke={lit ? TEAL : INK}
                strokeOpacity={lit ? "0.8" : "0.58"}
                strokeWidth="1.2"
                style={{ transition: "all 400ms ease" }}
              />
              <g transform={`translate(${p.x - ICON / 2} ${p.y - ICON / 2}) scale(${ICON / 24})`}>
                <s.Icon
                  width={24}
                  height={24}
                  stroke={lit ? TEAL : INK}
                  strokeWidth={lit ? 2 : 1.6}
                  style={{ transition: "all 400ms ease" }}
                />
              </g>
            </g>
          );
        })}

        {/* Four quiet labels */}
        {STAGES.map((s, i) => {
          const lit = i === activeIndex;
          return (
            <g key={`label-${s.n}`} style={on(520 + i * 80)}>
              <text
                x={s.tx}
                y={s.ty}
                textAnchor={s.anchor}
                className={`font-mono ${numberSize}`}
                letterSpacing="1.3"
                fill={lit ? TEAL : NUMBER}
                style={{ transition: "fill 400ms ease" }}
              >
                {s.n}
              </text>
              {s.lines.map((line, j) => (
                <text
                  key={line}
                  x={s.tx}
                  y={s.ty + 20 + j * 16}
                  textAnchor={s.anchor}
                  className={`font-mono ${labelSize}`}
                  letterSpacing="1.3"
                  fill={lit ? INK : LABEL}
                  style={{ transition: "fill 400ms ease, font-weight 400ms ease" }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Subtle Replay Button */}
        {!reduced && (
          <g
            // The compact viewBox crops the last 14px of the canvas, so the replay
            // row rides up to stay inside it.
            transform={`translate(${CX}, ${compact ? 460 : VB_H - 12})`}
            className="cursor-pointer group"
            onClick={() => setReplays((r) => r + 1)}
            style={on(2000)}
          >
            <text
              textAnchor="middle"
              className={`font-mono ${numberSize} transition-colors duration-300 group-hover:fill-[#0ea5b7]`}
              fill={NUMBER}
              letterSpacing="1.3"
            >
              ↻ REPLAY
            </text>
            {/* Hit area */}
            <rect x="-40" y="-15" width="80" height="20" fill="transparent" />
          </g>
        )}
      </svg>
    </div>
  );
}
