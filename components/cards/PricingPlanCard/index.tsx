import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import BenefitCard from "@/components/cards/BenefitCard";

type PricingPlanCardProps = {
  title: string;
  credits: string;
  description: string;
  originalPrice: string;
  discountPrice?: number;
  type: string;
  benefits: string[];
}

export default function PricingPlanCard(props: PricingPlanCardProps) {
  return (
    <div
      className="bg-white py-4 px-8 border border-solid border-slate-50 hover:border-slate-400 max-w-[355px] rounded-2xl min-h-full hover:scale-105 transition-transform duration-300 shadow-lg">
      <div className="flex justify-between items-center pt-2 pb-4">
        <Typography label={props.title} variant="l1b"/>
        <Tag label={props.credits}/>
      </div>
      <Typography label={props.description} className="font-lato text-xs font-normal text-[#4f4f4f]"/>
      <div className="pt-4 pb-1">
        {props?.discountPrice && <Typography label={"$"+props?.discountPrice} className="line-through font-lato font-semibold text-base"/>}
        <div className="flex items-end">
          <Typography label={"$" + props.originalPrice} variant="h3"/>
          <Typography label="/ month" bold className="italic"/>
        </div>
      </div>
      <div className="flex gap-2 pb-6">
        <p className="text-[#838696] font-lato font-normal text-base">Billed</p>
        <p className="text-[#838696] font-lato font-normal text-base">{props.type}</p>
      </div>
      <div className='border-dashed border-b-2 border-[#e2e4e9] pb-5 mb-5'>
        <Button label="Select Plan" variant="outlined" filled />
      </div>
      <Typography label="Monthly Benefits" variant="bb3"/>
      <div className="pt-3">
        {props.benefits.map(benefit => <BenefitCard label={benefit}/>)}
      </div>
    </div>
  )
}