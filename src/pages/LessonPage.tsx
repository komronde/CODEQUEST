import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle2, RotateCcw, Sparkles, Swords, Trophy, X, XCircle, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Course, Lesson } from "@/types";
import { getCourse, getLesson } from "@/data/courses";
import { isLessonUnlocked } from "@/lib/progress";
import { grade, initialAnswer, isAnswered, solutionText, type Answer } from "@/lib/exercises";
import { tr, trOpt } from "@/lib/text";
import { useLang } from "@/hooks/useLang";
import { useGame } from "@/context/GameContext";
import { useConfirm } from "@/context/ConfirmContext";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { CourseIcon } from "@/components/ui/CourseIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ExerciseInput, type ExerciseStatus } from "@/components/exercises/ExerciseInput";
import { cn } from "@/utils/cn";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { state } = useGame();
  const course = getCourse(courseId);
  const lesson = getLesson(courseId, lessonId);
  if (!course || !lesson) return <Navigate to="/paths" replace />;
  if (!isLessonUnlocked(state, course, lesson)) return <Navigate to={`/course/${course.id}`} replace />;
  return <LessonRunner key={lesson.id} course={course} lesson={lesson} />;
}

function Confetti() {
  const colors = ["#7c5cff", "#34e3a8", "#ffbf4d", "#43d9ff", "#ff6b86"];
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-64 overflow-hidden" aria-hidden>
      {Array.from({ length: 28 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute top-0 block h-3 w-2 rounded-sm"
          style={{ left: `${(i * 37) % 100}%`, background: colors[i % colors.length] }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: 240 + (i % 5) * 20, opacity: 0, rotate: 360 + i * 20, x: Math.sin(i) * 60 }}
          transition={{ duration: 1.8 + (i % 6) * 0.2, delay: (i % 8) * 0.06, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function LessonRunner({ course, lesson }: { course: Course; lesson: Lesson }) {
  const { t } = useTranslation();
  const { lang } = useLang();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { recordCorrect, completeLesson } = useGame();

  const total = lesson.exercises.length;
  const [phase, setPhase] = useState<"learn" | "practice" | "result">("learn");
  const [queue, setQueue] = useState<number[]>(() => lesson.exercises.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [answer, setAnswer] = useState<Answer>(() => initialAnswer(lesson.exercises[0]));
  const [status, setStatus] = useState<ExerciseStatus>("idle");
  const [mistakes, setMistakes] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [earned, setEarned] = useState(0);
  const [lastXp, setLastXp] = useState(0);
  const [result, setResult] = useState<{ xp: number; firstTime: boolean } | null>(null);
  const continueRef = useRef<HTMLButtonElement>(null);

  const exIdx = queue[pos];
  const ex = lesson.exercises[exIdx];
  const nextLesson = course.lessons[lesson.index + 1];
  const isChallenge = ex.type === "write";

  const check = useCallback(() => {
    if (status !== "idle" || !isAnswered(ex, answer)) return;
    const ok = grade(ex, answer);
    setStatus(ok ? "correct" : "wrong");
    if (ok) {
      const xp = recordCorrect(lesson.id, exIdx, ex.type === "write");
      setLastXp(xp);
      setEarned((e) => e + xp);
      setCorrectCount((c) => c + 1);
    } else {
      setMistakes((m) => m + 1);
      setQueue((q) => [...q, exIdx]); // retry missed exercises at the end
    }
  }, [status, ex, answer, recordCorrect, lesson.id, exIdx]);

  const next = useCallback(() => {
    if (pos + 1 >= queue.length) {
      const r = completeLesson(course.id, lesson.id, mistakes);
      setResult(r);
      setEarned((e) => e + r.xp);
      setPhase("result");
      return;
    }
    const nextIdx = queue[pos + 1];
    setPos(pos + 1);
    setAnswer(initialAnswer(lesson.exercises[nextIdx]));
    setStatus("idle");
    setLastXp(0);
  }, [pos, queue, completeLesson, course.id, lesson.id, lesson.exercises, mistakes]);

  const restart = () => {
    setQueue(lesson.exercises.map((_, i) => i));
    setPos(0);
    setAnswer(initialAnswer(lesson.exercises[0]));
    setStatus("idle");
    setMistakes(0);
    setCorrectCount(0);
    setEarned(0);
    setResult(null);
    setPhase("practice");
  };

  const leave = async () => {
    const inProgress = phase === "practice" && (pos > 0 || status !== "idle" || correctCount > 0);
    if (inProgress) {
      const ok = await confirm({
        title: t("lesson.leaveTitle"),
        description: t("lesson.leaveDesc"),
        confirmLabel: t("lesson.leaveConfirm"),
        cancelLabel: t("lesson.stay"),
        danger: true,
      });
      if (!ok) return;
    }
    navigate(`/course/${course.id}`);
  };

  // Keyboard: Enter checks / continues (native buttons keep their own behavior)
  useEffect(() => {
    if (phase !== "practice") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "TEXTAREA" || target.tagName === "A") return;
      e.preventDefault();
      if (status === "idle") check();
      else next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase, status, check, next]);

  useEffect(() => {
    if (status !== "idle") continueRef.current?.focus();
  }, [status]);

  const solution = (() => {
    if (ex.type === "mcq") return trOpt(ex.options[ex.answer], lang);
    if (ex.type === "tf") return ex.answer ? t("lesson.true") : t("lesson.false");
    return solutionText(ex);
  })();

  const accuracy = Math.round((total / (total + mistakes)) * 100);

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 pt-[max(1rem,env(safe-area-inset-top))]">
      {/* header */}
      <header className="flex items-center gap-4 py-3">
        <button onClick={leave} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label={t("common.close")}>
          <X className="size-6" />
        </button>
        <div className="flex-1">
          <ProgressBar
            value={phase === "result" ? 100 : phase === "learn" ? 0 : (correctCount / total) * 100}
            size="lg"
            label={t("lesson.progress")}
            barClassName="from-mint-500 to-mint-400"
          />
        </div>
        <span className="inline-flex items-center gap-1 rounded-xl bg-amber-400/10 px-3 py-1.5 text-sm font-extrabold text-amber-300" aria-label={t("common.xp")}>
          <Zap className="size-4" aria-hidden />
          {earned}
        </span>
      </header>

      <AnimatePresence mode="wait">
        {phase === "learn" && (
          <motion.section key="learn" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 pb-10 pt-4">
            <div className="flex items-center gap-3">
              <CourseIcon course={course} size="sm" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-300">
                  {tr(course.title, lang)} · {t("lesson.lessonNo", { n: lesson.index + 1 })}
                </p>
                <h1 className="text-2xl font-extrabold text-white sm:text-3xl">{tr(lesson.title, lang)}</h1>
              </div>
            </div>
            <div className="surface mt-6 p-5 sm:p-6">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <BookOpen className="size-4" aria-hidden />
                {t("lesson.learn")}
              </p>
              <p className="text-base leading-relaxed text-slate-200">{tr(lesson.intro, lang)}</p>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">{t("common.example")}</p>
              <CodeBlock code={lesson.code} label={tr(course.title, lang)} />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-400">{t("lesson.practiceInfo", { count: total })}</p>
              <Button size="lg" onClick={() => setPhase("practice")} icon={<Sparkles className="size-5" />}>
                {t("lesson.startPractice")}
              </Button>
            </div>
          </motion.section>
        )}

        {phase === "practice" && (
          <motion.section
            key={`ex-${pos}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22 }}
            className="flex-1 pb-72 pt-4"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-300">{t(`lesson.types.${ex.type}`)}</span>
              {isChallenge && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-300">
                  <Swords className="size-3.5" aria-hidden />
                  {t("lesson.challenge")}
                </span>
              )}
              <span className="ml-auto text-xs font-semibold text-slate-500">{t("lesson.exerciseOf", { current: Math.min(correctCount + 1, total), total })}</span>
            </div>
            <h1 className="mb-5 text-xl font-extrabold leading-snug text-white sm:text-2xl">{tr(ex.q, lang)}</h1>
            <ExerciseInput exercise={ex} answer={answer} onChange={setAnswer} status={status} />
          </motion.section>
        )}

        {phase === "result" && result && (
          <motion.section key="result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-6 text-center">
            <Confetti />
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
              className="mb-6 grid size-28 place-items-center rounded-[2rem] bg-gradient-to-br from-amber-300 to-orange-500 shadow-2xl shadow-amber-500/30"
            >
              <Trophy className="size-14 text-white" aria-hidden />
            </motion.div>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{mistakes === 0 ? t("lesson.resultPerfect") : t("lesson.resultDone")}</h1>
            <p className="mt-2 max-w-md text-slate-400">{tr(lesson.title, lang)}</p>
            <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-3">
              <div className="surface p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("lesson.xpEarned")}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-3xl font-extrabold text-amber-300">
                  <Zap className="size-6" aria-hidden />+{earned}
                </p>
              </div>
              <div className="surface p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("lesson.accuracy")}</p>
                <p className="mt-1 text-3xl font-extrabold text-mint-400">{accuracy}%</p>
              </div>
            </div>
            {!result.firstTime && (
              <p className="mt-5 max-w-md rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-100">{t("lesson.alreadyDone")}</p>
            )}
            <div className="mt-8 flex w-full max-w-md flex-col gap-3">
              {nextLesson ? (
                <Button size="lg" full to={`/lesson/${course.id}/${nextLesson.id}`} icon={<ArrowRight className="size-5" />}>
                  {t("lesson.nextLesson")}
                </Button>
              ) : (
                <Button size="lg" full to={`/course/${course.id}`}>
                  {t("lesson.finishCourse")}
                </Button>
              )}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" to={`/course/${course.id}`}>
                  {t("lesson.backToCourse")}
                </Button>
                <Button variant="secondary" onClick={restart} icon={<RotateCcw className="size-4" />}>
                  {t("lesson.retry")}
                </Button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* bottom action bar */}
      {phase === "practice" && (
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 z-40 border-t px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl transition-colors",
            status === "idle" && "border-white/10 bg-ink-900/90",
            status === "correct" && "border-mint-400/30 bg-[#0b2a26]/95",
            status === "wrong" && "border-rose-400/30 bg-[#2a0f1d]/95",
          )}
        >
          <div className="mx-auto max-w-3xl">
            <AnimatePresence initial={false}>
              {status !== "idle" && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-3 max-h-[38dvh] overflow-y-auto" role="status" aria-live="assertive">
                  <div className="flex items-center gap-2.5">
                    {status === "correct" ? <CheckCircle2 className="size-7 text-mint-400" aria-hidden /> : <XCircle className="size-7 text-rose-400" aria-hidden />}
                    <p className={cn("text-xl font-extrabold", status === "correct" ? "text-mint-400" : "text-rose-400")}>
                      {status === "correct" ? t("lesson.correct") : t("lesson.incorrect")}
                    </p>
                    {status === "correct" && lastXp > 0 && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-sm font-extrabold text-amber-300">
                        <Zap className="size-4" aria-hidden />+{lastXp} XP
                      </span>
                    )}
                  </div>
                  {status === "wrong" && solution && (
                    <div className="mt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-rose-300/80">{t("lesson.correctAnswer")}</p>
                      <pre className="mt-1 overflow-x-auto rounded-xl bg-black/30 px-3 py-2 font-mono text-[13px] text-white">{solution}</pre>
                    </div>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">
                    <span className="font-bold text-white">{t("lesson.explanation")}: </span>
                    {tr(ex.why, lang)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {status === "idle" ? (
              <Button size="lg" full onClick={check} disabled={!isAnswered(ex, answer)}>
                {t("common.check")}
              </Button>
            ) : (
              <Button ref={continueRef} size="lg" full variant={status === "correct" ? "success" : "danger"} onClick={next}>
                {pos + 1 >= queue.length ? t("common.finish") : t("common.continue")}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
