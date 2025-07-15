import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languageConfig } from '../i18n/translations';
import { ChevronDownIcon, GlobeAltIcon } from './icons/Icons';

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languageConfig.find(lang => lang.code === currentLanguage) || languageConfig[0];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200"
      >
        <GlobeAltIcon className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentLang.code.toUpperCase()}
        </span>
        <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            {languageConfig.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-blue-50 transition-colors duration-150 ${
                  currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{lang.name}</div>
                  <div className="text-xs text-gray-500">{lang.code.toUpperCase()}</div>
                </div>
                {currentLanguage === lang.code && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

