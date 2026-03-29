import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLogo from '../components/AppLogo';

const DisclaimerPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <div>
            <AppLogo />
            <p className="text-gray-600 dark:text-gray-400 mt-2">{t('description')}</p>
          </div>
          
        </header>

        <main className="max-w-4xl mx-auto">
          <section className={`rounded-xl p-6 mb-8 ${localStorage.getItem('darkMode') === 'true' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">"Disclaimer"</h1>
            </div>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('disclaimerGeneral')}</h3>
                <p className="mb-4">{t('disclaimerGeneralDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('disclaimerContent')}</h3>
                <p className="mb-4">{t('disclaimerContentDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('disclaimerLinks')}</h3>
                <p className="mb-4">{t('disclaimerLinksDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('disclaimerLimitation')}</h3>
                <p className="mb-4">{t('disclaimerLimitationDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('disclaimerAccuracy')}</h3>
                <p className="mb-4">{t('disclaimerAccuracyDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('lastUpdated')}</h3>
                <p>{t('lastUpdated', { date: new Date().toLocaleDateString() })}</p>
              </section>
            </div>
          </section>
        </main>

        <footer className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <a href="/about" className="hover:underline">"About"</a>
            <a href="/privacy" className="hover:underline">"Privacy Policy"</a>
            <a href="/disclaimer" className="hover:underline">"Disclaimer"</a>
            <a href="/terms" className="hover:underline">"Terms of Service"</a>
            <a href="/contact" className="hover:underline">"Contact"</a>
            <a href="/help" className="hover:underline">"Help"</a>
          </div>
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        </footer>
      </div>
    </div>
  );
};

export default DisclaimerPage;