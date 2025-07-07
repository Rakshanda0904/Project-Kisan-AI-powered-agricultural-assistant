import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick, 
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left border-2 border-transparent ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:border-green-200 hover:scale-105 active:scale-95'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-green-100 rounded-lg">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  );
};