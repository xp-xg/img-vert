import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

const Navigation = ({ darkMode, setDarkMode }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/help', label: 'Help' },
    { path: '/privacy', label: 'Privacy' },
    { path: '/terms', label: 'Terms' },
    { path: '/disclaimer', label: 'Disclaimer' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ImageVert
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${location.pathname === item.path
                    ? 'border-indigo-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Selector and Theme Toggle */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>{languages.find(l => l.code === i18n.language)?.flag}</span>
                <span className="font-medium">{languages.find(l => l.code === i18n.language)?.name || 'English'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`${i18n.language === lang.code ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700`}
                        role="menuitem"
                      >
                        <span className="text-lg">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle Dark Mode"
              title={darkMode ? t('lightMode') : t('darkMode')}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${location.pathname === item.path
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-200'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Language Selector and Theme Toggle */}
        <div className="pt-2 pb-3 space-y-2 border-t border-gray-200 dark:border-gray-700 px-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">{t('language')}:</label>
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm flex-1"
            >
              <option value="en">{t('english')}</option>
              <option value="es">{t('spanish')}</option>
              <option value="fr">{t('french')}</option>
              <option value="de">{t('german')}</option>
              <option value="zh">{t('chinese')}</option>
              <option value="ja">{t('japanese')}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">{t('theme')}:</label>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm flex-1"
            >
              {darkMode ? t('lightMode') : t('darkMode')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;