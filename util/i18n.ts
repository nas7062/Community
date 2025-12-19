import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@/util/resourece";

let initialized = false;

export async function initI18n(language: string) {
  if (initialized) return;

  await i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: "ko",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

  initialized = true;
}

export default i18n;
