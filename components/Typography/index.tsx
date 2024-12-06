import React from "react";

type TypographyProps = {
  variant?: string;
  center?: boolean;
  bold?: boolean;
  button?: boolean;
  link?: boolean;
  className?: string;
  status?: string;
  label?: string | React.ReactNode;
  onClick?: () => void;
  color?: string;
  underline?: boolean;
}

function TypographyStyle(props: TypographyProps) {

  switch (props.variant) {
    case "h1":
      return `text-5xl font-extrabold text-[#2c2c2c] ${props.center && "text-center"}`;
    case "h2":
      return `text-4xl font-extrabold text-[#2c2c2c] font-bold ${props.center && "text-center"}`;
    case "h3":
      return `text-3xl font-montserrat text-[#2c2c2c] font-bold ${props.center && "text-center"}`;
    case "h4":
      return `text-base font-normal text-[#4f4f4f] ${props.center && "text-center"}`;
    case "hb4":
      return `text-base font-bold font-lato text-[#333333] ${props.center && "text-center"}`;
    case "h5":
      return `text-xl font-black text-[#2c2c2c] ${props.center && "text-center"}`;
    case "h6":
      return `text-lg font-bold text-[#2c2c2c] ${props.center && "text-center"}`;
    case "sm":
      return `text-sm text-[#2c2c2c] ${props.center && "text-center"}`;
    case "body":
      return `text-md text-[#2c2c2c] ${props.center && "text-center"} ${props.bold ? "font-semibold" : "font-light"}`
    case "bb1":
      return `${props.className} text-xl font-lato font-bold text-[#0b0d0e]`;
    case "bb1s":
      return `text-lg font-lato font-semibold text-[#2c2c2c]`;
    case "b3":
      return `text-sm text-[#2c2c2c] font-lato ${props.center && "text-center"} font-normal ${props.button && "cursor-pointer"}`;
    case "bb3":
      return `text-sm ${props.link && `text-[#0700CB]`} font-lato text-[#4f4f4f] ${props.center && "text-center"} font-bold ${props.button && "cursor-pointer"}`;
    case "bbl3":
      return `text-sm text-sky-500 ${props.center && "text-center"} font-lato font-bold  hover:scale-105 transition-transform duration-300 cursor-pointer`;
    case "bl3":
      return `text-sm text-sky-500 ${props.center && "text-center"} font-lato font-normal underline  hover:scale-105 transition-transform duration-300 cursor-pointer`;
    case "b4":
      return `text-xs text-[#2c2c2c] font-lato ${props.center && "text-center"} ${props.bold ? "font-semibold" : "font-normal"}`
    case "bb4":
      return `text-xs text-[#2c2c2c] font-lato ${props.center && "text-center"} font-bold`
    case "p":
      return `text-sm  text-[#2c2c2c] ${props.center && "text-center"} ${props.bold ? "font-semibold" : "font-normal"}`;
    case "l1b":
      return `text-base font-bold text-[#2c2c2c] ${props.center && "text-center"}`;
    case "tag":
      return props.status === "Failed" ? "text-[#d80027]" : props.status === "Progress" ? "text-[#ff9407]" : "text-[#0f930f]";
    default:
      return `${props.className}  ${props.bold ? "font-bold" : "font-normal"} ${props.center && "text-center"} text-sm  text-[#2c2c2c]`;

  }
}

export default function Typography(props: TypographyProps) {
  return (
    <p
      style={{color: props.color, textDecoration: props.underline && "underline"}}
      onClick={props.onClick}
      className={TypographyStyle(props)}
    >
      {props.label}
    </p>
  )
}