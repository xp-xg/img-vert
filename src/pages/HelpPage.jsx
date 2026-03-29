import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLogo from '../components/AppLogo';

const HelpPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <AppLogo />
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t('description')}</p>
        </header>

        <main className="max-w-4xl mx-auto">
          <section className={`rounded-xl p-6 mb-8 ${localStorage.getItem('darkMode') === 'true' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">{t('helpTitle')}</h1>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3">{t('gettingStarted')}</h3>
                <ol className="list-decimal list-inside space-y-2 mb-4">
                  <li>{t('step1')}</li>
                  <li>{t('step2')}</li>
                  <li>{t('step3')}</li>
                  <li>{t('step4')}</li>
                  <li>{t('step5')}</li>
                </ol>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">{t('supportedFormatsTitle')}</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>{t('inputFormats')}</li>
                  <li>{t('outputFormats')}</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">{t('imageQuality')}</h3>
                <p className="mb-2">{t('imageQualityDesc1')}</p>
                <p>{t('imageQualityDesc2')}</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">{t('troubleshooting')}</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>{t('troubleshootingItem1')}</li>
                  <li>{t('troubleshootingItem2')}</li>
                  <li>{t('troubleshootingItem3')}</li>
                  <li>{t('troubleshootingItem4')}</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">{t('privacyInfo')}</h3>
                <p className="mb-2">{t('privacyInfoDesc1')}</p>
                <p>{t('privacyInfoDesc2')}</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">{t('needMoreHelp')}</h3>
                <p>{t('needMoreHelpDesc')}</p>
              </section>
            </div>
          </section>
        </main>

        <footer className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <a href="/about" className="hover:underline">About</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/disclaimer" className="hover:underline">Disclaimer</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/help" className="hover:underline">Help</a>
          </div>
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        </footer>
      </div>
    </div>
  );
};

export default HelpPage;