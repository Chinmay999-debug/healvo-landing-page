import { useEffect, useRef, useState, type ComponentType } from "react";
import { useInView, useMediaQuery } from "../lib/motion";
import { Reveal } from "../lib/Reveal";
import { BookingScene } from "../scenes/BookingScene";
import { QueueScene } from "../scenes/QueueScene";
import { ConsultScene } from "../scenes/ConsultScene";
import { BillScene } from "../scenes/BillScene";
import { AiScene } from "../scenes/AiScene";

interface Step {
  time: string;
  label: string;
  title: string;
  body: string;
  Scene: ComponentType<{ active: boolean }>;
}

const STEPS: Step[] = [
  {
    time: "07:40",
    label: "Online booking",
    title: "Booked before you've opened.",
    body: "Patients open your clinic's booking link, choose why they're coming, pick a day and a free slot, and leave their number. No app to install and no missed calls to return. Two people can never grab the same slot.",
    Scene: BookingScene,
  },
  {
    time: "10:28",
    label: "Today's queue",
    title: "The waiting room, on one screen.",
    body: "Reception checks patients in and adds walk-ins. Everyone can see who is waiting, who is in the chair and who is done, without anyone shouting down the corridor.",
    Scene: QueueScene,
  },
  {
    time: "10:41",
    label: "Consultation",
    title: "Notes written at the chair, not at midnight.",
    body: "What the patient said, what you found, which teeth, and the prescription. One form, saved straight to today's visit.",
    Scene: ConsultScene,
  },
  {
    time: "11:15",
    label: "Billing",
    title: "Billed before they reach the door.",
    body: "Add line items and record UPI, cash or card, including part payments. Every bill stays on the patient's record, with the balance always clear.",
    Scene: BillScene,
  },
  {
    time: "18:45",
    label: "Healvo AI",
    title: "Ask how the day went.",
    body: "Healvo AI answers from your clinic's own records: today's schedule, who is still waiting, what you've collected. Plain questions, straight answers.",
    Scene: AiScene,
  },
];

export function DayInClinic() {
  const desktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="day" className="relative bg-night text-white">
      <div aria-hidden className="night-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1240px] px-5 pt-28 sm:px-8 lg:pt-40">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow text-white/50">A day in Healvo</p>
            <h2 className="mt-7 font-serif text-[clamp(2.9rem,6.6vw,6rem)] leading-[0.94] tracking-[-0.015em]">
              One ordinary Monday at <em className="text-teal-bright">Sharma Dental.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:pb-3">
            <p className="text-[16.5px] leading-relaxed text-white/60">
              Follow one clinic from the first booking of the morning to the last question of the evening. Every screen
              below is drawn from Healvo's real interface.
            </p>
          </Reveal>
        </div>
      </div>

      {desktop ? <DesktopStory /> : <MobileStory />}
    </section>
  );
}

function StepText({ step, index, active }: { step: Step; index: number; active: boolean }) {
  return (
    <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-30"}`}>
      <div className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.16em]">
        <span className="text-teal-bright">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-12 bg-white/20" />
        <span className="text-white/50">{step.label}</span>
      </div>
      <p className="mt-6 font-mono text-[44px] font-medium leading-none tracking-[-0.04em] text-white tabular-nums lg:text-[60px]">
        {step.time}
      </p>
      <h3 className="mt-5 font-serif text-[34px] leading-[1.04] text-white lg:text-[42px]">{step.title}</h3>
      <p className="mt-4 max-w-[440px] text-[16px] leading-relaxed text-white/60">{step.body}</p>
    </div>
  );
}

function DesktopStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  // Scenes only play once the story actually reaches the middle of the screen.
  const [storyRef, storyInView] = useInView<HTMLDivElement>({
    threshold: 0,
    once: false,
    rootMargin: "-50% 0px -50% 0px",
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={storyRef} className="relative mx-auto grid max-w-[1240px] grid-cols-12 gap-10 px-8 pb-24">
      <div className="col-span-5 py-[8vh]">
        {STEPS.map((step, i) => (
          <div
            key={step.time}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-step={i}
            className="flex min-h-[88vh] items-center"
          >
            <StepText step={step} index={i} active={active === i} />
          </div>
        ))}
      </div>

      <div className="col-span-7">
        <div className="sticky top-0 flex h-screen flex-col justify-center pt-12">
          <div className="relative h-[600px]">
            <div
              aria-hidden
              className="absolute inset-[-10%] bg-[radial-gradient(closest-side,rgba(45,212,191,0.13),transparent)]"
            />
            {STEPS.map(({ Scene, time }, i) => (
              <div
                key={time}
                aria-hidden={active !== i}
                className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-700 ease-out ${
                  active === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
                }`}
              >
                <Scene active={storyInView && active === i} />
              </div>
            ))}
          </div>
          <DayRibbon active={active} />
        </div>
      </div>
    </div>
  );
}

const DAY_START = 7 * 60;
const DAY_END = 21 * 60;
const MAJOR_TICKS = ["07:00", "10:00", "13:00", "16:00", "19:00", "21:00"];

/** Maps "HH:MM" onto the 07:00–21:00 day as a percentage of the ribbon line's width. */
function timeToPercent(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return ((h * 60 + m - DAY_START) / (DAY_END - DAY_START)) * 100;
}

function DayRibbon({ active }: { active: number }) {
  const activeTime = STEPS[active].time;
  const pct = timeToPercent(activeTime);
  return (
    <div className="mx-auto mt-8 w-full max-w-[560px]" aria-hidden>
      <div data-ribbon-track className="relative h-11 w-full">
        {/*
          The line is the single coordinate system: progress, event dots, playhead and the
          time readout are its children, so left % and vertical centre both resolve against it.
        */}
        <div data-ribbon-line className="absolute inset-x-0 top-3 h-px bg-white/15">
          <div
            className="absolute inset-y-0 left-0 bg-teal-bright transition-[width] duration-700"
            style={{ width: `${pct}%` }}
          />

          {STEPS.map((step, i) => (
            <span
              key={step.time}
              data-event-time={step.time}
              title={`${step.time} · ${step.label}`}
              className={`absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500 ${
                i <= active ? "bg-teal-bright" : "bg-white/30"
              }`}
              style={{ left: `${timeToPercent(step.time)}%` }}
            />
          ))}

          <span
            data-playhead
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-bright shadow-[0_0_0_6px_rgba(45,212,191,0.16)] transition-[left] duration-700"
            style={{ left: `${pct}%` }}
          />

          <span
            data-playhead-time
            className="absolute bottom-5 -translate-x-1/2 font-mono text-[10.5px] leading-none text-teal-bright tabular-nums transition-[left] duration-700"
            style={{ left: `${pct}%` }}
          >
            {activeTime}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-4 font-mono text-[10.5px] text-white/35">
          {MAJOR_TICKS.map((t) => (
            <span
              key={t}
              data-tick={t}
              className="absolute bottom-0 -translate-x-1/2"
              style={{ left: `${timeToPercent(t)}%` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileStory() {
  return (
    <div className="relative mx-auto max-w-[640px] px-5 pt-12 pb-28">
      {/* Visual vertical timeline track */}
      <div className="absolute left-[41px] top-16 bottom-32 w-px bg-white/15" />
      
      {STEPS.map((step, i) => {
        // Standardize the spacing between cards to ensure a clean, consistent visual flow
        const mt = i === 0 ? 0 : 112; // 112px is equivalent to Tailwind's mt-28
        
        return (
          <div key={step.time} style={{ marginTop: mt }} className="relative ml-8">
             <div className="absolute left-[-16.5px] top-[14px] h-2.5 w-2.5 rounded-full bg-teal-bright shadow-[0_0_0_5px_rgba(45,212,191,0.16)]" />
             <MobileStep step={step} index={i} />
          </div>
        );
      })}
    </div>
  );
}

function MobileStep({ step, index }: { step: Step; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35, once: false });
  const { Scene } = step;
  return (
    <div>
      <StepText step={step} index={index} active />
      <div ref={ref} className="mt-10 flex justify-center">
        <Scene active={inView} />
      </div>
    </div>
  );
}
