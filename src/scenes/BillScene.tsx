import { formatINR, useCountUp, useTimeline } from "../lib/motion";
import { AppFrame, Badge, type Tone } from "./ui";

const ITEMS: [string, number][] = [
  ["Consultation", 500],
  ["X-ray (IOPA)", 400],
  ["Root canal treatment · sitting 1", 3000],
];
const TOTAL = 3900;
const DURATIONS = [700, 700, 700, 900, 1100, 2000, 2000, 3200];
const METHODS = ["UPI", "Cash", "Card", "Other"];

type BillStatus = "unpaid" | "partially-paid" | "paid";
const BILL_META: Record<BillStatus, { label: string; tone: Tone }> = {
  unpaid: { label: "Unpaid", tone: "amber" },
  "partially-paid": { label: "Partially paid", tone: "blue" },
  paid: { label: "Paid", tone: "mint" },
};

export function BillScene({ active }: { active: boolean }) {
  const step = useTimeline(active, DURATIONS);
  const itemsTotal = ITEMS.filter((_, i) => step >= i + 1).reduce((sum, [, v]) => sum + v, 0);
  const total = useCountUp(itemsTotal, active, 550);
  const paid = useCountUp(step >= 6 ? TOTAL : step >= 5 ? 2000 : 0, active, 900);
  const status: BillStatus = step >= 6 ? "paid" : step >= 5 ? "partially-paid" : "unpaid";
  const recording = step === 5 ? "UPI" : step === 6 ? "Cash" : null;

  return (
    <div className="relative w-full max-w-[560px]">
      <AppFrame crumb="Billing / INV-1024">
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11.5px] text-[#6b7684]">INV-1024</p>
              <h4 className="text-[20px] font-bold tracking-tight">Rahul Verma</h4>
              <p className="text-[12px] text-[#6b7684]">14 Sept 2026 · Dr. Ananya Sharma</p>
            </div>
            <Badge key={status} tone={BILL_META[status].tone} className="pop-in mt-1">
              {BILL_META[status].label}
            </Badge>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#e6e9ee]">
            <div className="flex justify-between bg-[#f6f8fa] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#6b7684]">
              <span>Description</span>
              <span>Amount</span>
            </div>
            <div className="min-h-[126px]">
              {ITEMS.map(([desc, amount], i) =>
                step >= i + 1 ? (
                  <div key={desc} className="row-in">
                    <div className="flex justify-between border-t border-[#eef1f4] px-3.5 py-2.5 text-[13px]">
                      <span>{desc}</span>
                      <span className="font-mono tabular-nums">{formatINR(amount)}</span>
                    </div>
                  </div>
                ) : null,
              )}
            </div>
            <div className="flex items-center justify-between border-t border-[#e6e9ee] px-3.5 py-3">
              <span className="text-[13px] font-semibold">Total</span>
              <span className="text-[24px] font-bold tracking-tight tabular-nums">{formatINR(total)}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-[12px] text-[#6b7684]">
              <span>
                Paid <b className="text-[#0f223a] tabular-nums">{formatINR(paid)}</b>
              </span>
              <span>
                Balance <b className="text-[#0f223a] tabular-nums">{formatINR(Math.max(0, TOTAL - paid))}</b>
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#eef1f4]">
              <div className="h-full rounded-full bg-[#0ea5b7]" style={{ width: `${(paid / TOTAL) * 100}%` }} />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[12.5px] font-bold">Payments</p>
            <div className="mt-2 min-h-[84px] space-y-1.5">
              {step < 5 && <p className="text-[12px] text-[#97a1ad]">No payments recorded yet</p>}
              {step >= 5 && <PaymentRow method="UPI" amount={2000} time="11:16 AM" />}
              {step >= 6 && <PaymentRow method="Cash" amount={1900} time="11:18 AM" />}
            </div>
          </div>
        </div>
      </AppFrame>

      {/* Record payment sheet */}
      <div
        className={`absolute -right-6 -bottom-12 hidden w-[220px] rounded-2xl bg-white p-3.5 text-[#0f223a] shadow-scene transition-all duration-500 sm:block xl:-right-12 ${
          recording ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <p className="text-[12.5px] font-bold">Record payment</p>
        <div className="mt-2.5 grid grid-cols-4 gap-1 rounded-lg bg-[#f3f5f8] p-1 text-[11px] font-semibold">
          {METHODS.map((m) => (
            <span
              key={m}
              className={`rounded-md py-1 text-center transition-colors duration-300 ${
                recording === m ? "bg-white text-[#0f223a] shadow-sm" : "text-[#6b7684]"
              }`}
            >
              {m}
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-[11px] text-[#6b7684]">Amount</p>
        <p className="text-[18px] font-bold tabular-nums">{recording === "Cash" ? "₹1,900" : "₹2,000"}</p>
      </div>

      {step >= 7 && (
        <div className="stamp pointer-events-none absolute top-[312px] left-[34%] rounded-md border-[3px] border-[#0f8a5f]/85 px-3 py-0.5 font-mono text-[26px] font-bold tracking-[0.22em] text-[#0f8a5f]/85">
          PAID
        </div>
      )}
    </div>
  );
}

function PaymentRow({ method, amount, time }: { method: string; amount: number; time: string }) {
  return (
    <div className="fade-up flex items-center gap-3 rounded-lg border border-[#eef1f4] px-3 py-2 text-[12.5px]">
      <Badge tone="slate">{method}</Badge>
      <span className="font-semibold tabular-nums">{formatINR(amount)}</span>
      <span className="ml-auto font-mono text-[11px] text-[#6b7684]">{time}</span>
    </div>
  );
}
