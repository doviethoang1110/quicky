import vi from "../locales/vi.json";
import en from "../locales/en.json";
import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import CookieService from "../utils/cookieService";

i18next.use(detector)
    .init({
    interpolation: {escapeValue: false},
    lng: CookieService.get("i18next") || 'en',
    fallbackLng: 'en',
    detection: {
        order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subDomain'],
        caches: ['cookie']
    },
    resources: {
        en: {
            common: en
        },
        vi: {
            common: vi
        },
    },
});

export default i18next;