import { Logo } from "./ui/Logo";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f223a] text-white pt-20 pb-16 border-t border-slate-800">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="inline-block" aria-label="Healvo Home">
              <Logo height={32} light />
            </a>
            <p className="text-[13.5px] text-slate-300 max-w-sm leading-relaxed">
              Dental clinic management software engineered for clarity, clinical precision, and effortless daily operations.
            </p>
            <div className="pt-2 text-[12.5px] text-slate-400">
              Patients · Appointments · Dental Charts · Consultations · Invoicing · AI
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold tracking-wider text-slate-300 uppercase">
              Clinical Tools
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-slate-400">
              <li>
                <a href="#dental-chart" className="hover:text-white transition-colors">
                  FDI Dental Chart
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Consultation & Notes
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  GST Dental Invoicing
                </a>
              </li>
              <li>
                <a href="#ai-assistant" className="hover:text-white transition-colors">
                  Healvo AI Copilot
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-white transition-colors">
                  The Clinic Loop
                </a>
              </li>
            </ul>
          </div>

          {/* Operations & Access */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold tracking-wider text-slate-300 uppercase">
              Operations
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-slate-400">
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing & Plans
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">
                  Clinic FAQs
                </a>
              </li>
              <li>
                <a
                  href="https://app.healvo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Sign In</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href="https://app.healvo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Start 7-Day Free Trial</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Company */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold tracking-wider text-slate-300 uppercase">
              Security & Privacy
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-slate-400">
              <li>
                <span className="text-slate-400">Row-Level Data Isolation</span>
              </li>
              <li>
                <span className="text-slate-400">Encrypted Cloud Storage</span>
              </li>
              <li>
                <span className="text-slate-400">Automated Daily Backups</span>
              </li>
              <li>
                <span className="text-slate-400">GST-Ready Dental Billing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-slate-400">
          <p>© {currentYear} Healvo. Built for modern dental clinics.</p>
          <div className="flex items-center gap-6">
            <a href="https://healvo.in" className="hover:text-white transition-colors">
              healvo.in
            </a>
            <span className="text-slate-700">·</span>
            <a
              href="https://app.healvo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2dd4bf] hover:underline font-semibold"
            >
              Sign In to Clinic OS →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
