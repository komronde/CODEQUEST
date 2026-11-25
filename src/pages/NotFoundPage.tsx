import { Compass } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="flex max-w-md flex-col items-center">
        <Logo className="mb-10" />
        <div className="mb-6 grid size-20 place-items-center rounded-3xl bg-brand-400/10 text-brand-300 ring-1 ring-brand-400/25">
          <Compass className="size-10" aria-hidden />
        </div>
        <p className="text-6xl font-extrabold text-gradient">404</p>
        <h1 className="mt-3 text-2xl font-extrabold text-white">{t("notFound.title")}</h1>
        <p className="mt-2 text-slate-400">{t("notFound.desc")}</p>
        <div className="mt-8 flex gap-3">
          <Button to="/dashboard">{t("notFound.goDashboard")}</Button>
          <Button to="/" variant="secondary">
            {t("notFound.goHome")}
          </Button>
        </div>
      </div>
    </div>
  );
}
