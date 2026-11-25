import { useTranslation } from "react-i18next";
import { toLang } from "@/lib/text";
import type { Lang } from "@/types";

/** Current language code plus a setter that persists the choice (via i18n 'languageChanged'). */
export function useLang(): { lang: Lang; setLang: (l: Lang) => void } {
  const { i18n } = useTranslation();
  return { lang: toLang(i18n.language), setLang: (l) => void i18n.changeLanguage(l) };
}
