/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './app/locales/en/common.json';
import translationFR from './app/locales/fr/common.json';
import translationCN from './app/locales/cn/common.json';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  zh: {
    translation: translationCN,
  },
};

interface Options {
  order: Array<string>;
  lookupQuerystring: string;
  lookupCookie: string;
  lookupLocalStorage: string;
  lookupSessionStorage: string;
  lookupFromPathIndex: number;
  lookupFromSubdomainIndex: number;
}

export const checkIfChinesePage = (): string | undefined => {
  const path = window.location.pathname;
  const isPageChinese = path.includes('promotions-cn');
  if (isPageChinese) {
    return 'zh';
  }
  return undefined;
};

const options: Options = {
  // order and from where user language should be detected
  order: [
    'path',
    'querystring',
    'cookie',
    'localStorage',
    'sessionStorage',
    'navigator',
    'htmlTag',
    'subdomain',
  ],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    resources,
    lng: checkIfChinesePage(),
    fallbackLng: 'en',
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
