import React, { useState } from 'react';
import Typography from '@/components/Typography';
import { BiHide, BiShow } from 'react-icons/bi';

type FormInputProps = {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  helperText?: string;
  required?: boolean;
  name?: string;
  id?: string;
  autoComplete?: string;
  min?: number;
  max?: number;
  step?: number;
  readOnly?: boolean;
  fullWidth?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  leftIcon,
  rightIcon,
  error,
  className = '',
  size = 'md',
  variant = 'outline',
  helperText,
  required = false,
  name,
  id,
  autoComplete,
  min,
  max,
  step,
  readOnly = false,
  fullWidth = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusState, setFocusState] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Input sizing classes
  const sizeClasses = {
    sm: 'h-8 text-sm px-2',
    md: 'h-10 text-base px-3',
    lg: 'h-12 text-lg px-4',
  };

  // Left icon padding
  const leftIconPadding = leftIcon ? 'pl-10' : '';

  // Right icon padding
  const rightIconPadding = rightIcon || type === 'password' ? 'pr-10' : '';

  // Combine all input classes
  const inputClasses = `
    w-full font-lato rounded-md outline-none transition-all duration-200
    ${sizeClasses[size]}
    ${leftIconPadding}
    ${rightIconPadding}
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

        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={inputClasses}
          onFocus={() => setFocusState(true)}
          onBlur={() => setFocusState(false)}
          name={name}
          id={id}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={step}
          readOnly={readOnly}
          required={required}
        />

        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
          </button>
        )}

        {rightIcon && type !== 'password' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <div className={`text-xs mt-1 ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default FormInput;
