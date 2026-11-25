import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Exercise } from "@/types";
import { BLANK, shuffledOrder, type Answer } from "@/lib/exercises";
import { tr, trOpt } from "@/lib/text";
import { useLang } from "@/hooks/useLang";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { CodeEditor } from "@/components/ui/CodeEditor";
import { cn } from "@/utils/cn";

export type ExerciseStatus = "idle" | "correct" | "wrong";

interface Props {
  exercise: Exercise;
  answer: Answer;
  onChange: (a: Answer) => void;
  status: ExerciseStatus;
}

const optionBase =
  "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-semibold transition duration-150 active:scale-[0.99] disabled:cursor-default";

function optionState(selected: boolean, status: ExerciseStatus, isCorrect: boolean) {
  if (status === "idle") {
    return selected
      ? "border-brand-400 bg-brand-500/15 text-white shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
      : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-white/25 hover:bg-white/[0.07]";
  }
  if (isCorrect) return "border-mint-400 bg-mint-400/15 text-white";
  if (selected) return "border-rose-400 bg-rose-400/15 text-white";
  return "border-white/[0.06] bg-white/[0.02] text-slate-500";
}

export function ExerciseInput({ exercise: ex, answer, onChange, status }: Props) {
  const { t } = useTranslation();
  const { lang } = useLang();
  const locked = status !== "idle";
  const [showHint, setShowHint] = useState(false);
  const order = useMemo(() => (ex.type === "arrange" ? shuffledOrder(ex.blocks) : []), [ex]);

  switch (ex.type) {
    case "mcq":
      return (
        <div className="space-y-4">
          {ex.code && <CodeBlock code={ex.code} />}
          <div role="radiogroup" aria-label={tr(ex.q, lang)} className="grid gap-2.5">
            {ex.options.map((o, i) => (
              <button
                key={i}
                role="radio"
                aria-checked={answer === i}
                disabled={locked}
                onClick={() => onChange(i)}
                className={optionBase + " " + optionState(answer === i, status, i === ex.answer)}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white/10 text-xs font-extrabold">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className={cn(typeof o === "string" && "font-mono text-[13px]")}>{trOpt(o, lang)}</span>
              </button>
            ))}
          </div>
        </div>
      );

    case "tf":
      return (
        <div className="space-y-4">
          {ex.code && <CodeBlock code={ex.code} />}
          <div role="radiogroup" aria-label={tr(ex.q, lang)} className="grid grid-cols-2 gap-3">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                role="radio"
                aria-checked={answer === v}
                disabled={locked}
                onClick={() => onChange(v)}
                className={cn(optionBase, "justify-center py-6 text-base", optionState(answer === v, status, v === ex.answer))}
              >
                {v ? t("lesson.true") : t("lesson.false")}
              </button>
            ))}
          </div>
        </div>
      );

    case "fill": {
      const values = (Array.isArray(answer) ? answer : []) as string[];
      const parts = ex.code.split(BLANK);
      return (
        <div className="rounded-2xl border border-white/[0.08] bg-ink-900 p-4 font-mono text-[13px] leading-9 text-slate-200">
          <div className="whitespace-pre-wrap break-words">
            {parts.map((part, i) => (
              <span key={i}>
                {part}
                {i < parts.length - 1 && (
                  <input
                    value={values[i] ?? ""}
                    readOnly={locked}
                    onChange={(e) => {
                      const next = [...values];
                      next[i] = e.target.value;
                      onChange(next);
                    }}
                    aria-label={`${t("lesson.blank")} ${i + 1}`}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoFocus={i === 0}
                    style={{ width: `${Math.max(6, (values[i]?.length ?? 0) + 2)}ch` }}
                    className={cn(
                      "mx-1 rounded-lg border-b-2 bg-white/[0.07] px-2 py-0.5 text-center font-mono text-[13px] text-white outline-none transition",
                      status === "idle" && "border-brand-400 focus:bg-brand-500/20",
                      status === "correct" && "border-mint-400 bg-mint-400/20",
                      status === "wrong" && "border-rose-400 bg-rose-400/20",
                    )}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      );
    }

    case "arrange": {
      const chosen = (Array.isArray(answer) ? answer : []) as number[];
      const bank = order.map((_, pos) => pos).filter((pos) => !chosen.includes(pos));
      const block = (pos: number, inAnswer: boolean) => (
        <motion.button
          key={pos}
          layout
          layoutId={`blk-${pos}`}
          type="button"
          disabled={locked}
          onClick={() => onChange(inAnswer ? chosen.filter((p) => p !== pos) : [...chosen, pos])}
          className={cn(
            "w-full rounded-xl border px-3.5 py-2.5 text-left font-mono text-[13px] whitespace-pre transition",
            inAnswer
              ? status === "idle"
                ? "border-brand-400/50 bg-brand-500/15 text-white"
                : status === "correct"
                  ? "border-mint-400/60 bg-mint-400/15 text-white"
                  : "border-rose-400/60 bg-rose-400/15 text-white"
              : "border-white/10 bg-white/[0.05] text-slate-200 hover:border-white/25 hover:bg-white/[0.09]",
          )}
        >
          {ex.blocks[order[pos]]}
        </motion.button>
      );
      return (
        <div className="space-y-4">
          <div
            aria-label={t("lesson.yourOrder")}
            className={cn(
              "min-h-[7rem] space-y-2 rounded-2xl border-2 border-dashed p-3 transition",
              chosen.length ? "border-brand-400/30 bg-ink-900" : "border-white/10 bg-white/[0.02]",
            )}
          >
            {chosen.length === 0 && <p className="py-5 text-center text-sm font-medium text-slate-500">{t("lesson.arrangeHint")}</p>}
            {chosen.map((pos) => block(pos, true))}
          </div>
          <div className="space-y-2" aria-label={t("lesson.blocks")}>
            {bank.map((pos) => block(pos, false))}
          </div>
        </div>
      );
    }

    case "bug":
      return (
        <div role="radiogroup" aria-label={tr(ex.q, lang)} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900 py-2 font-mono text-[13px]">
          {ex.lines.map((line, i) => (
            <button
              key={i}
              role="radio"
              aria-checked={answer === i}
              disabled={locked}
              onClick={() => onChange(i)}
              className={cn(
                "flex w-full items-center gap-3 border-l-4 px-3 py-2 text-left transition disabled:cursor-default",
                status === "idle"
                  ? answer === i
                    ? "border-brand-400 bg-brand-500/15 text-white"
                    : "border-transparent text-slate-300 hover:bg-white/[0.06]"
                  : i === ex.answer
                    ? "border-mint-400 bg-mint-400/15 text-white"
                    : answer === i
                      ? "border-rose-400 bg-rose-400/15 text-white"
                      : "border-transparent text-slate-500",
              )}
            >
              <span className="w-5 shrink-0 select-none text-right text-slate-600">{i + 1}</span>
              <span className="whitespace-pre">{line}</span>
            </button>
          ))}
        </div>
      );

    case "write":
      return (
        <div className="space-y-3">
          <CodeEditor
            value={typeof answer === "string" ? answer : ""}
            onChange={onChange}
            label={tr(ex.q, lang)}
            readOnly={locked}
            minLines={6}
          />
          {ex.hint && !locked && (
            <div>
              <button
                onClick={() => setShowHint((s) => !s)}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-amber-300 transition hover:bg-amber-400/10"
                aria-expanded={showHint}
              >
                <Lightbulb className="size-4" aria-hidden />
                {t("lesson.hint")}
              </button>
              {showHint && <p className="mt-1 rounded-xl bg-amber-400/10 px-4 py-3 font-mono text-[13px] text-amber-100">{tr(ex.hint, lang)}</p>}
            </div>
          )}
        </div>
      );
  }
}
