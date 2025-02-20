import React, {useState} from "react";
import {BiHide, BiShow} from "react-icons/bi";

type InputProps = {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: boolean;
    password?: string;
    height?: number
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
            className={`font-lato text-sm w-full border border-1 ${props?.error && props?.password?.length > 0 ? "border-red-300" : "border-[#9f9f9f]"} rounded-md px-[19px] py-[21px] outline-none text-[#6f6c90] font-lato  leading-[20px] shadow-[0_2px_4px_rgba(0,0,0,0.14)] `}
            placeholder={props.placeholder}
            type={showPassword ? "text" : "password"}
            onChange={props.onChange}
            style={{height: props.height}}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm"
            onClick={togglePasswordVisibility}
          >
              {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
          </button>
      </div>
    )
}