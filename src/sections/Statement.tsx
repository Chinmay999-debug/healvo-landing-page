import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/motion";

const TEXT =
  "One place for your patients, your practice and every *tooth.* Appointments, records, prescriptions, X-rays, financials and an AI assistant, all working together.";

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.82 - rect.top) / (rect.height + vh * 0.3);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const words = TEXT.split(" ");

  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8 lg:py-40">
        <p className="eyebrow text-muted">Why Healvo</p>
        <p
          ref={ref}
          className="mt-10 max-w-[1120px] font-serif text-[clamp(2.1rem,4.8vw,4.4rem)] leading-[1.06] tracking-[-0.01em] text-ink"
        >
          {words.map((word, i) => {
            const emphasis = word.startsWith("*");
            const clean = word.replaceAll("*", "");
            const on = reduced || progress * words.length > i;
            return (
              <span key={i} className="transition-opacity duration-300" style={{ opacity: on ? 1 : 0.14 }}>
                {emphasis ? <em className="text-teal-deep">{clean}</em> : clean}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
