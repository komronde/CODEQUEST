import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";

export function AppLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="min-h-dvh lg:pl-72">
      <button
        onClick={() => main.current?.focus()}
        className="sr-only fixed left-4 top-4 z-[300] rounded-xl bg-brand-500 px-4 py-2 font-bold text-white focus:not-sr-only"
      >
        {t("nav.skip")}
      </button>
      <Sidebar />
      <TopBar />
      <main ref={main} tabIndex={-1} className="mx-auto max-w-6xl px-4 pb-32 pt-6 outline-none lg:px-8 lg:pb-12 lg:pt-8">
        <motion.div key={pathname} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease: "easeOut" }}>
          <Outlet />
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
}
