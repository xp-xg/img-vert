import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLogo from '../components/AppLogo';

const ContactPage = () => {
  const { t } = useTranslation();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactErrors, setContactErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactChange = (e) => {
    const { id, value } = e.target;
    setContactForm({
      ...contactForm,
      [id]: value
    });
    
    // Clear error when user starts typing
    if (contactErrors[id]) {
      setContactErrors({
        ...contactErrors,
        [id]: ''
      });
    }
  };

  const validateContactForm = () => {
    const errors = {};
    
    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!contactForm.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!contactForm.message.trim()) {
      errors.message = 'Message is required';
    } else if (contactForm.message.length < 10) {
      errors.message = 'Message should be at least 10 characters long';
    }
    
    return errors;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    try {
      const errors = validateContactForm();
      
      if (Object.keys(errors).length > 0) {
        setContactErrors(errors);
        return;
      }
      
      setIsSubmitting(true);
      
      // Create mailto link with form data
      const recipient = 'imagecpro@gmail.com';
      const subject = encodeURIComponent(contactForm.subject);
      const body = encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`);
      
      const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
      
      // Open the user's email client
      window.location.href = mailtoLink;
      
      // Reset submitting state after a short delay
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error during contact form submission:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <AppLogo />
            <p className="text-gray-600 dark:text-gray-400 mt-2">{t('description')}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <select 
              value={localStorage.getItem('language') || 'en'} 
              onChange={(e) => {
                localStorage.setItem('language', e.target.value);
                window.location.reload();
              }}
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
              onClick={() => {
                document.documentElement.classList.toggle('dark');
                localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
              }}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 flex items-center gap-2"
            >
              {document.documentElement.classList.contains('dark') ? t('lightMode') : t('darkMode')}
            </button>
          </div>
        </header>

        <main className="max-w-2xl mx-auto">
          <section className={`rounded-xl p-6 mb-8 ${localStorage.getItem('darkMode') === 'true' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">{t('contactTitle')}</h1>
              <p className="mb-4">{t('contactSubtitle')}</p>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">{t('nameLabel')}</label>
                  <input
                    type="text"
                    id="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    className={`w-full p-2 border rounded-lg ${contactErrors.name ? 'border-red-500' : ''} ${localStorage.getItem('darkMode') === 'true' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    placeholder={t('nameLabelField')}
                  />
                  {contactErrors.name && <p className="text-red-500 text-sm mt-1">{contactErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">{t('emailLabel')}</label>
                  <input
                    type="email"
                    id="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    className={`w-full p-2 border rounded-lg ${contactErrors.email ? 'border-red-500' : ''} ${localStorage.getItem('darkMode') === 'true' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    placeholder={t('emailLabelField')}
                  />
                  {contactErrors.email && <p className="text-red-500 text-sm mt-1">{contactErrors.email}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">{t('subjectLabel')}</label>
                <input
                  type="text"
                  id="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  className={`w-full p-2 border rounded-lg ${contactErrors.subject ? 'border-red-500' : ''} ${localStorage.getItem('darkMode') === 'true' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  placeholder={t('subjectLabelField')}
                />
                {contactErrors.subject && <p className="text-red-500 text-sm mt-1">{contactErrors.subject}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">{t('messageLabel')}</label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  rows="5"
                  className={`w-full p-2 border rounded-lg ${contactErrors.message ? 'border-red-500' : ''} ${localStorage.getItem('darkMode') === 'true' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  placeholder={t('messagePlaceholder')}
                ></textarea>
                {contactErrors.message && <p className="text-red-500 text-sm mt-1">{contactErrors.message}</p>}
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  {t('openEmailClient')}
                </button>
              </div>
            </form>
          </section>
        </main>

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
  );
};

export default ContactPage;