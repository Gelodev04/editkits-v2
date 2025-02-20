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
  mostPopular: boolean;
}

export default function PricingPlanCard(props: PricingPlanCardProps) {
  return (
    <div
      className="flex relative flex-col justify-between bg-white pt-[44px] pb-[25px] pl-[32px] border border-solid border-[#5243C2] group hover:text-white hover:bg-[#7D3DDE] w-[354px] rounded-2xl min-h-[552px] transition-all duration-300 shadow-lg">
      {props.mostPopular && props.mostPopular && (
        <div
          className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-[#273266] text-white text-[10px] font-montserrat font-semibold  leading-[12.19px] pt-[7px] pb-[8px] pl-[15.76px] pr-[16.97px] w-[146.3px] tracking-[0.8px] text-center rounded-full">
          MOST POPULAR
        </div>
      )}
      <div className="flex-grow">
        <div className="flex justify-between items-center pr-[15px]">
          <div className="flex items-center">
            <p
              className="font-montserrat font-semibold text-[36px] leading-[46px] text-[#2c2c2c] group-hover:text-white">{"$" + props.originalPrice}</p>
            <p
              className="italic font-lato font-medium text-[17px] leading-[20.4px] text-[#2c2c2c] pl-[6px] group-hover:text-white">/month</p>
          </div>
          <Tag label={props.credits}/>
        </div>
        <p
          className="font-montserrat font-semibold text-[28px] leading-[34.13px] text-[#2c2c2c] pt-[20px] pb-[10px] group-hover:text-white">{props.title}</p>
        <div className="w-[273px]">
          <Typography label={props.description} variant="b2"/>
        </div>
        <div className="pt-[16px]">
          {props.benefits.map(benefit => <BenefitCard label={benefit}/>)}
        </div>
      </div>
      <div className="w-[281.26px]">
        <button
          className="font-semibold pt-[13px] pb-[14px] font-lato text-[15px] w-full bg-[#e8f4ff] group-hover:text-white group-hover:bg-[#273266] text-[#148cfc] rounded-full leading-[18px]">Choose
          Plan
        </button>
      </div>
    </div>
  )
}