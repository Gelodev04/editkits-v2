import React, { useState } from "react";
import Image from "next/image";

import Typography from "@/components/Typography";
import ColorSVG from "@/assets/img/icons/color.svg";

const ColorPicker = (props) => {
  const [color, setColor] = useState("#000000");

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className=" gap-4">
      <Typography label="Background" variant="bb4" />
      <div className="pt-2 flex justify-between gap-1">
        <input
          value={color}
          disabled={props.disabled}
          //@ts-ignore
          className={`w-[280px] max-h-10 border border-solid border-2 ${
            (props?.error && props?.email?.length > 0) ||
            (props.error && props?.code?.length > 0)
              ? "border-red-300"
              : "border-slate-200"
          } p-3 rounded-md outline-none text-[#2c2c2c] ${
            props.disabled && "bg-[#E0E0E0A6] "
          } ${props.variant === "t2" && "max-h-10 font-lato font-bold text-xs "}`}
          placeholder={props.placeholder}
          type="text"
          onChange={handleColorChange}
        />

        <div className="flex gap-1 items-center">
          <div
            className="w-[40px] h-[40px] rounded-full border"
            style={{ backgroundColor: color }}
          />

          <label className="relative cursor-pointer">
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
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
