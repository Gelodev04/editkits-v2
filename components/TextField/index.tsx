import Typography from "@/components/Typography";
import Input from "@/components/Input";
import React from "react";

type TextFieldProps = {
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export default function TextField(props: TextFieldProps) {
    return (
        <>
            <Typography label={props.label} />
            <div className="pt-2">
                <Input onChange={props.onChange} placeholder={props.placeholder} />
            </div>
        </>
    )
}