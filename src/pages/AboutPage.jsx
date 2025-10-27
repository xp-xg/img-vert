import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLogo from '../components/AppLogo';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <AppLogo />
            <p className="text-gray-600 dark:text-gray-400 mt-2">{t('description')}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <select 
              value={localStorage.getItem('language') || 'en'} 
              onChange={(e) => {
                localStorage.setItem('language', e.target.value);
                window.location.reload();
              }}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-3 py-2"
            >
              <option value="en">{t('english')}</option>
              <option value="es">{t('spanish')}</option>
              <option value="fr">{t('french')}</option>
              <option value="de">{t('german')}</option>
              <option value="zh">{t('chinese')}</option>
              <option value="ja">{t('japanese')}</option>
            </select>
            
            {/* Theme Toggle */}
            <button
              onClick={() => {
                document.documentElement.classList.toggle('dark');
                localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
              }}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 flex items-center gap-2"
            >
              {document.documentElement.classList.contains('dark') ? t('lightMode') : t('darkMode')}
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto">
          <section className={`rounded-xl p-6 mb-8 ${localStorage.getItem('darkMode') === 'true' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">{t('about')}</h1>
              <h2 className="text-2xl font-bold mb-4">{t('aboutImageConverter')}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {t('aboutImageConverterDesc')}
              </p>
            </div>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3">{t('mission')}</h3>
                <p className="mb-4">{t('missionDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3">{t('features')}</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>{t('feature1')}</li>
                  <li>{t('feature2')}</li>
                  <li>{t('feature3')}</li>
                  <li>{t('feature4')}</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3">{t('whyUseOurService')}</h3>
                <p className="mb-4">{t('whyUseOurServiceDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3">{t('team')}</h3>
                <p className="mb-4">{t('teamDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-3">{t('contactInfo')}</h3>
                <p className="mb-2">{t('contactInfoDesc')}</p>
                <a href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
                  {t('contactFormLink')}
                </a>
                <p className="mt-2">{t('yearFounded')}: {new Date().getFullYear()}</p>
              </section>
            </div>
          </section>
        </main>

        <footer className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <a href="/about" className="hover:underline">{t('about')}</a>
            <a href="/privacy" className="hover:underline">{t('privacyPolicy')}</a>
            <a href="/disclaimer" className="hover:underline">{t('disclaimer')}</a>
            <a href="/terms" className="hover:underline">{t('termsOfService')}</a>
            <a href="/contact" className="hover:underline">{t('contact')}</a>
            <a href="/help" className="hover:underline">{t('help')}</a>
          </div>
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;