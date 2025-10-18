// Simple error logging service
class ErrorLogger {
  constructor() {
    this.apiEndpoint = null; // In a real app, you might set this to your error tracking service
  }

  // Log error to console and potentially to external service
  logError(error, context = {}) {
    const errorInfo = {
      message: error.message || error,
      stack: error.stack || new Error().stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Log to console in development
    console.error('Application Error:', errorInfo);

    // In a production environment, you would send this to an error tracking service
    // For example, Sentry, LogRocket, or your own backend service
    this.sendToExternalService(errorInfo);
  }

  // Simulate sending to external service (would be implemented with real service in production)
  sendToExternalService(errorInfo) {
    // In a real implementation, you would send the error to an external service like:
    // fetch('/api/log-error', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorInfo)
    // })
    
    // For this implementation, we'll just simulate the call
    if (process.env.NODE_ENV === 'production') {
      // In production, you would send errors to your backend or error tracking service
      // Example: 
      // fetch('/api/log-error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorInfo)
      // }).catch(console.error);
    }
  }

  // Log a warning
  logWarning(message, context = {}) {
    const warningInfo = {
      message,
      context,
      timestamp: new Date().toISOString(),
      type: 'warning'
    };

    console.warn('Application Warning:', warningInfo);
    // Optionally send to external service as well
  }

  // Log general information
  logInfo(message, context = {}) {
    const info = {
      message,
      context,
      timestamp: new Date().toISOString(),
      type: 'info'
    };

    console.info('Application Info:', info);
  }
}

// Create a singleton instance
const errorLogger = new ErrorLogger();
export default errorLogger;