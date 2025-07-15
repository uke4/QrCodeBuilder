import { useTheme } from '../context/ThemeContext';

export default function About() {
  const { isDark } = useTheme();

  const features = [
    {
      icon: '🎨',
      title: 'Custom Colors / ألوان مخصصة',
      description: 'Choose any color combination for your QR codes / اختر أي مجموعة ألوان لرموز QR الخاصة بك'
    },
    {
      icon: '📏',
      title: 'Multiple Sizes / أحجام متعددة',
      description: 'Generate QR codes in various sizes from 200px to 500px / إنشاء رموز QR بأحجام مختلفة من 200 إلى 500 بكسل'
    },
    {
      icon: '🛡️',
      title: 'Error Correction / تصحيح الأخطاء',
      description: 'Advanced error correction levels for better scanning / مستويات تصحيح أخطاء متقدمة لمسح أفضل'
    },
    {
      icon: '⚡',
      title: 'Instant Generation / إنشاء فوري',
      description: 'Generate QR codes instantly with real-time preview / إنشاء رموز QR فورياً مع معاينة مباشرة'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly / متوافق مع الجوال',
      description: 'Fully responsive design that works on all devices / تصميم متجاوب بالكامل يعمل على جميع الأجهزة'
    },
    {
      icon: '🌙',
      title: 'Dark Mode / الوضع المظلم',
      description: 'Beautiful dark and light themes for comfortable use / ثيمات مظلمة وفاتحة جميلة للاستخدام المريح'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto p-8 mt-16">
      <div className={`p-8 rounded-3xl shadow-2xl backdrop-blur-sm border ${
        isDark 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      } animate-fade-in`}>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            About QR Codes / حول رموز QR
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            QR (Quick Response) codes are two-dimensional barcodes that can store various types of information. 
            They were invented in 1994 by Denso Wave, a Japanese automotive company.
          </p>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            رموز QR (الاستجابة السريعة) هي رموز شريطية ثنائية الأبعاد يمكنها تخزين أنواع مختلفة من المعلومات. 
            تم اختراعها في عام 1994 من قبل شركة Denso Wave اليابانية للسيارات.
          </p>
        </div>

        {/* How QR Codes Work */}
        <div className="mb-12">
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            How QR Codes Work / كيف تعمل رموز QR
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <h4 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                1. Data Encoding / ترميز البيانات
              </h4>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Information is converted into a pattern of black and white squares using Reed-Solomon error correction.
                <br /><br />
                يتم تحويل المعلومات إلى نمط من المربعات السوداء والبيضاء باستخدام تصحيح أخطاء Reed-Solomon.
              </p>
            </div>
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <h4 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                2. Pattern Recognition / التعرف على النمط
              </h4>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Three corner squares help scanners identify and orient the QR code correctly.
                <br /><br />
                ثلاثة مربعات في الزوايا تساعد الماسحات الضوئية على تحديد وتوجيه رمز QR بشكل صحيح.
              </p>
            </div>
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <h4 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                3. Error Correction / تصحيح الأخطاء
              </h4>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                QR codes can be read even if up to 30% of the code is damaged or obscured.
                <br /><br />
                يمكن قراءة رموز QR حتى لو كان 30% من الرمز تالفاً أو مخفياً.
              </p>
            </div>
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <h4 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                4. Data Retrieval / استرجاع البيانات
              </h4>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Scanners decode the pattern and extract the original information instantly.
                <br /><br />
                تقوم الماسحات الضوئية بفك تشفير النمط واستخراج المعلومات الأصلية فورياً.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Our Features / ميزاتنا
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                  isDark ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {feature.title}
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code Types */}
        <div>
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            QR Code Types / أنواع رموز QR
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                📱 Common Uses / الاستخدامات الشائعة
              </h4>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Website URLs / روابط المواقع</li>
                <li>• Contact Information / معلومات الاتصال</li>
                <li>• WiFi Credentials / بيانات اعتماد WiFi</li>
                <li>• Social Media Profiles / ملفات وسائل التواصل الاجتماعي</li>
                <li>• Payment Information / معلومات الدفع</li>
                <li>• Event Details / تفاصيل الأحداث</li>
              </ul>
            </div>
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                🔧 Technical Specs / المواصفات التقنية
              </h4>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Maximum capacity: 4,296 characters / السعة القصوى: 4,296 حرف</li>
                <li>• Error correction: L, M, Q, H levels / تصحيح الأخطاء: مستويات L, M, Q, H</li>
                <li>• Versions: 1-40 (21x21 to 177x177) / الإصدارات: 1-40</li>
                <li>• Fast scanning from any angle / مسح سريع من أي زاوية</li>
                <li>• Works in low light conditions / يعمل في ظروف الإضاءة المنخفضة</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

