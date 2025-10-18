import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import i18n from '../i18n';

// Mock file-saver
vi.mock('file-saver', () => ({
  saveAs: vi.fn()
}));

// Mock canvas methods
HTMLCanvasElement.prototype.toBlob = function(callback) {
  callback(new Blob([''], { type: 'image/png' }));
};

describe('Localization Functionality', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders in English by default', () => {
    expect(screen.getByText(/Image Converter/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload Image/i)).toBeInTheDocument();
  });

  it('allows language selection', () => {
    const languageSelect = screen.getByRole('combobox');
    
    expect(languageSelect).toBeInTheDocument();
    
    // Check that all language options are present
    const options = languageSelect.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(0);
  });

  it('changes language when selection changes', async () => {
    const languageSelect = screen.getByRole('combobox');
    
    // Verify initial English content
    expect(screen.getByText(/Upload Image/i)).toBeInTheDocument();
    
    // Change language to Spanish
    fireEvent.change(languageSelect, { target: { value: 'es' } });
    
    // Wait for UI to update
    await waitFor(() => {
      expect(screen.getByText(/Subir Imagen/i)).toBeInTheDocument();
    });
  });

  it('supports multiple languages', () => {
    const languageSelect = screen.getByRole('combobox');
    
    const options = Array.from(languageSelect.querySelectorAll('option')).map(option => option.value);
    
    expect(options).toContain('en'); // English
    expect(options).toContain('es'); // Spanish
    expect(options).toContain('fr'); // French
    expect(options).toContain('de'); // German
    expect(options).toContain('zh'); // Chinese
    expect(options).toContain('ja'); // Japanese
  });

  it('correctly translates key UI elements', async () => {
    const languageSelect = screen.getByRole('combobox');
    
    // Test English to Spanish translation
    expect(screen.getByText(/Upload Image/i)).toBeInTheDocument();
    
    fireEvent.change(languageSelect, { target: { value: 'es' } });
    await waitFor(() => {
      expect(screen.getByText(/Subir Imagen/i)).toBeInTheDocument();
    });
    
    // Test Spanish to French translation
    fireEvent.change(languageSelect, { target: { value: 'fr' } });
    await waitFor(() => {
      expect(screen.getByText(/Télécharger une image/i)).toBeInTheDocument();
    });
    
    // Test French to English translation
    fireEvent.change(languageSelect, { target: { value: 'en' } });
    await waitFor(() => {
      expect(screen.getByText(/Upload Image/i)).toBeInTheDocument();
    });
  });

  it('translates the title and description properly', async () => {
    const languageSelect = screen.getByRole('combobox');
    
    // Verify initial English
    expect(screen.getByText(/Image Converter/i)).toBeInTheDocument();
    expect(screen.getByText(/Convert images locally in your browser with privacy/i)).toBeInTheDocument();
    
    // Change to German
    fireEvent.change(languageSelect, { target: { value: 'de' } });
    await waitFor(() => {
      expect(screen.getByText(/Bildkonverter/i)).toBeInTheDocument();
    });
  });

  it('translates guide section properly', async () => {
    const languageSelect = screen.getByRole('combobox');
    
    // Initially in English
    expect(screen.getByText(/How to Use Image Converter - Quick Guide/i)).toBeInTheDocument();
    
    // Change to Chinese
    fireEvent.change(languageSelect, { target: { value: 'zh' } });
    await waitFor(() => {
      expect(screen.getByText(/如何使用图像转换器 - 快速指南/i)).toBeInTheDocument();
    });
  });

  it('translates footer links properly', async () => {
    const languageSelect = screen.getByRole('combobox');
    
    // Initially in English
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    
    // Change to Japanese
    fireEvent.change(languageSelect, { target: { value: 'ja' } });
    await waitFor(() => {
      expect(screen.getByText(/プライバシーポリシー/i)).toBeInTheDocument();
      expect(screen.getByText(/利用規約/i)).toBeInTheDocument();
    });
  });
});