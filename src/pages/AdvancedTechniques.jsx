import React from 'react';
import { useTranslation } from 'react-i18next';

const AdvancedTechniques = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('advancedImageTechniques')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('advancedImageTechniquesDesc')}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('colorManagement')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('colorProfiles')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('colorProfilesDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('srgbProfile')}</li>
                <li>{t('adobeRgbProfile')}</li>
                <li>{t('prophotoRgbProfile')}</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('gammaCorrection')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('gammaCorrectionDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('gammaCorrectionTip1')}</li>
                <li>{t('gammaCorrectionTip2')}</li>
                <li>{t('gammaCorrectionTip3')}</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('colorManagementBestPractices')}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('colorPractice1')}</li>
              <li>{t('colorPractice2')}</li>
              <li>{t('colorPractice3')}</li>
              <li>{t('colorPractice4')}</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('resolutionAndDpi')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('screenResolution')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('screenResolutionDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('screenResolutionTip1')}</li>
                <li>{t('screenResolutionTip2')}</li>
                <li>{t('screenResolutionTip3')}</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('printResolution')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('printResolutionDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('printResolutionTip1')}</li>
                <li>{t('printResolutionTip2')}</li>
                <li>{t('printResolutionTip3')}</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('dpiBestPractices')}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('dpiPractice1')}</li>
              <li>{t('dpiPractice2')}</li>
              <li>{t('dpiPractice3')}</li>
              <li>{t('dpiPractice4')}</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('noiseReduction')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('typesOfNoise')}
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('luminanceNoise')}</li>
                <li>{t('chrominanceNoise')}</li>
                <li>{t('saltPepperNoise')}</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('noiseReductionMethods')}
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('medianFilter')}</li>
                <li>{t('gaussianBlur')}</li>
                <li>{t('waveletDenoising')}</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('aiDenoising')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('aiDenoisingDesc')}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('sharpeningTechniques')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('unsharpMask')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('unsharpMaskDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>{t('amount')}:</strong> {t('amountDesc')}</li>
                <li><strong>{t('radius')}:</strong> {t('radiusDesc')}</li>
                <li><strong>{t('threshold')}:</strong> {t('thresholdDesc')}</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('smartSharpening')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('smartSharpeningDesc')}
              </p>
              <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>{t('tip')}:</strong> {t('sharpeningTip')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('batchProcessing')}
          </h2>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t('automatedWorkflows')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('automatedWorkflowsDesc')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {t('workflowBenefits')}
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('workflowBenefit1')}</li>
                  <li>{t('workflowBenefit2')}</li>
                  <li>{t('workflowBenefit3')}</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {t('workflowConsiderations')}
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('workflowConsideration1')}</li>
                  <li>{t('workflowConsideration2')}</li>
                  <li>{t('workflowConsideration3')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('conclusion')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t('advancedTechniquesConclusion')}
          </p>
        </section>
      </article>
    </div>
  );
};

export default AdvancedTechniques;