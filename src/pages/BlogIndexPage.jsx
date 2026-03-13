import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const blogPosts = [
  {
    slug: 'what-is-webp-format',
    title: 'What is WebP Format? Everything You Need to Know (2026)',
    excerpt: 'WebP is a modern image format from Google that produces files 25–34% smaller than JPEG and 26% smaller than PNG — without visible quality loss.',
    date: 'March 2026',
    readTime: '6 min',
    category: 'Formats'
  },
  {
    slug: 'heic-files-on-windows',
    title: 'How to Open & Convert HEIC Files on Windows 10 & 11 — Free, No Upload',
    excerpt: "Can't open HEIC photos from your iPhone on Windows? Here's how to convert HEIC to JPG instantly in your browser — no software to install.",
    date: 'March 2026',
    readTime: '5 min',
    category: 'How-To'
  },
  {
    slug: 'png-vs-jpg',
    title: 'PNG vs JPG: Which Image Format Should You Use? (2026 Guide)',
    excerpt: 'Use JPG for photos (smaller files), PNG for graphics with transparency (lossless quality). Full comparison with examples.',
    date: 'March 2026',
    readTime: '7 min',
    category: 'Comparison'
  },
  {
    slug: 'reduce-image-size-for-website',
    title: 'How to Reduce Image Size for Your Website — Without Losing Quality',
    excerpt: 'Large images slow down your website and hurt your Google ranking. Here\'s how to reduce image file size using format conversion.',
    date: 'March 2026',
    readTime: '7 min',
    category: 'Optimization'
  },
  {
    slug: 'image-formats-explained',
    title: 'Image Formats Explained: JPG, PNG, WebP, GIF, BMP, TIFF & HEIC (2026)',
    excerpt: 'A complete guide to every common image format — what each one is, when to use it, and how to convert between them.',
    date: 'March 2026',
    readTime: '10 min',
    category: 'Guide'
  },
  {
    slug: 'best-image-format-for-instagram',
    title: 'Best Image Format for Instagram in 2026 — JPG vs PNG vs WebP',
    excerpt: 'Instagram recommends JPG for photos and PNG for graphics. Learn the exact image specs, formats, and dimensions for the sharpest posts.',
    date: 'March 2026',
    readTime: '6 min',
    category: 'Social Media'
  },
  {
    slug: 'avif-vs-webp',
    title: 'AVIF vs WebP: Which Format Should You Use in 2026?',
    excerpt: 'AVIF offers better compression than WebP but slower encoding and less browser support. Full comparison with recommendations.',
    date: 'March 2026',
    readTime: '7 min',
    category: 'Comparison'
  },
  {
    slug: 'jpeg-vs-jpg-difference',
    title: "What's the Difference Between JPEG and JPG? (The Answer Might Surprise You)",
    excerpt: 'There is no difference between JPEG and JPG — they are exactly the same format. Here\'s why two extensions exist.',
    date: 'March 2026',
    readTime: '4 min',
    category: 'FAQ'
  },
  {
    slug: 'image-format-print-vs-web',
    title: 'Best Image Format for Print vs Web: TIFF, JPG, PNG & WebP Explained',
    excerpt: 'Use TIFF or high-quality JPG for print. Use WebP or JPG for web. Full guide to choosing the right image format.',
    date: 'March 2026',
    readTime: '7 min',
    category: 'Guide'
  },
  {
    slug: 'convert-images-without-uploading',
    title: 'Convert Images Without Uploading: The Private, Browser-Based Way',
    excerpt: 'Most image converters upload your files to unknown servers. img-vert converts images entirely in your browser — your files never leave your device.',
    date: 'March 2026',
    readTime: '5 min',
    category: 'Privacy'
  }
];

const BlogIndexPage = ({ darkMode }) => {
  const { t } = useTranslation();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-9-3h3m3 0h3" />
            </svg>
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">Image-Vert Blog</h1>
          </div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Expert guides on image formats, optimization, and privacy-focused conversion. Learn how to choose the right format for every use case.
          </p>
        </header>

        {/* Featured Post */}
        <section className="mb-12">
          <div className={`rounded-2xl p-8 ${darkMode ? 'bg-gradient-to-r from-blue-900 to-blue-800' : 'bg-gradient-to-r from-blue-600 to-blue-500'} text-white shadow-xl`}>
            <div className="flex items-center gap-2 mb-4 text-blue-100">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">Featured</span>
              <span className="text-sm">6 min read</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What is WebP Format? Everything You Need to Know</h2>
            <p className="text-blue-100 mb-6 max-w-3xl">
              WebP is Google's modern image format — 25–34% smaller than JPEG, 26% smaller than PNG. Learn how it works, browser support in 2026, and how to convert your images free.
            </p>
            <Link 
              to="/blog/what-is-webp-format"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Read Article
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {['All', 'Formats', 'How-To', 'Comparison', 'Optimization', 'Guide', 'Social Media', 'FAQ', 'Privacy'].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'} shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>
                  {post.category}
                </span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {post.readTime}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 line-clamp-2">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              
              <p className={`text-sm mb-4 line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {post.date}
                </span>
                <Link 
                  to={`/blog/${post.slug}`}
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline inline-flex items-center gap-1"
                >
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* CTA Section */}
        <section className={`rounded-2xl p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} border ${darkMode ? 'border-gray-700' : 'border-blue-100'}`}>
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            Ready to Convert Your Images?
          </h2>
          <p className={`mb-6 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Use our free, privacy-focused image converter. No uploads, no sign-up, no watermarks.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Convert Images Free
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default BlogIndexPage;
