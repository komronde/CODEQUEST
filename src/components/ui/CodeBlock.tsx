import { Fragment, type ReactNode } from "react";
import { cn } from "@/utils/cn";

const TOKEN =
  /(\/\/.*|(?:^|\s)#(?:\s.*)?$|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|(<\/?[A-Za-z][\w-]*|\/?>)|(\b\d+(?:\.\d+)?\b)|\b(const|let|var|function|return|if|else|elif|for|while|in|of|import|from|export|def|class|interface|type|new|true|false|True|False|null|undefined|typeof|print|range|async|await|display|useState)\b/gm;

function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of code.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(code.slice(last, idx));
    const text = m[0];
    const cls = m[1] ? "text-slate-500 italic" : m[2] ? "text-mint-400" : m[3] ? "text-rose-400" : m[4] ? "text-amber-400" : "text-brand-300";
    out.push(
      <span key={key++} className={cls}>
        {text}
      </span>,
    );
    last = idx + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

interface Props {
  code: string;
  className?: string;
  label?: string;
}

export function CodeBlock({ code, className, label }: Props) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/[0.07] bg-ink-900", className)}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-2">
        <span className="size-2.5 rounded-full bg-rose-400/70" />
        <span className="size-2.5 rounded-full bg-amber-400/70" />
        <span className="size-2.5 rounded-full bg-mint-400/70" />
        {label && <span className="ml-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</span>}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-slate-200">
        <code>
          <Fragment>{highlight(code)}</Fragment>
        </code>
      </pre>
    </div>
  );
}
