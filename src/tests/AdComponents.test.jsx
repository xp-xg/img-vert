import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock file-saver
vi.mock('file-saver', () => ({
  saveAs: vi.fn()
}));

// Mock canvas methods
HTMLCanvasElement.prototype.toBlob = function(callback) {
  callback(new Blob([''], { type: 'image/png' }));
};

describe('Ad Components', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders top banner ad', () => {
    expect(screen.getByText('Top Banner Ad')).toBeInTheDocument();
  });

  it('renders ad space in conversion options', () => {
    expect(screen.getByText('Ad Space')).toBeInTheDocument();
  });

  it('renders middle banner ad', () => {
    expect(screen.getByText('Middle Banner Ad')).toBeInTheDocument();
  });

  it('renders footer ad', () => {
    expect(screen.getByText('Footer Ad')).toBeInTheDocument();
  });

  it('renders advertisement label', () => {
    expect(screen.getByText('Advertisement')).toBeInTheDocument();
  });
});