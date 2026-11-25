import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone: string; // tailwind text + bg classes for the icon chip
}

export function StatCard({ icon: Icon, label, value, tone }: Props) {
  return (
    <div className="surface flex items-center gap-3 p-3.5 sm:p-4">
      <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", tone)}>
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xl font-extrabold leading-tight text-white sm:text-2xl">{value}</p>
        <p className="truncate text-xs font-semibold text-slate-500">{label}</p>
      </div>
    </div>
  );
}
