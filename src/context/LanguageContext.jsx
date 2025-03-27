// src/context/LanguageContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { translations } from '../translations/translations';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('cn');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'cn';
    setLanguage(savedLang);
  }, []);

  const t = (key) => {
    const keys = key.split('.');
    return keys.reduce((acc, current) => acc[current], translations[language]) || key;
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, t, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const { t } = useContext(LanguageContext);
  return t;
}

export function useLanguage() {
  const { language, switchLanguage } = useContext(LanguageContext);
  return { language, switchLanguage };
}