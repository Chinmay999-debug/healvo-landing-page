import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#workflow" },
    { label: "Dental Chart", href: "#dental-chart" },
    { label: "AI Copilot", href: "#ai-assistant" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faqs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#e6e9ee] py-3.5 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Official SVG */}
          <a
            href="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg py-1 transition-opacity hover:opacity-90"
            aria-label="Healvo Home"
          >
            <Logo height={32} />
          </a>

          {/* Desktop Navigation Links - Integrated, no floating glass pill */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[14px] font-semibold text-[#5b6472] hover:text-[#0f223a] transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0ea5b7] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Action Group */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="https://app.healvo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-semibold text-[#475467] hover:text-[#0f223a] transition-colors px-2 py-1.5"
            >
              Log in
            </a>
            <a
              href="https://app.healvo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[13.5px] font-bold text-white bg-[#0f223a] hover:bg-[#182f4d] rounded-xl transition-all duration-150 shadow-xs hover:shadow-md active:scale-[0.98]"
            >
              <span>Start free trial</span>
              <ArrowRight size={14} className="text-teal-400" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="https://app.healvo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden px-3 py-1.5 text-[12.5px] font-bold text-white bg-[#0f223a] rounded-lg"
            >
              Start free
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5b6472] hover:text-[#0f223a] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-[#e6e9ee] shadow-xl px-6 py-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-2 text-[15px] font-semibold text-[#0f223a] hover:text-[#0ea5b7] hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#e6e9ee] flex flex-col gap-3">
            <a
              href="https://app.healvo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 text-[14.5px] font-semibold text-[#5b6472] hover:text-[#0f223a] bg-slate-50 rounded-xl"
            >
              Log in to Clinic OS
            </a>
            <a
              href="https://app.healvo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 text-[14.5px] font-bold text-white bg-[#0f223a] hover:bg-[#182f4d] rounded-xl shadow-sm"
            >
              Start your 7-day free trial →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
