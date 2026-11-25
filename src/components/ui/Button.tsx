import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "success" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  /** Render as a router link */
  to?: string;
  icon?: ReactNode;
}

const base =
  "inline-flex select-none items-center justify-center gap-2 rounded-xl font-bold transition duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-600/30 hover:from-brand-300 hover:to-brand-500 hover:shadow-brand-500/40",
  secondary: "border border-white/10 bg-white/[0.04] text-slate-100 hover:border-white/20 hover:bg-white/[0.09]",
  ghost: "text-slate-300 hover:bg-white/[0.07] hover:text-white",
  success: "bg-gradient-to-b from-mint-400 to-mint-500 text-ink-950 shadow-lg shadow-mint-500/25 hover:brightness-110",
  danger: "bg-gradient-to-b from-rose-400 to-rose-400/80 text-ink-950 shadow-lg shadow-rose-400/20 hover:brightness-110",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", full, to, icon, className, children, type = "button", ...rest },
  ref,
) {
  const cls = cn(base, variants[variant], sizes[size], full && "w-full", className);
  if (to) {
    return (
      <Link to={to} className={cls}>
        {icon}
        {children}
      </Link>
    );
  }
  return (
    <button ref={ref} type={type} className={cls} {...rest}>
      {icon}
      {children}
    </button>
  );
});
