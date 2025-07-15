import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function QRTemplates({ onSelectTemplate }) {
  const { isDark } = useTheme();

  const templates = [
    {
      id: 'wifi',
      name: 'WiFi Network / شبكة WiFi',
      icon: '📶',
      description: 'Share WiFi credentials / مشاركة بيانات WiFi',
      format: 'WIFI:T:WPA;S:NetworkName;P:Password;;',
      fields: [
        { label: 'Network Name / اسم الشبكة', key: 'ssid', placeholder: 'MyWiFi' },
        { label: 'Password / كلمة المرور', key: 'password', placeholder: 'mypassword', type: 'password' },
        { label: 'Security / الأمان', key: 'security', type: 'select', options: ['WPA', 'WEP', 'nopass'] }
      ]
    },
    {
      id: 'contact',
      name: 'Contact Card / بطاقة اتصال',
      icon: '👤',
      description: 'Share contact information / مشاركة معلومات الاتصال',
      format: 'BEGIN:VCARD\\nVERSION:3.0\\nFN:{name}\\nORG:{org}\\nTEL:{phone}\\nEMAIL:{email}\\nURL:{website}\\nEND:VCARD',
      fields: [
        { label: 'Full Name / الاسم الكامل', key: 'name', placeholder: 'John Doe' },
        { label: 'Organization / المؤسسة', key: 'org', placeholder: 'Company Inc.' },
        { label: 'Phone / الهاتف', key: 'phone', placeholder: '+1234567890' },
        { label: 'Email / البريد الإلكتروني', key: 'email', placeholder: 'john@example.com', type: 'email' },
        { label: 'Website / الموقع', key: 'website', placeholder: 'https://example.com' }
      ]
    },
    {
      id: 'sms',
      name: 'SMS Message / رسالة نصية',
      icon: '💬',
      description: 'Send pre-written SMS / إرسال رسالة نصية مكتوبة مسبقاً',
      format: 'SMSTO:{phone}:{message}',
      fields: [
        { label: 'Phone Number / رقم الهاتف', key: 'phone', placeholder: '+1234567890' },
        { label: 'Message / الرسالة', key: 'message', placeholder: 'Hello!', type: 'textarea' }
      ]
    },
    {
      id: 'email',
      name: 'Email / بريد إلكتروني',
      icon: '📧',
      description: 'Compose email / إنشاء بريد إلكتروني',
      format: 'mailto:{email}?subject={subject}&body={body}',
      fields: [
        { label: 'Email Address / عنوان البريد', key: 'email', placeholder: 'someone@example.com', type: 'email' },
        { label: 'Subject / الموضوع', key: 'subject', placeholder: 'Hello' },
        { label: 'Message / الرسالة', key: 'body', placeholder: 'Your message here...', type: 'textarea' }
      ]
    },
    {
      id: 'location',
      name: 'Location / الموقع',
      icon: '📍',
      description: 'Share GPS coordinates / مشاركة إحداثيات GPS',
      format: 'geo:{lat},{lng}',
      fields: [
        { label: 'Latitude / خط العرض', key: 'lat', placeholder: '40.7128', type: 'number' },
        { label: 'Longitude / خط الطول', key: 'lng', placeholder: '-74.0060', type: 'number' }
      ]
    },
    {
      id: 'event',
      name: 'Calendar Event / حدث تقويم',
      icon: '📅',
      description: 'Create calendar event / إنشاء حدث تقويم',
      format: 'BEGIN:VEVENT\\nSUMMARY:{title}\\nDTSTART:{start}\\nDTEND:{end}\\nLOCATION:{location}\\nDESCRIPTION:{description}\\nEND:VEVENT',
      fields: [
        { label: 'Event Title / عنوان الحدث', key: 'title', placeholder: 'Meeting' },
        { label: 'Start Date / تاريخ البداية', key: 'start', type: 'datetime-local' },
        { label: 'End Date / تاريخ النهاية', key: 'end', type: 'datetime-local' },
        { label: 'Location / الموقع', key: 'location', placeholder: 'Conference Room' },
        { label: 'Description / الوصف', key: 'description', placeholder: 'Meeting details...', type: 'textarea' }
      ]
    }
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setFormData({});
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const generateFromTemplate = () => {
    if (!selectedTemplate) return;

    let result = selectedTemplate.format;
    
    // Replace placeholders with actual values
    Object.keys(formData).forEach(key => {
      const value = formData[key] || '';
      result = result.replace(new RegExp(`{${key}}`, 'g'), value);
    });

    // Clean up any remaining placeholders
    result = result.replace(/{[^}]+}/g, '');
    
    onSelectTemplate(result);
  };

  return (
    <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        QR Templates / قوالب QR
      </h3>
      
      {!selectedTemplate ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`p-4 rounded-xl text-center transition-all duration-200 hover:scale-[1.02] ${
                isDark 
                  ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">{template.icon}</div>
              <div className="font-medium text-sm">{template.name}</div>
              <div className="text-xs opacity-70 mt-1">{template.description}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {selectedTemplate.icon} {selectedTemplate.name}
            </h4>
            <button
              onClick={() => setSelectedTemplate(null)}
              className={`text-sm px-3 py-1 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}
            >
              Back / رجوع
            </button>
          </div>
          
          <div className="space-y-3">
            {selectedTemplate.fields.map((field) => (
              <div key={field.key}>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={formData[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  >
                    <option value="">Select / اختر</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows="2"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                    }`}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={generateFromTemplate}
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-300"
          >
            Use Template / استخدام القالب
          </button>
        </div>
      )}
    </div>
  );
}

