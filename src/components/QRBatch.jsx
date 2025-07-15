import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import QRCode from 'qrcode';
import JSZip from 'jszip';

export default function QRBatch() {
  const { isDark } = useTheme();
  const [batchText, setBatchText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [qrSettings, setQrSettings] = useState({
    size: 300,
    color: '#000000',
    bgColor: '#ffffff',
    errorLevel: 'M',
    margin: 2
  });

  const generateBatchQR = async () => {
    const lines = batchText.trim().split('\\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      alert('Please enter text lines for batch generation / يرجى إدخال نصوص للإنتاج المجموعي');
      return;
    }

    if (lines.length > 50) {
      alert('Maximum 50 QR codes per batch / الحد الأقصى 50 رمز QR لكل مجموعة');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      const zip = new JSZip();
      
      for (let i = 0; i < lines.length; i++) {
        const text = lines[i].trim();
        if (!text) continue;

        // Create canvas for this QR code
        const canvas = document.createElement('canvas');
        
        await QRCode.toCanvas(canvas, text, {
          width: qrSettings.size,
          margin: qrSettings.margin,
          color: {
            dark: qrSettings.color,
            light: qrSettings.bgColor
          },
          errorCorrectionLevel: qrSettings.errorLevel
        });

        // Convert to blob and add to zip
        const dataUrl = canvas.toDataURL('image/png');
        const base64Data = dataUrl.split(',')[1];
        
        // Create filename from text (sanitized)
        const filename = `qr_${i + 1}_${text.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        zip.file(filename, base64Data, { base64: true });
        
        setProgress(Math.round(((i + 1) / lines.length) * 100));
      }

      // Generate and download zip
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr_batch_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Batch generation error:', error);
      alert('Failed to generate batch QR codes / فشل في إنتاج رموز QR المجموعية');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const sampleTexts = [
    'https://example1.com',
    'https://example2.com',
    'Contact: John Doe - john@example.com',
    'WiFi: MyNetwork - Password123',
    'Event: Meeting at 2PM'
  ];

  const loadSample = () => {
    setBatchText(sampleTexts.join('\\n'));
  };

  return (
    <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        🚀 Batch QR Generator / مولد رموز QR المجموعي
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Enter text lines (one per line) / أدخل النصوص (سطر واحد لكل نص)
          </label>
          <textarea
            value={batchText}
            onChange={(e) => setBatchText(e.target.value)}
            placeholder="Line 1: https://example1.com\\nLine 2: Contact info\\nLine 3: WiFi details\\n..."
            rows="6"
            className={`w-full px-3 py-2 rounded-lg border ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
            }`}
          />
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={loadSample}
              className={`text-sm px-3 py-1 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'} transition-colors`}
            >
              Load Sample / تحميل عينة
            </button>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {batchText.trim().split('\\n').filter(line => line.trim()).length} lines / سطر
            </span>
          </div>
        </div>

        {/* Batch Settings */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Size / الحجم
            </label>
            <select
              value={qrSettings.size}
              onChange={(e) => setQrSettings(prev => ({ ...prev, size: Number(e.target.value) }))}
              className={`w-full px-2 py-1 text-sm rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option value={200}>200px</option>
              <option value={300}>300px</option>
              <option value={400}>400px</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Error Level / مستوى الخطأ
            </label>
            <select
              value={qrSettings.errorLevel}
              onChange={(e) => setQrSettings(prev => ({ ...prev, errorLevel: e.target.value }))}
              className={`w-full px-2 py-1 text-sm rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option value="L">Low</option>
              <option value="M">Medium</option>
              <option value="Q">Quartile</option>
              <option value="H">High</option>
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="space-y-2">
            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Generating... {progress}% / جاري الإنشاء... {progress}%
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onClick={generateBatchQR}
          disabled={!batchText.trim() || isGenerating}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            !batchText.trim() || isGenerating
              ? 'bg-gray-400 cursor-not-allowed text-gray-600'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transform hover:scale-[1.02]'
          }`}
        >
          {isGenerating ? 'Generating... / جاري الإنشاء...' : '📦 Generate Batch ZIP / إنشاء ملف مضغوط'}
        </button>

        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center`}>
          Maximum 50 QR codes per batch. All codes will be downloaded as a ZIP file.
          <br />
          الحد الأقصى 50 رمز QR لكل مجموعة. سيتم تحميل جميع الرموز كملف مضغوط.
        </div>
      </div>
    </div>
  );
}

