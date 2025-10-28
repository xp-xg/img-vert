import React, { useEffect, useRef } from 'react';

const AdsterraNativeBanner = ({ scriptSrc, containerId, className = "", style = {} }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && scriptSrc && containerId) {
      // Clear any existing content
      adRef.current.innerHTML = '';
      
      // Create a wrapper div for the native ad
      const adDiv = document.createElement('div');
      adDiv.className = 'adsterra-native-banner-wrapper';
      
      // Create and add the script
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = scriptSrc;
      
      // Create the container div
      const containerDiv = document.createElement('div');
      containerDiv.id = containerId;
      
      // Append elements
      adDiv.appendChild(script);
      adDiv.appendChild(containerDiv);
      
      // Append the ad div to the ref
      adRef.current.appendChild(adDiv);
      
      // Optionally, add a "Sponsored" or "Advertisement" label
      const label = document.createElement('div');
      label.className = 'ad-label text-xs text-gray-500 dark:text-gray-400 mt-1 text-center';
      label.textContent = 'Sponsored Content';
      adDiv.appendChild(label);
    }
  }, [scriptSrc, containerId]);

  return (
    <div 
      ref={adRef} 
      className={`adsterra-native-banner ${className}`}
      style={{ ...style }}
    />
  );
};

export default AdsterraNativeBanner;