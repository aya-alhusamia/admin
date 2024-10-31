import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import  translation files
import translationEN from './en/translation';
import translationAR from './ar/translation';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    ar: {
        translation: translationAR
    }
};

// Get the saved language from local storage or default to 'en'
const savedLanguage = localStorage.getItem( 'language' ) || 'en';

i18n
    .use( initReactI18next )
    .init( {
        resources,
        lng: savedLanguage,
        keySeparator: false,  
        interpolation: {
            escapeValue: false  
        }
    } );

export default i18n;
