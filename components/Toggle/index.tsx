'use client'
import {useState} from "react";
import Typography from "@/components/Typography";

type ToggleProps = {
    name: string;
    label: string;
}

export default function Toggle(props: ToggleProps) {
    const [enabled, setEnabled] = useState(false);

    const handleToggleChange = () => {
        setEnabled(!enabled);
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={handleToggleChange}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        enabled ? 'bg-sky-500' : 'bg-gray-300'
                    } transition-colors duration-300 focus:outline-none`}
                >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
        />
                </button>
            </div>
            <Typography label={props.label}/>
        </label>
    )
}