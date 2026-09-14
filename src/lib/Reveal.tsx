import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./motion";

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });
  return (
    <Tag
      ref={ref}
      data-in={inView ? "" : undefined}
      className={`reveal ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
