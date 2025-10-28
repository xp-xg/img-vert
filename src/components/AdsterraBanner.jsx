import React, { useEffect, useRef } from 'react';

const AdsterraBanner = ({ 
  adKey, 
  width = 300, 
  height = 250, 
  className = "",
  style = {}
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    // Create and insert the Adsterra banner script
    if (adRef.current && adKey) {
      // Clear any existing content
      adRef.current.innerHTML = '';
      
      // Create the atOptions script
      const atOptionsScript = document.createElement('script');
      atOptionsScript.type = 'text/javascript';
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      
      // Create the invoke script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
      
      // Add both scripts to the adRef container
      adRef.current.appendChild(atOptionsScript);
      adRef.current.appendChild(invokeScript);
    }
  }, [adKey, width, height]);

  return (
    <div 
      ref={adRef} 
      className={`adsterra-banner ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        ...style,
        overflow: 'hidden'
      }}
    />
  );
};

export default AdsterraBanner;