import { ArrowDown, ArrowRight } from "lucide-react";
import { APP_URL } from "../lib/site";
import { LiveChart } from "./LiveChart";
import { HeroDiagram } from "./HeroDiagram";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pb-24 lg:[@media(max-height:820px)]:pt-28">
      <div
        aria-hidden
        className="paper-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,black_46%,transparent_88%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[900px] w-[1700px] max-w-none -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),rgba(255,255,255,0.4)_48%,rgba(255,255,255,0)_76%)]"
      />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* Upper hero: message on the left, the reference diagram on the right. */}
        <div className="grid gap-y-14 lg:items-start lg:grid-cols-2 lg:gap-x-10 xl:grid-cols-[minmax(0,480fr)_minmax(0,620fr)] xl:gap-x-[76px]">
          <div>
            <p className="eyebrow hero-fade text-muted">
              <span>
                Dental clinic software<span className="hidden sm:inline"> · Made in India</span>
              </span>
            </p>

            {/* One phrase per line: the three-line shape is the composition here, and
                each line rises out of its own mask. */}
            <h1 className="mt-6 font-serif text-[13.5vw] leading-[1.0] tracking-[-0.022em] text-ink [text-rendering:optimizeLegibility] sm:mt-7 sm:text-[9.5vw] lg:text-[8.6vw] xl:text-[7rem]">
              <span className="phrase block">
                <span style={{ animationDelay: "80ms" }}>Every tooth.</span>
              </span>
              <span className="phrase block">
                <span style={{ animationDelay: "180ms" }}>Every visit.</span>
              </span>
              <span className="phrase -mr-[0.08em] block pr-[0.08em]">
                <span style={{ animationDelay: "280ms" }}>
                  Every <em className="text-teal-deep">rupee.</em>
                </span>
              </span>
            </h1>

            <div className="hero-fade" style={{ animationDelay: "480ms" }}>
              <p className="mt-7 max-w-[420px] text-[18px] leading-relaxed text-ink-2 sm:mt-8 sm:text-[19px]">
                Everything your clinic needs from the first appointment to the final payment.
              </p>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href={APP_URL}
                  className="btn btn-ink h-[52px] w-full max-w-[320px] justify-center px-7 text-[15.5px] sm:w-auto sm:justify-start"
                >
                  Start 7-day free trial
                  <ArrowRight size={17} className="arrow text-teal-bright" />
                </a>
                <a
                  href="#day"
                  className="group inline-flex items-center gap-1.5 sm:h-[52px] text-[15px] font-semibold whitespace-nowrap text-ink-2 transition-colors hover:text-ink"
                >
                  <span className="link-underline">See a day in Healvo</span>
                  <ArrowDown
                    size={15}
                    className="text-teal-deep transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </a>
              </div>

              <p className="mt-5 font-mono text-[12px] text-muted-soft">
                7-day free trial · No credit card required
              </p>
            </div>
          </div>

          <div className="hero-fade mx-auto w-full max-w-[560px] lg:-mr-6 lg:max-w-none xl:-mr-10" style={{ animationDelay: "620ms" }}>
            <HeroDiagram />
          </div>
        </div>

        {/* The proof: the real chart, full width, directly under the composition. */}
        <div className="hero-fade mt-16 sm:mt-28 md:mt-32" style={{ animationDelay: "760ms" }}>
          <LiveChart />
        </div>
      </div>
    </section>
  );
}
