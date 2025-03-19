import React, {useState} from "react";
import {BiHide, BiShow} from "react-icons/bi";

type InputProps = {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: boolean;
    height?: number;
    value?: number | string
}

export default function PasswordInput(props: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
      <div className="relative w-full">
          <input
            //@ts-ignore
            className={`font-lato text-sm w-full border border-1 ${props?.error ? "border-red-300" : "border-[#9f9f9f]"} rounded-md px-[19px] py-[14px] outline-none text-[#6f6c90] h-12 leading-[20px] shadow-[0_2px_4px_rgba(0,0,0,0.14)] `}
            placeholder={props.placeholder}
            type={showPassword ? "text" : "password"}
            onChange={props.onChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm"
            onClick={togglePasswordVisibility}
          >
              {showPassword ? <BiHide color="#a0aec0" size={20} /> : <BiShow color="#a0aec0" size={20} />}
          </button>
      </div>
    )
}