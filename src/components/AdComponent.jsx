import React, { useEffect, useRef } from 'react';

const AdComponent = ({ 
  adSlot, 
  adFormat = "auto", 
  adLayoutKey = null, 
  style = { display: "block" }, 
  className = "",
  responsive = true
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    // Load Google AdSense script if not already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9891009708137483';
      script.crossOrigin = 'anonymous';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (adRef.current && window.adsbygoogle) {
      try {
        // Push the ad to AdSense - this will respect any global consent settings
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  return (
    <div className="ad-container">
      <ins
        ref={adRef}
        className={`adsbygoogle ${className}`}
        style={style}
        data-ad-client="ca-pub-9891009708137483"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(responsive && { 'data-full-width-responsive': 'true' })}
        {...(adLayoutKey && { 'data-ad-layout-key': adLayoutKey })}
      />
    </div>
  );
};

export default AdComponent;