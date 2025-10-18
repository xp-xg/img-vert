import React from 'react';
import { useTranslation } from 'react-i18next';

const AppLogo = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-blue-500"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Image outline */}
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          {/* Image diagonal line to represent conversion */}
          <line x1="7" y1="7" x2="17" y2="17" />
          {/* Arrow to indicate transformation */}
          <path d="M17 7l-3.5 3.5-3.5-3.5" />
        </svg>
        {/* Conversion symbol overlay */}
        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 text-white" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="15 10 20 15 15 20" />
            <path d="M4 4v7a4 4 0 0 0 4 4h12" />
          </svg>
        </div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        {t('title')}
      </span>
    </div>
  );
};

export default AppLogo;