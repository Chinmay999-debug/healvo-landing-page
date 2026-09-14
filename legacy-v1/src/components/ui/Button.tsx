import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "teal" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "right",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 select-none";

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-[13px] gap-1.5",
    md: "px-5 py-2.5 text-[14px] gap-2",
    lg: "px-6 py-3.5 text-[15px] gap-2.5 font-bold tracking-tight shadow-sm",
  };

  const variantClasses = {
    primary:
      "bg-[#0f223a] text-white hover:bg-[#182f4d] active:scale-[0.99] shadow-sm hover:shadow",
    teal:
      "bg-[#0ea5b7] text-white hover:bg-[#0891b2] active:scale-[0.99] shadow-sm hover:shadow-md hover:shadow-teal-500/20",
    outline:
      "bg-white text-[#0f223a] border border-[#d8dde4] hover:bg-[#f6f8fa] hover:border-[#b0bac6] active:scale-[0.99]",
    ghost:
      "bg-transparent text-[#0f223a] hover:bg-[#f0f4f8] active:scale-[0.99]",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
