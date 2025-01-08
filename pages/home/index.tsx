import Typography from "@/components/Typography";
import Button from "@/components/Button";
import ToolCard from "@/components/cards/ToolCard";
import {videoTools} from "@/lib/constants";
import {FaChevronRight} from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="p-20 bg-neutral-50">
        <h1 className="text-[58px] font-montserrat font-extrabold text-[#2c2c2c] text-center leading-[80px]">
          Your <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#C938AE] via-[#8467C7] to-[#17ABDB]">All-in-One</span> Media
        </h1>
        <h1 className="text-[58px] font-montserrat font-extrabold text-[#2c2c2c] text-center leading-[80px]">
          Processing Kit
        </h1>
        <div className="2xl:px-[37%] xl:px-[26%] lg:px-[20%] pt-4 pb-8">
          <Typography
            label="Empower your creativity with a suit of powerful but easy to use toolkits for video, image and audio editing"
            center
            variant="b2"
          />
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center w-[30%] md:max-w-[20%] 2xl:w-[9%] xl:w-[16%] lg:w-[16%] ">
            <Button
              label="Explore All Tools"
              variant="secondary"
              filled
              width={178}
            />
          </div>
        </div>
      </div>
      <div className="bg-white py-4">
        <div className="pb-2">
          <Typography
            label="Quick Access"
            variant="h4"
            center
          />
        </div>
        <Typography variant="b2" label="Video Tools" center />
        <div className="sm:hidden lg:block place-items-center max-w-[1280px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-y-10 py-10 gap-x-10 lg:gap-x-4">
            {videoTools.slice(0, 5).map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
              />
            ))}
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 col-span-full gap-y-10 pb-10 gap-x-10 lg:gap-x-4 max-w-[1280px]">
            {videoTools.slice(5).map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
              />
            ))}
          </div>
        </div>
        <div className="sm:block lg:hidden place-items-center">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 py-10 gap-x-10 lg:gap-x-4 max-w-[1280px]">
            {videoTools.map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="flex justify-center justify-between space-between py-10 w-[26%] xl:w-[20%] 2xl:w-72 lg:w-[21%]">
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
    </>
  );
}
