import Check from "@/public/icons/check-circle.svg"
import CheckHover from "@/public/icons/check-circle-hover.svg"
import Image from "next/image";

export default function BenefitCard({label}: {label: string}) {
  return (
    <div className={"flex items-center gap-[10px] py-1"}>
      <Image src={Check} alt="check" className="block group-hover:hidden" />
      <Image src={CheckHover} alt="check-hover" className="hidden group-hover:block" />
      <p className="group-hover:text-white/90 font-lato font-normal text-sm leading-[21px] text-[#4f4f4f]">{label}</p>
    </div>
  )
}