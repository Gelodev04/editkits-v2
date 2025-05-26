import Image from "next/image";
import Typography from "@/components/Typography";

export default function InfoCard({title, description, icon}) {
  return (
    <div className="max-w-[186px]">
      <Image src={icon} alt="Icon" className="dark:invert" />
      <p className="font-workSans font-semibold text-base leading-[22.4px] text-[#2c2c2c] dark:text-gray-200 py-[12px]">{title}</p>
      <Typography variant="b3" label={description}/>
    </div>
  )
}