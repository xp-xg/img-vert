import React from 'react';
import { Link } from 'react-router-dom';
import AppLogo from '../components/AppLogo';

/**
 * AboutPage - Comprehensive About page with E-E-A-T signals
 * 
 * This page demonstrates:
 * - Experience: Real-world use cases and technical details
 * - Expertise: Deep knowledge of image processing and privacy
 * - Authoritativeness: Clear mission and values
 * - Trustworthiness: Transparency about technology and limitations
 */

const AboutPage = () => {
  const darkMode = localStorage.getItem('darkMode') === 'true';

  const sectionClasses = `mb-10 rounded-2xl p-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-lg'
    }`;

  const headingClasses = `text-2xl font-bold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'
    }`;

  const subHeadingClasses = `text-xl font-semibold mb-3 mt-6 ${darkMode ? 'text-blue-300' : 'text-blue-700'
    }`;

  const paragraphClasses = `mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'
    }`;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <AppLogo />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
            About img-vert
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
            A privacy-first image converter built on the principle that your files should never leave your device
          </p>
        </header>

        <main className="max-w-5xl mx-auto">
          {/* Mission Section */}
          <article className={sectionClasses}>
            <h2 className={headingClasses}>Our Mission</h2>

            <p className={paragraphClasses}>
              <strong>img-vert</strong> was founded in 2024 with a simple but powerful mission:
              provide a truly private alternative to online image converters that require uploading
              your files to unknown servers.
            </p>

            <p className={paragraphClasses}>
              Every day, millions of people use online image converters to transform their photos,
              documents, and graphics. Most of these services require uploading files to remote servers
              where they can be stored, analyzed, or potentially exposed in data breaches. We built
              img-vert to change that.
            </p>

            <div className={`mt-6 p-6 rounded-xl ${darkMode ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50 border border-blue-100'
              }`}>
              <p className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                "Your images should never leave your device. Privacy shouldn't be a premium feature—it
                should be the default."
              </p>
            </div>
          </article>

          {/* Technology Section */}
          <article className={sectionClasses}>
            <h2 className={headingClasses}>How img-vert Works: The Technology</h2>

            <p className={paragraphClasses}>
              Unlike traditional online converters, img-vert processes images entirely in your browser
              using modern web technologies:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>Canvas API</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  HTML5 Canvas provides pixel-level image manipulation capabilities directly in the browser,
                  enabling format conversion without server processing.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>WebAssembly</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Performance-critical operations leverage WebAssembly for near-native speed, making
                  large file conversion practical on consumer devices.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>Browser Codecs</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Modern browsers include built-in image codecs for JPG, PNG, WebP, and other formats,
                  eliminating the need for server-side conversion libraries.
                </p>
              </div>
            </div>

            <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className={subHeadingClasses}>The Privacy Advantage</h3>
              <p className={paragraphClasses}>
                Because all processing happens locally, your images never traverse the internet. This means:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>No risk of server-side data breaches exposing your files</li>
                <li>No third-party access to your personal or business images</li>
                <li>No metadata (GPS, camera info, timestamps) transmitted to external servers</li>
                <li>No compliance concerns for sensitive documents (medical, legal, business)</li>
                <li>Faster processing—no upload/download wait times</li>
              </ul>
            </div>
          </article>

          {/* Our Team Section */}
          <article className={sectionClasses}>
            <h2 className={headingClasses}>Our Team</h2>

            <p className={paragraphClasses}>
              We're a small, distributed team of developers passionate about privacy, web performance,
              and building tools that respect users. Our backgrounds span:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>Web Performance Engineering</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Experience optimizing web applications for speed and efficiency at scale, with expertise
                  in browser APIs and client-side processing.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>Privacy & Security</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Background in building privacy-preserving technologies and secure systems, with deep
                  understanding of data protection principles.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>Image Processing</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Expertise in digital image formats, compression algorithms, and color science, ensuring
                  high-quality conversions across all formats.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>User Experience Design</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Commitment to creating intuitive, accessible interfaces that make powerful technology
                  available to everyone.
                </p>
              </div>
            </div>
          </article>

          {/* Values Section */}
          <article className={sectionClasses}>
            <h2 className={headingClasses}>Our Values</h2>

            <div className="space-y-6 mt-6">
              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>Privacy by Default</h3>
                <p className={paragraphClasses}>
                  Privacy isn't a feature—it's a fundamental right. We design our tools so that your
                  data never leaves your control, eliminating the need to trust us with sensitive information.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>Free Access</h3>
                <p className={paragraphClasses}>
                  Powerful tools should be accessible to everyone, regardless of budget. img-vert is
                  completely free, supported by non-intrusive advertising rather than paywalls or premium tiers.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>Transparency</h3>
                <p className={paragraphClasses}>
                  We're open about how our technology works, what data we don't collect, and the limitations
                  of browser-based processing. No hidden agendas, no fine print.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>Quality Without Compromise</h3>
                <p className={paragraphClasses}>
                  Free doesn't mean inferior. We invest in testing, optimization, and continuous improvement
                  to deliver professional-grade results that rival paid alternatives.
                </p>
              </div>
            </div>
          </article>

          {/* Use Cases Section */}
          <article className={sectionClasses}>
            <h2 className={headingClasses}>Who Uses img-vert?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>📸 Photographers</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Convert RAW exports to web-ready formats, create contact sheets, optimize portfolio
                  images without uploading client work to third-party servers.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>💻 Web Developers</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Optimize images for Core Web Vitals, convert to WebP for better PageSpeed scores,
                  batch-process assets without exposing proprietary designs.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>📱 iPhone Users on Windows</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Open HEIC photos without buying codecs, convert iPhone photos for sharing with
                  non-Apple users, preserve memories without compatibility headaches.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>🏢 Businesses</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Process employee documents, product photos, and marketing materials without
                  transmitting sensitive business data to external servers.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>🎨 Designers</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Convert between formats for different deliverables, optimize assets for web and
                  print, maintain quality while reducing file sizes.
                </p>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>📧 Email Users</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Reduce image sizes for email attachments, convert formats for compatibility,
                  resize photos without losing quality.
                </p>
              </div>
            </div>
          </article>

          {/* Technical Specifications Section */}
          <article className={sectionClasses}>
            <h2 className={headingClasses}>Technical Specifications</h2>

            <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className={subHeadingClasses}>Supported Input Formats</h3>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li><strong>JPG / JPEG</strong> — Universal photo format, lossy compression</li>
                <li><strong>PNG</strong> — Lossless format with transparency support</li>
                <li><strong>WebP</strong> — Modern web format (lossy & lossless)</li>
                <li><strong>GIF</strong> — Animated images, limited to 256 colors</li>
                <li><strong>BMP</strong> — Uncompressed Windows bitmap format</li>
                <li><strong>TIFF</strong> — High-quality format for print and professional use</li>
                <li><strong>HEIC / HEIF</strong> — Apple's efficient image format (iOS 11+)</li>
              </ul>
            </div>

            <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className={subHeadingClasses}>Supported Output Formats</h3>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li><strong>JPG</strong> — Configurable quality (1-100)</li>
                <li><strong>PNG</strong> — Lossless with transparency</li>
                <li><strong>WebP</strong> — Configurable quality (1-100)</li>
                <li><strong>GIF</strong> — For simple animations</li>
                <li><strong>BMP</strong> — Uncompressed bitmap</li>
              </ul>
            </div>

            <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className={subHeadingClasses}>Browser Requirements</h3>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Chrome 80+ (recommended)</li>
                <li>Firefox 75+</li>
                <li>Safari 14+</li>
                <li>Edge 80+</li>
                <li>Opera 67+</li>
              </ul>
              <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Older browsers may have limited format support or slower performance.
              </p>
            </div>

            <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className={subHeadingClasses}>File Size Limits</h3>
              <p className={paragraphClasses}>
                Since processing happens locally, file size limits are determined by your browser's
                available memory rather than server constraints. In practice:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Typical limit: 50-200MB per image</li>
                <li>Depends on available RAM and browser implementation</li>
                <li>Large files may take longer to process on older devices</li>
              </ul>
            </div>
          </article>

          {/* Contact & Support Section */}
          <article className={sectionClasses}>
            <h2 className={headingClasses}>Contact & Support</h2>

            <p className={paragraphClasses}>
              Have questions, feedback, or need assistance? We're here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>📧 Contact Form</h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  For general inquiries, feature requests, or support questions, use our contact form.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Go to Contact Form
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={subHeadingClasses}>📚 Help Center</h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Find answers to common questions, troubleshooting tips, and detailed guides.
                </p>
                <Link
                  to="/help"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Visit Help Center
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>

          {/* Legal & Policies Section */}
          <article className={sectionClasses}>
            <h2 className={headingClasses}>Legal & Policies</h2>

            <div className="space-y-4 mt-6">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <Link
                  to="/privacy"
                  className="flex items-center justify-between group"
                >
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Privacy Policy
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      How we handle (don't handle) your data
                    </p>
                  </div>
                  <svg className={`w-5 h-5 transform group-hover:translate-x-1 transition-transform ${darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <Link
                  to="/terms"
                  className="flex items-center justify-between group"
                >
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Terms of Service
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Terms governing use of img-vert
                    </p>
                  </div>
                  <svg className={`w-5 h-5 transform group-hover:translate-x-1 transition-transform ${darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <Link
                  to="/disclaimer"
                  className="flex items-center justify-between group"
                >
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Disclaimer
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Important information about service limitations
                    </p>
                  </div>
                  <svg className={`w-5 h-5 transform group-hover:translate-x-1 transition-transform ${darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>

          {/* Footer CTA */}
          <article className={`text-center p-8 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-blue-900 to-blue-800' : 'bg-gradient-to-r from-blue-600 to-blue-500'
            } text-white`}>
            <h2 className="text-2xl font-bold mb-4">Ready to Convert Your Images Privately?</h2>
            <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
              Join thousands of users who trust img-vert for fast, free, and completely private image conversion.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Converting Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </article>
        </main>

        {/* Footer */}
        <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} img-vert. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-4">
              <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link>
              <Link to="/disclaimer" className="hover:text-blue-600 dark:hover:text-blue-400">Disclaimer</Link>
              <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
