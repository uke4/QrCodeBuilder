import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../i18n/translations';
import { ArrowUpIcon } from './icons/Icons';

export default function HowToSection() {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            {getTranslation(language, 'howToTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {getTranslation(language, 'howToSubtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="mb-6">
              <img 
                src="/assets/step1-choose-content.png" 
                alt="Choose content step"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {getTranslation(language, 'step1Title')}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {getTranslation(language, 'step1Description')}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="mb-6">
              <img 
                src="/assets/step2-customize-design.png" 
                alt="Customize design step"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {getTranslation(language, 'step2Title')}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {getTranslation(language, 'step2Description')}
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="mb-6">
              <img 
                src="/assets/step3-download-qr.png" 
                alt="Download QR step"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {getTranslation(language, 'step3Title')}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {getTranslation(language, 'step3Description')}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200 text-lg"
          >
            <ArrowUpIcon className="w-5 h-5 mr-2" />
            {getTranslation(language, 'createQrCode')}
          </button>
        </div>
      </div>
    </section>
  );
}

