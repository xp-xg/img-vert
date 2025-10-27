import React from 'react';
import { useTranslation } from 'react-i18next';

const ImageFormatsGuide = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('imageFormatsGuide')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('imageFormatsGuideDesc')}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('understandingImageFormats')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {t('understandingImageFormatsDesc')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
                {t('lossyVsLossless')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('lossyVsLosslessDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('lossyFormatExample')}</li>
                <li>{t('losslessFormatExample')}</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
                {t('whenToUseEachFormat')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('whenToUseEachFormatDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('photographyUseCase')}</li>
                <li>{t('graphicDesignUseCase')}</li>
                <li>{t('webOptimizationUseCase')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('popularImageFormats')}
          </h2>
          
          <div className="space-y-6">
            {/* PNG Format */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg px-3 py-1 text-sm font-medium">
                  PNG
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('pngFormatTitle')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {t('pngFormatDesc')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t('advantages')}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>{t('pngAdvantage1')}</li>
                        <li>{t('pngAdvantage2')}</li>
                        <li>{t('pngAdvantage3')}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t('disadvantages')}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>{t('pngDisadvantage1')}</li>
                        <li>{t('pngDisadvantage2')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* JPEG Format */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg px-3 py-1 text-sm font-medium">
                  JPEG
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('jpegFormatTitle')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {t('jpegFormatDesc')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t('advantages')}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>{t('jpegAdvantage1')}</li>
                        <li>{t('jpegAdvantage2')}</li>
                        <li>{t('jpegAdvantage3')}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t('disadvantages')}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>{t('jpegDisadvantage1')}</li>
                        <li>{t('jpegDisadvantage2')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* WebP Format */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg px-3 py-1 text-sm font-medium">
                  WebP
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('webpFormatTitle')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {t('webpFormatDesc')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t('advantages')}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>{t('webpAdvantage1')}</li>
                        <li>{t('webpAdvantage2')}</li>
                        <li>{t('webpAdvantage3')}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t('disadvantages')}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>{t('webpDisadvantage1')}</li>
                        <li>{t('webpDisadvantage2')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* GIF Format */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg px-3 py-1 text-sm font-medium">
                  GIF
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('gifFormatTitle')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {t('gifFormatDesc')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t('advantages')}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>{t('gifAdvantage1')}</li>
                        <li>{t('gifAdvantage2')}</li>
                        <li>{t('gifAdvantage3')}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t('disadvantages')}
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>{t('gifDisadvantage1')}</li>
                        <li>{t('gifDisadvantage2')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('formatSelectionTips')}
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-5">
            <ul className="list-decimal pl-5 space-y-3 text-gray-700 dark:text-gray-300">
              <li>{t('formatSelectionTip1')}</li>
              <li>{t('formatSelectionTip2')}</li>
              <li>{t('formatSelectionTip3')}</li>
              <li>{t('formatSelectionTip4')}</li>
              <li>{t('formatSelectionTip5')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('conclusion')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t('formatConclusion')}
          </p>
        </section>
      </article>
    </div>
  );
};

export default ImageFormatsGuide;