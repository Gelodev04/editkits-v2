import Typography from "@/components/Typography";
import Image, { StaticImageData } from "next/image";

type ToolCardProps = {
  name: string;
  icon: StaticImageData;
  tools?: boolean;
  description?: string;
}

export default function FeatureCard({name, icon, description}: ToolCardProps) {
  return (
    <div
      key={name}
      className="w-full max-w-xl lg:w-[328px] lg:h-[174px] flex flex-col relative"
    >
      <Image
        src={icon}
        alt={name}
        width={36}
		className="dark:invert"
      />
      <p className="font-lato font-bold text-base  py-[12px] leading-[22.4px] text-[#2c2c2c] dark:text-white">{name}</p>
      <Typography label={description} variant="b3" />
    </div>
  )
}