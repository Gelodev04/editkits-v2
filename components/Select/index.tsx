import React from "react";

import {FormControl, MenuItem, Select as Dropdown} from "@mui/material";

import Typography from "@/components/Typography";

type SelectProps = {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  error?: boolean;
  value: string;
  setValue: (e: React.SetStateAction<string>) => void;
  options: any;
  disabled?: boolean;
  variant?: string;
}

export default function Select(props: SelectProps) {
  return (
    <>
      <Typography label={props.label} variant={props.variant === "t2" ? "bb4" : "b3"} />
      <div className="pt-2">
        <FormControl className={`w-full ${props.disabled && "bg-[#E0E0E0A6]"} rounded-lg`}>
          <Dropdown
            placeholder={props.placeholder}
            disabled={props.disabled}
            value={props.value}
            onChange={props.setValue}
            displayEmpty
            renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : props.placeholder}
            className={`max-h-10 border ${!props.disabled && "border-1 border-[#e0e0e0]"}`}
            sx={{
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
            }}
          >
            {
              props.options.map((opt) => (
                <MenuItem value={opt.value}>{opt.label}</MenuItem>
              ))
            }
          </Dropdown>
        </FormControl>
      </div>
    </>
  )
}