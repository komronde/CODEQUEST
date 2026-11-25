import { useId } from "react";
import { cn } from "@/utils/cn";

interface Props {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = { sm: "size-8", md: "size-10", lg: "size-16" };
const text = { sm: "text-base", md: "text-xl", lg: "text-3xl" };

export function Logo({ size = "md", showText = true, className }: Props) {
  const gid = useId();
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className={cn(sizes[size], "drop-shadow-[0_6px_16px_rgba(124,92,255,0.55)]")} aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b9a8ff" />
            <stop offset="0.55" stopColor="#7c5cff" />
            <stop offset="1" stopColor="#4338ca" />
          </linearGradient>
        </defs>
        <path d="M20 2.5l15 8.5v18L20 37.5 5 29V11z" fill={`url(#${gid})`} />
        <path d="M20 2.5l15 8.5v18L20 37.5 5 29V11z" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <path
          d="M16.5 14l-5 6 5 6M23.5 14l5 6-5 6"
          fill="none"
          stroke="#fff"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span className={cn("font-extrabold tracking-tight text-white", text[size])}>
          Code<span className="text-gradient">Quest</span>
        </span>
      )}
    </span>
  );
}
