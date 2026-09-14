import { ArrowRight, Phone } from "lucide-react";
import { APP_URL } from "../lib/site";
import { useInView } from "../lib/motion";
import { ALL_TEETH, TOOTH_SHAPES, archPoint } from "../lib/teeth";

export function Closing() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="night-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div ref={ref} data-in={inView ? "" : undefined} className="relative mx-auto max-w-[1240px] px-5 pt-32 pb-24 sm:px-8 lg:pt-44">
        {/* The full arch, drawn in outline — the same geometry as the product chart */}
        <svg
          viewBox="0 0 820 376"
          aria-hidden
          className="pointer-events-none absolute top-8 left-1/2 w-[min(1180px,160%)] -translate-x-1/2 opacity-45 [mask-image:radial-gradient(ellipse_48%_50%_at_50%_54%,transparent_50%,black_100%)]"
        >
          {ALL_TEETH.map((meta) => {
            const p = archPoint(meta, 410, meta.arch === "upper" ? 58 : 250);
            const flip = meta.arch === "lower";
            return (
              <g key={meta.fdi} transform={`translate(${p.x} ${p.y}) rotate(${p.rotation})`}>
                <g transform={flip ? "translate(-16,24) scale(1,-1)" : "translate(-16,-24)"}>
                  <path
                    d={TOOTH_SHAPES[meta.type].crown}
                    pathLength={1}
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth={1.1}
                    className="draw"
                    style={{ animationDelay: `${Math.abs(meta.index - 7.5) * 70}ms` }}
                  />
                </g>
              </g>
            );
          })}
        </svg>

        <div className="relative text-center">
          <p className="eyebrow justify-center text-white/50">START THIS WEEK</p>
          <h2 className="mx-auto mt-8 max-w-[980px] font-serif text-[clamp(3.2rem,8.6vw,7.6rem)] leading-[0.92] tracking-[-0.02em]">
            Your clinic, <em className="text-teal-bright">ready for tomorrow.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-[520px] text-[17px] leading-relaxed text-white/60">
            Set up your clinic today. Bring your patients, appointments and records into one place with Healvo.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={APP_URL} className="btn btn-teal h-13 px-7 text-[15.5px]">
              Start your 7-day free trial <ArrowRight size={17} className="arrow" />
            </a>
            <a href={APP_URL} className="btn btn-ghost-dark h-13 px-6 text-[15.5px]">
              Log in
            </a>
          </div>
          <p className="mt-6 font-mono text-[12px] text-white/40">7 days free · then ₹499/month or ₹5,988/year + GST</p>
        </div>
      </div>

      <Footer />
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto max-w-[1240px] px-5 pt-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <p className="wordmark text-[26px] text-white">
              Heal<span className="text-teal-bright">vo</span>
            </p>
            <p className="mt-2 max-w-[280px] text-[14px] leading-relaxed text-white/50">
              Clinic software for dental practices in India.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-14 text-[14px] sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/35">Product</p>
              <ul className="mt-4 space-y-2.5 text-white/70">
                <li><a className="hover:text-white" href="#chart">Dental chart</a></li>
                <li><a className="hover:text-white" href="#day">A day in Healvo</a></li>
                <li><a className="hover:text-white" href="#pricing">Pricing</a></li>
                <li><a className="hover:text-white" href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/35">Account</p>
              <ul className="mt-4 space-y-2.5 text-white/70">
                <li><a className="hover:text-white" href={APP_URL}>Start free trial</a></li>
                <li><a className="hover:text-white" href={APP_URL}>Log in</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/35">Contact</p>
              <ul className="mt-4 space-y-2.5 text-white/70">
                <li>
                  <a className="flex items-center gap-2 hover:text-white" href="tel:+917425044822">
                    <Phone size={14} /> +91-7425044822
                  </a>
                </li>
                <li>
                  <a className="flex items-center gap-2 hover:text-white" href="https://wa.me/917425044822" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg> WhatsApp
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex items-center gap-4 text-white/50">
                <a href="https://www.instagram.com/healvo.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61594072271423" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 py-6 text-[12.5px] text-white/40 sm:flex-row sm:justify-between">
          <span>© 2026 Healvo</span>
          <span>Made in India, for Indian dental clinics</span>
        </div>
      </div>
      <p
        aria-hidden
        className="wordmark -mb-[0.12em] overflow-hidden text-center text-[clamp(6rem,27vw,25rem)] leading-[0.8] text-transparent select-none [-webkit-text-stroke:1px_rgba(255,255,255,0.12)]"
      >
        Healvo
      </p>
    </footer>
  );
}
