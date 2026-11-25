import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Gift, Timer, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { QUESTS } from "@/data/quests";
import { msUntilMidnight } from "@/lib/dates";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/utils/cn";

function useCountdown() {
  const [ms, setMs] = useState(msUntilMidnight);
  useEffect(() => {
    const id = window.setInterval(() => setMs(msUntilMidnight()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return { h: Math.floor(ms / 3_600_000), m: Math.floor((ms % 3_600_000) / 60_000) };
}

export default function QuestsPage() {
  const { t } = useTranslation();
  const toast = useToast();
  const { state, claimQuest } = useGame();
  const { h, m } = useCountdown();
  const claimedCount = state.quests.claimed.length;
  const totalReward = QUESTS.reduce((n, q) => n + q.reward, 0);

  return (
    <div>
      <PageHeader title={t("nav.quests")} subtitle={t("quests.subtitle")} />

      <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-600/30 via-ink-800 to-ink-800 p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-amber-400/15 text-amber-300">
              <Gift className="size-7" aria-hidden />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-white">{t("quests.completed", { done: claimedCount, total: QUESTS.length })}</p>
              <p className="text-sm text-slate-400">{t("quests.totalReward", { xp: totalReward })}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-xl bg-white/[0.07] px-3.5 py-2 text-sm font-bold text-slate-200 sm:self-center">
            <Timer className="size-4 text-brand-300" aria-hidden />
            {t("quests.resetsIn", { time: t("common.hm", { h, m }) })}
          </span>
        </div>
        <ProgressBar value={(claimedCount / QUESTS.length) * 100} className="relative mt-5" label={t("nav.quests")} />
      </section>

      <ul className="grid gap-3 lg:grid-cols-2">
        {QUESTS.map((q, i) => {
          const progress = state.quests.progress[q.metric];
          const cur = Math.min(q.target, progress);
          const complete = progress >= q.target;
          const claimed = state.quests.claimed.includes(q.id);
          const Icon = q.icon;
          return (
            <motion.li
              key={q.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn("surface p-5", complete && !claimed && "border-amber-400/40 bg-amber-400/[0.05]", claimed && "opacity-75")}
            >
              <div className="flex items-start gap-4">
                <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl", claimed ? "bg-mint-400/15 text-mint-400" : "bg-brand-400/15 text-brand-300")}>
                  {claimed ? <Check className="size-6" aria-hidden /> : <Icon className="size-6" aria-hidden />}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-extrabold text-white">{t(`quests.items.${q.id}`)}</h2>
                  <div className="mt-3 flex items-center gap-3">
                    <ProgressBar value={(cur / q.target) * 100} size="md" label={t(`quests.items.${q.id}`)} barClassName={complete ? "from-amber-400 to-amber-300" : undefined} />
                    <span className="shrink-0 text-xs font-bold text-slate-400">{t("quests.progress", { current: cur, target: q.target })}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-sm font-extrabold text-amber-300">
                  <Zap className="size-4" aria-hidden />+{q.reward} XP
                </span>
                <Button
                  size="sm"
                  variant={complete && !claimed ? "success" : "secondary"}
                  disabled={!complete || claimed}
                  onClick={() => {
                    const xp = claimQuest(q.id);
                    if (xp) toast.show("xp", t("quests.claimedToast", { xp }));
                  }}
                >
                  {claimed ? t("quests.claimed") : t("quests.claim")}
                </Button>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
