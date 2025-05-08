import React from 'react';
// import ComponentCard from '../cards/ComponentCard';
import Switch from '../switch/Switch';

type ToggleButtonProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function ToggleButton(props: ToggleButtonProps) {
  // const handleSwitchChange = (checked: boolean) => {
  //   console.log('Switch is now:', checked ? 'ON' : 'OFF');
  // };

  return (
    // <ComponentCard title={props.label}>
    <div className="flex items-center space-x-1 sm:space-x-2">
      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Preset</span>
      <Switch label="" defaultChecked={props.checked} onChange={props.onChange} />
      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Custom</span>
    </div>
    // </ComponentCard>
  );
}
