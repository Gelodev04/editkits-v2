'use client'

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import ToolCard from "@/components/ToolCard";
import {videoTools} from "@/lib/constants";
import {FaChevronRight} from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="p-20 bg-neutral-50">
        <h1 className="text-5xl font-extrabold text-[#2c2c2c] text-center">
          Your <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#C938AE] via-[#8467C7] to-[#17ABDB]">All-in-One</span> Media
        </h1>
        <Typography
          variant="h1"
          label="Processing Kit"
          center
        />
        <div className="2xl:px-[37%] xl:px-[26%] lg:px-[20%] py-10">
          <Typography
            label="Empower your creativity with a suit of powerful but easy to use toolkits for video, image and audio editing"
            center
            variant="body"
          />
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center w-[30%] md:max-w-[20%] 2xl:w-[9%] xl:w-[16%] lg:w-[16%] ">
            <Button label="Explore All Tools" variant="secondary" filled width={40}/>
          </div>
        </div>
      </div>
      <div className="bg-white py-4 lg:px-[5%] 2xl:px-[15%]">
        <div className="pb-3">
          <Typography label="Quick Access" variant="h3" center/>
        </div>
        <Typography label="Video Tools" center/>
        <div className="place-items-center">
          <div className="grid sm:grid-cols-2 2xl:max-w-[95%] lg:grid-cols-5 gap-y-10 py-10 gap-x-10">
            {videoTools.slice(0, 5).map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
              />
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 col-span-full 2xl:min-w-[20%] xl:min-w-[65%] sm:gap-8 lg:min-w-[70%] md:max-w-[80%] 2xl:gap-x-8 lg:gap-x-8">
            {videoTools.slice(5).map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center justify-between space-between py-10 w-[26%] xl:w-[20%] 2xl:w-72 lg:w-[21%]">
            <Button
              label="Show All Video Tools"
              variant="secondary"
              width={60}
              rightIcon={<FaChevronRight size={15}/>}
            />
          </div>
        </div>
      </div>
    </>
  );
}
