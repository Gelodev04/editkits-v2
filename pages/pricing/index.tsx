import {useState} from "react";
import ToggleSwitch from "@/components/ToggleSwitch";
import {pricingPlanList} from "@/lib/constants";
import PricingPlanCard from "@/components/cards/PricingPlanCard";
import Background from "@/assets/img/pricing-bg.svg"

export default function Pricing() {
  const [monthly, setMonthly] = useState(true);

  return (
    <div
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: '85%',
        backgroundPositionY: 'bottom',
        zIndex: -1000
      }}
      className="md:pt-10">
      <p className="font-montserrat font-extrabold text-[36px] text-[#2c2c2c] leading-[48px] text-center">Pricing Plan</p>
      <div className="pt-4">
        <p className="font-lato font-normal text-base text-[#4f4f4f] text-center">Access a set of powerful features with simple and transparent pricing</p>
      </div>
      <div className="flex justify-center pt-12">
        <ToggleSwitch monthly={monthly} setMonthly={setMonthly}/>
      </div>
      <div className="flex  justify-center">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
            monthly ? 'xl:grid-cols-2 2xl:grid-cols-4' : 'xl:grid-cols-3'
          } place-items-center p-10 max-w-[1920px]`}
        >
          {pricingPlanList
            .filter(plan => plan.type === (monthly ? 'monthly' : 'yearly'))
            .map(plan => (
              <PricingPlanCard
                key={plan.title}
                title={plan.title}
                description={plan.description}
                credits={plan.credits}
                type={plan.type}
                benefits={plan.benefits}
                originalPrice={plan.originalPrice}
                discountPrice={plan?.discountPrice}
              />
            ))}
        </div>
      </div>
    </div>
  )
}