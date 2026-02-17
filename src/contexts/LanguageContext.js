import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isEnglish, setIsEnglish] = useState(true); // true = English, false = Filipino

  const toggleLanguage = (english) => {
    setIsEnglish(english);
  };

  const getLanguageSuffix = () => {
    return isEnglish ? '' : '_filipino';
  };

  return (
    <LanguageContext.Provider value={{ 
      isEnglish, 
      toggleLanguage, 
      getLanguageSuffix 
    }}>
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
