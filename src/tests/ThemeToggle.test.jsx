import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock file-saver
vi.mock('file-saver', () => ({
  saveAs: vi.fn()
}));

// Mock canvas methods
HTMLCanvasElement.prototype.toBlob = function(callback) {
  callback(new Blob([''], { type: 'image/png' }));
};

describe('Theme Toggle Functionality', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('toggles between dark and light mode', () => {
    const themeToggle = screen.getByText(/Dark Mode|Light Mode/i);
    
    // Initially, it should show the current mode (based on system preference)
    const initialText = themeToggle.textContent;
    
    fireEvent.click(themeToggle);
    
    // After clicking, it should show the opposite mode
    if (initialText.includes('Dark Mode')) {
      expect(themeToggle.textContent).toContain('Light Mode');
    } else {
      expect(themeToggle.textContent).toContain('Dark Mode');
    }
  });

  it('applies dark mode class to document element', () => {
    const themeToggle = screen.getByText(/Dark Mode|Light Mode/i);
    
    // Click to ensure dark mode is applied if it's not already
    fireEvent.click(themeToggle);
    
    // Check if the dark class is applied to the document element
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});