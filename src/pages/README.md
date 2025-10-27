# Pages Directory

This directory contains all the separate page components for the Image Converter application. These pages are routed using React Router and are accessible as standalone URLs rather than modals.

## Page Components

1. **AboutPage.jsx** - Contains information about the Image Converter application, mission, features, team, and contact information.
2. **PrivacyPolicyPage.jsx** - Detailed privacy policy explaining data collection, usage, security measures, and user rights.
3. **DisclaimerPage.jsx** - Legal disclaimer covering general information, content accuracy, external links, and limitation of liability.
4. **TermsOfServicePage.jsx** - Terms of service agreement outlining user responsibilities, prohibited uses, and legal disclaimers.
5. **ContactPage.jsx** - Contact form for users to reach out to the team with questions, feedback, or support requests.
6. **HelpPage.jsx** - Comprehensive help and support documentation with getting started guides, troubleshooting tips, and FAQs.

## Routing

These pages are integrated into the main application through React Router in `App.jsx` with the following routes:

- `/about` - About page
- `/privacy` - Privacy policy page
- `/disclaimer` - Disclaimer page
- `/terms` - Terms of service page
- `/contact` - Contact page
- `/help` - Help and support page

## SEO Benefits

By implementing these as separate pages rather than modals:
1. Each page can be individually indexed by search engines
2. Pages can be included in sitemap.xml for better crawlability
3. Each page can have its own meta descriptions and titles
4. Improved site structure and navigation
5. Better user experience with direct URLs to specific content

## Maintenance

When updating content in these pages, ensure:
1. Consistent styling with the main application
2. Proper internationalization using the i18n translation system
3. Responsive design for all device sizes
4. Accessibility compliance (proper heading structure, ARIA labels, etc.)
5. Update sitemap.xml when adding new pages
6. Update robots.txt when adding new pages