import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock file-saver
vi.mock('file-saver', () => ({
  saveAs: vi.fn()
}));

// Mock canvas methods
HTMLCanvasElement.prototype.toBlob = function(callback) {
  callback(new Blob([''], { type: 'image/png' }));
};

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders the app header correctly', () => {
    expect(screen.getByText(/Image Converter/i)).toBeInTheDocument();
    expect(screen.getByText(/Convert images locally in your browser with privacy/i)).toBeInTheDocument();
  });

  it('renders the language selector', () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    expect(screen.getByText(/Dark Mode|Light Mode/i)).toBeInTheDocument();
  });

  it('renders the upload section', () => {
    expect(screen.getByText(/Drag & drop your image here or click to browse/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload Image/i)).toBeInTheDocument();
  });

  it('renders the supported formats text', () => {
    expect(screen.getByText(/Supported formats: JPG, PNG, WebP, GIF, BMP, TIFF, HEIF/i)).toBeInTheDocument();
  });
});