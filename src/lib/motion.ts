import { useEffect, useRef, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useInView<T extends Element>({
  threshold = 0.2,
  once = true,
  rootMargin = "0px",
}: { threshold?: number; once?: boolean; rootMargin?: string } = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, rootMargin]);
  return [ref, inView] as const;
}

/** Steps through `durations` (ms per step) while active; resets when inactive. */
export function useTimeline(active: boolean, durations: readonly number[], loop = true): number {
  const [step, setStep] = useState(0);
  const reduced = usePrefersReducedMotion();
  const last = durations.length - 1;
  useEffect(() => {
    if (!active) {
      setStep(0);
      return;
    }
    if (reduced) {
      setStep(last);
      return;
    }
    if (!loop && step === last) return;
    const id = window.setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), durations[step]);
    return () => window.clearTimeout(id);
  }, [active, step, reduced, loop, last, durations]);
  return step;
}

export function useTypewriter(text: string, active: boolean, speed = 28): string {
  const [count, setCount] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    if (reduced) {
      setCount(text.length);
      return;
    }
    if (count >= text.length) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(id);
  }, [active, count, text, speed, reduced]);
  return text.slice(0, count);
}

/** Eases from the previous value to `target` whenever it changes. */
export function useCountUp(target: number, active: boolean, duration = 1100): number {
  const [value, setValue] = useState(0);
  const current = useRef(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!active) {
      current.current = 0;
      setValue(0);
      return;
    }
    if (reduced) {
      current.current = target;
      setValue(target);
      return;
    }
    const from = current.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const next = from + (target - from) * (1 - (1 - p) ** 3);
      current.current = next;
      setValue(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduced]);
  return Math.round(value);
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
