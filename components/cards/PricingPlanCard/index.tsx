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
      className="bg-white py-4 px-4 border border-solid border-slate-50 hover:border-slate-400 max-w-[296px] rounded-2xl min-h-full hover:scale-105 transition-transform duration-300 shadow-lg">
      <div className="flex justify-between items-center pt-2 pb-4">
        <Typography className="font-montserrat font-bold text-[16px] leading-5 w-[153px]" label={props.title} />
        <Tag label={props.credits}/>
      </div>
      <Typography label={props.description} className="font-lato text-[10px] font-normal leading-[15px] text-[#4f4f4f]"/>
      <div className="pt-4 pb-1 px-2">
        {props?.discountPrice && <Typography label={"$"+props?.discountPrice} className="line-through font-lato font-semibold text-base leading-[18px]"/>}
        <div className="flex items-end">
          <Typography label={"$" + props.originalPrice} className="font-lato font-bold text-[40px] leading-[56px]" />
          <Typography label="/ month" className="italic font-lato font-bold text-base leading-8"/>
        </div>
      </div>
      <div className="flex gap-2 pb-6 px-2">
        <p className="font-lato text-base text-[#838696] font-normal leading-[18px]">Billed</p>
        <p className="font-lato text-base text-[#838696] font-normal leading-[18px]">{props.type}</p>
      </div>
      <div className='border-dashed border-b-2 border-[#e2e4e9] pb-5 mb-5 mx-auto px-3'>
        <Button label="Select Plan" variant="outlined" filled className="h-[42px]" />
      </div>
      <div className="px-2">
        <Typography label="Monthly Benefits" variant="bb3"/>
        <div className="pt-3">
          {props.benefits.map(benefit => <BenefitCard label={benefit}/>)}
        </div>
      </div>
    </div>
  )
}