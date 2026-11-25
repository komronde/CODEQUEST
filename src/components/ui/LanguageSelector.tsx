import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/i18n";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/utils/cn";

interface Props {
  className?: string;
  /** align popover to the left edge instead of right */
  alignLeft?: boolean;
  /** open upwards (for bottom-placed selectors) */
  up?: boolean;
}

export function LanguageSelector({ className, alignLeft, up }: Props) {
  const { t } = useTranslation();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-bold text-slate-200 transition hover:bg-white/[0.09]"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("common.language")}
      >
        <Globe className="size-4 text-brand-300" aria-hidden />
        <span className="uppercase">{current.code}</span>
        <ChevronDown className={cn("size-3.5 text-slate-500 transition", open && "rotate-180")} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t("common.language")}
            initial={{ opacity: 0, y: up ? 6 : -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: up ? 6 : -6, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            className={cn(
              "glass absolute z-50 w-48 rounded-2xl p-1.5 shadow-2xl shadow-black/50",
              up ? "bottom-full mb-2" : "top-full mt-2",
              alignLeft ? "left-0" : "right-0",
            )}
          >
            {LANGUAGES.map((l) => (
              <li key={l.code} role="option" aria-selected={l.code === lang}>
                <button
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-white/[0.08]",
                    l.code === lang ? "text-white" : "text-slate-300",
                  )}
                >
                  <span className="text-lg" aria-hidden>
                    {l.flag}
                  </span>
                  <span className="flex-1">{l.native}</span>
                  {l.code === lang && <Check className="size-4 text-brand-300" aria-hidden />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
