import Typography from "@/components/Typography";
import Check from "@/assets/img/check.svg"
import Image from "next/image";

export default function BenefitCard({label}) {
  return (
    <div className="flex items-center gap-2 py-1">
      <Image src={Check} alt="check"/>
      <Typography variant="b4" label={label}/>
    </div>
  )
}