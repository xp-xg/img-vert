import React from 'react';
import { useTranslation } from 'react-i18next';
import AppLogo from '../components/AppLogo';

const TermsOfServicePage = () => {
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
              <h1 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">{t('termsOfServiceTitle')}</h1>
            </div>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('acceptanceOfTerms')}</h3>
                <p className="mb-4">{t('acceptanceOfTermsDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('useOfService')}</h3>
                <p className="mb-4">{t('useOfServiceDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('prohibitedUses')}</h3>
                <p className="mb-4">{t('prohibitedUsesDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('noWarranties')}</h3>
                <p className="mb-4">{t('noWarrantiesDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('limitationOfLiability')}</h3>
                <p className="mb-4">{t('limitationOfLiabilityDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('intellectualProperty')}</h3>
                <p className="mb-4">{t('intellectualPropertyDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('changesTerms')}</h3>
                <p className="mb-4">{t('changesTermsDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('governingLaw')}</h3>
                <p className="mb-4">{t('governingLawDesc')}</p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">{t('termsContactInfo')}</h3>
                <p>{t('termsContactInfoDesc')}</p>
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

export default TermsOfServicePage;