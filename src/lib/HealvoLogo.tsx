/**
 * The supplied Healvo wordmark — identical markup to public/assets/healvo-logo.svg.
 * Inlined rather than used via <img>, because an SVG loaded as an image can't
 * reach the page's Poppins web font and would fall back to Arial.
 */
export function HealvoLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 84" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" focusable="false">
      <text
        x="6"
        y="58"
        fontFamily="Poppins, 'Helvetica Neue', Arial, sans-serif"
        fontSize="56"
        fontWeight="700"
        letterSpacing="-2.5"
      >
        <tspan fill="#0f223a">Heal</tspan>
        <tspan fill="#0ea5b7">vo</tspan>
      </text>
    </svg>
  );
}
