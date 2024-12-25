import Typography from "@/components/Typography";
import Check from "@/assets/img/check.svg"
import Image from "next/image";

export default function BenefitCard({label, variant}) {
  return (
    <div className={"flex items-center gap-2 py-1"}>
      <Image src={Check} alt="check"/>
      <Typography variant="b2" className="font-lato" label={label}/>
    </div>
  )
}