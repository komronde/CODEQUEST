import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Eye, Loader2, Play, RotateCcw, ShieldCheck, SquareCode, Trash2, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PLAYGROUND_TASKS, getTask } from "@/data/playgroundTasks";
import { buildSandboxDoc, type SandboxMessage } from "@/lib/sandbox";
import { XP } from "@/lib/levels";
import { tr } from "@/lib/text";
import { useLang } from "@/hooks/useLang";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/context/ToastContext";
import { useConfirm } from "@/context/ConfirmContext";
import { STORAGE_KEYS, storage } from "@/services/storage";
import { Button } from "@/components/ui/Button";
import { CodeEditor } from "@/components/ui/CodeEditor";
import { PageHeader } from "@/components/ui/PageHeader";
import { cn } from "@/utils/cn";

type Tab = "html" | "css" | "js";
interface Code {
  html: string;
  css: string;
  js: string;
}
interface LogEntry {
  level: "log" | "warn" | "error";
  text: string;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "js", label: "JS" },
];

const defaults = (id: string): Code => {
  const task = getTask(id) ?? PLAYGROUND_TASKS[0];
  return { html: task.html, css: task.css, js: task.js };
};
const loadCode = (id: string): Code => storage.get<Code>(STORAGE_KEYS.playground(id), defaults(id));

export default function PlaygroundPage() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const toast = useToast();
  const confirm = useConfirm();
  const { state, recordRun, completeTask } = useGame();

  const [taskId, setTaskId] = useState(PLAYGROUND_TASKS[0].id);
  const task = getTask(taskId) ?? PLAYGROUND_TASKS[0];
  const [code, setCode] = useState<Code>(() => loadCode(PLAYGROUND_TASKS[0].id));
  const [tab, setTab] = useState<Tab>("html");
  const [view, setView] = useState<"editor" | "preview">("editor");
  const [doc, setDoc] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(false);
  const runId = useRef(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const execute = useCallback(
    (opts: { count: boolean; test: boolean }) => {
      const id = ++runId.current;
      window.clearTimeout(timer.current);
      setLogs([]);
      setReady(false);
      setChecking(opts.test);
      setDoc(buildSandboxDoc({ ...code, runId: id, test: opts.test ? task.test : undefined }));
      if (opts.count) recordRun();
      if (opts.test) {
        timer.current = window.setTimeout(() => {
          if (runId.current === id) {
            setChecking(false);
            toast.error(t("playground.taskFailed"));
          }
        }, 4000);
      }
      if (window.matchMedia("(max-width: 1023px)").matches) setView("preview");
    },
    [code, task.test, recordRun, toast, t],
  );

  // auto-run when the task changes (not counted as a manual run)
  useEffect(() => {
    execute({ count: false, test: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // messages from the sandboxed iframe (opaque origin → match on window identity)
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const d = e.data as Partial<SandboxMessage> | null;
      if (!d || d.__cq !== true || e.source !== iframeRef.current?.contentWindow || d.runId !== runId.current) return;
      if (d.type === "test") {
        window.clearTimeout(timer.current);
        setChecking(false);
        if (d.data) {
          const xp = completeTask(task.id);
          toast.success(xp ? t("playground.taskPassed", { xp }) : t("playground.alreadySolved"));
        } else {
          toast.error(t("playground.taskFailed"));
        }
      } else if (d.type === "log" || d.type === "warn" || d.type === "error") {
        setLogs((l) => [...l.slice(-199), { level: d.type as LogEntry["level"], text: String(d.data) }]);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [task.id, completeTask, toast, t]);

  const selectTask = (id: string) => {
    setTaskId(id);
    setCode(loadCode(id));
    setTab(id === "hello-html" ? "html" : id === "style-card" || id === "flex-center" ? "css" : "js");
    setView("editor");
  };

  const update = (value: string) => {
    const next = { ...code, [tab]: value };
    setCode(next);
    storage.set(STORAGE_KEYS.playground(task.id), next);
  };

  const reset = async () => {
    const ok = await confirm({
      title: t("playground.resetTitle"),
      description: t("playground.resetDesc"),
      confirmLabel: t("common.reset"),
      danger: true,
    });
    if (!ok) return;
    storage.remove(STORAGE_KEYS.playground(task.id));
    const fresh = defaults(task.id);
    setCode(fresh);
    setDoc(buildSandboxDoc({ ...fresh, runId: ++runId.current }));
    setLogs([]);
    setReady(false);
    toast.info(t("playground.resetDone"));
  };

  const solved = state.completedTasks.includes(task.id);

  return (
    <div>
      <PageHeader title={t("nav.playground")} subtitle={t("playground.subtitle")} />

      {/* tasks */}
      <div className="no-scrollbar -mx-4 mb-4 flex gap-2.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0" role="tablist" aria-label={t("playground.tasks")}>
        {PLAYGROUND_TASKS.map((tk) => {
          const isDone = state.completedTasks.includes(tk.id);
          return (
            <button
              key={tk.id}
              role="tab"
              aria-selected={tk.id === taskId}
              onClick={() => selectTask(tk.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-bold transition",
                tk.id === taskId ? "border-brand-400/50 bg-brand-500/20 text-white" : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white",
              )}
            >
              {isDone ? <CheckCircle2 className="size-4 text-mint-400" aria-hidden /> : <SquareCode className="size-4" aria-hidden />}
              {tr(tk.title, lang)}
            </button>
          );
        })}
      </div>

      <section className="surface mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-extrabold text-white">{tr(task.title, lang)}</h2>
            <span className="rounded-full bg-white/[0.07] px-2.5 py-0.5 text-[11px] font-bold text-slate-300">
              {t("playground.level", { n: task.level })}
            </span>
            {solved && (
              <span className="inline-flex items-center gap-1 rounded-full bg-mint-400/15 px-2.5 py-0.5 text-[11px] font-bold text-mint-400">
                <CheckCircle2 className="size-3" aria-hidden />
                {t("playground.solved")}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{tr(task.desc, lang)}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 self-start rounded-full bg-amber-400/10 px-3 py-1.5 text-sm font-extrabold text-amber-300 sm:self-center">
          <Zap className="size-4" aria-hidden />+{XP.task} XP
        </span>
      </section>

      {/* mobile switch */}
      <div className="mb-3 grid grid-cols-2 gap-1 rounded-2xl bg-white/[0.04] p-1 lg:hidden" role="tablist">
        {(["editor", "preview"] as const).map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            onClick={() => setView(v)}
            className={cn("rounded-xl py-2.5 text-sm font-bold transition", view === v ? "bg-brand-500 text-white" : "text-slate-400")}
          >
            {v === "editor" ? t("playground.editor") : t("playground.preview")}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* editor */}
        <section className={cn("flex flex-col gap-3", view !== "editor" && "hidden lg:flex")}>
          <div className="flex items-center gap-1 rounded-2xl bg-white/[0.04] p-1" role="tablist" aria-label={t("playground.editor")}>
            {TABS.map((tb) => (
              <button
                key={tb.id}
                role="tab"
                aria-selected={tab === tb.id}
                onClick={() => setTab(tb.id)}
                className={cn("flex-1 rounded-xl py-2 text-sm font-bold transition", tab === tb.id ? "bg-ink-600 text-white" : "text-slate-500 hover:text-slate-300")}
              >
                {tb.label}
              </button>
            ))}
          </div>
          <CodeEditor key={`${task.id}-${tab}`} value={code[tab]} onChange={update} label={`${t("playground.editor")} ${tab.toUpperCase()}`} heightClass="h-[340px]" />
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => execute({ count: true, test: false })} icon={<Play className="size-4" />}>
              {t("common.run")}
            </Button>
            <Button variant="success" onClick={() => execute({ count: false, test: true })} disabled={checking} icon={checking ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}>
              {t("playground.check")}
            </Button>
            <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />} className="ml-auto">
              {t("common.reset")}
            </Button>
          </div>
        </section>

        {/* preview */}
        <section className={cn("flex flex-col gap-3", view !== "preview" && "hidden lg:flex")}>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
              <Eye className="size-4 text-slate-500" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("playground.preview")}</span>
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-mint-400">
                <ShieldCheck className="size-3.5" aria-hidden />
                {t("playground.sandbox")}
              </span>
            </div>
            <div className="relative h-[300px] bg-white">
              <iframe
                ref={iframeRef}
                title={t("playground.preview")}
                sandbox="allow-scripts"
                srcDoc={doc}
                onLoad={() => setReady(true)}
                className="size-full border-0 bg-white"
              />
              {!ready && (
                <div className="absolute inset-0 grid place-items-center bg-ink-900/90 text-sm font-semibold text-slate-400" role="status">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    {t("playground.running")}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900">
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("playground.console")}</span>
              {logs.length > 0 && (
                <button onClick={() => setLogs([])} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-500 hover:bg-white/10 hover:text-white" aria-label={t("playground.clearConsole")}>
                  <Trash2 className="size-3.5" aria-hidden />
                  {t("playground.clear")}
                </button>
              )}
            </div>
            <div className="h-32 overflow-y-auto p-3 font-mono text-[12.5px] leading-6" aria-live="polite">
              {logs.length === 0 ? (
                <p className="text-slate-600">{t("playground.consoleEmpty")}</p>
              ) : (
                logs.map((l, i) => (
                  <div key={i} className={cn("whitespace-pre-wrap break-words", l.level === "error" ? "text-rose-400" : l.level === "warn" ? "text-amber-300" : "text-slate-300")}>
                    <span className="mr-2 select-none text-slate-600">›</span>
                    {l.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
