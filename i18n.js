import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

// Import translation files
import en from './locales/en.json';
import ar from './locales/ar.json';

// Create i18n instance
const i18n = new I18n();

// Set the key-value pairs for the different languages
i18n.translations = {
  en,
  ar,
};

// Set the locale once at the beginning of your app
i18n.locale = Localization.getLocales()[0].languageCode ?? 'en';

// When a value is missing from a language it'll fall back to another language with the key present
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// Function to change language
export const changeLanguage = (languageCode) => {
  i18n.locale = languageCode;
  
  // Handle RTL for Arabic
  const isRTL = languageCode === 'ar';
  
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  
  // Note: In a real app, you might want to restart the app for RTL changes to take full effect
  // For development, we'll handle this in the UI components
};

// Function to get current language
export const getCurrentLanguage = () => i18n.locale;

// Function to check if current language is RTL
export const isRTL = () => i18n.locale === 'ar';

// Export the translation function
export const t = (key, options) => i18n.t(key, options);

export default i18n;