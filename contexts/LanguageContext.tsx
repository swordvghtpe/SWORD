import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: <T>(zh: T, en: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sword_language');
      if (saved === 'zh' || saved === 'en') {
        return saved as Language;
      }
    }
    return 'zh';
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'zh' ? 'en' : 'zh';
      if (typeof window !== 'undefined') {
        localStorage.setItem('sword_language', next);
      }
      return next;
    });
  };

  // Helper function for inline translation: t('中文', 'English')
  const t = <T,>(zh: T, en: T): T => {
    return language === 'zh' ? zh : en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};