import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { t, isRTL } = useLanguage();

  return (
    <header className={`bg-white border-b border-gray-200 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h1 className="text-3xl font-bold text-blue-600">
              {t('title')}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}

