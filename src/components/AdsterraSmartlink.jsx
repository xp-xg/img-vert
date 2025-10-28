import React from 'react';

const AdsterraSmartlink = ({ linkUrl, className = "", style = {} }) => {
  return (
    <div className={`adsterra-smartlink ${className}`} style={{ ...style }}>
      <iframe 
        src={linkUrl}
        style={{ 
          width: '100%', 
          height: '60px', 
          border: 'none',
          overflow: 'hidden'
        }}
        scrolling="no"
        frameBorder="0"
        allowTransparency="true"
      ></iframe>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
        Recommended Content
      </div>
    </div>
  );
};

export default AdsterraSmartlink;