import React, { useState } from 'react';
import Typography from '@/components/Typography';
import { IoIosArrowDown } from 'react-icons/io';

type Option = {
  label: string;
  value: string | number;
};

type FormSelectProps = {
  label?: string;
  options: Option[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  error?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  helperText?: string;
  required?: boolean;
  name?: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
};

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  leftIcon,
  error,
  className = '',
  size = 'md',
  variant = 'outline',
  helperText,
  required = false,
  name,
  id,
  placeholder,
  fullWidth = true,
}) => {
  const [focusState, setFocusState] = useState(false);

  // Input sizing classes
  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg',
  };

  // Left icon padding
  const leftIconPadding = leftIcon ? 'pl-10' : 'pl-3';

  // Combine all select classes
  const selectClasses = `
    w-full font-lato rounded-md outline-none transition-all duration-200 appearance-none pr-10
    ${sizeClasses[size]}
    ${leftIconPadding}
    ${variant === 'outline' ? 'border border-gray-200' : 'bg-gray-50 border border-transparent'}
    ${error ? 'border-red-300 focus:border-red-500' : 'focus:border-blue-500'}
    ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-900'}
    ${focusState ? 'ring-2 ring-blue-100' : ''}
    ${className}
  `;

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'}`}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <Typography
            variant="b4"
            label={label}
            className={`text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700'}`}
          />
          {required && <span className="text-red-500">*</span>}
        </div>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}

        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={selectClasses}
          onFocus={() => setFocusState(true)}
          onBlur={() => setFocusState(false)}
          name={name}
          id={id}
          required={required}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
          <IoIosArrowDown size={16} />
        </div>
      </div>

      {(error || helperText) && (
        <div className={`text-xs mt-1 ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default FormSelect;
