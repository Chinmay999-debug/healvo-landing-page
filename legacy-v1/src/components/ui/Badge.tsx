import type { ReactNode } from "react";

export type BadgeTone = "mint" | "blue" | "amber" | "slate" | "teal" | "danger";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

const toneStyles: Record<BadgeTone, { bg: string; text: string; dot: string }> = {
  mint: {
    bg: "bg-[#e6f7f1] border-[#bfead9]",
    text: "text-[#0f8a5f]",
    dot: "bg-[#0f8a5f]",
  },
  blue: {
    bg: "bg-[#eaf1fd] border-[#c7d9fc]",
    text: "text-[#2563eb]",
    dot: "bg-[#2563eb]",
  },
  amber: {
    bg: "bg-[#fdf1e7] border-[#f9d7bd]",
    text: "text-[#c2660c]",
    dot: "bg-[#c2660c]",
  },
  slate: {
    bg: "bg-[#eef1f4] border-[#d8dde4]",
    text: "text-[#5b6472]",
    dot: "bg-[#6b7684]",
  },
  teal: {
    bg: "bg-[#e0f7fa] border-[#b2ebf2]",
    text: "text-[#0ea5b7]",
    dot: "bg-[#0ea5b7]",
  },
  danger: {
    bg: "bg-[#fbeae9] border-[#f8c8c5]",
    text: "text-[#c0362c]",
    dot: "bg-[#c0362c]",
  },
};

export function Badge({
  children,
  tone = "slate",
  size = "md",
  className = "",
  dot = false,
}: BadgeProps) {
  const currentTone = toneStyles[tone];
  const sizeClass =
    size === "sm"
      ? "px-2 py-0.5 text-[11px] font-medium"
      : "px-2.5 py-1 text-[12px] font-semibold";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${currentTone.bg} ${currentTone.text} ${sizeClass} tracking-wide ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${currentTone.dot}`} />}
      {children}
    </span>
  );
}
