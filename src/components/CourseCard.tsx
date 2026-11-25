import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Course } from "@/types";
import type { CourseProgress } from "@/lib/progress";
import { tr } from "@/lib/text";
import { useLang } from "@/hooks/useLang";
import { CourseIcon } from "@/components/ui/CourseIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface Props {
  course: Course;
  progress?: CourseProgress;
}

export function CourseCard({ course, progress }: Props) {
  const { t } = useTranslation();
  const { lang } = useLang();
  const done = progress?.done ?? 0;
  return (
    <Link to={`/course/${course.id}`} className="surface surface-hover group relative flex h-full flex-col gap-4 overflow-hidden p-5">
      <div
        className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full opacity-20 blur-3xl transition group-hover:opacity-40"
        style={{ background: course.to }}
        aria-hidden
      />
      <div className="flex items-start justify-between">
        <CourseIcon course={course} />
        {progress?.complete && (
          <span className="inline-flex items-center gap-1 rounded-full bg-mint-400/15 px-2.5 py-1 text-xs font-bold text-mint-400">
            <CheckCircle2 className="size-3.5" aria-hidden />
            {t("common.completed")}
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-extrabold text-white">{tr(course.title, lang)}</h3>
        <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-slate-400">{tr(course.desc, lang)}</p>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>{t("paths.lessonsProgress", { done, total: course.lessons.length })}</span>
          <ArrowRight className="size-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-brand-300" aria-hidden />
        </div>
        <ProgressBar value={progress?.pct ?? 0} size="sm" label={tr(course.title, lang)} />
      </div>
    </Link>
  );
}
