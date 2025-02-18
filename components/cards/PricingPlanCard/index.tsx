import Typography from "@/components/Typography";
import Tag from "@/components/Tag";
import BenefitCard from "@/components/cards/BenefitCard";

type PricingPlanCardProps = {
  title: string;
  credits: string;
  description: string;
  originalPrice: string | number;
  type: string;
  benefits: string[];
  discountPrice?: number;
}

export default function PricingPlanCard(props: PricingPlanCardProps) {
  return (
    <div
      className="flex flex-col justify-between bg-white pt-4 pb-[25px] px-[32px] border border-solid border-slate-50 group hover:text-white hover:bg-[#5243C2] w-[354px] rounded-2xl min-h-full min-h-[552px] transition-all duration-300 shadow-lg">
      <div className="flex-grow">
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center">
            <p
              className="font-montserrat font-semibold text-[36px] leading-[46px] text-[#2c2c2c] group-hover:text-white">{"$" + props.originalPrice}</p>
            <p className="italic font-lato font-medium text-[17px] leading-[20.4px] text-[#2c2c2c] pl-[6px] group-hover:text-white">/month</p>
          </div>
          <Tag label={props.credits}/>
        </div>
        <p
          className="font-montserrat font-semibold text-[28px] leading-[34.13px] text-[#2c2c2c] pt-[20px] pb-[10px] group-hover:text-white">{props.title}</p>
          <Typography label={props.description} variant="b2"/>
        <div className="pt-[16px]">
          {props.benefits.map(benefit => <BenefitCard label={benefit}/>)}
        </div>
      </div>
      <button className="font-semibold py-4 font-lato text-[15px] w-full bg-[#e8f4ff] group-hover:text-white group-hover:bg-[#273266] text-[#148cfc] rounded-full">Select Plan</button>
    </div>
  )
}