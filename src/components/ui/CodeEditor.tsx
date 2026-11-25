import { useRef, type KeyboardEvent, type UIEvent } from "react";
import { cn } from "@/utils/cn";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  /** Minimum visible lines. */
  minLines?: number;
  /** Fixed height class (enables internal scrolling); otherwise grows with content. */
  heightClass?: string;
  readOnly?: boolean;
  className?: string;
}

export function CodeEditor({ value, onChange, label, minLines = 6, heightClass, readOnly, className }: Props) {
  const gutterRef = useRef<HTMLDivElement>(null);
  const escaped = useRef(false);
  const lines = Math.max(minLines, value.split("\n").length);

  const onScroll = (e: UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) gutterRef.current.scrollTop = e.currentTarget.scrollTop;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      escaped.current = true; // next Tab moves focus (keyboard accessibility)
      return;
    }
    if (e.key === "Tab" && !e.shiftKey && !escaped.current) {
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart: s, selectionEnd: end } = el;
      onChange(value.slice(0, s) + "  " + value.slice(end));
      requestAnimationFrame(() => el.setSelectionRange(s + 2, s + 2));
    }
    if (e.key !== "Tab" && e.key !== "Shift") escaped.current = false;
  };

  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-xl border border-white/[0.08] bg-ink-900 font-mono text-[13px] leading-6 focus-within:border-brand-400/60",
        heightClass,
        className,
      )}
    >
      <div
        ref={gutterRef}
        aria-hidden
        className="select-none overflow-hidden border-r border-white/[0.06] bg-white/[0.02] py-3 pl-3 pr-2.5 text-right text-slate-600"
      >
        {Array.from({ length: lines }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <textarea
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        aria-label={label}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        wrap="off"
        rows={lines}
        className={cn(
          "block min-w-0 flex-1 resize-none overflow-auto whitespace-pre bg-transparent px-3 py-3 text-slate-100 caret-brand-300 outline-none",
          heightClass ? "h-full" : "overflow-y-hidden",
        )}
        style={{ outline: "none" }}
      />
    </div>
  );
}
