import { Calendar, Globe, Smartphone, CheckCircle2 } from "lucide-react";

export function PublicBookingShowcase() {
  const benefits = [
    {
      icon: Globe,
      title: "Your Dedicated Clinic URL",
      desc: "Every clinic receives a branded booking portal (e.g. healvo.in/book/your-clinic) ready for your Google Maps profile, Instagram bio, and WhatsApp auto-responder."
    },
    {
      icon: Calendar,
      title: "Zero Double-Booking",
      desc: "Available slots automatically reflect the clinic's operating days, working hours, and doctor appointments in real-time."
    },
    {
      icon: Smartphone,
      title: "No Apps or Downloads Required",
      desc: "Patients pick their treatment reason, select an open slot, enter their phone number, and receive instant confirmation via standard browser."
    }
  ];

  return (
    <section className="py-28 sm:py-36 bg-white border-t border-[#e6e9ee] relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#0f223a] text-[12px] font-extrabold uppercase tracking-wider mb-5">
            <span>Online Patient Scheduling</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-[#0f223a] tracking-tight leading-[1.08]">
            Your clinic's 24/7 digital front door.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-[#5b6472] font-normal leading-relaxed max-w-2xl mx-auto">
            Stop losing patients after clinic hours. Let patients book appointments online while your team sleeps, with zero phone tag and zero receptionist friction.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Real UI Screenshot in elevated frame */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-[#cbd5e1] bg-white shadow-2xl overflow-hidden product-showcase-frame">
              <div className="px-5 py-3.5 bg-[#edf2f7] border-b border-[#cbd5e1] flex items-center justify-between">
                <div className="flex items-center gap-2.5 font-mono text-[12.5px] text-slate-500">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="ml-3 font-sans font-semibold text-slate-800">
                    healvo.in/book/sharma-dental
                  </span>
                </div>
                <span className="text-[11.5px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  Live Patient Booking
                </span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                <img
                  src="/assets/real-product/demo_booking.png"
                  alt="Real Healvo Public Booking Interface for patients"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Benefits Column */}
          <div className="lg:col-span-4 space-y-5">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:border-[#cbd5e1] hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0ea5b7] flex items-center justify-center mb-3.5">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0f223a] mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-[14px] text-[#5b6472] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}

            <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200/80 flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#0f8a5f] shrink-0 mt-0.5" />
              <span className="text-[13.5px] font-semibold text-[#0f223a] leading-snug">
                New patient appointments automatically create a profile in your clinic directory
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
