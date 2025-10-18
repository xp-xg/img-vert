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

describe('Contact Form Validation', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('opens contact modal when contact link is clicked', () => {
    const contactLink = screen.getByText(/Contact/i);
    fireEvent.click(contactLink);
    
    // Check if the modal is displayed
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const contactLink = screen.getByText(/Contact/i);
    fireEvent.click(contactLink);
    
    const submitButton = screen.getByText(/Send Message/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Subject is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const contactLink = screen.getByText(/Contact/i);
    fireEvent.click(contactLink);
    
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByText(/Send Message/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates message length', async () => {
    const contactLink = screen.getByText(/Contact/i);
    fireEvent.click(contactLink);
    
    const messageInput = screen.getByLabelText(/Message/i);
    fireEvent.change(messageInput, { target: { value: 'short' } }); // Less than 10 characters
    
    const submitButton = screen.getByText(/Send Message/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Message should be at least 10 characters long/i)).toBeInTheDocument();
    });
  });

  it('submits successfully with valid data', async () => {
    const contactLink = screen.getByText(/Contact/i);
    fireEvent.click(contactLink);
    
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const subjectInput = screen.getByLabelText(/Subject/i);
    const messageInput = screen.getByLabelText(/Message/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message with sufficient length.' } });
    
    const submitButton = screen.getByText(/Send Message/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      // In our implementation, this would trigger a success toast
      // We're checking that no errors are shown
      expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument();
    });
  });
});