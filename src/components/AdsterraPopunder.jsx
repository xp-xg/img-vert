import React, { useEffect } from 'react';

const AdsterraPopunder = ({ srcUrl }) => {
  useEffect(() => {
    // Function to handle exit intent or timed popunder
    const handlePopunder = () => {
      // Only proceed if we have srcUrl
      if (srcUrl) {
        // Create the script element and add to document head
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = srcUrl;
        
        document.head.appendChild(script);
      }
    };

    // Option 1: Show popunder after a delay (e.g., 5 seconds)
    const timer = setTimeout(() => {
      // Check if user has already interacted with the site
      if (!sessionStorage.getItem('adsterra_popunder_shown')) {
        handlePopunder();
        sessionStorage.setItem('adsterra_popunder_shown', 'true');
      }
    }, 5000); // 5 seconds delay

    // Option 2: Exit intent popunder (optional)
    const handleExitIntent = (e) => {
      if (!e.toElement && !e.relatedTarget && !sessionStorage.getItem('adsterra_popunder_shown')) {
        handlePopunder();
        sessionStorage.setItem('adsterra_popunder_shown', 'true');
      }
    };

    // Add exit intent listener
    document.addEventListener('mouseout', handleExitIntent, { once: true });

    // Cleanup function
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleExitIntent);
    };
  }, [srcUrl]);

  // This component doesn't render anything visible
  return null;
};

export default AdsterraPopunder;