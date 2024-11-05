import Typography from "@/components/Typography";
import {useState} from "react";
import ToggleSwitch from "@/components/ToggleSwitch";
import {pricingPlanList} from "@/lib/constants";
import PricingPlanCard from "@/components/cards/PricingPlanCard";

export default function Pricing() {
  const [monthly, setMonthly] = useState(true);

  return (
    <div className="md:pt-10">
      <Typography label="Pricing Plan" variant="h1" center/>
      <div className="pt-4">
        <Typography label="Access a set of powerful features with simple and transparent pricing" variant="h4" center/>
      </div>
      <div className="flex justify-center pt-12">
        <ToggleSwitch monthly={monthly} setMonthly={setMonthly}/>
      </div>
      <div className="flex  justify-center">
        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center p-10 max-w-[1920px]">
          {pricingPlanList.filter(plan => plan.type === (monthly ? "monthly" : "yearly")).map(plan => (
            <PricingPlanCard
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