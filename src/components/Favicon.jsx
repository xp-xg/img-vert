import React from 'react';

const Favicon = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 16 16"
      fill="none"
    >
      {/* Background circle */}
      <circle cx="8" cy="8" r="7" fill="#3B82F6" />
      
      {/* Image outline */}
      <rect x="3" y="3" width="10" height="10" rx="1" stroke="white" strokeWidth="1.2" fill="none" />
      
      {/* Conversion arrow */}
      <path d="M11 6L9 8L11 10" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 8H9" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};

export default Favicon;