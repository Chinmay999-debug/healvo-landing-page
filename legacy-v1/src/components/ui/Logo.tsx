interface LogoProps {
  className?: string;
  height?: number;
  light?: boolean;
}

export function Logo({ className = "", height = 28, light = false }: LogoProps) {
  return (
    <div className={`inline-flex items-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 300 84"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Healvo"
        style={{ height: `${height}px`, width: "auto" }}
        className="block select-none"
      >
        <title>Healvo</title>
        <text
          x="6"
          y="58"
          fontFamily="Poppins, 'Helvetica Neue', Arial, sans-serif"
          fontSize="56"
          fontWeight="700"
          letterSpacing="-2.5"
        >
          <tspan fill={light ? "#ffffff" : "#0f223a"}>Heal</tspan>
          <tspan fill={light ? "#2dd4bf" : "#0ea5b7"}>vo</tspan>
        </text>
      </svg>
    </div>
  );
}
