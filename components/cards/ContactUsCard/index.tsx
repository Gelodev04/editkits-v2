import {contactUsSections} from "@/lib/constants";
import InfoCard from "@/components/cards/InfoCard";

export default function ContactUsCard() {
  return (
    <>
      <h1 className="font-montserrat font-extrabold text-[48px] leading-[64px] text-[#2c2c2c] dark:text-gray-200 pb-[12px]">Contact Us</h1>
      <p className="lato font-normal text-base leading-[24px] text-[#4f4f4f] dark:text-gray-200">Need Help or Have a Request? Let’s
        Talk!</p>
      <p className="lato font-normal text-base leading-[24px] text-[#4f4f4f] dark:text-gray-200 pb-[62px]"> We usually respond within 24
        hours!</p>
      <div className="flex flex-col md:flex-row gap-[34px]">
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