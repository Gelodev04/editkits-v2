'use client';
import React, { useState } from 'react';

interface SwitchProps {
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  color?: 'blue' | 'gray'; // Added prop to toggle color theme (now always uses blue)
}

const Switch: React.FC<SwitchProps> = ({
  label,
  defaultChecked = false,
  disabled = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (disabled) return;
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  // Always use blue color for the switch regardless of state
  const switchColors = {
    background: 'bg-brand-500', // Always blue
    knob: isChecked ? 'translate-x-full bg-white' : 'translate-x-0 bg-white',
  };

  return (
    <label
      className={`flex cursor-pointer select-none items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium ${
        disabled ? 'text-gray-400' : 'text-gray-700 dark:text-gray-400'
      }`}
      onClick={handleToggle} // Toggle when the label itself is clicked
    >
      {label}
      <div className="relative">
        <div
          className={`block transition duration-150 ease-linear h-5 sm:h-6 w-9 sm:w-11 rounded-full ${
            disabled ? 'bg-gray-100 pointer-events-none dark:bg-gray-800' : switchColors.background
          }`}
        ></div>
        <div
          className={`absolute left-0.5 top-0.5 h-4 sm:h-5 w-4 sm:w-5 rounded-full shadow-theme-sm duration-150 ease-linear transform ${switchColors.knob}`}
        ></div>
      </div>
    </label>
  );
};

export default Switch;
