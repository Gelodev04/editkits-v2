import React from 'react';

const CloudIcon = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.5 19C4.01472 19 2 16.9853 2 14.5C2 12.1564 3.79151 10.2313 6.07974 10.0194C6.5476 7.17213 9.02037 5 12 5C15.3137 5 18 7.68629 18 11C18 11.2088 17.9859 11.414 17.9585 11.6151C19.7926 12.2097 21 13.9239 21 15.9999C21 18.7614 18.7614 21 16 21H6.5V19Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
