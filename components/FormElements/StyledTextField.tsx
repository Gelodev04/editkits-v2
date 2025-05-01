import React from 'react';
import TextField from '@/components/TextField';

/**
 * StyledTextField component with icon support
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Input placeholder text
 * @param {string} props.type - Input type (text, number, etc)
 * @param {string|number} props.value - Input value
 * @param {Function} props.onChange - Change handler function
 * @param {boolean} props.disabled - Whether input is disabled
 * @param {React.ReactNode} props.icon - Optional icon to display on the right
 * @returns {JSX.Element}
 */
const StyledTextField = ({ label, placeholder, type, value, onChange, disabled, icon }) => (
  <div className="relative">
    <TextField
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      variant="t2"
      label={label}
    />
    {icon && <div className="absolute right-3 top-[38px] text-blue-600">{icon}</div>}
  </div>
);

export default StyledTextField;
