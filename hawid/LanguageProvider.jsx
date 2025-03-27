// src/context/LanguageProvider.jsx
import { useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';  // Now using named import

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('cn');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'cn';
    setLanguage(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'cn' ? 'en' : 'cn';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}