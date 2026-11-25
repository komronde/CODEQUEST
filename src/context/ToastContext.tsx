import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Flame, Info, Trophy, X, Zap, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";

export type ToastKind = "success" | "error" | "info" | "xp" | "achievement" | "streak";

interface ToastItem {
  id: number;
  kind: ToastKind;
  title: string;
  message?: string;
}

interface ToastApi {
  show: (kind: ToastKind, title: string, message?: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ICONS: Record<ToastKind, { icon: LucideIcon; tone: string }> = {
  success: { icon: CheckCircle2, tone: "text-mint-400 bg-mint-400/15" },
  error: { icon: AlertCircle, tone: "text-rose-400 bg-rose-400/15" },
  info: { icon: Info, tone: "text-cyan-400 bg-cyan-400/15" },
  xp: { icon: Zap, tone: "text-amber-400 bg-amber-400/15" },
  achievement: { icon: Trophy, tone: "text-brand-300 bg-brand-400/20" },
  streak: { icon: Flame, tone: "text-orange-400 bg-orange-400/15" },
};

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => setItems((list) => list.filter((i) => i.id !== id)), []);

  const show = useCallback(
    (kind: ToastKind, title: string, message?: string) => {
      const id = ++counter.current;
      setItems((list) => [...list.slice(-3), { id, kind, title, message }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (title, message) => show("success", title, message),
      error: (title, message) => show("error", title, message),
      info: (title, message) => show("info", title, message),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 top-3 z-[100] mx-auto flex w-full max-w-sm flex-col gap-2 px-3 sm:left-auto sm:right-4 sm:top-4 sm:mx-0 sm:px-0"
        role="region"
        aria-live="polite"
        aria-label={t("toast.region")}
      >
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const { icon: Icon, tone } = ICONS[item.kind];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="glass pointer-events-auto flex items-start gap-3 rounded-2xl p-3.5 shadow-2xl shadow-black/50"
                role="status"
              >
                <span className={cn("mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl", tone)}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-snug text-white">{item.title}</p>
                  {item.message && <p className="mt-0.5 text-xs leading-snug text-slate-400">{item.message}</p>}
                </div>
                <button
                  onClick={() => dismiss(item.id)}
                  className="rounded-lg p-1 text-slate-500 transition hover:bg-white/10 hover:text-white"
                  aria-label={t("common.close")}
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
