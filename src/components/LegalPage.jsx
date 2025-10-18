import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LegalPage = ({ type }) => {
  const { t } = useTranslation();
  const [darkMode] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Define content based on translation keys
  const policyContent = {
    privacy: {
      title: t('privacyPolicyTitle'),
      content: [
        {
          heading: t('informationWeCollect'),
          text: t('informationWeCollectDesc')
        },
        {
          heading: t('dataSecurity'),
          text: t('dataSecurityDesc')
        },
        {
          heading: t('cookies'),
          text: t('cookiesDesc')
        },
        {
          heading: t('thirdPartyServices'),
          text: t('thirdPartyServicesDesc')
        },
        {
          heading: t('changesToPolicy'),
          text: t('changesToPolicyDesc')
        },
        {
          heading: t('childrenPrivacy'),
          text: t('childrenPrivacyDesc')
        },
        {
          heading: t('privacyPolicyContact'),
          text: t('privacyPolicyContactDesc')
        }
      ]
    },
    terms: {
      title: t('termsOfServiceTitle'),
      content: [
        {
          heading: t('acceptanceOfTerms'),
          text: t('acceptanceOfTermsDesc')
        },
        {
          heading: t('howWeUseInfo'),
          text: t('howWeUseInfoDesc')
        },
        {
          heading: t('useOfService'),
          text: t('useOfServiceDesc')
        },
        {
          heading: t('prohibitedUses'),
          text: t('prohibitedUsesDesc')
        },
        {
          heading: t('noWarranties'),
          text: t('noWarrantiesDesc')
        },
        {
          heading: t('limitationOfLiability'),
          text: t('limitationOfLiabilityDesc')
        },
        {
          heading: t('intellectualProperty'),
          text: t('intellectualPropertyDesc')
        },
        {
          heading: t('changesTerms'),
          text: t('changesTermsDesc')
        },
        {
          heading: t('governingLaw'),
          text: t('governingLawDesc')
        },
        {
          heading: t('termsContactInfo'),
          text: t('termsContactInfoDesc')
        }
      ]
    }
  };

  const currentPolicy = policyContent[type];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">{currentPolicy.title}</h1>
        
        <div className="space-y-6">
          {currentPolicy.content.map((section, index) => (
            <div key={index} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
              <p className="text-gray-700 dark:text-gray-300">{section.text}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p>{t('lastUpdated', { date: new Date().toLocaleDateString() })}</p>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;