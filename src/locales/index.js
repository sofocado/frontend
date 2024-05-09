import { createI18n } from "vue-i18n";

import kz from "./language/kz.js";
import ru from "./language/ru.js";
import en from "./language/en.js";

const currentLang = localStorage.getItem("currentLang") || "kz";
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  global: true,
  locale: currentLang,
  fallbackLocale: currentLang,
  warnHtmlMessage: false,
  messages: {
    kz,
    ru,
    en,
  },
});

export default i18n;
