import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Flame, Globe2, Layers, ScrollText, Sparkles, TerminalSquare, Trophy, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { COURSES, TOTAL_EXERCISES, TOTAL_LESSONS } from "@/data/courses";
import { tr } from "@/lib/text";
import { useLang } from "@/hooks/useLang";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { CourseIcon } from "@/components/ui/CourseIcon";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const FEATURES = [
  { key: "interactive", icon: Layers, tone: "from-brand-400 to-brand-600" },
  { key: "xp", icon: Zap, tone: "from-amber-300 to-orange-500" },
  { key: "streak", icon: Flame, tone: "from-orange-400 to-rose-500" },
  { key: "quests", icon: ScrollText, tone: "from-mint-400 to-cyan-500" },
  { key: "playground", icon: TerminalSquare, tone: "from-cyan-400 to-blue-600" },
  { key: "languages", icon: Globe2, tone: "from-pink-400 to-brand-500" },
] as const;

export default function LandingPage() {
  const { t } = useTranslation();
  const { lang } = useLang();

  return (
    <div className="relative overflow-x-clip">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-950/70 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 lg:px-8">
          <Link to="/" aria-label={t("app.name")}>
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label={t("nav.main")}>
            {[
              ["features", t("nav.features")],
              ["paths", t("nav.paths")],
              ["how", t("nav.howItWorks")],
            ].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="rounded-xl px-4 py-2 text-sm font-bold text-slate-400 transition hover:bg-white/[0.06] hover:text-white">
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button to="/dashboard" size="sm" className="hidden sm:inline-flex">
              {t("nav.openApp")}
            </Button>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" aria-hidden />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold text-brand-200">
            <Sparkles className="size-3.5" aria-hidden />
            {t("landing.badge")}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("landing.heroTitle1")} <span className="text-gradient">{t("landing.heroTitle2")}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400">{t("landing.heroDesc")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/dashboard" size="lg" icon={<ArrowRight className="size-5" />} className="flex-row-reverse">
              {t("landing.ctaStart")}
            </Button>
            <Button to="/paths" size="lg" variant="secondary">
              {t("landing.ctaPaths")}
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-4 gap-4">
            {[
              [COURSES.length, t("landing.stat.paths")],
              [TOTAL_LESSONS, t("landing.stat.lessons")],
              [TOTAL_EXERCISES, t("landing.stat.exercises")],
              [3, t("landing.stat.languages")],
            ].map(([n, label]) => (
              <div key={label}>
                <dd className="text-2xl font-extrabold text-white sm:text-3xl">{n}</dd>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* product mock */}
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative mx-auto w-full max-w-md" aria-hidden>
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-500/30 to-cyan-400/10 blur-2xl" />
          <div className="surface rounded-[2rem] p-5 shadow-2xl shadow-brand-900/50">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-mint-500 to-mint-400" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-400/10 px-2.5 py-1 text-xs font-extrabold text-amber-300">
                <Zap className="size-3.5" />
                +20
              </span>
            </div>
            <p className="text-lg font-extrabold text-white">{t("landing.mock.question")}</p>
            <div className="mt-4 space-y-2.5">
              {["<h1>", "<p>", "<div>"].map((o, i) => (
                <div
                  key={o}
                  className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 font-mono text-sm font-semibold ${
                    i === 0 ? "border-mint-400 bg-mint-400/15 text-white" : "border-white/10 bg-white/[0.03] text-slate-300"
                  }`}
                >
                  <span className="grid size-6 place-items-center rounded-md bg-white/10 font-sans text-[11px] font-extrabold">{"ABC"[i]}</span>
                  {o}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-mint-400/10 px-4 py-3 text-sm font-extrabold text-mint-400">
              <CheckCircle2 className="size-5" />
              {t("landing.mock.correct")}
            </div>
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="glass absolute -left-4 -top-5 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-xl sm:-left-10">
            <Flame className="size-5 text-orange-400" />
            <span className="text-sm font-extrabold text-white">{t("landing.mock.streak", { count: 12 })}</span>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="glass absolute -bottom-5 -right-3 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-xl sm:-right-8">
            <Trophy className="size-5 text-amber-300" />
            <span className="text-sm font-extrabold text-white">{t("landing.mock.level", { level: 7 })}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{t("landing.featuresTitle")}</h2>
          <p className="mt-3 text-base text-slate-400">{t("landing.featuresSub")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="surface surface-hover p-6"
            >
              <span className={`mb-5 grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${f.tone}`}>
                <f.icon className="size-6" aria-hidden />
              </span>
              <h3 className="text-lg font-extrabold text-white">{t(`landing.features.${f.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(`landing.features.${f.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* paths */}
      <section id="paths" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{t("landing.pathsTitle")}</h2>
            <p className="mt-3 text-base text-slate-400">{t("landing.pathsSub")}</p>
          </div>
          <Button to="/paths" variant="secondary">
            {t("common.viewAll")}
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
            <Link key={c.id} to={`/course/${c.id}`} className="surface surface-hover group flex items-center gap-4 p-5">
              <CourseIcon course={c} />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-extrabold text-white">{tr(c.title, lang)}</h3>
                <p className="text-sm font-semibold text-slate-500">{t("landing.lessonsCount", { count: c.lessons.length })}</p>
              </div>
              <ArrowRight className="size-5 text-slate-600 transition group-hover:translate-x-1 group-hover:text-brand-300" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 lg:px-8 lg:py-24">
        <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{t("landing.howTitle")}</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li key={n} className="surface relative overflow-hidden p-6">
              <span className="text-gradient text-6xl font-extrabold opacity-80">{n}</span>
              <h3 className="mt-3 text-lg font-extrabold text-white">{t(`landing.steps.s${n}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(`landing.steps.s${n}.desc`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-6xl px-4 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-400/30 bg-gradient-to-br from-brand-600/40 via-ink-800 to-ink-900 px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-brand-500/40 blur-3xl" aria-hidden />
          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{t("landing.ctaTitle")}</h2>
          <p className="relative mx-auto mt-3 max-w-lg text-slate-300">{t("landing.ctaDesc")}</p>
          <Button to="/dashboard" size="lg" className="relative mt-8" icon={<Sparkles className="size-5" />}>
            {t("landing.ctaStart")}
          </Button>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row lg:px-8">
          <Logo size="sm" />
          <p className="text-sm text-slate-500">{t("landing.footer", { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}
