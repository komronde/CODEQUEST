import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { NAV_ITEMS, PRIMARY_KEYS } from "./nav";

export function BottomNav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const primary = NAV_ITEMS.filter((i) => PRIMARY_KEYS.includes(i.key));
  const more = NAV_ITEMS.filter((i) => !PRIMARY_KEYS.includes(i.key));
  const moreActive = more.some((i) => pathname.startsWith(i.to));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const tab = "relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-bold transition";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t("nav.more")}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-white/10 bg-ink-800 p-5 pb-28"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-white">{t("nav.more")}</h2>
                <button onClick={() => setOpen(false)} className="rounded-xl p-2 text-slate-400 hover:bg-white/10" aria-label={t("nav.closeMenu")}>
                  <X className="size-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {more.map(({ to, key, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-2xl border p-4 text-sm font-bold transition",
                        isActive ? "border-brand-400/40 bg-brand-500/15 text-white" : "border-white/[0.07] bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]",
                      )
                    }
                  >
                    <Icon className="size-5 text-brand-300" aria-hidden />
                    {t(`nav.${key}`)}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        aria-label={t("nav.mobile")}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-ink-900/90 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto flex max-w-md items-center py-1.5">
          {primary.map(({ to, key, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => cn(tab, isActive ? "text-white" : "text-slate-500 hover:text-slate-300")}>
              {({ isActive }) => (
                <>
                  {isActive && <motion.span layoutId="tab-pill" className="absolute inset-x-2 inset-y-0.5 rounded-xl bg-brand-500/15 ring-1 ring-brand-400/25" />}
                  <Icon className={cn("relative size-[22px]", isActive && "text-brand-300")} aria-hidden />
                  <span className="relative">{t(`nav.${key}`)}</span>
                </>
              )}
            </NavLink>
          ))}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className={cn(tab, moreActive || open ? "text-white" : "text-slate-500 hover:text-slate-300")}
          >
            <MoreHorizontal className={cn("size-[22px]", (moreActive || open) && "text-brand-300")} aria-hidden />
            <span>{t("nav.more")}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
