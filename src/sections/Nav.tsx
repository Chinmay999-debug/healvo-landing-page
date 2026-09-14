import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { APP_URL } from "../lib/site";
import { HealvoLogo } from "../lib/HealvoLogo";

const LINKS: [string, string][] = [
  ["#chart", "Dental chart"],
  ["#day", "A day in Healvo"],
  ["#pricing", "Pricing"],
  ["#faq", "FAQ"],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="-ml-1 block" aria-label="Healvo home">
          <HealvoLogo className="h-9 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="text-[14px] font-medium text-ink-2 transition-colors hover:text-ink">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a href={APP_URL} className="hidden px-3 py-2 text-[14px] font-semibold text-ink sm:inline-block">
            Log in
          </a>
          <a href={APP_URL} className="btn btn-ink h-10 px-4 text-[14px]">
            Start free trial
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line px-5 pb-4 md:hidden">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3.5 font-serif text-[26px] text-ink"
            >
              {label}
            </a>
          ))}
          <a href={APP_URL} className="block pt-4 text-[15px] font-semibold text-ink">
            Log in
          </a>
        </nav>
      )}
    </header>
  );
}
