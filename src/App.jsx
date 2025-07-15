import Header from './components/Header';
import QRGenerator from './components/QRGenerator';
import HowToSection from './components/HowToSection';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8">
          <QRGenerator />
          <div className="mt-16">
            <HowToSection />
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;

