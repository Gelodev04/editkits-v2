import Image from "next/image";

import {FaChevronRight} from "react-icons/fa";

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import ToolCard from "@/components/cards/ToolCard";
import {featureCards, videoTools} from "@/lib/constants";

import HeroImg from "@/assets/img/home_hero.svg"
import FeatureCard from "@/components/cards/FeatureCard";
import {useRouter} from "next/router";
// lg:w-[80%] 2xl:w-[70%] mx-auto sm:px-10 2xl:px-0 2xl:pr-60 2xl:space-x-[-100px]

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div
        className="bg-[url(../assets/img/hero_bg.svg)] max-w-[1444px] bg-cover bg-center grid grid-cols-12 sm:pl-16 xl:pl-40 2xl:pl-20 mx-auto">
        <div className="col-span-6 pt-[16%] sm:w-[110%] xl:w-full 2xl:w-[120%]">
          <h1 className="text-[48px] 2xl:text-[64px] font-montserrat font-extrabold text-[#2c2c2c] leading-[80px]">
            Your <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#637EFF] to-[#148CFC]">All-in-One</span>
          </h1>
          <h1 className="text-[48px] 2xl:text-[64px] font-montserrat font-extrabold text-[#2c2c2c] leading-[80px]">
            Media Processing Kit
          </h1>
          <div className="lg:w-[70%] xl:w-[70%] 2xl:w-[70%] pt-8 pb-12">
            <Typography
              label="Empower your creativity with a suit of powerful but easy to use toolkits for video, image and audio editing"
              variant="b2"
            />
          </div>
          <div className="w-[30%] md:max-w-[20%] lg:w-full xl:w-[16%] 2xl:w-[9%]">
            <Button
              label="Explore All Tools"
              variant="secondary"
              filled
              width={226}
              onClick={() => router.push("tools")}
            />
          </div>
        </div>
        <div className="col-span-6 bg-[url(../assets/img/hero_bg.svg)] bg-cover bg-left">
          <Image className="min-w-[500px] 2xl:min-w-[727px] min-h-[569px]" src={HeroImg} width={727} height={561} alt="hero image"/>
        </div>
      </div>
      <div className="bg-white py-4 border-[1px] border-solid border-[#9F9F9F] rounded-[40px] max-w-[1517px] mx-auto">
        <div className="pb-2">
          <Typography
            label="Quick Access"
            variant="h4"
            center
          />
        </div>
        <Typography variant="b2" label="Video Tools" center/>
        <div className="sm:hidden lg:block place-items-center max-w-[1517px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-y-10 py-10 gap-x-10 lg:gap-x-4">
            {videoTools.slice(0, 5).map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
                icon_hover={tool?.icon_hover}
              />
            ))}
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 col-span-full gap-y-10 pb-5 gap-x-10 lg:gap-x-4 max-w-[1920px]">
            {videoTools.slice(5).map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
                icon_hover={tool?.icon_hover}
              />
            ))}
          </div>
        </div>
        <div className="sm:block lg:hidden place-items-center">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 py-10 gap-x-10 lg:gap-x-4 max-w-[1920px]">
            {videoTools.map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
                icon_hover={tool?.icon_hover}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="flex justify-center justify-between space-between pb-5 w-[26%] xl:w-[20%] 2xl:w-72 lg:w-[21%]">
            <Button
              label="Show All Video Tools"
              variant="secondary"
              width={191}
              rightIcon={<FaChevronRight size={15}
              />
              }
            />
          </div>
        </div>
      </div>
      <div className="bg-[url(../assets/img/inclined_bg.svg)] bg-no-repeat bg-cover xl:px-20 2xl:px-0 pb-16">
        <div className="max-w-[1517px] mx-auto pt-40">
          <Typography label="Learn more about our features" variant="h1"/>
        </div>
        <div className="grid grid-cols-4 2xl:grid-cols-6 place-items-center gap-y-[40px] pt-28 max-w-[1600px] mx-auto">
          {featureCards.map((card) => <FeatureCard name={card.name} icon={card.image}/>)}
        </div>
      </div>
    </>
  );
}
