import type { ReactNode } from "react";
import { Bell, Check } from "lucide-react";
import { useTimeline, useTypewriter } from "../lib/motion";
import { Avatar } from "./ui";

// The reasons offered on the real public booking page.
const REASONS = ["Consultation", "Dental pain", "Cleaning", "Follow-up", "Tooth sensitivity", "Other"];
const DAYS: [string, string][] = [
  ["Mon", "14"],
  ["Tue", "15"],
  ["Wed", "16"],
  ["Thu", "17"],
  ["Fri", "18"],
];
const SLOTS = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "4:30 PM"];
const DURATIONS = [1300, 900, 1000, 800, 1000, 800, 2500, 3800];
const NAME = "Rahul Verma";
const PHONE = "98450 21734";

export function BookingScene({ active }: { active: boolean }) {
  const step = useTimeline(active, DURATIONS);
  const name = useTypewriter(NAME, active && step >= 6, 55);
  const phone = useTypewriter(PHONE, active && step >= 6 && name.length === NAME.length, 50);
  const confirmed = step >= 7;

  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="relative h-[560px] w-[288px] rounded-[46px] bg-[#040d18] p-[9px] shadow-scene ring-1 ring-white/10">
        <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[#f6f8fa] text-[#0f223a]">
          <div className="absolute top-2.5 left-1/2 z-10 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-[#040d18]" />
          <div className="flex h-full flex-col px-3.5 pt-11 pb-4">
            <div className="flex items-center gap-3 rounded-2xl border border-[#e6e9ee] bg-white px-3.5 py-3">
              <Avatar initials="SD" className="h-10 w-10 text-[13px]" />
              <div>
                <p className="text-[14.5px] font-bold tracking-tight">Sharma Dental</p>
                <p className="text-[11px] text-[#6b7684]">Indiranagar, Bengaluru</p>
              </div>
            </div>

            <div className="mt-2.5 flex-1 space-y-2 overflow-hidden">
              {confirmed ? (
                <Confirmed />
              ) : (
                <>
                  <Block title="What would you like to visit for?" short="Reason" summary="Dental pain" done={step >= 2}>
                    <div className="flex flex-wrap gap-1.5">
                      {REASONS.map((r) => (
                        <Chip key={r} on={step >= 1 && r === "Dental pain"}>
                          {r}
                        </Chip>
                      ))}
                    </div>
                  </Block>
                  {step >= 2 && (
                    <Block title="Pick a day" short="Day" summary="Tue, 15 Sept" done={step >= 4}>
                      <div className="grid grid-cols-5 gap-1.5">
                        {DAYS.map(([d, n]) => {
                          const on = step >= 3 && n === "15";
                          return (
                            <span
                              key={n}
                              className={`rounded-lg border py-1.5 text-center transition-all duration-300 ${
                                on ? "scale-105 border-[#0f223a] bg-[#0f223a] text-white" : "border-[#e6e9ee] bg-white"
                              }`}
                            >
                              <span className={`block text-[9.5px] ${on ? "text-white/70" : "text-[#6b7684]"}`}>{d}</span>
                              <span className="block text-[14px] font-bold">{n}</span>
                            </span>
                          );
                        })}
                      </div>
                    </Block>
                  )}
                  {step >= 4 && (
                    <Block title="Choose a time" short="Time" summary="10:30 AM" done={step >= 6}>
                      <div className="grid grid-cols-3 gap-1.5">
                        {SLOTS.map((s) => (
                          <Chip key={s} on={step >= 5 && s === "10:30 AM"} taken={s === "11:00 AM"} center>
                            {s}
                          </Chip>
                        ))}
                      </div>
                    </Block>
                  )}
                  {step >= 6 && (
                    <Block title="Your details">
                      <Field label="Full name" value={name} typing={name.length < NAME.length} />
                      <Field
                        label="Phone number"
                        prefix="+91"
                        value={phone}
                        typing={name.length === NAME.length && phone.length < PHONE.length}
                      />
                      <span
                        className={`mt-1 block rounded-xl py-2.5 text-center text-[13px] font-semibold text-white transition-colors duration-300 ${
                          phone.length === PHONE.length ? "bg-[#0f223a]" : "bg-[#0f223a]/35"
                        }`}
                      >
                        Confirm booking
                      </span>
                    </Block>
                  )}
                </>
              )}
            </div>

            <p className="pt-2 text-center text-[10.5px] text-[#97a1ad]">
              Powered by{" "}
              <span className="wordmark text-[12px] text-[#0f223a]">
                Heal<span className="text-[#0ea5b7]">vo</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* What the clinic sees at the same moment */}
      <div
        className={`absolute top-20 left-1/2 ml-[96px] hidden w-[236px] rounded-2xl bg-white p-3.5 text-[#0f223a] shadow-scene transition-all duration-700 sm:block ${
          confirmed ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0"
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e6f6f8] text-[#0ea5b7]">
            <Bell size={15} />
          </span>
          <div className="min-w-0">
            <p className="text-[12.5px] font-bold">New online booking</p>
            <p className="mt-0.5 text-[12px] text-[#3d4b5e]">Rahul Verma · Dental pain</p>
            <p className="font-mono text-[11px] text-[#6b7684]">Tue 15 Sept, 10:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({
  title,
  short,
  summary,
  done = false,
  children,
}: {
  title: string;
  short?: string;
  summary?: string;
  done?: boolean;
  children: ReactNode;
}) {
  if (done) {
    return (
      <div className="fade-up flex items-center gap-2 rounded-xl border border-[#e6e9ee] bg-white px-3 py-2.5">
        <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-[#0ea5b7] text-white">
          <Check size={11} strokeWidth={3} />
        </span>
        <span className="text-[11.5px] text-[#6b7684]">{short}</span>
        <span className="ml-auto text-[12px] font-semibold">{summary}</span>
      </div>
    );
  }
  return (
    <div className="fade-up rounded-2xl border border-[#e6e9ee] bg-white p-3">
      <p className="mb-2.5 text-[12.5px] font-bold">{title}</p>
      {children}
    </div>
  );
}

function Chip({ on, taken = false, center = false, children }: { on: boolean; taken?: boolean; center?: boolean; children: ReactNode }) {
  return (
    <span
      className={`rounded-lg border px-2 py-1.5 text-[11.5px] font-medium transition-all duration-300 ${center ? "text-center" : ""} ${
        on
          ? "scale-105 border-[#0f223a] bg-[#0f223a] text-white"
          : taken
            ? "border-[#eef1f4] bg-[#f6f8fa] text-[#b9c1cb] line-through"
            : "border-[#e6e9ee] bg-white"
      }`}
    >
      {children}
    </span>
  );
}

function Field({ label, value, prefix, typing }: { label: string; value: string; prefix?: string; typing: boolean }) {
  return (
    <div className="mb-2">
      <span className="mb-1 block text-[11px] text-[#6b7684]">{label}</span>
      <span
        className={`flex h-9 items-center gap-1.5 rounded-lg border bg-white px-2.5 text-[12.5px] transition-colors ${
          typing ? "border-[#0ea5b7] ring-2 ring-[#0ea5b7]/15" : "border-[#e6e9ee]"
        }`}
      >
        {prefix && <span className="text-[#6b7684]">{prefix}</span>}
        <span className={typing ? "caret" : ""}>{value}</span>
      </span>
    </div>
  );
}

function Confirmed() {
  return (
    <div className="fade-up rounded-2xl border border-[#e6e9ee] bg-white px-4 py-7 text-center">
      <span className="pop-in mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#e6f7f1] text-[#0f8a5f]">
        <Check size={24} strokeWidth={2.6} />
      </span>
      <p className="mt-3 text-[16px] font-bold">You're booked</p>
      <p className="mt-1 text-[12px] leading-snug text-[#6b7684]">Your appointment at Sharma Dental is confirmed.</p>
      <div className="mt-4 rounded-xl bg-[#f6f8fa] px-3 py-2.5 text-left">
        <p className="text-[12.5px] font-semibold">Tue, 15 Sept · 10:30 AM</p>
        <p className="text-[11.5px] text-[#6b7684]">Dental pain · Rahul Verma</p>
      </div>
    </div>
  );
}
