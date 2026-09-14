import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "../lib/site";
import { formatINR, useCountUp, useInView } from "../lib/motion";
import { Reveal } from "../lib/Reveal";

const INCLUDED = [
  "FDI dental chart, status and notes per tooth",
  "Consultations with prescriptions",
  "Billing: UPI, cash, card, part payments",
  "Online booking page for patients",
  "Healvo AI clinic assistant",
  "Documents, X-rays and photos",
  "Doctor and reception logins",
  "Reports and follow-ups",
];

const FACTS: [string, string][] = [
  ["Free trial", "7 days"],
  ["Monthly", "₹499"],
  ["Annual", "₹5,988"],
  ["Annual access", "14 months"],
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const price = useCountUp(annual ? 5988 : 499, inView, 700);

  return (
    <section id="pricing" className="border-y border-line bg-paper-2/70">
      <div className="mx-auto grid max-w-[1240px] gap-16 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:py-40">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow text-muted">Pricing</p>
          <h2 className="mt-7 font-serif text-[clamp(2.9rem,6vw,5.4rem)] leading-[0.94] tracking-[-0.015em] text-ink">
            One plan.
            <br />
            <em className="text-teal-deep">The whole clinic.</em>
          </h2>
          <p className="mt-7 max-w-[470px] text-[17px] leading-relaxed text-ink-2">
            No feature tiers and nothing to unlock later. Your 7-day trial starts the moment you set up your clinic,
            with nothing to pay. Stay monthly, or go annual and get 14 months for the price of 12.
          </p>
          <dl className="mt-10 grid max-w-[470px] grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-strong bg-line-strong">
            {FACTS.map(([k, v]) => (
              <div key={k} className="bg-paper px-5 py-4">
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">{k}</dt>
                <dd className="mt-1.5 font-serif text-[32px] leading-none text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[13px] text-muted">Prices in INR, plus applicable GST.</p>
        </Reveal>

        <div ref={ref} data-in={inView ? "" : undefined} className="flex justify-center lg:col-span-6 lg:justify-end">
          <div className="w-full max-w-[440px]">
            {/* printer slot */}
            <div className="relative z-10 h-5 rounded-full bg-ink shadow-[inset_0_-4px_0_rgba(255,255,255,0.07),0_10px_20px_-10px_rgba(15,34,58,0.5)]" />
            <div className="-mt-2.5 overflow-hidden px-5 pt-2.5 pb-12">
              <div className="print drop-shadow-[0_24px_30px_rgba(15,34,58,0.16)]">
                <div className="bg-[#fffdf8] px-6 pt-7 pb-6 font-mono text-[12.5px] text-ink sm:px-7">
                  <div className="text-center">
                    <p className="wordmark text-[28px] leading-none">
                      Heal<span className="text-teal">vo</span>
                    </p>
                    <p className="mt-2 text-[10.5px] uppercase tracking-[0.2em] text-muted">Dental clinic software</p>
                  </div>

                  <Dash />

                  <div role="radiogroup" aria-label="Billing period" className="grid grid-cols-2 border border-ink text-[11.5px]">
                    {(
                      [
                        [false, "Monthly"],
                        [true, "Annual"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={label}
                        type="button"
                        role="radio"
                        aria-checked={annual === value}
                        onClick={() => setAnnual(value)}
                        className={`py-2 uppercase tracking-[0.14em] transition-colors ${
                          annual === value ? "bg-ink text-white" : "text-ink hover:bg-ink/5"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2">
                    <Row k={annual ? "Healvo Dental Annual" : "Healvo Dental Monthly"} v={formatINR(annual ? 5988 : 499)} />
                    <Row k="Access" v={annual ? "14 months" : "1 month"} />
                    {annual && <Row k="  incl. bonus" v="2 months free" muted />}
                    <Row k="Free trial first" v="7 days · ₹0" />
                  </div>

                  <Dash />

                  <div className="flex items-end justify-between">
                    <span className="uppercase tracking-[0.16em]">Total</span>
                    <span className="font-sans text-[46px] leading-none font-extrabold tracking-[-0.035em] tabular-nums">
                      {formatINR(price)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-right text-[11px] text-muted">
                    + applicable GST · {annual ? "about ₹428 a month" : "billed every month"}
                  </p>

                  <Dash />

                  <p className="text-[10.5px] uppercase tracking-[0.18em] text-muted">Included</p>
                  <ul className="mt-3 space-y-1.5">
                    {INCLUDED.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[12px] leading-snug">
                        <span className="text-teal">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Dash />

                  <a href={APP_URL} className="btn btn-ink h-12 w-full justify-center font-sans text-[15px]">
                    Start 7-day free trial <ArrowRight size={17} className="arrow text-teal-bright" />
                  </a>
                  <p className="mt-5 text-center text-[10.5px] uppercase tracking-[0.22em] text-muted">
                    ** Thank you. Visit again. **
                  </p>
                </div>
                <svg className="block h-3 w-full" preserveAspectRatio="none" aria-hidden>
                  <defs>
                    <pattern id="zigzag" width="14" height="12" patternUnits="userSpaceOnUse">
                      <path d="M0 0 L7 11 L14 0 Z" fill="#fffdf8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="12" fill="url(#zigzag)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dash() {
  return <div className="my-5 border-t border-dashed border-ink/25" />;
}

function Row({ k, v, muted = false }: { k: string; v: string; muted?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${muted ? "text-muted" : ""}`}>
      <span className="whitespace-pre">{k}</span>
      <span className="text-right tabular-nums">{v}</span>
    </div>
  );
}
