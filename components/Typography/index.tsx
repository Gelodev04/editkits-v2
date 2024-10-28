type TypographyProps = {
  label?: string;
  variant?: string;
  center?: boolean;
  className?: string;
  bold?: boolean;
}

function TypographyStyle(variant?: string, center?: boolean, bold?: boolean) {
  switch (variant) {
    case "h1":
      return `text-5xl font-black text-[#2c2c2c] ${center && "text-center"}`;
    case "h2":
      return `text-4xl font-black text-[#2c2c2c] font-bold ${center && "text-center"}`;
    case "h3":
      return `text-3xl font-black text-[#2c2c2c] font-bold ${center && "text-center"}`;
    case "h4":
      return `text-2xl font-black text-[#2c2c2c] ${center && "text-center"}`;
    case "h5":
      return `text-xl font-black text-[#2c2c2c] ${center && "text-center"}`;
    case "h6":
      return `text-lg font-black text-[#2c2c2c] ${center && "text-center"}`;
    case "sm":
      return `text-sm text-[#2c2c2c] ${center && "text-center"}`;
    case "p":
      return `text-md text-[#2c2c2c] ${center && "text-center"} ${bold ? "font-medium": "font-light"}`
    default:
      return `text-sm text-[#2c2c2c] font-normal ${center && "text-center"}`;
  }
}

export default function Typography(props: TypographyProps) {
  return <p className={TypographyStyle(props.variant, props.center, props.bold)}>{props.label}</p>
}