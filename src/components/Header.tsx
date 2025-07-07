import React from 'react';
import { Wheat, Mic, MicOff } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  isListening: boolean;
  onToggleListening: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isListening, onToggleListening }) => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-green-600 text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Wheat className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">Project Kisan</h1>
            <p className="text-green-100 text-sm">ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕ</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          <button
            onClick={onToggleListening}
            className={`p-3 rounded-full transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-green-500 hover:bg-green-400'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start voice assistant'}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};