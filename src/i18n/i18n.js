import i18n from "i18next";
import { initReactI18next} from "react-i18next";

import translationEN from "@locales/en/translation.json";
import landingPageEN from "@locales/en/landingPage.json";

// the translations
const resources = {
    en: {
        translation: translationEN,
        landingPage: landingPageEN,
    }
};


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;