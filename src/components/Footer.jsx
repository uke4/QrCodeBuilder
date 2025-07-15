import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../i18n/translations';
import { HeartIcon, GithubIcon, InstagramIcon, ExternalLinkIcon } from './icons/Icons';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <span className="text-gray-300 mr-2">{getTranslation(language, 'madeWith')}</span>
            <HeartIcon className="w-5 h-5 text-red-500 mx-1" />
            <span className="text-gray-300 ml-2">{getTranslation(language, 'by')} Abduh</span>
          </div>
          
          <div className="flex items-center justify-center space-x-6">
            <a
              href="https://1bduh.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <ExternalLinkIcon className="w-4 h-4 mr-2" />
              {getTranslation(language, 'portfolio')}
            </a>
            
            <a
              href="https://github.com/uke4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
            >
              <GithubIcon className="w-5 h-5 mr-2" />
              GitHub
            </a>
            
            <a
              href="https://instagram.com/abduhtheone"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-pink-400 hover:text-pink-300 transition-colors duration-200"
            >
              <InstagramIcon className="w-5 h-5 mr-2" />
              Instagram
            </a>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2024 QR Code Generator. Made for the global community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

