import React from 'react';

import {HiOutlineQuestionMarkCircle} from "react-icons/hi";

import Typography from "@/components/Typography";
import Tag from "@/components/Tag";
import BenefitCard from "@/components/cards/BenefitCard";
import { Plan } from "@/interfaces/Plan";

type PricingPlanCardProps = {
  plan: Plan;
  additionalContent: string[];
  setAdditionalContent: (e: React.SetStateAction<any>) => void;
  setWhatCanYouDoModal: (e: React.SetStateAction<boolean>) => void;
  setPlan: (e: Plan) => void;
}

export default function PricingPlanCard(props: PricingPlanCardProps) {
  function handleWhatCanYouDoModal() {
    props.setAdditionalContent(props.plan.credit_actions)
    props.setWhatCanYouDoModal(true)
    props.setPlan(props.plan)
  }

  return (
    <div
      className="flex relative flex-col justify-between bg-white pt-[44px] pb-[25px] pl-[32px] border border-solid border-[#5243C2] group hover:text-white hover:bg-[#7D3DDE] w-[354px] rounded-2xl min-h-[552px] transition-all duration-300 shadow-lg">
      {props.plan.is_popular && props.plan.is_popular && (
        <div
          className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-[#1d2939] text-white text-[10px] font-montserrat font-semibold  leading-[12.19px] pt-[7px] pb-[8px] pl-[15.76px] pr-[16.97px] w-[146.3px] tracking-[0.8px] text-center rounded-full">
          MOST POPULAR
        </div>
      )}
      <div className="flex-grow">
        {(props.plan.original_price !== props.plan.new_price) && <p className="group-hover:text-white font-lato font-semibold text-[20px] leading-[18px] text-[#2c2c2c] line-through">${props.plan.original_price}</p>}
        <div className="flex justify-between items-center pr-[15px]">
          <div className="flex items-center">
            <p
              className="font-montserrat font-semibold text-[36px] leading-[46px] text-[#2c2c2c] group-hover:text-white">{"$" + props.plan.new_price}</p>
            <p
              className="italic font-lato font-medium text-[17px] leading-[20.4px] text-[#2c2c2c] pl-[6px] group-hover:text-white">/month</p>
          </div>
          <Tag label={`${props.plan.credits} Credits / month`}/>
        </div>
        <div className="flex justify-end pr-[15px] gap-[6.5px] cursor-pointer" onClick={handleWhatCanYouDoModal}>
          <p className="font-lato font-normal text-sm leading-[21px] text-[#2c2c2c] group-hover:text-white">What can you do</p>
          <HiOutlineQuestionMarkCircle color="#2c2c2c" size={20} className="block group-hover:hidden"/>
          <HiOutlineQuestionMarkCircle color="white" size={20} className="hidden group-hover:block"/>
        </div>
        <p
          className="font-montserrat font-semibold text-[28px] leading-[34.13px] text-[#2c2c2c] pt-[20px] pb-[10px] group-hover:text-white">{props.plan.title}</p>
        <div className="w-[273px]">
          <Typography label={props.plan.description} variant="b2"/>
        </div>
        <div className="pt-[16px]">
          {props.plan.benefits.map(benefit => <BenefitCard label={benefit}/>)}
        </div>
      </div>
      <div className="w-[281.26px]">
        <button
          className="font-semibold pt-[13px] pb-[14px] font-lato text-[15px] w-full bg-[#e8f4ff] group-hover:text-white group-hover:bg-[#1d2939] text-[#148cfc] rounded-full leading-[18px]">Choose
          Plan
        </button>
      </div>
    </div>
  )
}