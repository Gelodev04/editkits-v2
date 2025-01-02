import React from "react";
import Image from "next/image";

import Typography from "@/components/Typography";
import ColorSVG from "@/assets/img/icons/color.svg";

const ColorPicker = (props: any) => {
  return (
    <div className="gap-4">
      <Typography label="Background" variant="bb3" />
      <div className="pt-2 flex justify-between gap-1">
        <input
          value={props.color}
          disabled={props.disabled}
          className={`w-[280px] font-bold text-sm font-lato max-h-10 border-2 p-3 rounded-md outline-none ${
            props.isColorValid ? "border-slate-200" : "border-red-300"
          } ${props.disabled ? "bg-[#E0E0E0A6] text-[#A0AEC0]" : "text-[#4f4f4f]"}`}
          placeholder={props.placeholder}
          type="text"
          onChange={props.handleColorChange}
        />

        <div className="flex gap-1 items-center">
          <div
            className="w-[40px] h-[40px] rounded-full border"
            style={{ backgroundColor: props.color }}
          />

          <label className="relative cursor-pointer">
            <input
              type="color"
              value={props.color}
              onChange={props.handleColorChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              disabled={props.disabled}
            />
            <Image className="min-w-[39px] min-h-[40px]" src={ColorSVG} alt="Select color" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
