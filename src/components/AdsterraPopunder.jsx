import React, { useEffect } from 'react';

const AdsterraPopunder = ({ srcUrl }) => {
  useEffect(() => {
    const handlePopunder = () => {
      if (srcUrl) {
        const link = document.createElement('a');
        link.href = srcUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('adsterra_popunder_shown')) {
        handlePopunder();
        sessionStorage.setItem('adsterra_popunder_shown', 'true');
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [srcUrl]);

  return null;
};

export default AdsterraPopunder;