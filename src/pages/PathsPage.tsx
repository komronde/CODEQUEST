import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { COURSES } from "@/data/courses";
import { courseProgress } from "@/lib/progress";
import { useGame } from "@/context/GameContext";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { cn } from "@/utils/cn";

type Filter = "all" | "progress" | "done" | "new";
const FILTERS: Filter[] = ["all", "progress", "done", "new"];

export default function PathsPage() {
  const { t } = useTranslation();
  const { state } = useGame();
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(
    () =>
      COURSES.map((course) => ({ course, progress: courseProgress(state, course) })).filter(({ progress: p }) => {
        if (filter === "progress") return p.started && !p.complete;
        if (filter === "done") return p.complete;
        if (filter === "new") return !p.started;
        return true;
      }),
    [state, filter],
  );

  return (
    <div>
      <PageHeader title={t("nav.paths")} subtitle={t("paths.subtitle")} />
      <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="tablist" aria-label={t("paths.filters")}>
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition",
              filter === f ? "border-brand-400/50 bg-brand-500/20 text-white" : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white",
            )}
          >
            {t(`paths.filter.${f}`)}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={t("paths.emptyTitle")}
          description={t("paths.emptyDesc")}
          action={<Button onClick={() => setFilter("all")}>{t("paths.resetFilters")}</Button>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ course, progress }) => (
            <CourseCard key={course.id} course={course} progress={progress} />
          ))}
        </div>
      )}
    </div>
  );
}
