import type { L, Lang, Opt } from "@/types";

export const LANG_INDEX: Record<Lang, 0 | 1 | 2> = { en: 0, uz: 1, ru: 2 };

/** Pick the localized string from a [en, uz, ru] tuple. */
export const tr = (text: L, lang: Lang): string => text[LANG_INDEX[lang]];

/** Options may be language-neutral strings or localized tuples. */
export const trOpt = (opt: Opt, lang: Lang): string => (typeof opt === "string" ? opt : tr(opt, lang));

export const toLang = (code: string | undefined): Lang => {
  const base = (code ?? "en").slice(0, 2).toLowerCase();
  return base === "uz" || base === "ru" ? base : "en";
};

export const LOCALE_TAG: Record<Lang, string> = { en: "en-US", uz: "uz-UZ", ru: "ru-RU" };
