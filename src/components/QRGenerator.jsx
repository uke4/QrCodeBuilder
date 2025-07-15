import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../i18n/translations';
import { 
  GlobeIcon, 
  DocumentTextIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon, 
  WifiIcon,
  ArrowDownTrayIcon
} from '../components/icons/Icons';

export default function QRGenerator() {
  const { language } = useLanguage();
  const [activeType, setActiveType] = useState('website');
  const [qrData, setQrData] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [size, setSize] = useState('medium');
  const [errorLevel, setErrorLevel] = useState('medium');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [margin, setMargin] = useState(2);
  const [downloadFormat, setDownloadFormat] = useState('png');
  
  // WiFi specific states
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiSecurity, setWifiSecurity] = useState('WPA');
  
  // SMS specific states
  const [smsNumber, setSmsNumber] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  
  const canvasRef = useRef(null);

  const qrTypes = [
    { id: 'website', icon: GlobeIcon, label: getTranslation(language, 'website') },
    { id: 'text', icon: DocumentTextIcon, label: getTranslation(language, 'text') },
    { id: 'email', icon: EnvelopeIcon, label: getTranslation(language, 'email') },
    { id: 'phone', icon: PhoneIcon, label: getTranslation(language, 'phone') },
    { id: 'sms', icon: ChatBubbleLeftRightIcon, label: getTranslation(language, 'sms') },
    { id: 'wifi', icon: WifiIcon, label: getTranslation(language, 'wifi') }
  ];

  const sizeMap = {
    small: 200,
    medium: 300,
    large: 400,
    xl: 500
  };

  const errorLevelMap = {
    low: 'L',
    medium: 'M',
    quartile: 'Q',
    high: 'H'
  };

  const generateQRData = () => {
    switch (activeType) {
      case 'website':
        return qrData;
      case 'text':
        return qrData;
      case 'email':
        return `mailto:${qrData}`;
      case 'phone':
        return `tel:${qrData}`;
      case 'sms':
        return `sms:${smsNumber}${smsMessage ? `?body=${encodeURIComponent(smsMessage)}` : ''}`;
      case 'wifi':
        return `WIFI:T:${wifiSecurity};S:${wifiName};P:${wifiPassword};H:false;;`;
      default:
        return qrData;
    }
  };

  const generateQR = async () => {
    const data = generateQRData();
    if (!data) return;

    try {
      const qrDataURL = await QRCode.toDataURL(data, {
        width: sizeMap[size],
        margin: margin,
        color: {
          dark: qrColor,
          light: bgColor
        },
        errorCorrectionLevel: errorLevelMap[errorLevel]
      });
      setQrCode(qrDataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQR = async () => {
    const data = generateQRData();
    if (!data) return;

    try {
      let dataURL;
      
      if (downloadFormat === 'svg') {
        const svgString = await QRCode.toString(data, {
          type: 'svg',
          width: sizeMap[size],
          margin: margin,
          color: {
            dark: qrColor,
            light: bgColor
          },
          errorCorrectionLevel: errorLevelMap[errorLevel]
        });
        
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        dataURL = URL.createObjectURL(blob);
      } else {
        // For PNG and JPG
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, data, {
          width: sizeMap[size],
          margin: margin,
          color: {
            dark: qrColor,
            light: bgColor
          },
          errorCorrectionLevel: errorLevelMap[errorLevel]
        });
        
        if (downloadFormat === 'jpg') {
          dataURL = canvas.toDataURL('image/jpeg', 0.9);
        } else {
          dataURL = canvas.toDataURL('image/png');
        }
      }

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `qrcode.${downloadFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      if (downloadFormat === 'svg') {
        URL.revokeObjectURL(dataURL);
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  const renderInputField = () => {
    switch (activeType) {
      case 'website':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-600">
              {getTranslation(language, 'enterWebsite')}
            </label>
            <input
              type="url"
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              placeholder={getTranslation(language, 'websitePlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        );
      case 'text':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-600">
              {getTranslation(language, 'enterText')}
            </label>
            <textarea
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              placeholder={getTranslation(language, 'textPlaceholder')}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>
        );
      case 'email':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-600">
              {getTranslation(language, 'enterEmail')}
            </label>
            <input
              type="email"
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              placeholder={getTranslation(language, 'emailPlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        );
      case 'phone':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-600">
              {getTranslation(language, 'enterPhone')}
            </label>
            <input
              type="tel"
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              placeholder={getTranslation(language, 'phonePlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        );
      case 'sms':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-blue-600">
                {getTranslation(language, 'enterSmsNumber')}
              </label>
              <input
                type="tel"
                value={smsNumber}
                onChange={(e) => setSmsNumber(e.target.value)}
                placeholder={getTranslation(language, 'smsNumberPlaceholder')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-blue-600">
                {getTranslation(language, 'enterSmsMessage')}
              </label>
              <textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                placeholder={getTranslation(language, 'smsMessagePlaceholder')}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>
          </div>
        );
      case 'wifi':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-blue-600">
                {getTranslation(language, 'enterWifiName')}
              </label>
              <input
                type="text"
                value={wifiName}
                onChange={(e) => setWifiName(e.target.value)}
                placeholder={getTranslation(language, 'wifiNamePlaceholder')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-blue-600">
                {getTranslation(language, 'wifiSecurity')}
              </label>
              <select
                value={wifiSecurity}
                onChange={(e) => setWifiSecurity(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="nopass">{getTranslation(language, 'wifiSecurityOpen')}</option>
                <option value="WEP">{getTranslation(language, 'wifiSecurityWep')}</option>
                <option value="WPA">{getTranslation(language, 'wifiSecurityWpa')}</option>
                <option value="WPA3">{getTranslation(language, 'wifiSecurityWpa3')}</option>
              </select>
            </div>
            {wifiSecurity !== 'nopass' && (
              <div className="space-y-2">
                <label className="block text-sm font-bold text-blue-600">
                  {getTranslation(language, 'enterWifiPassword')}
                </label>
                <input
                  type="password"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder={getTranslation(language, 'wifiPasswordPlaceholder')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* QR Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {qrTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                activeType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <IconComponent className={`w-8 h-8 mx-auto mb-2 ${
                activeType === type.id ? 'text-blue-600' : 'text-gray-600'
              }`} />
              <span className={`text-sm font-medium ${
                activeType === type.id ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {type.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Input and Design */}
        <div className="space-y-8">
          {/* Step 1: Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                {getTranslation(language, 'step1')}
              </h3>
            </div>
            {renderInputField()}
          </div>

          {/* Step 2: Design */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                {getTranslation(language, 'step2')}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-blue-600">
                  {getTranslation(language, 'size')}
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="small">{getTranslation(language, 'small')}</option>
                  <option value="medium">{getTranslation(language, 'medium')}</option>
                  <option value="large">{getTranslation(language, 'large')}</option>
                  <option value="xl">{getTranslation(language, 'xl')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-blue-600">
                  {getTranslation(language, 'errorLevel')}
                </label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="low">{getTranslation(language, 'low')}</option>
                  <option value="medium">{getTranslation(language, 'medium')}</option>
                  <option value="quartile">{getTranslation(language, 'quartile')}</option>
                  <option value="high">{getTranslation(language, 'high')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-blue-600">
                  {getTranslation(language, 'qrColor')}
                </label>
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-full h-10 border-2 border-gray-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-blue-600">
                  {getTranslation(language, 'background')}
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 border-2 border-gray-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label className="block text-sm font-bold text-blue-600">
                {getTranslation(language, 'margin')}: {margin}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <button
              onClick={generateQR}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {getTranslation(language, 'generateQr')}
            </button>
          </div>
        </div>

        {/* Right Column - QR Code Display and Download */}
        <div className="space-y-8">
          {/* Step 3: Download */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                {getTranslation(language, 'step3')}
              </h3>
            </div>

            {qrCode ? (
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-gray-50 rounded-lg">
                  <img src={qrCode} alt="QR Code" className="max-w-full h-auto" />
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-blue-600">
                      {getTranslation(language, 'downloadFormat')}
                    </label>
                    <select
                      value={downloadFormat}
                      onChange={(e) => setDownloadFormat(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="png">PNG</option>
                      <option value="svg">SVG</option>
                      <option value="jpg">JPG</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={downloadQR}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                    {getTranslation(language, 'downloadQr')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ArrowDownTrayIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="font-medium">{getTranslation(language, 'generateQr')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

