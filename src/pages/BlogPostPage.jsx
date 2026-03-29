import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';


// Helper to generate FAQ schema
const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Helper to generate Article schema
const generateArticleSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.description,
  "author": { "@type": "Organization", "name": post.author },
  "publisher": { "@type": "Organization", "name": "img-vert", "url": "https://img-vert.web.app" },
  "datePublished": post.datePublished,
  "dateModified": post.dateModified,
  "mainEntityOfPage": post.canonical,
  "articleBody": post.content.replace(/<[^>]*>/g, '').substring(0, 500) + '...'
});

// ShareButtons component for social media sharing
const ShareButtons = ({ post, darkMode }) => {
  const shareUrl = encodeURIComponent(post.canonical);
  const title = encodeURIComponent(post.title);
  const description = encodeURIComponent(post.description);

  const shareLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: 'hover:bg-black hover:text-white'
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}&summary=${description}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: 'hover:bg-blue-700 hover:text-white'
    },
    {
      name: 'Reddit',
      url: `https://reddit.com/submit?url=${shareUrl}&title=${title}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
      color: 'hover:bg-orange-600 hover:text-white'
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${title}%20${shareUrl}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      color: 'hover:bg-green-500 hover:text-white'
    },
    {
      name: 'Copy Link',
      url: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      color: 'hover:bg-gray-600 hover:text-white',
      onClick: (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(post.canonical);
        alert('Link copied to clipboard!');
      }
    }
  ];

  return (
    <section className={`my-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <h3 className="text-lg font-semibold mb-4">Share this article</h3>
      <div className="flex flex-wrap gap-3">
        {shareLinks.map((share) => (
          <a
            key={share.name}
            href={share.onClick ? share.url : share.url}
            onClick={share.onClick}
            target={share.onClick ? undefined : '_blank'}
            rel={share.onClick ? undefined : 'noopener noreferrer'}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border ${darkMode
                ? 'bg-gray-700 border-gray-600 text-gray-300'
                : 'bg-white border-gray-300 text-gray-700'
              } ${share.color}`}
            aria-label={`Share on ${share.name}`}
          >
            {share.icon}
            <span className="text-sm font-medium hidden sm:inline">{share.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

const BlogPostPage = ({ darkMode }) => {
  const { slug } = useParams();
  const post = blogPosts[slug];

  useEffect(() => {
    if (post) {
      // Update document title
      document.title = `${post.title} | img-vert`;

      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.description);

      // Update/Open Graph tags
      updateMetaTag('property', 'og:title', post.ogTitle || post.title);
      updateMetaTag('property', 'og:description', post.ogDescription || post.description);
      updateMetaTag('property', 'og:type', 'article');
      updateMetaTag('property', 'og:url', post.canonical);
      updateMetaTag('property', 'article:published_time', post.datePublished);
      updateMetaTag('property', 'article:modified_time', post.dateModified);

      if (post.image) {
        updateMetaTag('property', 'og:image', `https://img-vert.web.app${post.image}`);
        updateMetaTag('property', 'og:image:alt', post.imageAlt || post.title);
        updateMetaTag('name', 'twitter:image', `https://img-vert.web.app${post.image}`);
      }

      updateMetaTag('name', 'twitter:card', post.image ? 'summary_large_image' : 'summary');
      updateMetaTag('name', 'twitter:title', post.ogTitle || post.title);
      updateMetaTag('name', 'twitter:description', post.ogDescription || post.description);

      // Update canonical link
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', post.canonical);

      // Inject JSON-LD schemas
      injectSchema(post);

      // Scroll to top
      window.scrollTo(0, 0);
    }
  }, [slug, post]);

  const updateMetaTag = (attrName, attrValue, content) => {
    let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attrName, attrValue);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  const injectSchema = (post) => {
    // Remove existing schemas
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());

    // Add Article schema
    const articleSchema = document.createElement('script');
    articleSchema.type = 'application/ld+json';
    const schemaObj = generateArticleSchema(post);
    if (post.image) {
      schemaObj.image = [`https://img-vert.web.app${post.image}`];
    }
    articleSchema.textContent = JSON.stringify(schemaObj);
    document.head.appendChild(articleSchema);

    // Add FAQ schema if FAQs exist
    if (post.faqs && post.faqs.length > 0) {
      const faqSchema = document.createElement('script');
      faqSchema.type = 'application/ld+json';
      faqSchema.textContent = JSON.stringify(generateFAQSchema(post.faqs));
      document.head.appendChild(faqSchema);
    }
  };

  if (!post) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Article Not Found</h1>
          <p className="mb-8">The requested blog post does not exist.</p>
          <Link to="/blog" className="text-blue-500 hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">Home</Link></li>
            <li className="text-gray-500">/</li>
            <li><Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">Blog</Link></li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-600 dark:text-gray-400" aria-current="page">{post.title}</li>
          </ol>
        </nav>

        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Share Buttons - Top */}
        <ShareButtons post={post} darkMode={darkMode} />

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}>
              {post.category}
            </span>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {post.datePublished}
            </span>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              · {post.readTime} read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            {post.title}
          </h1>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {post.description}
          </p>

          {post.image && (
            <figure className="mb-8 overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
              <img
                src={post.image}
                alt={post.imageAlt || post.title}
                title={post.imageTitle || post.title}
                className="w-full h-auto object-cover aspect-video"
                loading="eager"
              />
            </figure>
          )}
        </header>

        {/* Article Content */}
        <article
          className={`prose prose-lg max-w-none ${darkMode ? 'prose-invert' : ''}
            prose-headings:font-bold prose-headings:text-blue-600 dark:prose-headings:text-blue-400
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-li:marker:text-blue-500 prose-table:border prose-th:border prose-td:border ${darkMode ? 'prose-table:border-gray-700 prose-th:border-gray-700 prose-td:border-gray-700' : 'prose-table:border-gray-300 prose-th:border-gray-300 prose-td:border-gray-300'}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Buttons - Below Article */}
        <ShareButtons post={post} darkMode={darkMode} />

        {/* Related Converters */}
        {post.relatedConverters && post.relatedConverters.length > 0 && (
          <section className={`mt-12 rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} border ${darkMode ? 'border-gray-700' : 'border-blue-100'}`}>
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Try These Free Converters
            </h2>
            <div className="flex flex-wrap gap-3">
              {post.relatedConverters.map((path) => {
                const label = path.replace('/', '').replace(/-/g, ' ').toUpperCase();
                return (
                  <Link
                    key={path}
                    to={path}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    {label} Converter →
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {post.relatedPosts.map((relatedSlug) => {
                const relatedPost = blogPosts[relatedSlug];
                if (!relatedPost) return null;
                return (
                  <Link
                    key={relatedSlug}
                    to={`/blog/${relatedSlug}`}
                    className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-600' : 'bg-white border-gray-200 hover:border-blue-400'
                      } transition-colors`}
                  >
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold mt-1 text-sm line-clamp-2">{relatedPost.title}</h3>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Tools Section */}
        <section className={`mt-12 rounded-2xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className="text-2xl font-bold mb-6">Related Tools & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Image Converter</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Convert between all major image formats</p>
              <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Start Converting →</Link>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Format Guide</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Learn about all image formats</p>
              <Link to="/formats" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View Guide →</Link>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Optimization Tips</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Optimize images for web</p>
              <Link to="/optimization" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Learn More →</Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`mt-12 rounded-2xl p-8 text-center ${darkMode ? 'bg-gradient-to-r from-blue-900 to-blue-800' : 'bg-gradient-to-r from-blue-600 to-blue-500'} text-white`}>
          <h2 className="text-2xl font-bold mb-4">Ready to Convert Your Images?</h2>
          <p className="mb-6 text-blue-100">Use our free, privacy-focused image converter. No uploads, no sign-up, no watermarks.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Convert Images Free</Link>
            <Link to="/help" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Help Center</Link>
            <Link to="/contact" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Contact Us</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPostPage;
