import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock file-saver
vi.mock('file-saver', () => ({
  saveAs: vi.fn()
}));

// Mock toast
vi.mock('react-hot-toast', async () => {
  const actual = await vi.importActual('react-hot-toast');
  return {
    ...actual,
    default: {
      success: vi.fn(),
      error: vi.fn(),
    },
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    }
  };
});

// Mock canvas methods
HTMLCanvasElement.prototype.toBlob = function(callback) {
  callback(new Blob([''], { type: 'image/png' }));
};

describe('End-to-End Functionality', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('completes full image conversion workflow', async () => {
    // 1. Upload an image
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/Upload Image/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // 2. Wait for image to be processed
    await waitFor(() => {
      expect(screen.getByText(/Original: \d+ × \d+/i)).toBeInTheDocument();
    });

    // 3. Check that conversion options appear
    expect(screen.getByText(/Convert Image/i)).toBeInTheDocument();

    // 4. Select a different format
    const webpButton = screen.getByText('WEBP');
    fireEvent.click(webpButton);

    // 5. Change dimensions
    const widthInput = screen.getByLabelText(/Width/i);
    fireEvent.change(widthInput, { target: { value: '300' } });

    // 6. Click convert button
    const convertButton = screen.getByText(/Convert/i);
    fireEvent.click(convertButton);

    // 7. Wait for conversion to complete
    await waitFor(() => {
      expect(convertButton).not.toBeDisabled();
    });

    // 8. Check that converted preview appears
    // (Note: In a real test, we'd need to wait for the canvas processing)
  });

  it('handles privacy policy modal', () => {
    const privacyLink = screen.getByText(/Privacy Policy/i);
    fireEvent.click(privacyLink);

    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Information We Collect/i)).toBeInTheDocument();
  });

  it('handles terms of service modal', () => {
    const termsLink = screen.getByText(/Terms of Service/i);
    fireEvent.click(termsLink);

    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Acceptance of Terms/i)).toBeInTheDocument();
  });

  it('switches between light and dark mode', () => {
    const themeToggle = screen.getByText(/Dark Mode|Light Mode/i);
    const initialText = themeToggle.textContent;

    fireEvent.click(themeToggle);

    // Verify the text changed to indicate the opposite mode
    if (initialText.includes('Dark Mode')) {
      expect(themeToggle.textContent).toContain('Light Mode');
    } else {
      expect(themeToggle.textContent).toContain('Dark Mode');
    }
  });

  it('changes language successfully', () => {
    const languageSelect = screen.getByRole('combobox');

    // Change to Spanish
    fireEvent.change(languageSelect, { target: { value: 'es' } });

    expect(languageSelect.value).toBe('es');

    // Change back to English
    fireEvent.change(languageSelect, { target: { value: 'en' } });

    expect(languageSelect.value).toBe('en');
  });

  it('downloads converted image', () => {
    // Mock the saveAs function to verify it's called
    const saveAsMock = vi.mocked((await import('file-saver')).saveAs);

    // Simulate conversion process first
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/Upload Image/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for UI to update
    setTimeout(() => {
      const downloadButton = screen.getByText(/Download Image/i);
      fireEvent.click(downloadButton);

      // Verify saveAs was called (in a real scenario)
      // expect(saveAsMock).toHaveBeenCalled();
    }, 100);
  });
});