export const APP_URL = "https://app.healvo.in";

/**
 * Ad-click identifiers worth carrying across the healvo.in → app.healvo.in
 * hop. The pixel's own _fbp/_fbc cookies are set on .healvo.in and so are
 * already visible to the subdomain; forwarding fbclid in the URL is the
 * belt-and-braces path for visitors whose cookies get dropped between the two
 * loads, which is common enough on mobile Safari to be worth the few bytes.
 *
 * Deliberately a fixed allowlist: whatever else is on the marketing URL stays
 * on the marketing URL rather than being replayed into the app.
 */
const FORWARDED_PARAMS = [
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** APP_URL with any ad-click identifiers from the current page carried over. */
export function appUrl(): string {
  if (typeof window === "undefined") return APP_URL;

  const here = new URLSearchParams(window.location.search);
  const target = new URL(APP_URL);
  for (const key of FORWARDED_PARAMS) {
    const value = here.get(key);
    if (value) target.searchParams.set(key, value);
  }
  return target.toString();
}
