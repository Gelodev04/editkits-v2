import React, {useState} from "react";
import {BiHide, BiShow} from "react-icons/bi";

type InputProps = {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export default function PasswordInput(props: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
      <div className="relative w-full">
          <input
            className="w-full border border-solid border-2 border-slate-200 p-3 rounded-md outline-none text-[#2c2c2c] pr-10"
            placeholder={props.placeholder}
            type={showPassword ? "text" : "password"}
            onChange={props.onChange}
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