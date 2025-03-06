import {useRouter} from "next/router";
import Image from "next/image";

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import ToolCard from "@/components/cards/ToolCard";
import {featureCards, videoTools} from "@/lib/constants";

import HeroImg from "@/public/assets/img/home_hero.svg"
import FeatureCard from "@/components/cards/FeatureCard";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>EditKits</title>
        <meta name="description" content="EditKits is your next video and image processing tool" />
      </Head>
      <div
        className="pb-[159.5px] bg-[url(../public/assets/img/hero_bg.svg)] max-w-[1187px] bg-cover sm:px-5 xl:px-0 bg-center grid grid-cols-12 mx-auto sm:items-center xl:items-end">
        <div className="sm:col-span-4 lg:col-span-6 pt-[134.5px]">
          <h1 className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-[#2c2c2c]">The
            Ultimate</h1>
          <h1
            className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-[#2c2c2c]">Online
            Media Platform to</h1>
          <h1
            className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-transparent bg-clip-text bg-gradient-to-r from-[#637EFF] to-[#148CFC]">Edit,
            Process & Automate</h1>
          <div className="w-[520px] pt-[3.5px] pb-[22px]">
            <Typography
              label="Empower your creativity with powerful yet easy-to-use toolkits and APIs on the cloud. Build custom workflows by connecting tools for seamless video, image, and audio editing."
              variant="b2"
            />
          </div>
          <Button
            label="Explore All Tools"
            variant="outlined"
            filled
            width={226}
            onClick={() => router.push("tools")}
            height={64}
          />
        </div>
        <div className="sm:col-span-8 lg:col-span-6 bg-[url(../public/assets/img/hero_bg.svg)] bg-cover bg-left">
          <Image src={HeroImg} width={594} height={330} alt="hero image"/>
        </div>
      </div>
      <div
        className="bg-white pt-[53px] pb-[59px] border-[1px] border-solid border-[#9f9f9f] rounded-[40px] max-w-[1313px] mx-auto">
        <div className="pb-[12px]">
          <Typography
            label="Quick Access"
            variant="h4"
            center
          />
        </div>
        <Typography variant="b2" label="Video Tools" center/>
        <div className="sm:hidden lg:block place-items-center max-w-[1184px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-y-10 pt-[40px] pb-[32px] gap-x-10 lg:gap-x-4">
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
            className="grid sm:grid-cols-2 lg:grid-cols-4 col-span-full gap-y-10 gap-x-10 lg:gap-x-4 max-w-[1920px]">
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
        <div className="flex justify-center pt-[42px]">
          <Button
            label="Show All Video Tools"
            variant="secondary"
            width={268}
            height={48}
          />
        </div>
      </div>
      <div className="max-w-[1536px] mx-auto pt-[139px] sm:pl-5 xl:pl-0">
        <Typography label="Learn more about our features" variant="h2"/>
      </div>
      <div className="bg-[url(../public/assets/img/inclined_bg.svg)] bg-no-repeat bg-cover sm:pl-5 xl:pl-0">
        <div className="grid sm:grid-cols-3 2xl:grid-cols-4 gap-y-[40px] pt-[72px] pb-[116px] max-w-[1536px] mx-auto">
          {featureCards.map((card) => <FeatureCard name={card.name} icon={card.image} description={card.description}/>)}
        </div>
      </div>
    </>
  );
}
