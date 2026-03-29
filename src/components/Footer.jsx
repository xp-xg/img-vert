import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Image-Vert Brand Section */}
          <div className="md:col-span-5">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">
              Image-Vert
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Convert images locally in your browser with privacy. Resize, compress, and convert images without uploading to any server.
            </p>
            <p className="text-sm text-blue-500 font-medium">
              Your images are processed 100% locally in your browser - no uploads to servers.
            </p>
          </div>

          {/* Popular Image Conversions */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">
              Popular Image Conversions
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/jpg-to-webp" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  JPG TO WEBP
                </Link>
              </li>
              <li>
                <Link to="/png-to-webp" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  PNG TO WEBP
                </Link>
              </li>
              <li>
                <Link to="/heic-to-jpg" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  HEIC TO JPG
                </Link>
              </li>
              <li>
                <Link to="/png-to-jpg" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  PNG TO JPG
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Resources */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">
              Guides & Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/formats" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Complete Guide to Image Formats
                </Link>
              </li>
              <li>
                <Link to="/optimization" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Image Optimization Tips
                </Link>
              </li>
              <li>
                <Link to="/advanced" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Advanced Techniques
                </Link>
              </li>
              <li>
                <Link to="/use-cases" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Industry Use Cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">
              Company & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border and Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
              © {currentYear} Image Converter. All rights reserved.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              Free online image converter. Convert JPG, PNG, WebP, HEIC, GIF, BMP, TIFF privately in your browser.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
