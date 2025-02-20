import {useState} from "react";
import Typography from "@/components/Typography";

type ToggleProps = {
  label: string;
}

export default function Toggle(props: ToggleProps) {
  const [enabled, setEnabled] = useState(true);

  const handleToggleChange = () => {
    setEnabled(!enabled);
  };

  return (
    <div className="inline-flex items-center cursor-auto gap-3">
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleToggleChange}
          className={`relative inline-flex h-[18.5px] w-[42.32px] cursor-auto items-center rounded-full ${
            enabled ? 'bg-[#273266]' : 'bg-gray-300'
          } transition-colors duration-300 focus:outline-none`}
        >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
            enabled ? 'translate-x-7' : 'translate-x-0.5'
          }`}
        />
        </button>
      </div>
      <Typography label={props.label} variant="b3" />
    </div>
  )
}