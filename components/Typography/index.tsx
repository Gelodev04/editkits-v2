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
      return `text-5xl font-extrabold font-montserrat text-[#2c2c2c] ${props.center && "text-center"}`;
    case "h2":
      return `text-4xl font-extrabold text-[#2c2c2c] font-bold ${props.center && "text-center"}`;
    case "h3":
      return `text-3xl font-montserrat text-[#2c2c2c] font-bold ${props.center && "text-center"}`;
    case "h4":
      return `font-montserrat font-bold text-[32px] text-[#2c2c2c] ${props.center && "text-center"} leading-[40px]`;
    case "hb4":
      return `text-base font-bold font-lato text-[#333333] ${props.center && "text-center"}`;
    case "h5":
      return `font-montserrat font-bold text-2xl text-[#2c2c2c] ${props.center && "text-center"}`;
    case "h6":
      return `text-lg font-bold text-[#2c2c2c] ${props.center && "text-center"}`;
    case "sm":
      return `text-sm text-[#2c2c2c] ${props.center && "text-center"}`;
    case "body":
      return `text-md text-[#2c2c2c] ${props.center && "text-center"} ${props.bold ? "font-semibold" : "font-light"}`
    case "bb1":
      return `${props.className} text-xl font-lato font-bold text-[#0b0d0e]`;
    case "b2":
      return `group-hover:text-white font-lato text-base text-[#4f4f4f] font-normal ${props.center && "text-center"} leading-[24px]`
    case "b3":
      return `text-sm text-[#4f4f4f] font-lato ${props.center && "text-center"} font-normal leading-[21px] ${props.button && "cursor-pointer"}`;
    case "bb3":
      return `font-lato font-bold text-sm leading-[21px] text-sm text-[#2c2c2c] ${props.center && "text-center"} ${props.button && "cursor-default"} leading-[21px]`;
    case "bbl3":
      return `text-sm text-sky-500 ${props.center && "text-center"} font-lato font-bold  hover:scale-105 transition-transform duration-300 cursor-pointer`;
    case "bl3":
      return `text-sm text-sky-500 ${props.center && "text-center"} font-lato font-normal underline  hover:scale-105 transition-transform duration-300 cursor-pointer`;
    case "b4":
      return `font-lato font-normal text-sm leading-[18px] text-[#4f4f4f]`
    case "bb4":
      return `text-sm text-[#4f4f4f] font-lato ${props.center && "text-center"} font-bold leading-[18px]`
    case "p":
      return `text-sm  text-[#2c2c2c] ${props.center && "text-center"} ${props.bold ? "font-semibold" : "font-normal"}`;
    case "card-label":
      return `font-lato font-normal text-sm text-[#262628] ${props.center && "text-center"}`;
    case "link":
      return `font-montserrat text-sm leading-[24px] text-[#737373] ${props.bold ? "font-bold" : "font-semibold"} ${props.center && 'text-center'}`
    default:
      return `${props.className} text-sm ${props.center && "text-center"} text-[#2c2c2c] font-sans`;

  }
}

export default function Typography(props: TypographyProps) {
  return (
    <p
      //@ts-ignore
      style={{color: props.color, textDecoration: props.underline && "underline"}}
      onClick={props.onClick}
      className={TypographyStyle(props)}
    >
      {props.label}
    </p>
  )
}