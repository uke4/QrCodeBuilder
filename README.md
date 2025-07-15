# QR Code Generator

A modern, professional QR code generator with a clean black and blue design theme. Create custom QR codes for websites, text, emails, phone numbers, SMS, and WiFi networks with advanced customization options and multi-format download support.

🔗 [Live Demo](https://qrc0de.vercel.app)

## 🎨 Design Features

- **Clean Black & Blue Theme**: Professional color scheme with black accents and blue highlights
- **Minimalist Interface**: Clean, uncluttered design inspired by modern web applications
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional Typography**: Bold headings and clear, readable text throughout

## ✨ Key Features

### 🌍 Comprehensive Multi-Language Support
- **65+ Languages**: Complete support for languages from around the world including:
  - **Major Languages**: English, Arabic, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Hindi, Turkish
  - **European Languages**: Polish, Dutch, Swedish, Danish, Norwegian, Finnish, Czech, Slovak, Hungarian, Romanian, Bulgarian, Croatian, Serbian, Slovenian, Estonian, Latvian, Lithuanian, Ukrainian, Belarusian
  - **Asian Languages**: Bengali, Tamil, Telugu, Malayalam, Kannada, Gujarati, Punjabi, Odia, Assamese, Nepali, Sinhala, Myanmar, Khmer, Lao, Thai, Vietnamese, Indonesian, Malay, Filipino
  - **African Languages**: Swahili, Zulu, Afrikaans
  - **Other Languages**: Hebrew, Persian, Urdu, Georgian, Armenian, Albanian, Basque, Catalan, Galician, Welsh, Irish, Maltese, Icelandic, Faroese, Greenlandic, Esperanto, Latin
- **RTL Support**: Full right-to-left text support for Arabic, Hebrew, Persian, and Urdu
- **Dynamic Translation**: Instant language switching with persistent preferences
- **Global Accessibility**: Reach users worldwide with localized content

### 📱 Advanced QR Code Types
- **Website URLs**: Generate QR codes for any website or web page
- **Plain Text**: Create QR codes containing any text content
- **Email Addresses**: Direct email contact QR codes
- **Phone Numbers**: Clickable phone number QR codes
- **SMS Messages**: Pre-filled SMS message QR codes with custom text
- **WiFi Networks**: Advanced WiFi sharing QR codes with security options:
  - **Security Types**: Open (no password), WEP, WPA/WPA2, WPA3
  - **Network Name**: Custom SSID input
  - **Password Protection**: Secure password field for encrypted networks

### 🎨 Advanced Customization Options
- **Size Control**: Choose from Small, Medium, Large, or XL sizes
- **Color Customization**: Full color picker for QR code and background colors
- **Error Correction**: Adjustable error correction levels (Low, Medium, Quartile, High)
- **Margin Control**: Precise margin adjustment with visual slider
- **Real-time Preview**: See changes instantly as you customize

### 📥 Multi-Format Download Support
- **PNG Format**: High-quality raster images perfect for web and print
- **SVG Format**: Scalable vector graphics for infinite resolution
- **JPG Format**: Compressed format for smaller file sizes
- **Instant Download**: One-click download in your preferred format
- **Quality Optimization**: Optimized output for each format type

### 📚 Educational Content
- **Step-by-Step Guide**: Visual tutorial on how to create QR codes
- **Professional Illustrations**: Custom-designed images for each step
- **Clear Instructions**: Easy-to-follow explanations in multiple languages
- **Quick Access**: "Create QR Code" button to jump back to the generator

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/qr-code-generator.git
   cd qr-code-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS for responsive design
- **QR Generation**: qrcode library for high-quality QR code generation
- **Icons**: Custom SVG icons for professional appearance
- **Internationalization**: Custom translation system with 65+ languages
- **Build Tool**: Vite for fast development and optimized builds

## 📁 Project Structure

```
qr-code-generator/
├── public/
│   └── assets/
│       ├── step1-choose-content.png
│       ├── step2-customize-design.png
│       ├── step3-download-qr.png
│       └── qrgen.png
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   └── Icons.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HowToSection.jsx
│   │   ├── LanguageSelector.jsx
│   │   └── QRGenerator.jsx
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── i18n/
│   │   └── translations.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Features in Detail

### QR Code Generation
- High-quality QR code generation with customizable parameters
- Support for various data types with automatic formatting
- Real-time preview and instant generation
- Multi-format download support (PNG, SVG, JPG)

### WiFi QR Codes
- **Network Name Input**: Enter custom SSID for your WiFi network
- **Security Type Selection**: Choose from Open, WEP, WPA/WPA2, or WPA3
- **Password Protection**: Secure password input for encrypted networks
- **Automatic Format**: Generates proper WiFi QR code format for easy connection

### SMS QR Codes
- **Phone Number Input**: Enter recipient phone number
- **Custom Message**: Add pre-filled message text
- **Universal Compatibility**: Works with all SMS-capable devices

### User Interface
- **Black & Blue Color Scheme**: Professional appearance with excellent contrast
- **Step-by-Step Process**: Clear 3-step workflow (Content → Design → Download)
- **Visual Feedback**: Immediate response to user interactions
- **Accessibility**: Keyboard navigation and screen reader support

### Language System
- **Comprehensive Coverage**: 65+ languages including major world languages
- **Regional Variants**: Support for different regional versions of languages
- **Cultural Adaptation**: Proper text direction and cultural considerations
- **Persistent Settings**: Language preference saved in browser storage

### Educational Content
- **Visual Learning**: Custom illustrations for each step of the process
- **Multi-language Instructions**: All educational content available in supported languages
- **Progressive Disclosure**: Information presented when needed
- **Quick Navigation**: Easy return to generator from educational content

## 🌐 Supported Languages

The application supports 65+ languages including:

**Major Languages**: English, Arabic, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Hindi, Turkish

**European Languages**: Polish, Dutch, Swedish, Danish, Norwegian, Finnish, Czech, Slovak, Hungarian, Romanian, Bulgarian, Croatian, Serbian, Slovenian, Estonian, Latvian, Lithuanian, Ukrainian, Belarusian

**Asian Languages**: Bengali, Tamil, Telugu, Malayalam, Kannada, Gujarati, Punjabi, Odia, Assamese, Nepali, Sinhala, Myanmar, Khmer, Lao, Thai, Vietnamese, Indonesian, Malay, Filipino

**African Languages**: Swahili, Zulu, Afrikaans

**Other Languages**: Hebrew, Persian, Urdu, Georgian, Armenian, Albanian, Basque, Catalan, Galician, Welsh, Irish, Maltese, Icelandic, Faroese, Greenlandic, Esperanto, Latin

## 🎨 Design Philosophy

This QR code generator follows a minimalist design philosophy with:

- **Professional Aesthetics**: Clean black and blue color scheme
- **User-Centered Design**: Intuitive workflow and clear visual hierarchy
- **Accessibility First**: High contrast ratios and keyboard navigation
- **Mobile Responsive**: Optimized for all screen sizes
- **Performance Focused**: Fast loading and smooth interactions

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ by Abduh

- Portfolio: [https://1bduh.vercel.app](https://1bduh.vercel.app)
- GitHub: [@uke4](https://github.com/uke4)
- Instagram: [@abduhtheone](https://instagram.com/abduhtheone)

## 🙏 Acknowledgments

- QR code generation powered by the `qrcode` library
- Icons and design inspired by modern web design principles
- Multi-language support for global accessibility
- Built with React and Tailwind CSS for optimal performance

---

**Made with ❤️ for the global community**

