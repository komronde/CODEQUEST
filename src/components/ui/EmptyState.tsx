import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="surface flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-5 grid size-16 place-items-center rounded-3xl bg-brand-400/10 text-brand-300 ring-1 ring-brand-400/20">
        <Icon className="size-8" aria-hidden />
      </div>
      <h3 className="text-lg font-extrabold text-white">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-slate-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
