import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  // Added Marathi ('mr') to the languages array
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    // 🟢 MARATHI ADDED
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }, 
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200">
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">{t('language')}</span>
      </button>
      
      <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang, index) => (
          <button
            key={lang.code}
            // Ensure the language code is correctly cast/passed
            onClick={() => setLanguage(lang.code as any)} 
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
              language === lang.code ? 'bg-green-50 text-green-700' : 'text-gray-700'
            } ${index === 0 ? 'rounded-t-lg' : ''} ${
              index === languages.length - 1 ? 'rounded-b-lg' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};