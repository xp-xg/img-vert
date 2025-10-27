import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
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
import HelpPage from './pages/HelpPage';
import errorLogger from './services/errorLogger';

const MainApp = ({ darkMode, setDarkMode }) => {
  const { t, i18n } = useTranslation();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [format, setFormat] = useState('png');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [aspectRatio, setAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [showConsentBanner, setShowConsentBanner] = useState(true); // State for consent banner
  const [consentChoice, setConsentChoice] = useState(null); // 'personalized', 'nonPersonalized', or null


  
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  // Handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        validateAndProcessImage(file);
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      errorLogger.logError(error, { action: 'handleImageUpload' });
      toast.error(t('errorImageProcessing'));
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const file = e.dataTransfer.files[0];
      if (file) {
        validateAndProcessImage(file);
      }
    } catch (error) {
      console.error('Error during drag and drop:', error);
      errorLogger.logError(error, { action: 'handleDrop' });
      toast.error('An error occurred during file drop. Please try uploading again.');
    }
  };

  // Validate and process the uploaded image
  const validateAndProcessImage = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff', 'image/x-tiff', 'image/heif', 'image/heic'];
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes (generous limit)

    try {
      if (!validTypes.includes(file.type)) {
        toast.error(t('errorInvalidFile'));
        return;
      }

      if (file.size > maxSize) {
        toast.error(t('errorFileTooLarge', { maxSize: '100MB' }));
        return;
      }

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          setPreviewUrl(e.target.result);
          setImageFile(file);
          
          // Get original dimensions
          const img = new Image();
          img.onload = () => {
            try {
              setOriginalDimensions({ width: img.width, height: img.height });
              setWidth(img.width.toString());
              setHeight(img.height.toString());
            } catch (dimensionError) {
              console.error('Error getting image dimensions:', dimensionError);
              errorLogger.logError(dimensionError, { 
                action: 'getOriginalDimensions',
                fileName: file.name,
                fileType: file.type
              });
              toast.error('An error occurred while reading image dimensions.');
            }
          };
          
          img.onerror = () => {
            toast.error('Error loading image. The file may be corrupted.');
          };
          
          img.src = e.target.result;
        } catch (previewError) {
          console.error('Error creating preview:', previewError);
          errorLogger.logError(previewError, { 
            action: 'createPreview',
            fileName: file.name,
            fileType: file.type
          });
          toast.error(t('errorImageProcessing'));
        }
      };
      
      reader.onerror = () => {
        toast.error('Error reading the file. The file may be corrupted or inaccessible.');
      };
      
      reader.readAsDataURL(file);
    } catch (validationError) {
      console.error('Error during image validation:', validationError);
      errorLogger.logError(validationError, { 
        action: 'validateAndProcessImage',
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });
      toast.error(t('errorImageProcessing'));
    }
  };

  // Handle image conversion
  const handleConvert = () => {
    if (!previewUrl) {
      toast.error('Please upload an image first');
      return;
    }

    setIsLoading(true);

    try {
      // Create a canvas to process the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Unable to create canvas context for image processing');
      }
      
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Handle potential CORS issues
      
      img.onload = () => {
        try {
          // Set canvas dimensions based on user input (if provided)
          let newWidth = img.width;
          let newHeight = img.height;
          
          if (width && height) {
            newWidth = parseInt(width, 10);
            newHeight = parseInt(height, 10);
            
            // Validate dimensions
            if (newWidth <= 0 || newHeight <= 0) {
              throw new Error('Invalid dimensions. Width and height must be positive numbers.');
            }
          } else if (width) {
            newWidth = parseInt(width, 10);
            if (newWidth <= 0) {
              throw new Error('Invalid width. Width must be a positive number.');
            }
            newHeight = Math.round((img.height * newWidth) / img.width);
          } else if (height) {
            newHeight = parseInt(height, 10);
            if (newHeight <= 0) {
              throw new Error('Invalid height. Height must be a positive number.');
            }
            newWidth = Math.round((img.width * newHeight) / img.height);
          }

          // Validate final dimensions
          if (newWidth <= 0 || newHeight <= 0) {
            throw new Error('Invalid image dimensions after processing.');
          }
          
          // Set appropriate canvas dimensions
          canvas.width = newWidth;
          canvas.height = newHeight;
          
          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          
          // Convert to the selected format
          canvas.toBlob((blob) => {
            if (!blob) {
              throw new Error('Failed to create image blob during conversion.');
            }
            
            const convertedUrl = URL.createObjectURL(blob);
            setConvertedUrl(convertedUrl);
            setIsLoading(false);
            toast.success(t('successConverted'));
          }, `image/${format}`);
        } catch (drawError) {
          console.error('Error during image drawing:', drawError);
          setIsLoading(false);
          toast.error(t('errorImageProcessing'));
        }
      };
      
      img.onerror = () => {
        setIsLoading(false);
        toast.error(t('errorImageLoad'));
      };
      
      img.src = previewUrl;
    } catch (error) {
      console.error('Error during image conversion:', error);
      setIsLoading(false);
      toast.error(t('errorConversion'));
    }
  };

  // Handle download
  const handleDownload = () => {
    if (!convertedUrl) {
      toast.error('Please convert an image first');
      return;
    }
    
    try {
      saveAs(convertedUrl, `converted-image.${format}`);
    } catch (error) {
      console.error('Error during download:', error);
      toast.error(t('errorConversion'));
    }
  };

  // Reset the app
  const handleReset = () => {
    try {
      setImageFile(null);
      setPreviewUrl(null);
      setConvertedUrl(prevUrl => {
        if (prevUrl) {
          try {
            URL.revokeObjectURL(prevUrl);
          } catch (error) {
            console.error('Error revoking object URL:', error);
          }
        }
        return null;
      });
      setWidth(originalDimensions.width.toString());
      setHeight(originalDimensions.height.toString());
    } catch (error) {
      console.error('Error during reset:', error);
      toast.error(t('errorReset'));
    }
  };

  // Update height when width changes (maintain aspect ratio)
  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setWidth(newWidth);
    
    if (aspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * ratio).toString());
    }
  };

  // Update width when height changes (maintain aspect ratio)
  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setHeight(newHeight);
    
    if (aspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * ratio).toString());
    }
  };

  // Format file size for display
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
      // Configure AdSense based on consent
      // For non-personalized ads, we need to set this before showing ads
      if (window && window.googletag && window.googletag.cmd) {
        window.googletag.cmd.push(() => {
          if (choice === 'nonPersonalized') {
            window.googletag.pubads().setRequestNonPersonalizedAds(1);
          } else {
            // Personalized ads
            window.googletag.pubads().setRequestNonPersonalizedAds(0);
          }
          // Refresh ads to apply the new setting
          window.googletag.pubads().refresh();
        });
      } else {
        // If ad scripts haven't loaded yet, set up a configuration that will apply when they do
        window.adsbygoogle = window.adsbygoogle || [];
        if (choice === 'nonPersonalized') {
          window.adsbygoogle.requestNonPersonalizedAds = 1;
        } else {
          window.adsbygoogle.requestNonPersonalizedAds = 0;
        }
      }

      // Update dataLayer if using Google Tag Manager
      if (window && window.dataLayer) {
        window.dataLayer.push({
          event: 'consent_update',
          consent_type: choice,
          ads_personalization: choice === 'personalized'
        });
      }

      // Refresh the ads to apply new consent settings
      if (window && window.adsbygoogle && window.adsbygoogle.push) {
        // Push empty configuration to refresh existing ads with new settings
        window.adsbygoogle.push({});
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
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <AppLogo />
            <p className="text-gray-600 dark:text-gray-400 mt-2">{t('description')}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <select 
              value={language} 
              onChange={(e) => changeLanguage(e.target.value)}
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
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 flex items-center gap-2"
            >
              {darkMode ? t('lightMode') : t('darkMode')}
            </button>
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

          {/* Upload Section */}
          <section className="mb-8">
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                ${darkMode ? 'border-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-500'}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="text-lg">{t('dragDrop')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('supportedFormats')}</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  {t('uploadImage')}
                </button>
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </section>

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

          {/* Preview and Conversion Section */}
          {previewUrl && (
            <section className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Original Image */}
                <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h2 className="text-xl font-semibold mb-4">{t('originalImage')}</h2>
                  <div className="flex flex-col items-center">
                    <img 
                      ref={imgRef}
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-64 object-contain mb-4"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('originalSize', { width: originalDimensions.width, height: originalDimensions.height })}
                    </p>
                    {imageFile && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {t('fileSize', { size: formatFileSize(imageFile.size) })}
                      </p>
                    )}
                  </div>
                </div>

                {/* Converted Image Preview */}
                <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h2 className="text-xl font-semibold mb-4">{t('convertedImagePreview')}</h2>
                  <div className="flex flex-col items-center">
                    {convertedUrl ? (
                      <img 
                        src={convertedUrl} 
                        alt="Converted Preview" 
                        className="max-h-64 object-contain mb-4"
                      />
                    ) : (
                      <div className={`w-full h-48 flex items-center justify-center border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg`}>
                        <p className="text-gray-500 dark:text-gray-400">{t('convertedImagePlaceholder')}</p>
                      </div>
                    )}
                    {convertedUrl && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {t('convertedSize', { width: width || originalDimensions.width, height: height || originalDimensions.height })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Conversion Options */}
          {previewUrl && (
            <section className={`mb-8 rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className="text-xl font-semibold mb-4">{t('convertImage')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">{t('outputFormat')}</label>
                  <div className="flex gap-2 flex-wrap">
                    {['png', 'jpeg', 'webp', 'gif', 'bmp'].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setFormat(fmt)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          format === fmt 
                            ? 'bg-blue-500 text-white' 
                            : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {fmt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resize Options */}
                <div>
                  <label className="block text-sm font-medium mb-2">{t('resizeImage')}</label>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      id="aspectRatio"
                      checked={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="aspectRatio">{t('maintainAspectRatio')}</label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">{t('width')}</label>
                      <input
                        type="number"
                        value={width}
                        onChange={handleWidthChange}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">{t('height')}</label>
                      <input
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`rounded-lg p-4 mt-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{t('conversionBenefits')}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {t('conversionBenefitsDesc')}
                  </p>
                </div>
                <div className="text-center py-2">
                  <AdComponent 
                    adSlot="CONVERSION_OPTIONS_AD_SLOT" // Replace with your actual ad slot ID from AdSense
                    adFormat="rectangle"
                    style={{ display: "inline-block", width: "300px", height: "100px" }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={handleConvert}
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('convert')}...
                    </>
                  ) : (
                    t('convert')
                  )}
                </button>
                
                <button
                  onClick={handleDownload}
                  disabled={!convertedUrl}
                  className={`font-medium py-2 px-6 rounded-lg transition-colors flex items-center ${
                    convertedUrl 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {t('downloadImage')}
                </button>
                
                <button
                  onClick={handleReset}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  {t('reset')}
                </button>
              </div>
            </section>
          )}

          {/* How to Use Guide Card - SEO Optimized (only shown after image upload) */}
          {previewUrl && (
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
        </main>

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
    </ErrorBoundary>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  
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
    setLanguage(lng);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<MainApp darkMode={darkMode} setDarkMode={setDarkMode} />} />
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
      </Routes>
    </div>
  );
};

export default App;