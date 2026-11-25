import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock, Play, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCourse } from "@/data/courses";
import { courseProgress, isLessonUnlocked } from "@/lib/progress";
import { XP } from "@/lib/levels";
import { tr } from "@/lib/text";
import { useLang } from "@/hooks/useLang";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { CourseIcon } from "@/components/ui/CourseIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";

export default function CoursePage() {
  const { courseId } = useParams();
  const { t } = useTranslation();
  const { lang } = useLang();
  const { state } = useGame();
  const toast = useToast();
  const course = getCourse(courseId);
  if (!course) return <Navigate to="/paths" replace />;
  const progress = courseProgress(state, course);

  return (
    <div>
      <Link to="/paths" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-white">
        <ArrowLeft className="size-4" aria-hidden />
        {t("course.backToPaths")}
      </Link>

      <section
        className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8"
        style={{ backgroundImage: `linear-gradient(135deg, ${course.from}30, ${course.to}18 60%, #0f1329)` }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full opacity-25 blur-3xl" style={{ background: course.to }} aria-hidden />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <CourseIcon course={course} size="lg" />
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{tr(course.title, lang)}</h1>
            <p className="mt-2 max-w-xl text-slate-300">{tr(course.desc, lang)}</p>
            <div className="mt-5 max-w-md">
              <div className="mb-2 flex justify-between text-xs font-bold text-slate-300">
                <span>{t("paths.lessonsProgress", { done: progress.done, total: progress.total })}</span>
                <span>{progress.pct}%</span>
              </div>
              <ProgressBar value={progress.pct} label={tr(course.title, lang)} />
            </div>
          </div>
          {progress.next ? (
            <Button size="lg" to={`/lesson/${course.id}/${progress.next.id}`} icon={<Play className="size-5" />}>
              {progress.started ? t("common.continue") : t("common.start")}
            </Button>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-2xl bg-mint-400/15 px-4 py-3 text-sm font-extrabold text-mint-400">
              <Check className="size-5" aria-hidden />
              {t("course.complete")}
            </span>
          )}
        </div>
      </section>

      <h2 className="mb-4 mt-8 text-xl font-extrabold text-white">{t("course.lessons")}</h2>
      <ol className="relative space-y-3">
        <span className="absolute bottom-6 left-[27px] top-6 w-0.5 bg-gradient-to-b from-brand-500/40 via-white/10 to-transparent" aria-hidden />
        {course.lessons.map((lesson, i) => {
          const done = state.completedLessons[lesson.id];
          const unlocked = isLessonUnlocked(state, course, lesson);
          const isNext = unlocked && !done;
          const rowClass = cn(
            "surface relative flex w-full items-center gap-4 p-4 text-left transition",
            unlocked ? "surface-hover cursor-pointer" : "opacity-60",
            isNext && "border-brand-400/40 bg-brand-500/[0.08]",
          );
          const body = (
            <>
              <span
                className={cn(
                  "relative z-10 grid size-[54px] shrink-0 place-items-center rounded-2xl border-2 text-lg font-extrabold",
                  done ? "border-mint-400 bg-mint-400/15 text-mint-400" : isNext ? "border-brand-400 bg-brand-500/25 text-white" : "border-white/10 bg-ink-700 text-slate-500",
                )}
              >
                {done ? <Check className="size-6" aria-hidden /> : unlocked ? i + 1 : <Lock className="size-5" aria-hidden />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-base font-extrabold text-white">{tr(lesson.title, lang)}</span>
                <span className="mt-0.5 block text-xs font-semibold text-slate-500">
                  {t("course.exercisesCount", { count: lesson.exercises.length })}
                  {!unlocked && ` · ${t("common.locked")}`}
                </span>
              </span>
              {done ? (
                <span className="hidden text-xs font-bold text-mint-400 sm:block">{t("course.review")}</span>
              ) : (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-extrabold text-amber-300">
                  <Zap className="size-3.5" aria-hidden />+{XP.lesson}
                </span>
              )}
            </>
          );
          return (
            <motion.li key={lesson.id} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              {unlocked ? (
                <Link to={`/lesson/${course.id}/${lesson.id}`} className={rowClass}>
                  {body}
                </Link>
              ) : (
                <button
                  className={rowClass}
                  aria-disabled="true"
                  onClick={() => toast.info(t("course.lockedToast"), t("course.lockedHint"))}
                >
                  {body}
                </button>
              )}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
