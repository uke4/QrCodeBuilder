import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function QRHistory({ onSelectFromHistory }) {
  const { isDark } = useTheme();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('qr_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (text, qrCode) => {
    const newItem = {
      id: Date.now(),
      text: text.substring(0, 100),
      fullText: text,
      qrCode,
      timestamp: new Date().toISOString(),
      type: detectType(text)
    };

    const updatedHistory = [newItem, ...history.slice(0, 19)]; // Keep last 20 items
    setHistory(updatedHistory);
    localStorage.setItem('qr_history', JSON.stringify(updatedHistory));
  };

  const detectType = (text) => {
    if (text.startsWith('http')) return { icon: '🌐', label: 'URL' };
    if (text.startsWith('mailto:')) return { icon: '📧', label: 'Email' };
    if (text.startsWith('tel:')) return { icon: '📞', label: 'Phone' };
    if (text.startsWith('WIFI:')) return { icon: '📶', label: 'WiFi' };
    if (text.startsWith('SMSTO:')) return { icon: '💬', label: 'SMS' };
    if (text.startsWith('geo:')) return { icon: '📍', label: 'Location' };
    if (text.includes('BEGIN:VCARD')) return { icon: '👤', label: 'Contact' };
    if (text.includes('BEGIN:VEVENT')) return { icon: '📅', label: 'Event' };
    return { icon: '📝', label: 'Text' };
  };

  const clearHistory = () => {
    if (confirm('Clear all history? / مسح جميع السجلات؟')) {
      setHistory([]);
      localStorage.removeItem('qr_history');
    }
  };

  const deleteItem = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('qr_history', JSON.stringify(updatedHistory));
  };

  const downloadFromHistory = (item) => {
    const link = document.createElement('a');
    link.href = item.qrCode;
    link.download = `qr-${item.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now / الآن';
    if (diffMins < 60) return `${diffMins}m ago / منذ ${diffMins} د`;
    if (diffHours < 24) return `${diffHours}h ago / منذ ${diffHours} س`;
    if (diffDays < 7) return `${diffDays}d ago / منذ ${diffDays} ي`;
    return date.toLocaleDateString();
  };

  // Expose addToHistory function to parent component
  useEffect(() => {
    window.addToQRHistory = addToHistory;
    return () => {
      delete window.addToQRHistory;
    };
  }, [history]);

  return (
    <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          📚 QR History / سجل رموز QR
        </h3>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className={`text-sm px-3 py-1 rounded-lg ${isDark ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-100 text-red-600 hover:bg-red-200'} transition-colors`}
          >
            Clear / مسح
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="text-4xl mb-2">📝</div>
          <div>No QR codes generated yet</div>
          <div className="text-sm">لم يتم إنشاء أي رموز QR بعد</div>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01] ${
                isDark 
                  ? 'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{item.type.icon}</span>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.type.label}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                  <div className={`text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.text}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-3">
                  <button
                    onClick={() => onSelectFromHistory(item.fullText)}
                    className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-colors`}
                    title="Use again / استخدام مرة أخرى"
                  >
                    🔄
                  </button>
                  <button
                    onClick={() => downloadFromHistory(item)}
                    className={`p-2 rounded-lg ${isDark ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' : 'bg-green-100 text-green-600 hover:bg-green-200'} transition-colors`}
                    title="Download / تحميل"
                  >
                    📥
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className={`p-2 rounded-lg ${isDark ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-100 text-red-600 hover:bg-red-200'} transition-colors`}
                    title="Delete / حذف"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

