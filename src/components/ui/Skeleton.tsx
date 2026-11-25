import { cn } from "@/utils/cn";
import { Logo } from "@/components/brand/Logo";
import { useTranslation } from "react-i18next";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} aria-hidden />;
}

/** Full-screen splash / loading state. */
export function PageLoader() {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-ink-950" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-5">
        <div className="animate-float">
          <Logo size="lg" showText={false} />
        </div>
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="skeleton h-full w-full bg-brand-500/60" />
        </div>
        <span className="text-sm font-semibold text-slate-400">{t("common.loading")}</span>
      </div>
    </div>
  );
}
