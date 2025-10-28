import React, { useEffect, useRef } from 'react';

const AdsterraSocialBar = ({ srcUrl, className = "", style = {} }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && srcUrl) {
      // Clear any existing content
      adRef.current.innerHTML = '';
      
      // Create a wrapper div for the social bar ad
      const adDiv = document.createElement('div');
      adDiv.className = 'adsterra-social-bar-wrapper';
      
      // Create the script element
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = srcUrl;
      
      // Append the script to the ad div
      adDiv.appendChild(script);
      
      // Append the ad div to the ref
      adRef.current.appendChild(adDiv);
    }
  }, [srcUrl]);

  return (
    <div 
      ref={adRef} 
      className={`adsterra-social-bar ${className}`}
      style={{ ...style }}
    />
  );
};

export default AdsterraSocialBar;