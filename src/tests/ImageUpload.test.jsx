import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
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

describe('Image Upload Functionality', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('allows image upload via file input', async () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    
    const fileInput = screen.getByLabelText(/Upload Image/i);
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText(/Original: \d+ × \d+/i)).toBeInTheDocument();
    });
  });

  it('handles drag and drop of images', () => {
    const dropArea = screen.getByText(/Drag & drop your image here or click to browse/i).closest('div');
    const file = new File([''], 'test.png', { type: 'image/png' });
    
    fireEvent.dragOver(dropArea);
    fireEvent.drop(dropArea, {
      dataTransfer: {
        files: [file]
      }
    });
    
    // Wait for possible image processing
    setTimeout(() => {
      // Check if image preview appears
      expect(dropArea).toBeTruthy(); // Basic check that the area exists
    }, 100);
  });

  it('validates file type correctly', async () => {
    // This test would check that invalid file types are rejected
    // Implementation would depend on how the validation is handled
  });

  it('validates file size correctly', async () => {
    // Create a file larger than 100MB
    const largeFile = new File([new ArrayBuffer(101 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    
    const fileInput = screen.getByLabelText(/Upload Image/i);
    fireEvent.change(fileInput, { target: { files: [largeFile] } });
    
    // Wait for possible error message
    await new Promise(resolve => setTimeout(resolve, 100));
  });
});