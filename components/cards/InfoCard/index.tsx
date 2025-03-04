import Image from "next/image";
import Typography from "@/components/Typography";

export default function InfoCard({title, description, icon}) {
  return (
    <div className="w-[186px]">
      <Image src={icon} alt="Icon" />
      <p className="font-workSans font-semibold text-base leading-[22.4px] text-[#2c2c2c] py-[12px]">{title}</p>
      <Typography variant="b3" label={description}/>
    </div>
  )
}