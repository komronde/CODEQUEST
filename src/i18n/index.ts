import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { STORAGE_KEYS, storage } from "@/services/storage";
import { toLang } from "@/lib/text";
import type { Lang } from "@/types";
import { en } from "./locales/en";
import { uz } from "./locales/uz";
import { ru } from "./locales/ru";

export const LANGUAGES: { code: Lang; native: string; flag: string }[] = [
  { code: "en", native: "English", flag: "🇬🇧" },
  { code: "uz", native: "Oʻzbekcha", flag: "🇺🇿" },
  { code: "ru", native: "Русский", flag: "🇷🇺" },
];

const saved = storage.getString(STORAGE_KEYS.lang);
const initial: Lang = saved ? toLang(saved) : toLang(typeof navigator !== "undefined" ? navigator.language : "en");

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, uz: { translation: uz }, ru: { translation: ru } },
  lng: initial,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnNull: false,
});

document.documentElement.lang = initial;

i18n.on("languageChanged", (lng) => {
  storage.set(STORAGE_KEYS.lang, lng);
  document.documentElement.lang = lng;
});

export default i18n;
