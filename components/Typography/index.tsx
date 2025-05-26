import React from 'react';

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
  width?: number;
};

function TypographyStyle(props: TypographyProps) {
  switch (props.variant) {
    case 'h1':
      return `dark:text-white/90 font-montserrat font-bold text-[48px] leading-[62px] text-[#2c2c2c] ${
        props.center && 'text-center'
      }`;
    case 'h2':
      return `dark:text-white/90 font-montserrat text-[40px] leading-[50px] font-bold text-[#2c2c2c] ${
        props.center && 'text-center'
      }`;
    case 'h3':
      return `dark:text-white/90 text-3xl font-montserrat text-[#2c2c2c] font-bold ${
        props.center && 'text-center'
      }`;
    case 'h4':
      return `dark:text-white/90 font-montserrat font-bold text-2xl lg:text-[32px] text-[#2c2c2c] ${
        props.center && 'text-center'
      } leading-[40px] whitespace-pre-line`;
    case 'h4-dark':
      return `dark:text-[#2c2c2c] font-montserrat font-bold text-[32px] text-[#2c2c2c] ${
        props.center && 'text-center'
      } leading-[40px] whitespace-pre-line`;
    case 'hb4':
      return `dark:text-white/90 text-base font-bold font-lato text-[#333333] ${
        props.center && 'text-center'
      }`;
    case 'h6':
      return `dark:text-white/90 font-montserrat text-[20px] font-bold leading-[25px] text-[#2c2c2c] ${
        props.center && 'text-center'
      }`;
    case 'bb1':
      return `dark:text-white/90 ${props.className} text-xl font-lato font-bold text-[#0b0d0e]`;
    case 'b2':
      return `dark:text-white/90 group-hover:text-white/90 font-lato text-base text-[#4f4f4f] font-normal ${
        props.center && 'text-center'
      } leading-[24px]`;
    case 'b2-dark':
      return `dark:text-[#4f4f4f] group-hover:text-white/90 font-lato text-base text-[#4f4f4f] font-normal ${
        props.center && 'text-center'
      } leading-[24px]`;
    case 'bb2':
      return `dark:text-white/90 group-hover:text-white/90 font-lato text-base text-[#4f4f4f] font-bold ${
        props.center && 'text-center'
      } leading-[24px]`;
    case 'b3':
      return `dark:text-white/90 font-lato font-normal text-sm leading-[21px] text-[#4f4f4f] ${
        props.center && 'text-center'
      } ${props.button && 'cursor-pointer'}`;
    case 'bb3':
      return `dark:text-white/90 font-lato font-bold text-sm leading-[21px] text-sm text-[#2c2c2c] ${
        props.center && 'text-center'
      } ${props.button && 'cursor-default'} leading-[21px]`;
    case 'bl3':
      return `dark:text-white/90 text-sm text-sky-500 ${
        props.center && 'text-center'
      } font-lato font-normal underline  hover:scale-105 transition-transform duration-300 cursor-pointer`;
    case 'b4':
      return `dark:text-white/90 font-lato font-normal text-sm leading-[21px] text-[#4f4f4f]`;
    case 'bb4':
      return `dark:text-white/90 text-sm text-[#4f4f4f] font-lato ${
        props.center && 'text-center'
      } font-bold leading-[18px]`;
    case 'link':
      return `dark:text-white/90 font-montserrat text-sm leading-[24px] text-[#737373] hover:scale-105 transition-transform duration-300 will-change-transform ${
        props.bold ? 'font-bold' : 'font-semibold'
      }`;
    default:
      return `dark:text-white/90 ${props.className} text-sm ${
        props.center && 'text-center'
      } text-[#2c2c2c] font-sans`;
  }
}

export default function Typography(props: TypographyProps) {
  return (
    <h2
      //@ts-ignore
      style={{
        color: props.color,
        textDecoration: props.underline ? 'underline' : undefined,
        width: props.width,
      }}
      onClick={props.onClick}
      className={TypographyStyle(props)}
    >
      {props.label}
    </h2>
  );
}
