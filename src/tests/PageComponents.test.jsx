import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AboutPage from './AboutPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import DisclaimerPage from './DisclaimerPage';
import TermsOfServicePage from './TermsOfServicePage';
import ContactPage from './ContactPage';
import HelpPage from './HelpPage';

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true,
});

describe('Page Components', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders AboutPage without crashing', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText('about')).toBeInTheDocument();
  });

  it('renders PrivacyPolicyPage without crashing', () => {
    renderWithRouter(<PrivacyPolicyPage />);
    expect(screen.getByText('privacyPolicy')).toBeInTheDocument();
  });

  it('renders DisclaimerPage without crashing', () => {
    renderWithRouter(<DisclaimerPage />);
    expect(screen.getByText('disclaimer')).toBeInTheDocument();
  });

  it('renders TermsOfServicePage without crashing', () => {
    renderWithRouter(<TermsOfServicePage />);
    expect(screen.getByText('termsOfServiceTitle')).toBeInTheDocument();
  });

  it('renders ContactPage without crashing', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText('contactTitle')).toBeInTheDocument();
  });

  it('renders HelpPage without crashing', () => {
    renderWithRouter(<HelpPage />);
    expect(screen.getByText('helpTitle')).toBeInTheDocument();
  });
});