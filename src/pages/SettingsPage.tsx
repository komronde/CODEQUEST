import type { ReactNode } from "react";
import { Check, Download, FlaskConical, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/i18n";
import { useLang } from "@/hooks/useLang";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/context/ToastContext";
import { useConfirm } from "@/context/ConfirmContext";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { cn } from "@/utils/cn";

const GOALS = [
  { xp: 20, key: "casual" },
  { xp: 50, key: "regular" },
  { xp: 100, key: "serious" },
  { xp: 150, key: "intense" },
] as const;

function Section({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
  return (
    <section className="surface p-5 sm:p-6">
      <h2 className="text-lg font-extrabold text-white">{title}</h2>
      {desc && <p className="mt-1 text-sm text-slate-400">{desc}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Toggle({ checked, onChange, label, desc }: { checked: boolean; onChange: (v: boolean) => void; label: string; desc: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-sm font-bold text-white" id={`t-${label}`}>
          {label}
        </p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-labelledby={`t-${label}`}
        onClick={() => onChange(!checked)}
        className={cn("relative h-7 w-12 shrink-0 rounded-full transition", checked ? "bg-brand-500" : "bg-white/15")}
      >
        <span className={cn("absolute left-0.5 top-0.5 size-6 rounded-full bg-white shadow transition-transform", checked && "translate-x-5")} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { t } = useTranslation();
  const { lang, setLang } = useLang();
  const toast = useToast();
  const confirm = useConfirm();
  const { state, updateSettings, resetProgress, loadDemo, exportData } = useGame();

  const onExport = () => {
    const blob = new Blob([exportData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "codequest-progress.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t("settings.exported"));
  };

  const onReset = async () => {
    const ok = await confirm({
      title: t("settings.resetConfirmTitle"),
      description: t("settings.resetConfirmDesc"),
      confirmLabel: t("settings.resetConfirm"),
      danger: true,
    });
    if (ok) {
      resetProgress();
      toast.success(t("settings.resetDone"));
    }
  };

  const onDemo = async () => {
    const ok = await confirm({
      title: t("settings.demoConfirmTitle"),
      description: t("settings.demoConfirmDesc"),
      confirmLabel: t("settings.loadDemo"),
    });
    if (ok) {
      loadDemo();
      toast.success(t("settings.demoLoaded"));
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <PageHeader title={t("nav.settings")} subtitle={t("settings.subtitle")} />

      <Section title={t("common.language")} desc={t("settings.languageDesc")}>
        <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={t("common.language")}>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              role="radio"
              aria-checked={lang === l.code}
              onClick={() => setLang(l.code)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-bold transition",
                lang === l.code ? "border-brand-400 bg-brand-500/15 text-white" : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]",
              )}
            >
              <span className="text-2xl" aria-hidden>
                {l.flag}
              </span>
              <span className="flex-1">{l.native}</span>
              {lang === l.code && <Check className="size-4 text-brand-300" aria-hidden />}
            </button>
          ))}
        </div>
      </Section>

      <Section title={t("settings.dailyGoal")} desc={t("settings.dailyGoalDesc")}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label={t("settings.dailyGoal")}>
          {GOALS.map((g) => (
            <button
              key={g.xp}
              role="radio"
              aria-checked={state.settings.dailyGoal === g.xp}
              onClick={() => {
                updateSettings({ dailyGoal: g.xp });
                toast.success(t("settings.goalSet", { xp: g.xp }));
              }}
              className={cn(
                "rounded-2xl border-2 px-3 py-3.5 text-center transition",
                state.settings.dailyGoal === g.xp ? "border-brand-400 bg-brand-500/15" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]",
              )}
            >
              <span className="block text-xl font-extrabold text-white">{g.xp} XP</span>
              <span className="text-xs font-semibold text-slate-400">{t(`settings.goal.${g.key}`)}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title={t("settings.preferences")}>
        <div className="divide-y divide-white/[0.06]">
          <Toggle checked={state.settings.notifications} onChange={(v) => updateSettings({ notifications: v })} label={t("settings.notifications")} desc={t("settings.notificationsDesc")} />
          <Toggle checked={state.settings.reduceMotion} onChange={(v) => updateSettings({ reduceMotion: v })} label={t("settings.reduceMotion")} desc={t("settings.reduceMotionDesc")} />
        </div>
      </Section>

      <Section title={t("settings.data")} desc={t("settings.dataDesc")}>
        <div className="space-y-3">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-white">{t("settings.loadDemo")}</p>
              <p className="text-xs text-slate-400">{t("settings.loadDemoDesc")}</p>
            </div>
            <Button variant="secondary" onClick={onDemo} icon={<FlaskConical className="size-4" />}>
              {t("settings.loadDemo")}
            </Button>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-white">{t("settings.export")}</p>
              <p className="text-xs text-slate-400">{t("settings.exportDesc")}</p>
            </div>
            <Button variant="secondary" onClick={onExport} icon={<Download className="size-4" />}>
              {t("settings.export")}
            </Button>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-white">{t("settings.resetAll")}</p>
              <p className="text-xs text-slate-400">{t("settings.resetAllDesc")}</p>
            </div>
            <Button variant="danger" onClick={onReset} icon={<RotateCcw className="size-4" />}>
              {t("settings.resetAll")}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
