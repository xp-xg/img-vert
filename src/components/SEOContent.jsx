import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * SEOContent Component - Comprehensive SEO-rich content for AdSense compliance
 * 
 * This component adds substantial, unique, helpful content to the homepage
 * to address Google AdSense "Low Value Content" rejection.
 * 
 * Content strategy:
 * - 1500+ words of original, helpful content
 * - Proper heading hierarchy (H2, H3, H4)
 * - Internal linking to blog posts and tool pages
 * - FAQ section with schema markup potential
 * - E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness)
 * - External authoritative references
 */

const SEOContent = ({ darkMode }) => {
  const { t } = useTranslation();

  const sectionClasses = `mb-12 rounded-2xl p-8 ${
    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-lg'
  }`;

  const headingClasses = `text-2xl font-bold mb-4 ${
    darkMode ? 'text-blue-400' : 'text-blue-600'
  }`;

  const subHeadingClasses = `text-xl font-semibold mb-3 mt-6 ${
    darkMode ? 'text-blue-300' : 'text-blue-700'
  }`;

  const paragraphClasses = `mb-4 leading-relaxed ${
    darkMode ? 'text-gray-300' : 'text-gray-700'
  }`;

  const listClasses = `list-disc list-inside mb-4 space-y-2 ${
    darkMode ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <section className="max-w-5xl mx-auto mt-16 px-4">
      {/* Introduction Section */}
      <article className={sectionClasses}>
        <h2 className={headingClasses}>
          Free Online Image Converter – Convert JPG, PNG, WebP, HEIC & More
        </h2>
        
        <p className={paragraphClasses}>
          Welcome to <strong>img-vert</strong>, the privacy-first online image converter that processes your files 
          entirely in your browser. Unlike other conversion tools that upload your images to remote servers, 
          our technology ensures your photos and graphics never leave your device. This means complete privacy, 
          faster conversion speeds, and no file size limits imposed by server constraints.
        </p>

        <p className={paragraphClasses}>
          Whether you're a photographer needing to convert RAW exports to web-friendly formats, a web developer 
          optimizing images for faster page loads, or simply someone who needs to open an iPhone HEIC photo on 
          Windows, our tool provides professional-grade conversion capabilities at no cost.
        </p>

        <div className={`mt-6 p-6 rounded-xl ${darkMode ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50 border border-blue-100'}`}>
          <h3 className={subHeadingClasses}>Key Features at a Glance</h3>
          <ul className={listClasses}>
            <li><strong>100% Private Processing</strong> – Your images never leave your browser</li>
            <li><strong>No File Uploads</strong> – Everything happens locally on your device</li>
            <li><strong>Wide Format Support</strong> – JPG, PNG, WebP, GIF, BMP, TIFF, HEIC/HEIF</li>
            <li><strong>Batch Conversion</strong> – Convert multiple images simultaneously</li>
            <li><strong>Image Resizing</strong> – Adjust dimensions while maintaining aspect ratio</li>
            <li><strong>No Registration Required</strong> – Use instantly without creating an account</li>
            <li><strong>Cross-Platform</strong> – Works on Windows, Mac, Linux, iOS, and Android</li>
          </ul>
        </div>
      </article>

      {/* Supported Formats Section */}
      <article className={sectionClasses}>
        <h2 className={headingClasses}>
          Supported Image Formats: Complete Conversion Guide
        </h2>

        <p className={paragraphClasses}>
          Understanding image formats is crucial for choosing the right conversion for your needs. 
          Each format has specific strengths optimized for different use cases.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* JPG Section */}
          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={subHeadingClasses}>JPG / JPEG (Joint Photographic Experts Group)</h3>
            <p className={paragraphClasses}>
              The universal standard for photographs. JPG uses <strong>lossy compression</strong> to achieve 
              small file sizes while maintaining excellent visual quality. Ideal for photos, product images, 
              and any scenario where file size matters more than pixel-perfect accuracy.
            </p>
            <ul className={`list-disc list-inside text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Best for: Photographs, natural images</li>
              <li>Compression: Lossy (5-10x smaller than uncompressed)</li>
              <li>Transparency: Not supported</li>
              <li>Browser support: 100%</li>
            </ul>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Link to="/jpg-to-webp" className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">JPG to WebP</Link>
              <Link to="/jpg-to-png" className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">JPG to PNG</Link>
            </div>
          </div>

          {/* PNG Section */}
          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={subHeadingClasses}>PNG (Portable Network Graphics)</h3>
            <p className={paragraphClasses}>
              The go-to format for graphics requiring <strong>lossless compression</strong> and transparency. 
              PNG preserves every pixel exactly, making it perfect for logos, icons, screenshots, and images 
              with text or sharp edges.
            </p>
            <ul className={`list-disc list-inside text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Best for: Logos, icons, screenshots, graphics</li>
              <li>Compression: Lossless (no quality loss)</li>
              <li>Transparency: Full alpha channel support</li>
              <li>Browser support: 100%</li>
            </ul>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Link to="/png-to-jpg" className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">PNG to JPG</Link>
              <Link to="/png-to-webp" className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">PNG to WebP</Link>
            </div>
          </div>

          {/* WebP Section */}
          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={subHeadingClasses}>WebP (Modern Web Format)</h3>
            <p className={paragraphClasses}>
              Google's modern image format delivering <strong>25-34% smaller files than JPG</strong> and 
              <strong>26% smaller than PNG</strong> without visible quality loss. WebP supports both lossy 
              and lossless compression, plus transparency and animation.
            </p>
            <ul className={`list-disc list-inside text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Best for: Web publishing, modern applications</li>
              <li>Compression: Lossy & lossless modes</li>
              <li>Transparency: Supported in both modes</li>
              <li>Browser support: 96%+ (all major browsers)</li>
            </ul>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Link to="/webp-to-jpg" className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">WebP to JPG</Link>
              <Link to="/webp-to-png" className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">WebP to PNG</Link>
            </div>
          </div>

          {/* HEIC Section */}
          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={subHeadingClasses}>HEIC / HEIF (High Efficiency Image Format)</h3>
            <p className={paragraphClasses}>
              Apple's modern format used by iPhones since iOS 11. HEIC files are <strong>50% smaller than 
              equivalent JPGs</strong> but require conversion for compatibility with Windows and older devices.
            </p>
            <ul className={`list-disc list-inside text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Best for: iPhone/iPad photos, mobile storage</li>
              <li>Compression: Advanced lossy (HEVC-based)</li>
              <li>Transparency: Supported</li>
              <li>Browser support: Limited (requires conversion)</li>
            </ul>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Link to="/heic-to-jpg" className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">HEIC to JPG</Link>
              <Link to="/heic-to-png" className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">HEIC to PNG</Link>
            </div>
          </div>
        </div>
      </article>

      {/* How to Use Section */}
      <article className={sectionClasses}>
        <h2 className={headingClasses}>
          How to Convert Images Online – Step-by-Step Guide
        </h2>

        <p className={paragraphClasses}>
          Our image converter is designed for simplicity and speed. Follow these steps to convert your images 
          in seconds:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {[
            {
              step: 1,
              title: 'Upload Your Image',
              description: 'Click the upload area or drag and drop your file. We support JPG, PNG, WebP, GIF, BMP, TIFF, and HEIC formats.'
            },
            {
              step: 2,
              title: 'Select Output Format',
              description: 'Choose your desired format (PNG, JPEG, WebP, GIF, or BMP) based on your specific needs.'
            },
            {
              step: 3,
              title: 'Adjust Settings',
              description: 'Optionally resize your image by entering new dimensions. The aspect ratio lock maintains proportions.'
            },
            {
              step: 4,
              title: 'Convert & Download',
              description: 'Click Convert, then download your optimized image. All processing happens locally in your browser.'
            }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold ${
                darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                {item.step}
              </div>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* Why Choose Section */}
      <article className={sectionClasses}>
        <h2 className={headingClasses}>
          Why Choose img-vert Over Other Image Converters?
        </h2>

        <p className={paragraphClasses}>
          Unlike traditional online converters that require uploading your files to remote servers, 
          img-vert processes everything locally in your browser using modern JavaScript and WebAssembly technologies. 
          This fundamental difference provides several critical advantages:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Complete Privacy</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Your images never leave your device. No server uploads means no risk of data breaches, unauthorized 
              access, or privacy violations.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Instant Processing</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No upload wait times. Conversion speed depends only on your device's processing power, not your 
              internet connection speed.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No File Size Limits</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Server-based converters typically limit uploads to 5-50MB. Our local processing handles files 
              up to your browser's memory capacity.
            </p>
          </div>
        </div>
      </article>

      {/* Use Cases Section */}
      <article className={sectionClasses}>
        <h2 className={headingClasses}>
          Common Use Cases & Real-World Applications
        </h2>

        <div className="space-y-6 mt-6">
          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={subHeadingClasses}>For Web Developers & Designers</h3>
            <p className={paragraphClasses}>
              Optimize images for faster page loads and better Core Web Vitals scores. Convert PNG logos to 
              WebP for 26% smaller files, or transform product photos from JPG to WebP for 34% bandwidth savings. 
              Google's <a href="https://developers.google.com/speed/docs/insights/v5/about" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">PageSpeed Insights</a> specifically 
              recommends next-gen formats like WebP.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={subHeadingClasses}>For Photographers</h3>
            <p className={paragraphClasses}>
              Convert camera RAW exports to web-ready formats without quality loss. Create contact sheets in 
              JPG for client previews, or export portfolio images to WebP for your website. Maintain aspect 
              ratios while resizing for social media platforms.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={subHeadingClasses}>For iPhone Users on Windows</h3>
            <p className={paragraphClasses}>
              Open HEIC photos from your iPhone on Windows 10/11 without buying codecs or installing software. 
              Convert HEIC to JPG instantly in your browser—perfect for sharing with non-Apple users or uploading 
              to services that don't support HEIF.
            </p>
            <Link to="/blog/heic-files-on-windows" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Read our complete HEIC to JPG conversion guide →
            </Link>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={subHeadingClasses}>For E-commerce Sellers</h3>
            <p className={paragraphClasses}>
              Standardize product images across marketplaces. Convert supplier PNGs to JPG for Amazon, or optimize 
              photos to WebP for your Shopify store. Batch process hundreds of images without uploading sensitive 
              product photos to third-party servers.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={subHeadingClasses}>For Social Media Managers</h3>
            <p className={paragraphClasses}>
              Resize and convert images to platform-specific requirements. Instagram prefers JPG for photos and 
              PNG for graphics with text. Create multiple size variants from a single master image without 
              compromising quality.
            </p>
            <Link to="/blog/best-image-format-for-instagram" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Learn about Instagram image format best practices →
            </Link>
          </div>
        </div>
      </article>

      {/* FAQ Section */}
      <article className={sectionClasses}>
        <h2 className={headingClasses}>
          Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-6 mt-6">
          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Is this image converter really free?
            </h3>
            <p className={paragraphClasses}>
              Yes, completely free with no hidden costs. We support the service through non-intrusive advertising. 
              There are no premium tiers, watermarks, or usage limits.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Are my images uploaded to any server?
            </h3>
            <p className={paragraphClasses}>
              <strong>No.</strong> This is the key difference between img-vert and other online converters. 
              All image processing happens locally in your browser using JavaScript and Canvas API. Your images 
              never leave your device, ensuring complete privacy and security.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What is the maximum file size I can convert?
            </h3>
            <p className={paragraphClasses}>
              Since processing happens locally, the limit is your browser's available memory. In practice, this 
              means files up to 100MB or more work fine on modern devices. Server-based converters typically 
              limit uploads to 5-50MB.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Which browsers are supported?
            </h3>
            <p className={paragraphClasses}>
              All modern browsers including Chrome, Firefox, Safari, Edge, and Opera. The tool works on Windows, 
              Mac, Linux, iOS, and Android. For the best experience, ensure your browser is updated to the 
              latest version.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Does converting JPG to PNG improve quality?
            </h3>
            <p className={paragraphClasses}>
              No. Converting a JPG to PNG does not recover lost quality—the data was discarded when the JPG was 
              created. However, converting PNG to JPG will reduce file size (with some quality loss). For best 
              results, convert JPG to WebP for 25-34% smaller files at equivalent quality.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Can I convert multiple images at once?
            </h3>
            <p className={paragraphClasses}>
              Yes, our tool supports batch conversion. Select multiple files when uploading, and they will all 
              be processed. You can download each converted image individually.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What's the difference between lossy and lossless compression?
            </h3>
            <p className={paragraphClasses}>
              <strong>Lossy compression</strong> (JPG, WebP lossy) reduces file size by permanently discarding 
              some image data. The quality loss is often imperceptible. <strong>Lossless compression</strong> 
              (PNG, WebP lossless) reduces file size without losing any data—every pixel is preserved exactly.
            </p>
          </div>

          <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Is WebP better than JPG?
            </h3>
            <p className={paragraphClasses}>
              For web use, yes. WebP produces files 25-34% smaller than equivalent JPGs at the same visual quality. 
              WebP also supports transparency (which JPG doesn't) and has 96%+ browser support in 2026. 
              However, JPG remains better for print workflows and maximum compatibility.
            </p>
            <Link to="/blog/what-is-webp-format" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Learn more about WebP format →
            </Link>
          </div>
        </div>
      </article>

      {/* Resources Section */}
      <article className={sectionClasses}>
        <h2 className={headingClasses}>
          Additional Resources & Learning Materials
        </h2>

        <p className={paragraphClasses}>
          Expand your knowledge about image formats, optimization techniques, and best practices with our 
          comprehensive guides:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Link 
            to="/blog/what-is-webp-format" 
            className={`p-4 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:border-blue-500' 
                : 'bg-gray-50 border-gray-200 hover:border-blue-400'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What is WebP Format?
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Complete guide to Google's modern image format—25-34% smaller than JPEG without quality loss.
            </p>
          </Link>

          <Link 
            to="/blog/png-vs-jpg" 
            className={`p-4 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:border-blue-500' 
                : 'bg-gray-50 border-gray-200 hover:border-blue-400'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              PNG vs JPG Comparison
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              When to use each format—lossless quality vs. efficient compression for photos.
            </p>
          </Link>

          <Link 
            to="/blog/reduce-image-size-for-website" 
            className={`p-4 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:border-blue-500' 
                : 'bg-gray-50 border-gray-200 hover:border-blue-400'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Reduce Image Size for Websites
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Optimize images for faster page loads and better Google rankings.
            </p>
          </Link>

          <Link 
            to="/blog/heic-files-on-windows" 
            className={`p-4 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:border-blue-500' 
                : 'bg-gray-50 border-gray-200 hover:border-blue-400'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Open HEIC Files on Windows
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Convert iPhone photos to JPG without buying codecs or installing software.
            </p>
          </Link>

          <Link 
            to="/blog/avif-vs-webp" 
            className={`p-4 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:border-blue-500' 
                : 'bg-gray-50 border-gray-200 hover:border-blue-400'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AVIF vs WebP Comparison
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Next-gen format showdown—which offers better compression in 2026?
            </p>
          </Link>

          <Link 
            to="/blog/image-formats-explained" 
            className={`p-4 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:border-blue-500' 
                : 'bg-gray-50 border-gray-200 hover:border-blue-400'
            }`}
          >
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              All Image Formats Explained
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Complete guide to JPG, PNG, WebP, GIF, BMP, TIFF, and HEIC formats.
            </p>
          </Link>
        </div>
      </article>

      {/* External References Section - E-E-A-T */}
      <article className={sectionClasses}>
        <h2 className={headingClasses}>
          References & Authoritative Sources
        </h2>

        <p className={paragraphClasses}>
          Our recommendations are based on industry standards and authoritative sources:
        </p>

        <ul className={`list-disc list-inside space-y-2 mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>
            <a href="https://developers.google.com/speed/docs/insights/v5/about" target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 dark:text-blue-400 hover:underline">
              Google PageSpeed Insights
            </a> – Official Google documentation on image optimization and Core Web Vitals
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types" target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 dark:text-blue-400 hover:underline">
              MDN Web Docs: Image file types
            </a> – Comprehensive technical reference on web image formats
          </li>
          <li>
            <a href="https://caniuse.com/webp" target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 dark:text-blue-400 hover:underline">
              Can I use WebP?
            </a> – Up-to-date browser support statistics for WebP format
          </li>
          <li>
            <a href="https://www.w3.org/TR/webp/" target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 dark:text-blue-400 hover:underline">
              W3C WebP Specification
            </a> – Official WebP format technical specification
          </li>
          <li>
            <a href="https://support.apple.com/en-us/HT207414" target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 dark:text-blue-400 hover:underline">
              Apple Support: Use HEIF or HEVC on iPhone
            </a> – Official Apple documentation on HEIC/HEIF format
          </li>
        </ul>
      </article>

      {/* About Section */}
      <article className={sectionClasses}>
        <h2 className={headingClasses}>
          About img-vert
        </h2>

        <p className={paragraphClasses}>
          <strong>img-vert</strong> is a free, privacy-focused online image converter built by a small team 
          passionate about user privacy and web performance. Founded in 2024, our mission is to provide a 
          truly private alternative to traditional online converters that require uploading sensitive images 
          to unknown servers.
        </p>

        <p className={paragraphClasses}>
          All image processing happens directly in your browser using modern JavaScript, Canvas API, and 
          WebAssembly technologies. This means your photos, documents, and graphics never leave your device, 
          ensuring complete privacy and security.
        </p>

        <p className={paragraphClasses}>
          We believe that powerful tools should be free, accessible, and respectful of user privacy. That's 
          why img-vert is completely free to use, requires no registration, and doesn't track your activity 
          or store your files.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link 
            to="/about" 
            className={`px-5 py-2 rounded-lg font-medium transition-colors ${
              darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Learn More About Us
          </Link>
          <Link 
            to="/contact" 
            className={`px-5 py-2 rounded-lg font-medium transition-colors border ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Contact Support
          </Link>
        </div>
      </article>
    </section>
  );
};

export default SEOContent;
