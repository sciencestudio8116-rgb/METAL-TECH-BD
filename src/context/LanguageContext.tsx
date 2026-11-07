import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types/navigation';
import { translations, TranslationDictionary } from '../data/translations';

interface LanguageContextType {
  // User Panel Language (Public Site)
  userLanguage: Language;
  userIsBn: boolean;
  setUserLanguage: (lang: Language) => void;
  toggleUserLanguage: () => void;
  userT: TranslationDictionary;
  userTKey: (path: string, fallback?: string) => string;

  // Admin Panel Language (Isolated Admin Console)
  adminLanguage: Language;
  adminIsBn: boolean;
  setAdminLanguage: (lang: Language) => void;
  toggleAdminLanguage: () => void;
  adminT: TranslationDictionary;
  adminTKey: (path: string, fallback?: string) => string;

  // Backwards Compatibility Aliases (Default to User Panel)
  language: Language;
  isBn: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
  tKey: (path: string, fallback?: string) => string;
}

const USER_STORAGE_KEY = 'metaltek_user_language_preference';
const ADMIN_STORAGE_KEY = 'metaltek_admin_language_preference';
const LEGACY_STORAGE_KEY = 'metaltek_language_preference';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Independent User Panel Language State
  const [userLanguage, setUserLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved === 'bn' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  // 2. Independent Admin Panel Language State (Decoupled completely)
  const [adminLanguage, setAdminLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (saved === 'bn' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const userIsBn = userLanguage === 'bn';
  const adminIsBn = adminLanguage === 'bn';

  const setUserLanguage = (lang: Language) => {
    setUserLanguageState(lang);
    try {
      localStorage.setItem(USER_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleUserLanguage = () => {
    setUserLanguage(userLanguage === 'en' ? 'bn' : 'en');
  };

  const setAdminLanguage = (lang: Language) => {
    setAdminLanguageState(lang);
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleAdminLanguage = () => {
    setAdminLanguage(adminLanguage === 'en' ? 'bn' : 'en');
  };

  // Sync with HTML lang attribute and body class for typography
  useEffect(() => {
    const isAnyBn = userLanguage === 'bn' || adminLanguage === 'bn';
    document.documentElement.lang = userLanguage;
    if (isAnyBn) {
      document.documentElement.classList.add('lang-bn');
      document.body.classList.add('lang-bn');
    } else {
      document.documentElement.classList.remove('lang-bn');
      document.body.classList.remove('lang-bn');
    }
  }, [userLanguage, adminLanguage]);

  // Nested key resolver helper for user language
  const userTKey = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = translations[userLanguage];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }
    return typeof current === 'string' ? current : fallback || path;
  };

  // Nested key resolver helper for admin language
  const adminTKey = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = translations[adminLanguage];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }
    return typeof current === 'string' ? current : fallback || path;
  };

  return (
    <LanguageContext.Provider
      value={{
        // User Panel
        userLanguage,
        userIsBn,
        setUserLanguage,
        toggleUserLanguage,
        userT: translations[userLanguage],
        userTKey,

        // Admin Panel
        adminLanguage,
        adminIsBn,
        setAdminLanguage,
        toggleAdminLanguage,
        adminT: translations[adminLanguage],
        adminTKey,

        // Backwards compatibility aliases
        language: userLanguage,
        isBn: userIsBn,
        setLanguage: setUserLanguage,
        toggleLanguage: toggleUserLanguage,
        t: translations[userLanguage],
        tKey: userTKey,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
