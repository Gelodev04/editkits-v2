import Check from "@/assets/icons/check-circle.svg"
import Image from "next/image";

export default function BenefitCard({label}: {label: string}) {
  return (
    <div className={"flex items-center gap-[10px] py-1"}>
      <Image src={Check} alt="check"/>
      <p className="group-hover:text-white font-lato font-normal text-sm leading-[21px] text-[#4f4f4f]">{label}</p>
    </div>
  )
}