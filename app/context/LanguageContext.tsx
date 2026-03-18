'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../../locales/en.json';
import frTranslations from '../../locales/fr.json';

type Locale = 'en' | 'fr';
type Translations = typeof enTranslations;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, options?: { [key: string]: any }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Locale, Translations> = {
  en: enTranslations,
  fr: frTranslations,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const savedLocale = localStorage.getItem('app_locale') as Locale;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'fr')) {
      setLocaleState(savedLocale);
    }
    setIsLoaded(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('app_locale', newLocale);
  };

  const t = (path: string, options?: { [key: string]: any }): any => {
    const keys = path.split('.');
    let current: any = translations[locale];

    for (const key of keys) {
      if (current === undefined || current === null) return path;
      current = current[key as keyof typeof current];
    }

    if (typeof current === 'string' && options) {
      let result = current;
      Object.entries(options).forEach(([key, value]) => {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
      });
      return result;
    }

    return current !== undefined ? current : path;
  };

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
