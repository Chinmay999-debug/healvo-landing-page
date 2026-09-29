/**
 * Meta pixel wiring for the marketing site.
 *
 * The base code lives in index.html so PageView fires before React boots. This
 * module owns everything after that: the one funnel event the landing page can
 * honestly report, and the click-id handoff to app.healvo.in.
 *
 * Nothing here ever sends a name, phone, email or any other identifier. The
 * landing page collects none, and Automatic Advanced Matching is switched off
 * in the base code so the pixel cannot scrape any either.
 */

export const META_PIXEL_ID = "1390497239915643";

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

function fbq(...args: unknown[]): void {
  // The script is blocked often enough (ad blockers, strict DNS) that its
  // absence has to be ordinary rather than an error.
  window.fbq?.(...args);
}

let viewContentSent = false;

/**
 * Fired once, when the pricing section actually comes into view.
 *
 * This is the only mid-funnel signal the marketing site can report truthfully:
 * the visitor read the price. Everything past this point happens on
 * app.healvo.in, so the trial itself is reported from there.
 */
export function trackPricingViewContent(): void {
  if (viewContentSent) return;
  viewContentSent = true;
  fbq("track", "ViewContent", {
    content_name: "Healvo Dental — pricing",
    content_category: "subscription",
    content_type: "product",
    content_ids: ["healvo-dental"],
  });
}
