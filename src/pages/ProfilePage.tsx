import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpenCheck, CheckCheck, Flame, Gauge, Pencil, Trophy, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ACHIEVEMENTS } from "@/data/achievements";
import { COURSES } from "@/data/courses";
import { courseProgress } from "@/lib/progress";
import { lastDays } from "@/lib/dates";
import { LOCALE_TAG, tr } from "@/lib/text";
import { useLang } from "@/hooks/useLang";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/context/ToastContext";
import { Avatar, AVATAR_GRADIENTS } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { CourseIcon } from "@/components/ui/CourseIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import { cn } from "@/utils/cn";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const toast = useToast();
  const { state, level, streak, updateProfile } = useGame();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(state.profile.name);
  const [avatar, setAvatar] = useState(state.profile.avatar);

  const days = lastDays(28);
  const maxXp = Math.max(1, ...days.map((d) => state.xpLog[d] ?? 0));
  const lessonsDone = Object.keys(state.completedLessons).length;
  const unlocked = ACHIEVEMENTS.filter((a) => state.achievements[a.id]);
  const canSave = name.trim().length > 0 && (name.trim() !== state.profile.name || avatar !== state.profile.avatar);

  const save = () => {
    if (!canSave) return;
    updateProfile({ name: name.trim().slice(0, 24), avatar });
    setEditing(false);
    toast.success(t("profile.saved"));
  };

  const startEdit = () => {
    setName(state.profile.name);
    setAvatar(state.profile.avatar);
    setEditing(true);
  };

  return (
    <div className="space-y-6">
      <section className="surface relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand-500/25 blur-3xl" aria-hidden />
        <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <Avatar name={editing ? name : state.profile.name} index={editing ? avatar : state.profile.avatar} size="xl" />
          <div className="w-full flex-1">
            {editing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  save();
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="profile-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t("profile.name")}
                  </label>
                  <input
                    id="profile-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={24}
                    placeholder={t("profile.namePlaceholder")}
                    className="h-12 w-full rounded-xl border border-white/10 bg-ink-900 px-4 text-base font-bold text-white placeholder:text-slate-600 focus:border-brand-400"
                  />
                </div>
                <fieldset>
                  <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">{t("profile.avatar")}</legend>
                  <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                    {AVATAR_GRADIENTS.map((g, i) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setAvatar(i)}
                        aria-pressed={avatar === i}
                        aria-label={`${t("profile.avatar")} ${i + 1}`}
                        className={cn("size-10 rounded-full bg-gradient-to-br ring-2 transition", g, avatar === i ? "scale-110 ring-white" : "ring-transparent opacity-70 hover:opacity-100")}
                      />
                    ))}
                  </div>
                </fieldset>
                <div className="flex justify-center gap-2 sm:justify-start">
                  <Button type="submit" disabled={!canSave}>
                    {t("common.save")}
                  </Button>
                  <Button variant="ghost" onClick={() => setEditing(false)}>
                    {t("common.cancel")}
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <h1 className="text-3xl font-extrabold text-white">{state.profile.name}</h1>
                  <button onClick={startEdit} className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:bg-white/10">
                    <Pencil className="size-3.5" aria-hidden />
                    {t("profile.edit")}
                  </button>
                </div>
                <p className="mt-1 text-sm text-slate-400">
                  {t("profile.joined", { date: new Date(state.profile.joinedAt).toLocaleDateString(LOCALE_TAG[lang], { day: "numeric", month: "long", year: "numeric" }) })}
                </p>
                <div className="mx-auto mt-4 max-w-md sm:mx-0">
                  <div className="mb-1.5 flex justify-between text-xs font-bold">
                    <span className="text-brand-200">
                      {t("common.level")} {level.level}
                    </span>
                    <span className="text-slate-400">
                      {level.current} / {level.needed} XP
                    </span>
                  </div>
                  <ProgressBar value={level.pct} size="lg" label={t("common.level")} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3" aria-label={t("dashboard.stats")}>
        <StatCard icon={Zap} label={t("dashboard.totalXp")} value={state.xp} tone="bg-amber-400/15 text-amber-300" />
        <StatCard icon={Gauge} label={t("common.level")} value={level.level} tone="bg-brand-400/20 text-brand-300" />
        <StatCard icon={Flame} label={t("dashboard.dayStreak")} value={streak} tone="bg-orange-400/15 text-orange-300" />
        <StatCard icon={Trophy} label={t("profile.longestStreak")} value={state.streak.longest} tone="bg-rose-400/15 text-rose-300" />
        <StatCard icon={BookOpenCheck} label={t("dashboard.lessonsDone")} value={lessonsDone} tone="bg-mint-400/15 text-mint-400" />
        <StatCard icon={CheckCheck} label={t("profile.correctAnswers")} value={state.stats.correct} tone="bg-cyan-400/15 text-cyan-300" />
      </section>

      <section className="surface p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-extrabold text-white">{t("profile.activity")}</h2>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2" role="img" aria-label={t("profile.activity")}>
          {days.map((d) => {
            const xp = state.xpLog[d] ?? 0;
            const intensity = xp === 0 ? 0 : Math.ceil((xp / maxXp) * 4);
            return (
              <div
                key={d}
                title={`${d}: ${xp} XP`}
                className={cn(
                  "aspect-square rounded-lg",
                  ["bg-white/[0.05]", "bg-brand-500/25", "bg-brand-500/45", "bg-brand-500/70", "bg-brand-400"][intensity],
                )}
              />
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] font-semibold text-slate-500">
          {t("profile.less")}
          {["bg-white/[0.05]", "bg-brand-500/25", "bg-brand-500/45", "bg-brand-500/70", "bg-brand-400"].map((c) => (
            <span key={c} className={cn("size-3.5 rounded", c)} />
          ))}
          {t("profile.more")}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-extrabold text-white">{t("profile.courseProgress")}</h2>
          <ul className="space-y-4">
            {COURSES.map((c) => {
              const p = courseProgress(state, c);
              return (
                <li key={c.id}>
                  <Link to={`/course/${c.id}`} className="flex items-center gap-3 rounded-xl transition hover:opacity-90">
                    <CourseIcon course={c} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex justify-between text-sm font-bold">
                        <span className="text-white">{tr(c.title, lang)}</span>
                        <span className="text-slate-400">
                          {p.done}/{p.total}
                        </span>
                      </div>
                      <ProgressBar value={p.pct} size="sm" label={tr(c.title, lang)} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="surface p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white">{t("nav.achievements")}</h2>
            <Link to="/achievements" className="inline-flex items-center gap-1 text-sm font-bold text-brand-300 hover:text-brand-200">
              {t("common.viewAll")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          {unlocked.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-500">{t("profile.noBadges")}</p>
          ) : (
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {unlocked.slice(0, 8).map((a) => (
                <li key={a.id} className="flex flex-col items-center gap-2 text-center">
                  <span className={cn("grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg", a.gradient)}>
                    <a.icon className="size-7" aria-hidden />
                  </span>
                  <span className="text-[11px] font-bold leading-tight text-slate-300">{t(`achievements.items.${a.id}.title`)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
