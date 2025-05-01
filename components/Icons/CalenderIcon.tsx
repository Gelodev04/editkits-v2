import React from 'react';

const CalendarIcon = ({ size = 20, color = 'currentColor', className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.66667 5.83333V3.33333M13.3333 5.83333V3.33333M5.83333 9.16667H14.1667M4.16667 16.6667H15.8333C16.7538 16.6667 17.5 15.9205 17.5 15V6.66667C17.5 5.74619 16.7538 5 15.8333 5H4.16667C3.24619 5 2.5 5.74619 2.5 6.66667V15C2.5 15.9205 3.24619 16.6667 4.16667 16.6667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CalendarIcon;
