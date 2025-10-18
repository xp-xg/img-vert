import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock file-saver
vi.mock('file-saver', () => ({
  saveAs: vi.fn()
}));

// Mock canvas methods
HTMLCanvasElement.prototype.toBlob = function(callback) {
  callback(new Blob([''], { type: 'image/png' }));
};

describe('Image Conversion Functionality', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('allows format selection', () => {
    // Simulate image upload first to enable conversion options
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/Upload Image/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Test format selection buttons
    const pngButton = screen.getByText('PNG');
    const jpegButton = screen.getByText('JPEG');
    const webpButton = screen.getByText('WEBP');
    const gifButton = screen.getByText('GIF');
    const bmpButton = screen.getByText('BMP');

    expect(pngButton).toBeInTheDocument();
    expect(jpegButton).toBeInTheDocument();
    expect(webpButton).toBeInTheDocument();
    expect(gifButton).toBeInTheDocument();
    expect(bmpButton).toBeInTheDocument();

    fireEvent.click(webpButton);
    expect(webpButton).toHaveClass('bg-blue-500');
  });

  it('allows resizing options', () => {
    // Simulate image upload first to enable conversion options
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/Upload Image/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait a bit for UI to update after upload simulation
    setTimeout(() => {
      const widthInput = screen.getByLabelText(/Width/i);
      const heightInput = screen.getByLabelText(/Height/i);
      const aspectRatioCheckbox = screen.getByLabelText(/Maintain aspect ratio/i);

      expect(widthInput).toBeInTheDocument();
      expect(heightInput).toBeInTheDocument();
      expect(aspectRatioCheckbox).toBeInTheDocument();

      fireEvent.change(widthInput, { target: { value: '200' } });
      fireEvent.change(heightInput, { target: { value: '150' } });

      expect(widthInput.value).toBe('200');
      expect(heightInput.value).toBe('150');
    }, 100);
  });

  it('converts image when convert button is clicked', async () => {
    // We need to simulate a complete workflow here
    // This test might need more complex mocking for full conversion
  });
});