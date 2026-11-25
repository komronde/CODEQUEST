import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface Props {
  value: number; // 0-100
  label?: string;
  className?: string;
  barClassName?: string;
  size?: "sm" | "md" | "lg";
}

const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

export function ProgressBar({ value, label, className, barClassName, size = "md" }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("w-full overflow-hidden rounded-full bg-white/[0.07]", heights[size], className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={label}
    >
      <motion.div
        className={cn("h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-cyan-400", barClassName)}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
