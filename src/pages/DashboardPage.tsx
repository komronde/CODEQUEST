import { Link } from "react-router-dom";
import { ArrowRight, BookOpenCheck, Flame, Gauge, PartyPopper, Sparkles, Target, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { COURSES } from "@/data/courses";
import { QUESTS } from "@/data/quests";
import { courseProgress, suggestNext } from "@/lib/progress";
import { dateKey, lastDays } from "@/lib/dates";
import { LOCALE_TAG, tr } from "@/lib/text";
import { useLang } from "@/hooks/useLang";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { CourseCard } from "@/components/CourseCard";
import { CourseIcon } from "@/components/ui/CourseIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { StatCard } from "@/components/ui/StatCard";
import { cn } from "@/utils/cn";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const toast = useToast();
  const { state, level, streak, loadDemo } = useGame();
  const suggestion = suggestNext(state);
  const lessonsDone = Object.keys(state.completedLessons).length;
  const today = dateKey();
  const todayXp = state.xpLog[today] ?? 0;
  const goal = state.settings.dailyGoal;
  const goalPct = Math.min(100, Math.round((todayXp / goal) * 100));
  const week = lastDays(7).map((d) => {
    const [y, m, day] = d.split("-").map(Number);
    return { key: d, xp: state.xpLog[d] ?? 0, label: new Date(y, m - 1, day).toLocaleDateString(LOCALE_TAG[lang], { weekday: "short" }) };
  });
  const maxXp = Math.max(goal, ...week.map((w) => w.xp));
  const isFresh = state.xp === 0 && lessonsDone === 0;

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{t("dashboard.welcome", { name: state.profile.name })}</h1>
        <p className="mt-1.5 text-base text-slate-400">{isFresh ? t("dashboard.subtitleNew") : t("dashboard.subtitle", { count: streak })}</p>
      </div>

      {/* Continue hero */}
      {suggestion ? (
        <section
          className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8"
          style={{ backgroundImage: `linear-gradient(135deg, ${suggestion.course.from}33, ${suggestion.course.to}22 55%, #0f1329)` }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full opacity-30 blur-3xl" style={{ background: suggestion.course.to }} aria-hidden />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <CourseIcon course={suggestion.course} size="lg" />
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-200">{isFresh ? t("dashboard.startFirst") : t("dashboard.continueTitle")}</p>
              <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">{tr(suggestion.lesson.title, lang)}</h2>
              <p className="mt-1 text-sm font-medium text-slate-300">
                {tr(suggestion.course.title, lang)} · {t("lesson.lessonNo", { n: suggestion.lesson.index + 1 })}
              </p>
            </div>
            <Button size="lg" to={`/lesson/${suggestion.course.id}/${suggestion.lesson.id}`} icon={<ArrowRight className="size-5" />} className="flex-row-reverse">
              {isFresh ? t("common.start") : t("common.continue")}
            </Button>
          </div>
        </section>
      ) : (
        <section className="surface flex items-center gap-4 p-6">
          <PartyPopper className="size-10 text-amber-300" aria-hidden />
          <div>
            <h2 className="text-xl font-extrabold text-white">{t("dashboard.allDoneTitle")}</h2>
            <p className="text-sm text-slate-400">{t("dashboard.allDoneDesc")}</p>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label={t("dashboard.stats")}>
        <StatCard icon={Zap} label={t("dashboard.totalXp")} value={state.xp} tone="bg-amber-400/15 text-amber-300" />
        <StatCard icon={Gauge} label={t("common.level")} value={level.level} tone="bg-brand-400/20 text-brand-300" />
        <StatCard icon={Flame} label={t("dashboard.dayStreak")} value={streak} tone="bg-orange-400/15 text-orange-300" />
        <StatCard icon={BookOpenCheck} label={t("dashboard.lessonsDone")} value={lessonsDone} tone="bg-mint-400/15 text-mint-400" />
      </section>

      <div className="grid gap-4 lg:grid-cols-5 lg:gap-6">
        {/* Daily goal */}
        <section className="surface flex items-center gap-5 p-5 sm:p-6 lg:col-span-2">
          <ProgressRing value={goalPct} label={t("dashboard.todayGoal")}>
            <div>
              <p className="text-2xl font-extrabold text-white">{goalPct}%</p>
            </div>
          </ProgressRing>
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-white">
              <Target className="size-5 text-mint-400" aria-hidden />
              {t("dashboard.todayGoal")}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-300">{t("dashboard.xpToday", { xp: todayXp, goal })}</p>
            <p className="mt-1 text-xs text-slate-500">{goalPct >= 100 ? t("dashboard.goalReached") : t("dashboard.goalKeepGoing")}</p>
          </div>
        </section>

        {/* Weekly chart */}
        <section className="surface p-5 sm:p-6 lg:col-span-3">
          <h2 className="mb-4 text-lg font-extrabold text-white">{t("dashboard.thisWeek")}</h2>
          <div className="flex h-36 items-end gap-2 sm:gap-3" role="img" aria-label={t("dashboard.thisWeek")}>
            {week.map((w) => (
              <div key={w.key} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500">{w.xp || ""}</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className={cn(
                      "w-full rounded-lg transition-all duration-500",
                      w.key === today ? "bg-gradient-to-t from-brand-600 to-cyan-400" : w.xp ? "bg-brand-500/60" : "bg-white/[0.06]",
                    )}
                    style={{ height: `${Math.max(6, (w.xp / maxXp) * 100)}%` }}
                  />
                </div>
                <span className={cn("text-[11px] font-bold capitalize", w.key === today ? "text-white" : "text-slate-500")}>{w.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quests preview */}
      <section className="surface p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white">{t("nav.quests")}</h2>
          <Link to="/quests" className="inline-flex items-center gap-1 text-sm font-bold text-brand-300 hover:text-brand-200">
            {t("common.viewAll")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {QUESTS.slice(0, 3).map((q) => {
            const cur = Math.min(q.target, state.quests.progress[q.metric]);
            const Icon = q.icon;
            return (
              <div key={q.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-brand-400/15 text-brand-300">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="flex-1 text-sm font-bold leading-snug text-white">{t(`quests.items.${q.id}`)}</p>
                </div>
                <ProgressBar value={(cur / q.target) * 100} size="sm" className="mt-3" label={t(`quests.items.${q.id}`)} />
                <p className="mt-1.5 text-xs font-semibold text-slate-500">{t("quests.progress", { current: cur, target: q.target })}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Paths */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white">{t("dashboard.yourPaths")}</h2>
          <Link to="/paths" className="inline-flex items-center gap-1 text-sm font-bold text-brand-300 hover:text-brand-200">
            {t("common.viewAll")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.slice(0, 3).map((c) => (
            <CourseCard key={c.id} course={c} progress={courseProgress(state, c)} />
          ))}
        </div>
      </section>

      {isFresh && (
        <section className="surface flex flex-col items-start gap-4 border-brand-400/25 bg-brand-500/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-400/20 text-brand-300">
              <Sparkles className="size-6" aria-hidden />
            </span>
            <div>
              <h2 className="text-lg font-extrabold text-white">{t("dashboard.demoTitle")}</h2>
              <p className="mt-1 text-sm text-slate-400">{t("dashboard.demoDesc")}</p>
            </div>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              loadDemo();
              toast.success(t("settings.demoLoaded"));
            }}
          >
            {t("dashboard.demoBtn")}
          </Button>
        </section>
      )}
    </div>
  );
}
