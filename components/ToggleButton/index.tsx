import React from 'react';
// import ComponentCard from '../cards/ComponentCard';
import Switch from '../switch/Switch';

type ToggleButtonProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function ToggleButton(props: ToggleButtonProps) {
  const handleSwitchChange = (checked: boolean) => {
    console.log('Switch is now:', checked ? 'ON' : 'OFF');
  };

  return (
    // <ComponentCard title={props.label}>
    <div className="flex">
      <Switch label={props.label} defaultChecked={props.checked} onChange={props.onChange} />
    </div>
    // </ComponentCard>
  );
}
