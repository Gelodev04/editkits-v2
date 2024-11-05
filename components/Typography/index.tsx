import React from "react";

type TypographyProps = {
  label?: string | React.ReactNode;
  variant?: string;
  center?: boolean;
  className?: string;
  bold?: boolean;
  onClick?: () => void;
  button?: boolean;
  link?: boolean;
}

function TypographyStyle(variant?: string | undefined, center?: boolean | undefined, bold?: boolean | undefined, button?: boolean | undefined, link?: boolean, className?: any) {

  switch (variant) {
    case "h1":
      return `text-5xl font-extrabold text-[#2c2c2c] ${center && "text-center"}`;
    case "h2":
      return `text-4xl font-extrabold text-[#2c2c2c] font-bold ${center && "text-center"}`;
    case "h3":
      return `text-3xl font-montserrat text-[#2c2c2c] font-bold ${center && "text-center"}`;
    case "h4":
      return `text-base font-normal text-[#4f4f4f] ${center && "text-center"}`;
    case "h5":
      return `text-xl font-black text-[#2c2c2c] ${center && "text-center"}`;
    case "h6":
      return `text-lg font-black text-[#2c2c2c] ${center && "text-center"}`;
    case "sm":
      return `text-sm text-[#2c2c2c] ${center && "text-center"}`;
    case "body":
      return `text-md text-[#2c2c2c] ${center && "text-center"} ${bold ? "font-semibold" : "font-light"}`
    case "b3":
      return `text-sm text-[#2c2c2c] font-lato ${center && "text-center"} font-normal ${button && "cursor-pointer"}`;
    case "bb3":
      return `text-sm ${link && `text-[#0700CB]`} font-lato text-[#4f4f4f] ${center && "text-center"} font-bold ${button && "cursor-pointer"}`;
    case "bbl3":
      return `text-sm text-sky-500 ${center && "text-center"} font-lato font-bold  hover:scale-105 transition-transform duration-300 cursor-pointer`;
    case "b4":
      return `text-xs text-[#2c2c2c] font-lato ${center && "text-center"} ${bold ? "font-semibold" : "font-normal"}`
    case "p":
      return `text-sm  text-[#2c2c2c] ${center && "text-center"} ${bold ? "font-semibold" : "font-normal"}`;
    case "l1b":
      return `text-base font-bold text-[#2c2c2c] ${center && "text-center"}`;
    default:
      return `${className} text-sm text-[#2c2c2c] font-normal ${center && "text-center"}`;
  }
}

export default function Typography(props: TypographyProps) {
  return (
    <p
      onClick={props.onClick}
      className={TypographyStyle(props.variant, props.center, props.bold, props.button, props.link, props.className)}
    >
      {props.label}
    </p>
  )
}