import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const IndustryUseCases = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('industryUseCases')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('industryUseCasesDesc')}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('ecommerceUseCase')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('productPhotography')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('productPhotographyDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('productPhotographyTip1')}</li>
                <li>{t('productPhotographyTip2')}</li>
                <li>{t('productPhotographyTip3')}</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('catalogOptimization')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('catalogOptimizationDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('catalogOptimizationTip1')}</li>
                <li>{t('catalogOptimizationTip2')}</li>
                <li>{t('catalogOptimizationTip3')}</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('ecommerceBestPractices')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('ecommercePractice1')}</li>
                  <li>{t('ecommercePractice2')}</li>
                  <li>{t('ecommercePractice3')}</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('ecommercePractice4')}</li>
                  <li>{t('ecommercePractice5')}</li>
                  <li>{t('ecommercePractice6')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('webDesignUseCase')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('uiUxOptimization')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('uiUxOptimizationDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('uiUxTip1')}</li>
                <li>{t('uiUxTip2')}</li>
                <li>{t('uiUxTip3')}</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('webPerformance')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('webPerformanceDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('webPerformanceTip1')}</li>
                <li>{t('webPerformanceTip2')}</li>
                <li>{t('webPerformanceTip3')}</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('webDesignBestPractices')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('webDesignPractice1')}</li>
                  <li>{t('webDesignPractice2')}</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('webDesignPractice3')}</li>
                  <li>{t('webDesignPractice4')}</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('webDesignPractice5')}</li>
                  <li>{t('webDesignPractice6')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('marketingUseCase')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('socialMediaMarketing')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('socialMediaMarketingDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('socialMediaTip1')}</li>
                <li>{t('socialMediaTip2')}</li>
                <li>{t('socialMediaTip3')}</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('emailCampaigns')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('emailCampaignsDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('emailCampaignTip1')}</li>
                <li>{t('emailCampaignTip2')}</li>
                <li>{t('emailCampaignTip3')}</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('marketingBestPractices')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('marketingPractice1')}</li>
                  <li>{t('marketingPractice2')}</li>
                  <li>{t('marketingPractice3')}</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('marketingPractice4')}</li>
                  <li>{t('marketingPractice5')}</li>
                  <li>{t('marketingPractice6')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('photographyUseCase')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('portfolioShowcase')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('portfolioShowcaseDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('portfolioTip1')}</li>
                <li>{t('portfolioTip2')}</li>
                <li>{t('portfolioTip3')}</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('printingPreparation')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {t('printingPreparationDesc')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t('printingTip1')}</li>
                <li>{t('printingTip2')}</li>
                <li>{t('printingTip3')}</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {t('photographyBestPractices')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('photographyPractice1')}</li>
                  <li>{t('photographyPractice2')}</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('photographyPractice3')}</li>
                  <li>{t('photographyPractice4')}</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{t('photographyPractice5')}</li>
                  <li>{t('photographyPractice6')}</li>
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
            {t('industryUseCasesConclusion')}
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
                <li><Link to="/optimization" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ Image Optimization Tips</Link></li>
                <li><Link to="/advanced" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ Advanced Techniques</Link></li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Blog Posts</h3>
              <ul className="space-y-2">
                <li><Link to="/blog/best-image-format-for-instagram" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ Best Format for Instagram</Link></li>
                <li><Link to="/blog/image-format-print-vs-web" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ Print vs Web Formats</Link></li>
                <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:underline">→ View All Posts</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 p-8 rounded-2xl text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Convert Your Images?</h2>
          <p className="mb-6 text-blue-100">Professional-grade image conversion for all industries.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Start Converting</Link>
            <Link to="/about" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">About Us</Link>
          </div>
        </section>
      </article>
    </div>
  );
};

export default IndustryUseCases;