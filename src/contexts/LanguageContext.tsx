import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'kn' | 'hi' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome: 'Welcome to Project Kisan',
    subtitle: 'Your AI-powered agricultural assistant',
    cropDiagnosis: 'Crop Disease Diagnosis',
    marketPrices: 'Market Prices',
    govSchemes: 'Government Schemes',
    voiceAssistant: 'Voice Assistant',
    restaurants: 'Restaurant Connect',
    coldStorage: 'Cold Storage',
    language: 'Language',
    farmersHelped: 'Farmers Helped',
    diagnosisAccuracy: 'Diagnosis Accuracy',
    availableSupport: 'Available Support'
  },
  kn: {
    welcome: 'ಪ್ರಾಜೆಕ್ಟ್ ಕಿಸಾನ್‌ಗೆ ಸ್ವಾಗತ',
    subtitle: 'ನಿಮ್ಮ AI-ಚಾಲಿತ ಕೃಷಿ ಸಹಾಯಕ',
    cropDiagnosis: 'ಬೆಳೆ ರೋಗ ನಿರ್ಣಯ',
    marketPrices: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
    govSchemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    voiceAssistant: 'ಧ್ವನಿ ಸಹಾಯಕ',
    restaurants: 'ರೆಸ್ಟೋರೆಂಟ್ ಸಂಪರ್ಕ',
    coldStorage: 'ಶೀತಲ ಭಂಡಾರ',
    language: 'ಭಾಷೆ',
    farmersHelped: 'ಸಹಾಯ ಪಡೆದ ರೈತರು',
    diagnosisAccuracy: 'ನಿರ್ಣಯ ನಿಖರತೆ',
    availableSupport: 'ಲಭ್ಯವಿರುವ ಬೆಂಬಲ'
  },
  hi: {
    welcome: 'प्रोजेक्ट किसान में आपका स्वागत है',
    subtitle: 'आपका AI-संचालित कृषि सहायक',
    cropDiagnosis: 'फसल रोग निदान',
    marketPrices: 'बाजार मूल्य',
    govSchemes: 'सरकारी योजनाएं',
    voiceAssistant: 'आवाज सहायक',
    restaurants: 'रेस्टोरेंट कनेक्ट',
    coldStorage: 'कोल्ड स्टोरेज',
    language: 'भाषा',
    farmersHelped: 'सहायता प्राप्त किसान',
    diagnosisAccuracy: 'निदान सटीकता',
    availableSupport: 'उपलब्ध सहायता'
  },
  te: {
    welcome: 'ప్రాజెక్ట్ కిసాన్‌కు స్వాగతం',
    subtitle: 'మీ AI-శక్తితో కూడిన వ్యవసాయ సహాయకుడు',
    cropDiagnosis: 'పంట వ్యాధి నిర్ధారణ',
    marketPrices: 'మార్కెట్ ధరలు',
    govSchemes: 'ప్రభుత్వ పథకాలు',
    voiceAssistant: 'వాయిస్ అసిస్టెంట్',
    restaurants: 'రెస్టారెంట్ కనెక్ట్',
    coldStorage: 'కోల్డ్ స్టోరేజ్',
    language: 'భాష',
    farmersHelped: 'సహాయం పొందిన రైతులు',
    diagnosisAccuracy: 'నిర్ధారణ ఖచ్చితత్వం',
    availableSupport: 'అందుబాటులో ఉన్న మద్దతు'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};