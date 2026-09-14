import { STATUS_META, STATUS_ORDER, TOOTH_SHAPES, type ToothMeta, type ToothStatus } from "./teeth";

/** Gradient defs for one <svg>. `id` namespaces them so several charts can coexist. */
export function ToothDefs({ id }: { id: string }) {
  return (
    <defs>
      {STATUS_ORDER.map((status) => (
        <linearGradient key={status} id={`${id}-${status}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={STATUS_META[status].fill[0]} />
          <stop offset="1" stopColor={STATUS_META[status].fill[1]} />
        </linearGradient>
      ))}
      <radialGradient id={`${id}-halo`}>
        <stop offset="0" stopColor="#0ea5b7" stopOpacity="0.3" />
        <stop offset="1" stopColor="#0ea5b7" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/** A single crown centred on (0,0). Callers position and rotate it. */
export function ToothCrown({
  meta,
  status,
  id,
  selected = false,
  halo = true,
}: {
  meta: ToothMeta;
  status: ToothStatus;
  id: string;
  selected?: boolean;
  /** Draw the selected glow here; callers that animate their own glow pass false. */
  halo?: boolean;
}) {
  const style = STATUS_META[status];
  const shape = TOOTH_SHAPES[meta.type];
  const flip = meta.arch === "lower";

  return (
    <>
      {selected && halo && <circle r={27} fill={`url(#${id}-halo)`} />}
      <g transform={flip ? "translate(-16,24) scale(1,-1)" : "translate(-16,-24)"}>
        <path
          d={shape.crown}
          fill={status === "missing" ? "none" : `url(#${id}-${status})`}
          stroke={style.stroke}
          strokeWidth={style.strokeWidth + (selected ? 1 : 0)}
          strokeDasharray={style.dashed ? "3.5 3" : undefined}
          strokeLinejoin="round"
          opacity={style.faded ? 0.7 : 1}
          style={{ transition: "stroke 450ms ease, stroke-width 300ms ease" }}
        />
        {status !== "missing" && (
          <path d={shape.anatomy} fill="none" stroke="#d8d3c6" strokeWidth={0.9} strokeLinecap="round" opacity={0.55} />
        )}
      </g>
    </>
  );
}
