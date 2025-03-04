import {contactUsSections} from "@/lib/constants";
import InfoCard from "@/components/cards/InfoCard";

export default function ContactUsCard() {
  return (
    <>
      <p className="font-montserrat font-bold text-[48px] leading-[64px] text-[#2c2c2c] pb-[12px]">Contact Us</p>
      <p className="lato font-normal text-base leading-[24px] text-[#4f4f4f]">Need Help or Have a Request? Let’s
        Talk!</p>
      <p className="lato font-normal text-base leading-[24px] text-[#4f4f4f] pb-[62px]"> We usually respond within 24
        hours!</p>
      <div className="flex gap-[34px]">
        {contactUsSections.map(section => (
          <InfoCard
            title={section.title}
            description={section.description}
            icon={section.icon}
          />
        ))}
      </div>

    </>
  )
}