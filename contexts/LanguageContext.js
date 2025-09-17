import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

import i18n, { changeLanguage, getCurrentLanguage, isRTL, t, getTextAlign, getFlexDirection } from '../i18n';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LANGUAGE_STORAGE_KEY = '@tech_art_language';

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language from AsyncStorage on app start
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage) {
          changeLanguage(savedLanguage);
          setCurrentLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading saved language:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedLanguage();
  }, []);

  // Save language to AsyncStorage
  const saveLanguageToStorage = async (languageCode) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
    } catch (error) {
      console.error('Error saving language to storage:', error);
    }
  };

  const switchLanguage = async (languageCode) => {
    changeLanguage(languageCode);
    setCurrentLanguage(languageCode);
    await saveLanguageToStorage(languageCode);
  };

  const switchLanguageWithRestart = async (languageCode) => {
    changeLanguage(languageCode);
    setCurrentLanguage(languageCode);
    await saveLanguageToStorage(languageCode);
    
    // Restart the app to apply language changes
    try {
      if (__DEV__) {
        // In development, we can't use Updates.reloadAsync(), so we'll just update the state
        // The user will need to manually refresh or the app will update on next navigation
        console.log('Language changed to:', languageCode);
        // Force a reload in development by reloading the page
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      } else {
        // In production, restart the app
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error('Error restarting app:', error);
    }
  };

  const value = {
    currentLanguage,
    switchLanguage,
    switchLanguageWithRestart,
    isLoading,
    t, // Translation function
    i18n, // i18n instance
    isRTL, // RTL detection function
    getTextAlign, // RTL-aware text alignment
    getFlexDirection, // RTL-aware flex direction
    availableLanguages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};