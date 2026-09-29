import { useEffect, useState } from "react";
import { ArrowRight, Check, MessageCircle, Minus, Sparkles } from "lucide-react";
import { appUrl } from "../lib/site";
import { formatINR, useCountUp, useInView } from "../lib/motion";
import { Reveal } from "../lib/Reveal";
import { trackPricingViewContent } from "../lib/metaPixel";

/** Production prices (INR). Annual is paid once and covers 14 months. */
const PRICES = {
  core: { monthly: 499, annual: 5988 },
  premium: { monthly: 999, annual: 11988 },
} as const;

/** Clinic management, in both plans. Every line is a shipped Healvo feature. */
const CORE_FEATURES = [
  "Patient management",
  "Appointments",
  "FDI dental chart",
  "Billing & payments",
  "Reports",
  "Online booking page",
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const period = annual ? "annual" : "monthly";
  const corePrice = useCountUp(PRICES.core[period], inView, 650);
  const premiumPrice = useCountUp(PRICES.premium[period], inView, 650);

  // The same inView that drives the count-up is the honest trigger for
  // ViewContent: the plans are on screen, so the price has been read.
  useEffect(() => {
    if (inView) trackPricingViewContent();
  }, [inView]);

  return (
    <section id="pricing" className="border-y border-line scroll-mt-24 bg-paper-2/70">
      <div className="mx-auto max-w-[1080px] px-5 py-28 sm:px-8 lg:py-36">
        <Reveal className="text-center">
          <p className="eyebrow justify-center text-muted">Pricing</p>
          <h2 className="mt-7 font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[0.95] tracking-[-0.015em] text-ink">
            Two plans.
            <br />
            <em className="text-teal-deep">Pick what your clinic needs.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[520px] text-[17px] leading-relaxed text-ink-2">
            Start with a <strong className="font-semibold text-ink">15-day free trial</strong>. No credit card
            required.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3.5">
            <div
              role="radiogroup"
              aria-label="Billing period"
              className="relative inline-grid grid-cols-2 rounded-full border border-line-strong bg-paper p-1"
            >
              <span
                aria-hidden
                className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink shadow-[0_6px_16px_-6px_rgba(15,34,58,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  annual ? "translate-x-full" : ""
                }`}
              />
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
                  className={`relative z-10 w-[124px] cursor-pointer rounded-full py-2.5 text-[14px] font-semibold transition-colors ${
                    annual === value ? "text-white" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex min-h-[26px] items-center gap-2.5 text-[13.5px]">
              {annual ? (
                <span key="a" className="fade-up inline-flex items-center gap-2.5">
                  <FreeBadge />
                  <span className="font-medium text-ink">Pay for 12 months, get 14 months</span>
                </span>
              ) : (
                <button
                  key="m"
                  type="button"
                  onClick={() => setAnnual(true)}
                  className="fade-up cursor-pointer text-muted transition-colors hover:text-teal-deep"
                >
                  Go annual and get <span className="font-semibold text-teal-deep">2 months free</span>
                </button>
              )}
            </div>
          </div>
        </Reveal>

        <div ref={ref} className="mt-12 grid items-stretch gap-5 md:grid-cols-2">
          {/* Core */}
          <article className="flex flex-col rounded-[22px] border border-line-strong bg-paper p-7 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_30px_60px_-45px_rgba(15,34,58,0.35)] sm:p-9">
            <PlanHeader name="Core" blurb="Clinic management essentials." />
            <PlanPrice value={corePrice} annual={annual} />

            <ul className="mt-7 space-y-3 border-t border-dashed border-ink/20 pt-7 text-[14.5px]">
              {CORE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-ink">
                  <Check size={16} strokeWidth={2.6} className="shrink-0 text-teal" />
                  {f}
                </li>
              ))}
              <li className="flex items-center gap-3 text-muted-soft">
                <Minus size={16} strokeWidth={2.4} className="shrink-0" />
                AI Assistant
              </li>
              <li className="flex items-center gap-3 text-muted-soft">
                <Minus size={16} strokeWidth={2.4} className="shrink-0" />
                WhatsApp appointment confirmations
              </li>
            </ul>

            <div className="flex-1" />
            <a href={appUrl()} className="btn btn-ink mt-9 h-12 w-full justify-center text-[15px]">
              Start 15-day free trial <ArrowRight size={17} className="arrow text-teal-bright" />
            </a>
          </article>

          {/* Premium */}
          <article
            className="relative flex flex-col overflow-hidden rounded-[22px] p-7 text-white shadow-[0_40px_80px_-40px_rgba(8,145,178,0.55)] sm:p-9"
            style={{
              background:
                "radial-gradient(560px circle at 100% 0%, rgba(45,212,191,0.2), transparent 60%)," +
                "radial-gradient(520px circle at 0% 110%, rgba(8,145,178,0.26), transparent 60%)," +
                "#0d1b2a",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[22px] p-px"
              style={{
                background:
                  "linear-gradient(140deg, rgba(45,212,191,0.8), rgba(8,145,178,0.2) 45%, rgba(255,255,255,0.06))",
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="relative flex flex-1 flex-col">
              <PlanHeader
                name="Premium"
                blurb="Everything in Core, plus AI and WhatsApp."
                dark
                tag="AI + WhatsApp"
              />
              <PlanPrice value={premiumPrice} annual={annual} dark />

              <ul className="mt-7 space-y-3 border-t border-dashed border-white/20 pt-7 text-[14.5px]">
                <li className="flex items-center gap-3">
                  <Check size={16} strokeWidth={2.6} className="shrink-0 text-teal-bright" />
                  Everything in Core
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles size={16} strokeWidth={2.2} className="mt-0.5 shrink-0 text-teal-bright" />
                  <span>
                    <span className="font-semibold">AI Assistant</span>
                    <span className="mt-0.5 block text-[13px] text-white/55">
                      Ask about today's schedule, the queue or collections.
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle size={16} strokeWidth={2.2} className="mt-0.5 shrink-0 text-teal-bright" />
                  <span>
                    <span className="font-semibold">WhatsApp appointment confirmations</span>
                    <span className="mt-0.5 block text-[13px] text-white/55">
                      Patients get their booking confirmed on WhatsApp.
                    </span>
                  </span>
                </li>
              </ul>

              <div className="flex-1" />
              <p className="mt-8 rounded-xl bg-white/[0.05] px-4 py-3 text-[13px] leading-relaxed text-white/65 ring-1 ring-white/10 ring-inset">
                Your free trial includes the AI Assistant. WhatsApp confirmations start when you choose Premium.
              </p>
              <a href={appUrl()} className="btn btn-teal mt-5 h-12 w-full justify-center text-[15px]">
                Start 15-day free trial <ArrowRight size={17} className="arrow" />
              </a>
            </div>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[12px] text-muted">
          <span>15-day free trial · No credit card required</span>
          <span className="hidden text-line-strong sm:inline">|</span>
          <span>AI Assistant included in the trial</span>
          <span className="hidden text-line-strong sm:inline">|</span>
          <span>Prices in INR + GST</span>
        </div>
      </div>
    </section>
  );
}

function FreeBadge({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-[3px] font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase ${
        dark ? "bg-teal-bright/15 text-teal-bright ring-1 ring-teal-bright/30 ring-inset" : "bg-teal/12 text-teal-deep ring-1 ring-teal/25 ring-inset"
      }`}
    >
      2 months free
    </span>
  );
}

function PlanHeader({ name, blurb, dark = false, tag }: { name: string; blurb: string; dark?: boolean; tag?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h3 className={`font-serif text-[40px] leading-none ${dark ? "text-white" : "text-ink"}`}>{name}</h3>
        {tag && (
          <span className="rounded-full bg-white/[0.07] px-3 py-1 font-mono text-[11px] text-white/75 ring-1 ring-white/12 ring-inset">
            {tag}
          </span>
        )}
      </div>
      <p className={`mt-3 text-[15px] ${dark ? "text-white/60" : "text-ink-2"}`}>{blurb}</p>
    </div>
  );
}

function PlanPrice({ value, annual, dark = false }: { value: number; annual: boolean; dark?: boolean }) {
  return (
    <div className="mt-8">
      <div className="flex items-baseline gap-2">
        <span className="font-sans text-[54px] leading-none font-extrabold tracking-[-0.04em] tabular-nums">
          {formatINR(value)}
        </span>
        {!annual && <span className={`text-[16px] font-medium ${dark ? "text-white/55" : "text-muted"}`}>/ month</span>}
      </div>
      <div className="mt-3 flex min-h-[24px] flex-wrap items-center gap-2.5">
        {annual ? (
          <span key="a" className="fade-up inline-flex flex-wrap items-center gap-2.5">
            <FreeBadge dark={dark} />
            <span className={`text-[13.5px] font-medium ${dark ? "text-white/80" : "text-ink"}`}>
              Pay for 12 months, get 14 months
            </span>
          </span>
        ) : (
          <span key="m" className={`fade-up text-[13.5px] ${dark ? "text-white/55" : "text-muted"}`}>
            Billed monthly
          </span>
        )}
      </div>
    </div>
  );
}
