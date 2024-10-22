import React from "react";

type InputProps = {
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
    return (
        <input
            className="w-full border border-solid border-2 border-neutral-500 p-2 rounded-md outline-none text-black"
            placeholder={props.placeholder}
            type="text"
            onChange={props.onChange}
        />
    )
}