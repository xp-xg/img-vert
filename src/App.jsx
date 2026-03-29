import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import AppLogo from './components/AppLogo';
import ErrorBoundary from './components/ErrorBoundary';
import AdComponent from './components/AdComponent';
import Navigation from './components/Navigation';
import ImageFormatsGuide from './pages/ImageFormatsGuide';
import ImageOptimizationTutorial from './pages/ImageOptimizationTutorial';
import AdvancedTechniques from './pages/AdvancedTechniques';
import IndustryUseCases from './pages/IndustryUseCases';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ContactPage from './pages/ContactPage';
import ConversionPage from './pages/ConversionPage';
import HelpPage from './pages/HelpPage';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';
import { conversionData } from './data/conversionData';
import ImageConverter from './components/ImageConverter';
import SEOContent from './components/SEOContent';
import Footer from './components/Footer';
import errorLogger from './services/errorLogger';

// ShareButton component for social media sharing
const ShareButton = ({ platform, url, title, icon, color, darkMode, isCopy = false }) => {
  const shareUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const getShareLink = () => {
    if (isCopy) return '#';
    switch (platform) {
      case 'Twitter':
        return `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodedTitle}`;
      case 'Facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
      case 'LinkedIn':
        return `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodedTitle}`;
      case 'Reddit':
        return `https://reddit.com/submit?url=${shareUrl}&title=${encodedTitle}`;
      case 'WhatsApp':
        return `https://api.whatsapp.com/send?text=${encodedTitle}%20${shareUrl}`;
      default:
        return url;
    }
  };

  const handleClick = (e) => {
    if (isCopy) {
      e.preventDefault();
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <a
      href={getShareLink()}
      onClick={handleClick}
      target={isCopy ? undefined : '_blank'}
      rel={isCopy ? undefined : 'noopener noreferrer'}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border ${darkMode
        ? 'bg-gray-700 border-gray-600 text-gray-300'
        : 'bg-white border-gray-300 text-gray-700'
        } ${color}`}
      aria-label={`Share on ${platform}`}
    >
      {icon}
      <span className="text-sm font-medium hidden sm:inline">{platform}</span>
    </a>
  );
};

const MainApp = ({ darkMode, setDarkMode }) => {
  const { t, i18n } = useTranslation();
  const [showConsentBanner, setShowConsentBanner] = useState(true);
  const [consentChoice, setConsentChoice] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Helper for file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle consent choice for ads
  const handleConsentChoice = (choice) => {
    if (choice === 'dismiss') {
      // Show the privacy policy modal when user clicks "Learn More"
      setShowPrivacyPolicy(true);
      return;
    }

    setConsentChoice(choice);
    setShowConsentBanner(false);

    // Store consent choice in localStorage
    localStorage.setItem('adsConsent', choice);

    try {
      // Update Consent Mode using official gtag API
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          'ad_storage': choice === 'personalized' ? 'granted' : 'denied',
          'ad_user_data': choice === 'personalized' ? 'granted' : 'denied',
          'ad_personalization': choice === 'personalized' ? 'granted' : 'denied',
          'analytics_storage': 'granted' // Always grant analytics if they make a choice, or refine based on requirement
        });
      }

      // Configure AdSense based on consent
      if (window && window.googletag && window.googletag.cmd) {
        window.googletag.cmd.push(() => {
          if (choice === 'nonPersonalized') {
            window.googletag.pubads().setRequestNonPersonalizedAds(1);
          } else {
            window.googletag.pubads().setRequestNonPersonalizedAds(0);
          }
          window.googletag.pubads().refresh();
        });
      } else {
        window.adsbygoogle = window.adsbygoogle || [];
        if (choice === 'nonPersonalized') {
          window.adsbygoogle.requestNonPersonalizedAds = 1;
        } else {
          window.adsbygoogle.requestNonPersonalizedAds = 0;
        }
      }

      // Update dataLayer
      if (window && window.dataLayer) {
        window.dataLayer.push({
          event: 'consent_update',
          consent_choice: choice,
          analytics_storage: 'granted',
          ad_storage: choice === 'personalized' ? 'granted' : 'denied'
        });
      }
    } catch (error) {
      console.error('Error updating ad settings based on consent:', error);
    }
  };

  // Initialize consent status on component mount
  useEffect(() => {
    const savedConsent = localStorage.getItem('adsConsent');
    if (savedConsent) {
      setConsentChoice(savedConsent);
      setShowConsentBanner(false);

      // Apply saved consent settings
      try {
        if (window && window.googletag && window.googletag.cmd) {
          window.googletag.cmd.push(() => {
            if (savedConsent === 'nonPersonalized') {
              window.googletag.pubads().setRequestNonPersonalizedAds(1);
            } else {
              window.googletag.pubads().setRequestNonPersonalizedAds(0);
            }
          });
        } else {
          window.adsbygoogle = window.adsbygoogle || [];
          if (savedConsent === 'nonPersonalized') {
            window.adsbygoogle.requestNonPersonalizedAds = 1;
          } else {
            window.adsbygoogle.requestNonPersonalizedAds = 0;
          }
        }
      } catch (error) {
        console.error('Error applying saved consent:', error);
      }
    } else {
      // Show consent banner for new users
      setShowConsentBanner(true);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col items-center md:items-start">
              <AppLogo />
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{t('mainH1Title') || 'Free Online Image Converter – Private & Fast'}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-center md:text-left">{t('description')}</p>
            </div>
          </header>



          {/* Main Content */}
          <main className="max-w-4xl mx-auto">
            {/* Ad Placement - Top Banner */}
            <section className={`rounded-xl p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{t('whyConvertImages')}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t('whyConvertImagesDesc')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="font-semibold text-sm mb-1">{t('compressionTitle')}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('compressionDesc')}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="font-semibold text-sm mb-1">{t('compatibilityTitle')}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('compatibilityDesc')}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="font-semibold text-sm mb-1">{t('qualityTitle')}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('qualityDesc')}</p>
                </div>
              </div>
              <div className="text-center py-2">
                <AdComponent
                  adSlot="TOP_BANNER_AD_SLOT" // Replace with your actual ad slot ID from AdSense
                  adFormat="horizontal"
                  style={{ display: "inline-block", width: "100%", height: "90px" }}
                />
              </div>
            </section>

            {/* Image Converter Section */}
            {/* Share Buttons - Above Upload Area */}
            <section className={`rounded-xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="text-lg font-semibold mb-4 text-center">Share this tool</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <ShareButton
                  platform="Twitter"
                  url="https://img-vert.web.app/"
                  title="Free Online Image Converter – Private & Fast"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  }
                  color="hover:bg-black hover:text-white"
                  darkMode={darkMode}
                />
                <ShareButton
                  platform="Facebook"
                  url="https://img-vert.web.app/"
                  title="Free Online Image Converter – Private & Fast"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  }
                  color="hover:bg-blue-600 hover:text-white"
                  darkMode={darkMode}
                />
                <ShareButton
                  platform="LinkedIn"
                  url="https://img-vert.web.app/"
                  title="Free Online Image Converter – Private & Fast"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  }
                  color="hover:bg-blue-700 hover:text-white"
                  darkMode={darkMode}
                />
                <ShareButton
                  platform="Reddit"
                  url="https://img-vert.web.app/"
                  title="Free Online Image Converter – Private & Fast"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                    </svg>
                  }
                  color="hover:bg-orange-600 hover:text-white"
                  darkMode={darkMode}
                />
                <ShareButton
                  platform="WhatsApp"
                  url="https://img-vert.web.app/"
                  title="Free Online Image Converter – Private & Fast"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  }
                  color="hover:bg-green-500 hover:text-white"
                  darkMode={darkMode}
                />
                <ShareButton
                  platform="Copy Link"
                  url="https://img-vert.web.app/"
                  title=""
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  }
                  color="hover:bg-gray-600 hover:text-white"
                  darkMode={darkMode}
                  isCopy={true}
                />
              </div>
            </section>

            <ImageConverter darkMode={darkMode} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />

            {/* How It Works Section - SEO Booster */}
            {!previewUrl && (
              <section className="mb-12 bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <h2 className="text-2xl font-bold mb-8 text-center text-blue-800 dark:text-blue-300">
                  {t('howItWorksTitle')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="text-center">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                        {step}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {t(`howItWorksStep${step}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Popular Conversion Links - SEO Booster */}
            {!previewUrl && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
                  {t('popularConversionsTitle') || 'Popular Image Conversions'}
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {Object.keys(conversionData).map((pair) => (
                    <Link
                      key={pair}
                      to={`/${pair}`}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm
                        ${darkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                          : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'}`}
                    >
                      {pair.replace(/-/g, ' ').toUpperCase()}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Detailed Insights & Guides Section - Added for AdSense Compliance and User Value */}
            {!previewUrl && (
              <section className={`mb-8 rounded-xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">{t('detailedInsightsTitle')}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">{t('understandingFormatsTitle')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {t('understandingFormatsIntro')}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-sm font-medium">PNG:</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('pngInsight')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-sm font-medium">JPEG:</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('jpegInsight')}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">{t('optimizationBestPracticesTitle')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {t('optimizationBestPracticesIntro')}
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <p className="text-sm italic text-gray-500 dark:text-gray-400">
                        {t('proTip')}: {t('proTipContent')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-6 flex flex-wrap gap-4">
                  <a href="/formats" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors">
                    {t('viewCompleteGuide')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href="/optimization" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors">
                    {t('readOptimizationTutorial')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </section>
            )}

            {/* How to Use Guide Card - SEO Optimized (shown when no image uploaded) */}
            {!previewUrl && (
              <section className={`mb-8 rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">{t('guideTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h3 className="font-semibold">{t('guideStep1Title')}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('guideStep1Desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h3 className="font-semibold">{t('guideStep2Title')}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('guideStep2Desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h3 className="font-semibold">{t('guideStep3Title')}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('guideStep3Desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h3 className="font-semibold">{t('guideStep4Title')}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('guideStep4Desc')}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm italic text-gray-500 dark:text-gray-400">
                    <strong>{t('privacyNotice')}:</strong> {t('guidePrivacyNotice')}
                    <span className="hidden"> Image Converter tool supports batch conversion, online image editor, image compressor, image resizer, image format converter for photographers, designers, and web developers.</span>
                  </p>
                </div>
              </section>
            )}


            {/* Ad Placement - Middle Banner */}
            <section className={`rounded-xl p-4 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} border-0`}>
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{t('seoImageTips')}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t('seoImageTipsDesc')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="font-semibold text-sm mb-1">{t('compressionTitle')}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('compressionDesc')}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="font-semibold text-sm mb-1">{t('compatibilityTitle')}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('compatibilityDesc')}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="font-semibold text-sm mb-1">{t('qualityTitle')}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('qualityDesc')}</p>
                </div>
              </div>
              <div className="text-center py-2">
                <AdComponent
                  adSlot="MIDDLE_BANNER_AD_SLOT" // Replace with your actual ad slot ID from AdSense
                  adFormat="horizontal"
                  style={{ display: "inline-block", width: "100%", height: "120px" }}
                />
              </div>
            </section>

            {/* Ad Placement 1 */}
            <section className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} shadow-lg mb-8`}>
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{t('imageFormatsGuide')}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t('imageFormatsGuideDesc')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="font-semibold text-sm mb-1">{t('pngFormatTitle')}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('pngFormatDesc')}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="font-semibold text-sm mb-1">{t('jpegFormatTitle')}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('jpegFormatDesc')}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className="font-semibold text-sm mb-1">{t('webpFormatTitle')}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('webpFormatDesc')}</p>
                </div>
              </div>
              <div className="text-center py-4">
                <AdComponent
                  adSlot="CONTENT_AD_SLOT" // Replace with your actual ad slot ID from AdSense
                  adFormat="rectangle"
                  style={{ display: "inline-block", width: "336px", height: "280px" }}
                />
              </div>
            </section>

            {/* Privacy Notice */}
            <section className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} shadow-lg`}>
              <div className="flex items-start gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300">{t('privacyNotice')}</p>
              </div>
            </section>

            {/* Share Buttons - After Conversion */}
            {previewUrl && (
              <section className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} shadow-lg`}>
                <h3 className="text-lg font-semibold mb-4 text-center">Love this tool? Share it!</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  <ShareButton
                    platform="Twitter"
                    url="https://img-vert.web.app/"
                    title="Free Online Image Converter – Private & Fast"
                    icon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    }
                    color="hover:bg-black hover:text-white"
                    darkMode={darkMode}
                  />
                  <ShareButton
                    platform="Facebook"
                    url="https://img-vert.web.app/"
                    title="Free Online Image Converter – Private & Fast"
                    icon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    }
                    color="hover:bg-blue-600 hover:text-white"
                    darkMode={darkMode}
                  />
                  <ShareButton
                    platform="LinkedIn"
                    url="https://img-vert.web.app/"
                    title="Free Online Image Converter – Private & Fast"
                    icon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    }
                    color="hover:bg-blue-700 hover:text-white"
                    darkMode={darkMode}
                  />
                  <ShareButton
                    platform="Reddit"
                    url="https://img-vert.web.app/"
                    title="Free Online Image Converter – Private & Fast"
                    icon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                      </svg>
                    }
                    color="hover:bg-orange-600 hover:text-white"
                    darkMode={darkMode}
                  />
                  <ShareButton
                    platform="WhatsApp"
                    url="https://img-vert.web.app/"
                    title="Free Online Image Converter – Private & Fast"
                    icon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    }
                    color="hover:bg-green-500 hover:text-white"
                    darkMode={darkMode}
                  />
                  <ShareButton
                    platform="Copy Link"
                    url="https://img-vert.web.app/"
                    title=""
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    }
                    color="hover:bg-gray-600 hover:text-white"
                    darkMode={darkMode}
                    isCopy={true}
                  />
                </div>
              </section>
            )}
          </main>

          {/* SEO-Rich Content for AdSense Compliance */}
          {!previewUrl && (
            <SEOContent darkMode={darkMode} />
          )}

          {/* Footer Ad */}
          <div className={`rounded-xl p-4 mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{t('advancedOptimizationTechniques')}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t('advancedOptimizationTechniquesDesc')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className="font-semibold text-sm mb-1">{t('compressionTechniques')}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">{t('adaptiveCompressionDesc')}</p>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className="font-semibold text-sm mb-1">{t('noiseReduction')}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">{t('aiDenoisingDesc')}</p>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className="font-semibold text-sm mb-1">{t('sharpeningTechniques')}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">{t('smartSharpeningDesc')}</p>
              </div>
            </div>
            <div className="text-center">
              <AdComponent
                adSlot="FOOTER_AD_SLOT" // Replace with your actual ad slot ID from AdSense
                adFormat="horizontal"
                style={{ display: "inline-block", width: "100%", height: "90px" }}
              />
            </div>

          </div>
          {/* Consent Banner for EU Users */}
          {showConsentBanner && (
            <div className={`fixed bottom-0 left-0 right-0 p-4 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="container mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm">
                    {t('cookieNotice')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleConsentChoice('personalized')}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded"
                    >
                      {t('acceptPersonalizedAds')}
                    </button>
                    <button
                      onClick={() => handleConsentChoice('nonPersonalized')}
                      className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded"
                    >
                      {t('acceptNonPersonalizedAds')}
                    </button>
                    <button
                      onClick={() => handleConsentChoice('dismiss')}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium py-2 px-4"
                    >
                      {t('learnMore')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          {/* Footer */}
          <footer className="mt-12 py-10 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10 text-left">
                <div className="md:col-span-2">
                  <h3 className="font-bold text-lg mb-4 text-blue-600 dark:text-blue-400">Image-Vert</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t('description')}
                  </p>
                  <p className="font-medium text-sm text-blue-500 mb-2">
                    {t('guidePrivacyNotice')}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t('popularConversionsTitle') || 'Popular Conversions'}</h3>
                  <ul className="space-y-2">
                    {['jpg-to-webp', 'png-to-webp', 'heic-to-jpg', 'png-to-jpg'].map(pair => (
                      <li key={pair}>
                        <Link to={`/${pair}`} className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                          {pair.replace(/-/g, ' ').toUpperCase()}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Guides & Resources</h3>
                  <ul className="space-y-2">
                    <li><a href="/formats" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Complete Guide to Image Formats</a></li>
                    <li><a href="/optimization" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Image Optimization Tips</a></li>
                    <li><a href="/advanced" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Advanced Techniques</a></li>
                    <li><a href="/use-cases" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Industry Use Cases</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Company & Legal</h3>
                  <ul className="space-y-2">
                    <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">About Us</a></li>
                    <li><a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Contact</a></li>
                    <li><a href="/help" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Help Center</a></li>
                    <li><a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                    <li><a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Terms of Service</a></li>
                    <li><a href="/disclaimer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Disclaimer</a></li>
                  </ul>
                </div>
              </div>
              <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-800">
                <p className="text-gray-500 text-sm mb-2">{t('copyright', { year: new Date().getFullYear() })}</p>
                <p className="text-gray-400 text-xs">
                  Free online image converter. Convert JPG, PNG, WebP, HEIC, GIF, BMP, TIFF privately in your browser.
                </p>
              </div>
            </div>
          </footer>
          <Footer />
        </div>
      </div>
    </ErrorBoundary>
  );
};

const App = () => {
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode based on system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<MainApp darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/:pair" element={<ConversionPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/formats" element={<ImageFormatsGuide />} />
        <Route path="/optimization" element={<ImageOptimizationTutorial />} />
        <Route path="/advanced" element={<AdvancedTechniques />} />
        <Route path="/use-cases" element={<IndustryUseCases />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/blog" element={<BlogIndexPage darkMode={darkMode} />} />
        <Route path="/blog/:slug" element={<BlogPostPage darkMode={darkMode} />} />
      </Routes>
    </div>
  );
};

export default App;