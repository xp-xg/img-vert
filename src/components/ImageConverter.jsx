import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { saveAs } from 'file-saver';
import AdComponent from './AdComponent';
import errorLogger from '../services/errorLogger';

const ImageConverter = ({ initialFormat = 'png', darkMode = false, forcedOutputFormat = null, allowedInputFormats = null, previewUrl = null, setPreviewUrl = () => {} }) => {
  const { t } = useTranslation();
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [format, setFormat] = useState(forcedOutputFormat || initialFormat);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [aspectRatio, setAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [quality, setQuality] = useState('high'); // high, medium, low
  const [convertedFileSize, setConvertedFileSize] = useState(null);
  const [conversionHistory, setConversionHistory] = useState(() => {
    // Load history from localStorage on mount
    try {
      const saved = localStorage.getItem('imgVertConversionHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [batchFiles, setBatchFiles] = useState([]); // Array of files for batch conversion
  const [batchResults, setBatchResults] = useState([]); // Array of conversion results
  const [isBatchConverting, setIsBatchConverting] = useState(false);

  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('imgVertConversionHistory', JSON.stringify(conversionHistory));
    } catch (error) {
      console.warn('Could not save conversion history:', error);
    }
  }, [conversionHistory]);

  // Quality presets for different formats
  const QUALITY_PRESETS = {
    high: 0.95,
    medium: 0.80,
    low: 0.60
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger shortcuts if user is not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Ctrl/Cmd + O: Open file
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        fileInputRef.current?.click();
      }

      // Ctrl/Cmd + Enter: Convert
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (previewUrl && !isLoading) {
          handleConvert();
        }
      }

      // Ctrl/Cmd + S: Save/Download
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (convertedUrl) {
          handleDownload();
        }
      }

      // Ctrl/Cmd + R: Reset
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleReset();
      }

      // Escape: Show info if converting
      if (e.key === 'Escape') {
        if (isLoading) {
          toast('Conversion in progress...', { icon: '⏳' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewUrl, convertedUrl, isLoading]);

  // Memory cleanup - revoke blob URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
      // Note: previewUrl is managed by parent component, but we clean up if it's a blob
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [convertedUrl, previewUrl]);

  // Helper function to get helpful error messages
  const getHelpfulErrorMessage = (error, file) => {
    // File type errors
    if (error.message?.includes('type') || error.message?.includes('format')) {
      const supportedFormats = allowedInputFormats 
        ? allowedInputFormats.map(f => f.toUpperCase()).join(', ')
        : 'JPG, PNG, WebP, GIF, BMP, TIFF, HEIC';
      return `This file format is not supported. Please use: ${supportedFormats}`;
    }
    
    // File size errors
    if (error.message?.includes('size') || error.message?.includes('large')) {
      const maxSizeMB = Math.round(maxSize / 1024 / 1024);
      return `File is too large (${formatFileSize(file?.size || 0)}). Maximum size is ${maxSizeMB}MB. Try compressing the image first.`;
    }
    
    // Corrupted file errors
    if (error.name === 'ImageDecodeError' || error.message?.includes('corrupt')) {
      return `Cannot decode this image. The file may be corrupted or incomplete. Try downloading it again or using a different file.`;
    }
    
    // Browser support errors
    if (error.message?.includes('canvas') || error.message?.includes('context')) {
      return `Your browser does not support image processing. Please try Chrome, Firefox, Safari, or Edge.`;
    }
    
    // Security/CORS errors
    if (error.message?.includes('security') || error.message?.includes('tainted')) {
      return `Cannot process this image due to security restrictions. Try downloading the image first, then uploading it.`;
    }
    
    // Memory errors
    if (error.message?.includes('memory') || error.message?.includes('allocation')) {
      return `Not enough memory to process this image. Try a smaller image or close other browser tabs.`;
    }
    
    // Generic error with file context
    return `Failed to process "${file?.name || 'this image'}". ${error.message || 'Please try a different image.'}`;
  };

  // Sync format if forced
  useEffect(() => {
    if (forcedOutputFormat) {
      setFormat(forcedOutputFormat);
    }
  }, [forcedOutputFormat]);

  const handleImageUpload = (e) => {
    try {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;
      
      if (files.length > 1) {
        // Batch upload - add all files to batch queue
        const validFiles = files.filter(file => {
          const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff', 'image/x-tiff', 'image/heif', 'image/heic'];
          const allowedMimes = allowedInputFormats 
            ? allowedInputFormats.flatMap(fmt => {
                const mimeMap = {
                  'jpg': ['image/jpeg', 'image/jpg'], 'png': ['image/png'], 'webp': ['image/webp'],
                  'gif': ['image/gif'], 'bmp': ['image/bmp'], 'tiff': ['image/tiff', 'image/x-tiff'],
                  'heif': ['image/heif', 'image/heic'], 'heic': ['image/heif', 'image/heic']
                };
                return mimeMap[fmt.toLowerCase()] || [];
              })
            : validTypes;
          return allowedMimes.includes(file.type) && file.size <= maxSize;
        });
        
        if (validFiles.length > 0) {
          setBatchFiles(prev => [...prev, ...validFiles]);
          toast.success(`Added ${validFiles.length} file(s) to batch. Total: ${validFiles.length} file(s)`);
        }
        if (files.length > validFiles.length) {
          toast.error(`${files.length - validFiles.length} file(s) were invalid`);
        }
      } else {
        // Single file upload - existing behavior
        validateAndProcessImage(files[0]);
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      errorLogger.logError(error, { action: 'handleImageUpload' });
      toast.error(getHelpfulErrorMessage(error, null));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const file = e.dataTransfer.files[0];
      if (file) {
        validateAndProcessImage(file);
      }
    } catch (error) {
      console.error('Error during drag and drop:', error);
      errorLogger.logError(error, { action: 'handleDrop' });
      toast.error(getHelpfulErrorMessage(error, file));
    }
  };

  const validateAndProcessImage = (file) => {
    const allValidTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff', 'image/x-tiff', 'image/heif', 'image/heic'];
    const maxSize = 100 * 1024 * 1024; // 100MB

    try {
      // If allowedInputFormats is provided, check against that.
      // Otherwise allow all supported types.
      if (allowedInputFormats && allowedInputFormats.length > 0) {
        // Map common extensions/names to MIME types
        const mimeMap = {
          'jpg': ['image/jpeg', 'image/jpg'],
          'jpeg': ['image/jpeg', 'image/jpg'],
          'png': ['image/png'],
          'webp': ['image/webp'],
          'gif': ['image/gif'],
          'bmp': ['image/bmp'],
          'tiff': ['image/tiff', 'image/x-tiff'],
          'heif': ['image/heif', 'image/heic'],
          'heic': ['image/heif', 'image/heic']
        };

        const allowedMimes = allowedInputFormats.flatMap(fmt => mimeMap[fmt.toLowerCase()] || []);
        if (!allowedMimes.includes(file.type)) {
          const formatList = allowedInputFormats.map(f => f.toUpperCase()).join(' or ');
          toast.error(`Invalid file type. Please upload a ${formatList} file.`);
          return;
        }
      } else if (!allValidTypes.includes(file.type)) {
        // Check if it's an empty/corrupted file
        if (file.size === 0) {
          toast.error('This file is empty. Please select a valid image file.');
        } else {
          toast.error(`Unsupported format (${file.type}). Please use: JPG, PNG, WebP, GIF, BMP, TIFF, or HEIC.`);
        }
        return;
      }

      if (file.size > maxSize) {
        const maxSizeMB = Math.round(maxSize / 1024 / 1024);
        toast.error(`File is too large (${formatFileSize(file.size)}). Maximum size is ${maxSizeMB}MB. Try using a smaller image or compressing it first.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          setPreviewUrl(e.target.result);
          setImageFile(file);

          const img = new Image();
          img.onload = () => {
            try {
              setOriginalDimensions({ width: img.width, height: img.height });
              setWidth(img.width.toString());
              setHeight(img.height.toString());
            } catch (dimensionError) {
              console.error('Error getting image dimensions:', dimensionError);
              errorLogger.logError(dimensionError, { action: 'getOriginalDimensions', fileName: file.name });
              toast.error('Could not read image dimensions. The file may be corrupted.');
            }
          };
          img.onerror = () => {
            toast.error(`Cannot load "${file.name}". The file may be corrupted or in an unsupported format.`);
          };
          img.src = e.target.result;
        } catch (previewError) {
          console.error('Error creating preview:', previewError);
          errorLogger.logError(previewError, { action: 'createPreview', fileName: file.name });
          toast.error(getHelpfulErrorMessage(previewError, file));
        }
      };
      reader.onerror = () => {
        toast.error(`Cannot read file "${file.name}". The file may be locked, corrupted, or too large.`);
      };
      reader.readAsDataURL(file);
    } catch (validationError) {
      console.error('Error during image validation:', validationError);
      errorLogger.logError(validationError, { action: 'validateAndProcessImage', fileName: file.name });
      toast.error(getHelpfulErrorMessage(validationError, file));
    }
  };

  const handleConvert = () => {
    if (!previewUrl) {
      toast.error('Please upload an image first');
      return;
    }

    setIsLoading(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Unable to create canvas context');

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          let newWidth = width ? parseInt(width, 10) : img.width;
          let newHeight = height ? parseInt(height, 10) : img.height;

          // Validate dimensions
          if (newWidth < 1 || newHeight < 1) {
            throw new Error('Invalid dimensions');
          }
          if (newWidth > 16384 || newHeight > 16384) {
            throw new Error('Image too large (max 16384px)');
          }

          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Get quality value based on format and quality setting
          const qualityValue = QUALITY_PRESETS[quality];

          canvas.toBlob((blob) => {
            if (!blob) throw new Error('Failed to create image blob');
            const url = URL.createObjectURL(blob);
            // Clean up previous converted URL to prevent memory leak
            setConvertedUrl((prevUrl) => {
              if (prevUrl) URL.revokeObjectURL(prevUrl);
              return url;
            });
            // Store converted file size for display
            setConvertedFileSize(blob.size);
            setIsLoading(false);
            toast.success(t('successConverted'));
            
            // Add to conversion history
            const historyEntry = {
              id: Date.now(),
              timestamp: new Date().toISOString(),
              fromFormat: imageFile?.type?.split('/')[1] || 'unknown',
              toFormat: format,
              originalSize: imageFile?.size || 0,
              convertedSize: blob.size,
              dimensions: { width: newWidth, height: newHeight },
              quality: quality
            };
            setConversionHistory((prev) => [historyEntry, ...prev].slice(0, 10)); // Keep last 10
          }, `image/${format}`, qualityValue);
        } catch (drawError) {
          console.error('Error during image drawing:', drawError);
          setIsLoading(false);
          if (drawError.message?.includes('dimension')) {
            toast.error('Invalid dimensions. Please enter values greater than 0 and less than 16384px.');
          } else if (drawError.message?.includes('large')) {
            toast.error('Image dimensions too large. Maximum size is 16384×16384 pixels. Please resize to smaller dimensions.');
          } else {
            toast.error('Failed to process image. The image may be corrupted or too complex. Try a simpler image.');
          }
        }
      };
      img.onerror = () => {
        setIsLoading(false);
        toast.error('Cannot load the image for conversion. The file may be corrupted or the preview URL is invalid.');
      };
      img.src = previewUrl;
    } catch (error) {
      console.error('Error during image conversion:', error);
      setIsLoading(false);
      if (error.message?.includes('canvas')) {
        toast.error('Your browser does not support image processing. Please try Chrome, Firefox, Safari, or Edge.');
      } else {
        toast.error(`Conversion failed: ${error.message || 'Unknown error'}. Please try a different image.`);
      }
    }
  };

  const handleDownload = () => {
    if (!convertedUrl) {
      toast.error('Please convert an image first');
      return;
    }
    saveAs(convertedUrl, `converted-image.${format}`);
  };

  const handleReset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    // Clean up blob URLs to prevent memory leaks
    if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    setConvertedUrl(null);
    setWidth('');
    setHeight('');
    setAspectRatio(true);
    setOriginalDimensions({ width: 0, height: 0 });
    setConvertedFileSize(null);
    // Return focus to upload button for keyboard users
    fileInputRef.current?.focus();
  };

  // Batch conversion function
  const handleBatchConvert = async () => {
    if (batchFiles.length === 0) {
      toast.error('No files in batch queue');
      return;
    }

    setIsBatchConverting(true);
    setBatchResults([]);
    const results = [];

    for (let i = 0; i < batchFiles.length; i++) {
      const file = batchFiles[i];
      try {
        const result = await convertSingleFile(file, format, width, height, quality);
        results.push({ ...result, fileName: file.name, success: true });
        toast.success(`Converted ${file.name}`);
      } catch (error) {
        results.push({ fileName: file.name, success: false, error: error.message });
        toast.error(`Failed to convert ${file.name}`);
      }
    }

    setBatchResults(results);
    setIsBatchConverting(false);
    
    // Add successful conversions to history
    const successfulConversions = results.filter(r => r.success);
    if (successfulConversions.length > 0) {
      const historyEntries = successfulConversions.map(r => ({
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        fromFormat: r.fromFormat,
        toFormat: format,
        originalSize: r.originalSize,
        convertedSize: r.convertedSize,
        dimensions: r.dimensions,
        quality: quality
      }));
      setConversionHistory(prev => [...historyEntries, ...prev].slice(0, 10));
    }
  };

  // Helper function to convert a single file
  const convertSingleFile = async (file, outputFormat, targetWidth, targetHeight, qualitySetting) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const newWidth = targetWidth ? parseInt(targetWidth, 10) : img.width;
            const newHeight = targetHeight ? parseInt(targetHeight, 10) : img.height;
            
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            
            const qualityValue = QUALITY_PRESETS[qualitySetting];
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error('Failed to create blob'));
                return;
              }
              const url = URL.createObjectURL(blob);
              resolve({
                url,
                fromFormat: file.type.split('/')[1],
                toFormat: outputFormat,
                originalSize: file.size,
                convertedSize: blob.size,
                dimensions: { width: newWidth, height: newHeight }
              });
            }, `image/${outputFormat}`, qualityValue);
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  // Download all batch results
  const handleDownloadAll = () => {
    const successfulResults = batchResults.filter(r => r.success && r.url);
    successfulResults.forEach((result, index) => {
      setTimeout(() => {
        saveAs(result.url, `${result.fileName.split('.')[0]}_converted.${format}`);
      }, index * 200); // Stagger downloads
    });
    toast.success(`Downloading ${successfulResults.length} file(s)`);
  };

  // Clear batch queue
  const handleClearBatch = () => {
    batchResults.forEach(r => {
      if (r.url) URL.revokeObjectURL(r.url);
    });
    setBatchFiles([]);
    setBatchResults([]);
  };

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setWidth(newWidth);
    if (aspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * ratio).toString());
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setHeight(newHeight);
    if (aspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * ratio).toString());
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Live region for screen reader announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {isLoading && 'Converting image, please wait...'}
        {convertedUrl && 'Image converted successfully. Ready to download.'}
      </div>

      {/* Upload Section */}
      <section className="mb-8" aria-label="Image Upload">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragOver
              ? (darkMode ? 'border-blue-400 bg-blue-900/10' : 'border-blue-400 bg-blue-50')
              : `${darkMode ? 'border-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-500'}`}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload image area. Click or press Enter to select files, or drag and drop files here."
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="text-lg">{t('dragDrop')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('supportedFormats')}</p>
            <button 
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              type="button"
              aria-label="Select image files to upload"
            >
              {t('uploadImage')}
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="sr-only"
            aria-label="File input for image upload"
            multiple
          />
        </div>
      </section>

      {/* Preview and Conversion Section */}
      {previewUrl && (
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className="text-xl font-semibold mb-4">{t('originalImage')}</h2>
              <div className="flex flex-col items-center">
                <img ref={imgRef} src={previewUrl} alt="Preview" className="max-h-64 object-contain mb-4" />
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

            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h2 className="text-xl font-semibold mb-4">{t('convertedImagePreview')}</h2>
              <div className="flex flex-col items-center">
                {convertedUrl ? (
                  <img src={convertedUrl} alt="Converted Preview" className="max-h-64 object-contain mb-4" />
                ) : (
                  <div className={`w-full h-48 flex items-center justify-center border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg`}>
                    <p className="text-gray-500 dark:text-gray-400">{t('convertedImagePlaceholder')}</p>
                  </div>
                )}
                {convertedUrl && (
                  <div className="text-center space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('convertedSize', { width: width || originalDimensions.width, height: height || originalDimensions.height })}
                    </p>
                    {convertedFileSize && (
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          File size: {formatFileSize(convertedFileSize)}
                        </span>
                        {imageFile && (
                          <span className={`font-medium ${convertedFileSize < imageFile.size ? 'text-green-500' : 'text-red-500'}`}>
                            ({convertedFileSize < imageFile.size ? '-' : '+'}{Math.abs(Math.round((1 - convertedFileSize / imageFile.size) * 100))}%)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Conversion Options */}
      {previewUrl && (
        <section className={`mb-8 rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`} aria-label="Conversion Options">
          <h2 className="text-xl font-semibold mb-4">{t('convertImage')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2" id="format-label">{t('outputFormat')}</label>
              <div className="flex gap-2 flex-wrap" role="radiogroup" aria-labelledby="format-label">
                {['png', 'jpeg', 'webp', 'gif', 'bmp'].map((fmt) => (
                  <button
                    key={fmt}
                    disabled={!!forcedOutputFormat}
                    onClick={() => setFormat(fmt)}
                    role="radio"
                    aria-checked={format === fmt}
                    aria-disabled={!!forcedOutputFormat}
                    className={`px-4 py-2 rounded-lg transition-colors ${format === fmt
                        ? 'bg-blue-500 text-white ring-2 ring-blue-300 dark:ring-blue-500'
                        : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      } ${!!forcedOutputFormat && format !== fmt ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" id="quality-label">Quality</label>
              <div className="flex gap-2" role="radiogroup" aria-labelledby="quality-label">
                {[
                  { value: 'high', label: 'High', desc: 'Best quality, larger file' },
                  { value: 'medium', label: 'Medium', desc: 'Balanced quality and size' },
                  { value: 'low', label: 'Low', desc: 'Smallest file, lower quality' }
                ].map((q) => (
                  <button
                    key={q.value}
                    onClick={() => setQuality(q.value)}
                    disabled={format === 'png' || format === 'gif' || format === 'bmp'}
                    role="radio"
                    aria-checked={quality === q.value}
                    aria-disabled={format === 'png' || format === 'gif' || format === 'bmp'}
                    title={q.desc}
                    className={`px-3 py-2 rounded-lg transition-colors text-sm ${quality === q.value
                        ? 'bg-blue-500 text-white ring-2 ring-blue-300 dark:ring-blue-500'
                        : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      } ${(format === 'png' || format === 'gif' || format === 'bmp') ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
              {(format === 'png' || format === 'gif' || format === 'bmp') && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1" role="note">
                  N/A for {format.toUpperCase()} (lossless)
                </p>
              )}
            </div>
          </div>

          {/* Resize Section */}
          <div className="border-t pt-6 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="aspectRatio"
                checked={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.checked)}
                className="rounded"
                aria-describedby="aspectRatioDesc"
              />
              <label htmlFor="aspectRatio" className="text-sm font-medium">{t('maintainAspectRatio')}</label>
              <span id="aspectRatioDesc" className="sr-only">When checked, changing width will automatically adjust height proportionally</span>
            </div>
            <div className="grid grid-cols-2 gap-4" role="group" aria-label="Image dimensions">
              <div>
                <label htmlFor="width-input" className="block text-sm mb-1">{t('width')}</label>
                <input 
                  id="width-input"
                  type="number" 
                  value={width} 
                  onChange={handleWidthChange} 
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700" 
                  min="1"
                  max="16384"
                  aria-describedby="widthDesc"
                />
                <span id="widthDesc" className="sr-only">Enter width in pixels, maximum 16384</span>
              </div>
              <div>
                <label htmlFor="height-input" className="block text-sm mb-1">{t('height')}</label>
                <input 
                  id="height-input"
                  type="number" 
                  value={height} 
                  onChange={handleHeightChange} 
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700" 
                  min="1"
                  max="16384"
                  aria-describedby="heightDesc"
                />
                <span id="heightDesc" className="sr-only">Enter height in pixels, maximum 16384</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6" role="group" aria-label="Conversion actions">
            <button
              onClick={handleConvert}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center disabled:opacity-50"
              aria-busy={isLoading}
              type="button"
            >
              {isLoading ? (
                <><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>{t('convert')}...</>
              ) : t('convert')}
            </button>
            <button
              onClick={handleDownload}
              disabled={!convertedUrl}
              className={`font-medium py-2 px-6 rounded-lg transition-colors flex items-center ${convertedUrl ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              type="button"
              aria-describedby={!convertedUrl ? 'downloadDesc' : undefined}
            >
              {t('downloadImage')}
            </button>
            {!convertedUrl && <span id="downloadDesc" className="sr-only">Convert an image first to enable download</span>}
            <button 
              onClick={handleReset} 
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              type="button"
            >
              {t('reset')}
            </button>
          </div>
        </section>
      )}

      {/* Batch Conversion Section */}
      {batchFiles.length > 0 && (
        <section className={`mb-8 rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`} aria-label="Batch Conversion">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Batch Conversion ({batchFiles.length} file{batchFiles.length !== 1 ? 's' : ''})</h2>
            <button
              onClick={handleClearBatch}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              type="button"
              disabled={isBatchConverting}
            >
              Clear All
            </button>
          </div>
          
          {/* Batch file list */}
          <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className="text-sm font-medium mb-2">Files to convert:</p>
            <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
              {batchFiles.map((file, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span className="truncate">{file.name}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{formatFileSize(file.size)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Batch action buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleBatchConvert}
              disabled={isBatchConverting || batchFiles.length === 0}
              className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              {isBatchConverting ? 'Converting...' : `Convert All (${batchFiles.length})`}
            </button>
            {batchResults.length > 0 && (
              <button
                onClick={handleDownloadAll}
                disabled={!batchResults.some(r => r.success)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                type="button"
              >
                Download All
              </button>
            )}
          </div>

          {/* Batch results */}
          {batchResults.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Results:</h3>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {batchResults.map((result, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded ${result.success ? (darkMode ? 'bg-green-900/30' : 'bg-green-100') : (darkMode ? 'bg-red-900/30' : 'bg-red-100')}`}
                  >
                    <span className="text-sm truncate flex-1">{result.fileName}</span>
                    <span className={`text-sm ml-2 ${result.success ? 'text-green-500' : 'text-red-500'}`}>
                      {result.success ? '✓ Success' : `✗ Failed: ${result.error}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Conversion History */}
      {conversionHistory.length > 0 && (
        <section className={`mb-8 rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`} aria-label="Conversion History">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Conversions</h2>
            <button
              onClick={() => setConversionHistory([])}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              type="button"
              aria-label="Clear conversion history"
            >
              Clear History
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-2 px-3">Time</th>
                  <th className="text-left py-2 px-3">Conversion</th>
                  <th className="text-left py-2 px-3">Dimensions</th>
                  <th className="text-left py-2 px-3">Size Change</th>
                </tr>
              </thead>
              <tbody>
                {conversionHistory.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <td className="py-2 px-3 text-gray-500 dark:text-gray-400">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-2 px-3 font-medium">
                      {item.fromFormat?.toUpperCase()} → {item.toFormat.toUpperCase()}
                    </td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-300">
                      {item.dimensions.width} × {item.dimensions.height}px
                    </td>
                    <td className="py-2 px-3">
                      <span className={item.convertedSize < item.originalSize ? 'text-green-500' : 'text-red-500'}>
                        {item.convertedSize < item.originalSize ? '-' : '+'}
                        {Math.abs(Math.round((1 - item.convertedSize / item.originalSize) * 100))}%
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                        ({formatFileSize(item.convertedSize)})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default ImageConverter;
