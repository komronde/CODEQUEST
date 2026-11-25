import { cn } from "@/utils/cn";

export const AVATAR_GRADIENTS = [
  "from-brand-400 to-brand-600",
  "from-cyan-400 to-blue-600",
  "from-mint-400 to-cyan-500",
  "from-amber-400 to-rose-500",
  "from-pink-400 to-brand-500",
  "from-orange-400 to-amber-500",
  "from-rose-400 to-brand-600",
  "from-lime-300 to-mint-500",
];

interface Props {
  name: string;
  index: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = { sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-14 text-xl", xl: "size-24 text-4xl" };

export function Avatar({ name, index, size = "md", className }: Props) {
  const initial = (name.trim()[0] ?? "?").toUpperCase();
  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-extrabold text-white shadow-lg ring-2 ring-white/10",
        AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length],
        sizes[size],
        className,
      )}
    >
      {initial}
    </span>
  );
}
