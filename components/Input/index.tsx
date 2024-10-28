import React from "react";

type InputProps = {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export default function Input(props: InputProps) {
    return (
        <input
            className="w-full border border-solid border-2 border-slate-200 p-3 rounded-md outline-none text-[#2c2c2c]"
            placeholder={props.placeholder}
            type={props.type || "text"}
            onChange={props.onChange}
        />
    )
}