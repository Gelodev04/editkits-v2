import React, {useState} from "react";

import PricingPlanCard from "@/components/cards/PricingPlanCard";
import ToggleSwitch from "@/components/ToggleSwitch";

import {useGetPlansQuery} from "@/services/api/public";

import Background from "@/public/assets/img/pricing-bg-circle.svg"
import Blur from "@/public/assets/img/pricing-bg-blur.svg";
import Wave1Mirrored from "@/public/assets/img/wave1_mirrored.svg"
import Wave1 from "@/public/assets/img/wave1.svg"
import Wave2 from "@/public/assets/img/wave2.svg"
import WhatCanYouDoPopup from "@/components/modals/WhatCanYouDoPopup";
import Loading from "@/pages/pricing/laoding";
import {Plan} from "@/interfaces/Plan";

export default function Pricing() {
  const [monthly, setMonthly] = useState(true);
  const { data: plans } = useGetPlansQuery({isYearly: !monthly});
  const [plan, setPlan] = useState<Plan>({
    benefits: [],
    credit_actions: [],
    credits: 0,
    description: "",
    is_popular: false,
    new_price: 0,
    original_price: 0,
    title: ""
  })

  const [whatCanYouDoModal, setWhatCanYouDoModal] = useState(false);
  const [additionalContent, setAdditionalContent] = useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, [loading]);

  return (
    <div
      style={{
        backgroundImage: `url(${Background.src}), url(${Background.src}), url(${Wave1.src}), url(${Wave1Mirrored.src}), url(${Blur.src}), url(${Wave2.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "92%, 15%, 0%, 100%, 0%, 100%",
        backgroundPositionY: "40%, 110%, 0%, 0%, 0%, 100%",
      }}
      className="md:pt-10 min-h-[100vh]"
    >
      <h1 className="font-montserrat font-extrabold text-[48px] text-[#2c2c2c] leading-[64px] text-center">Pricing
        Plan</h1>
      <div className="pt-[12px]">
        <p className="font-lato font-normal text-base text-[#4f4f4f] text-center leading-[24px]">Access a set of
          powerful features with simple and transparent pricing</p>
      </div>
      <div className="flex justify-center pt-12 pb-[22px]">
        <ToggleSwitch monthly={monthly} setMonthly={setMonthly} setLoading={setLoading}/>
      </div>
      <div className="flex justify-center">
        {loading ? <Loading/> : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 bg-white ${
              monthly ? 'xl:grid-cols-2 2xl:grid-cols-4' : 'xl:grid-cols-3'
            } place-items-center px-[22px] py-[14px] rounded rounded-2xl max-w-[1920px]`}
          >
            <>
              {/*@ts-ignore*/}
              {plans?.map((plan) => (
                <PricingPlanCard
                  plan={plan}
                  setWhatCanYouDoModal={setWhatCanYouDoModal}
                  additionalContent={additionalContent}
                  setAdditionalContent={setAdditionalContent}
                  setPlan={setPlan}
                />
              ))}
            </>
          </div>
        )}
      </div>
      <WhatCanYouDoPopup
        open={whatCanYouDoModal}
        setOpen={setWhatCanYouDoModal}
        title="What can you do?"
        plan={plan}
      />
    </div>
  )
}