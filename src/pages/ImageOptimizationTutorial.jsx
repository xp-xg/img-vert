import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ImageOptimizationTutorial = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('imageOptimizationTutorial')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('imageOptimizationTutorialDesc')}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('whyOptimizeImages')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {t('whyOptimizeImagesDesc')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">🚀</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('fasterLoadingTimes')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('fasterLoadingTimesDesc')}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">💰</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('reducedBandwidthCosts')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('reducedBandwidthCostsDesc')}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">📈</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('betterSeoRankings')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('betterSeoRankingsDesc')}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('imageOptimizationSteps')}
          </h2>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 p-5 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('chooseRightFormat')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('chooseRightFormatDesc')}
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {t('formatRecommendations')}
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>PNG:</strong> {t('pngUseCase')}</li>
                    <li><strong>JPEG:</strong> {t('jpegUseCase')}</li>
                    <li><strong>WebP:</strong> {t('webpUseCase')}</li>
                    <li><strong>GIF:</strong> {t('gifUseCase')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 p-5 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('resizeImages')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('resizeImagesDesc')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {t('desktopOptimization')}
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>{t('desktopOptimizationTip1')}</li>
                      <li>{t('desktopOptimizationTip2')}</li>
                      <li>{t('desktopOptimizationTip3')}</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {t('mobileOptimization')}
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>{t('mobileOptimizationTip1')}</li>
                      <li>{t('mobileOptimizationTip2')}</li>
                      <li>{t('mobileOptimizationTip3')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 p-5 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('compressImages')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('compressImagesDesc')}
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {t('compressionTechniques')}
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>{t('lossyCompression')}:</strong> {t('lossyCompressionDesc')}</li>
                    <li><strong>{t('losslessCompression')}:</strong> {t('losslessCompressionDesc')}</li>
                    <li><strong>{t('adaptiveCompression')}:</strong> {t('adaptiveCompressionDesc')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 p-5 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('optimizeMetadata')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t('optimizeMetadataDesc')}
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {t('metadataRemovalBenefits')}
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>{t('metadataRemovalBenefit1')}</li>
                    <li>{t('metadataRemovalBenefit2')}</li>
                    <li>{t('metadataRemovalBenefit3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('advancedOptimizationTechniques')}
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {t('lazyLoading')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('lazyLoadingDesc')}
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {t('responsiveImages')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('responsiveImagesDesc')}
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {t('cdnUsage')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('cdnUsageDesc')}
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {t('webpModernFormats')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('webpModernFormatsDesc')}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('conclusion')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t('optimizationConclusion')}
          </p>
        </section>

        {/* Internal Linking Section - SEO */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">More Guides</h3>
              <ul className="space-y-2">
                <li><Link to="/formats" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ Complete Format Guide</Link></li>
                <li><Link to="/advanced" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ Advanced Techniques</Link></li>
                <li><Link to="/use-cases" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ Industry Use Cases</Link></li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Blog Posts</h3>
              <ul className="space-y-2">
                <li><Link to="/blog/reduce-image-size-for-website" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ Reduce Image Size for Websites</Link></li>
                <li><Link to="/blog/what-is-webp-format" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ What is WebP?</Link></li>
                <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ View All Posts</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 p-8 rounded-2xl text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Images?</h2>
          <p className="mb-6 text-blue-100">Convert and optimize images instantly with our free tool.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Start Converting</Link>
            <Link to="/help" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Help Center</Link>
          </div>
        </section>
      </article>
    </div>
  );
};

export default ImageOptimizationTutorial;