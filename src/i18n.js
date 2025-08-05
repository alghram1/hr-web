import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


// تحميل ملفات الترجمة
import enTranslation from "./locales/en.json";
import arTranslation from "./locales/ar.json";

const resources = {
    en: { translation: enTranslation },
    ar: { translation: arTranslation }
};

i18n
    .use(LanguageDetector) // لاكتشاف لغة المتصفح تلقائيًا
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en", // إذا لم يتم العثور على لغة، استخدم الإنجليزية
        detection: {
            order: ["localStorage", "navigator"]
            , // تحديد اللغة من LocalStorage أو المتصفح
            caches: ["localStorage"] // تخزين اللغة في LocalStorage
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
