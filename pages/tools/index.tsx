import React from 'react';

import Typography from "@/components/Typography";
import Search from "@/components/Search";
import {videoTools} from "@/lib/constants";
import ToolCard from "@/components/cards/ToolCard";
import {Divider} from "@mui/material";

export default function Tools() {
  const [filterBy, setFilterBy] = React.useState("");

  return (
    <div className="pt-[56px] pb-[214px] max-w-[1200px] mx-auto">
      <Typography variant="h1" label="Tools" center/>
      <div className="pt-[12px] pb-[40px]">
        <Typography
          variant="b2"
          label="Empower your creativity with a suite of powerful but easy to use toolkits for video, image and audio editing."
          center
        />
      </div>
      <div className="max-w-[567px] pb-[95px] mx-auto">
        <Search
          setFilterBy={setFilterBy}
        />
      </div>

      <div
        className="justify-center flex flex-col items-center max-w-[1920px] mx-auto pb-[41px]"
      >
        <p className="font-lato font-bold text-[32px] leading-[48px] text-[#4f4f4f] pb-[41px]">Video Tools</p>
        <div className="grid grid-cols-12 grid-cols-5  gap-y-10 gap-x-4 px-6">
          {videoTools.filter(tool => tool.name.includes(filterBy)).map(tool => (
            <ToolCard
              name={tool.name}
              description={tool.description}
              icon={tool.icon}
              icon_hover={tool.icon_hover}
              variant="tools"
            />
          ))}
        </div>
      </div>
      <div className="max-w-[1110px] mx-auto">
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "#d9d9d9",
          }}
          orientation="horizontal"
          flexItem
        />
      </div>
      <div
        className="justify-center flex flex-col items-center max-w-[1920px] mx-auto py-[41px]"
      >
        <p className="font-lato font-bold text-[32px] leading-[48px] text-[#4f4f4f] pb-[41px]">Image Tools</p>
        <div className="grid grid-cols-12 grid-cols-5  gap-y-10 gap-x-4 px-6">
          {videoTools.filter(tool => tool.name.includes(filterBy)).map(tool => (
            <ToolCard
              name={tool.name}
              description={tool.description}
              icon={tool.icon}
              icon_hover={tool.icon_hover}
              variant="tools"
            />
          ))}
        </div>
      </div>
      <div className="max-w-[1110px] mx-auto">
        <Divider
          sx={{
            borderColor: "#d9d9d9",
          }}
          orientation="horizontal"
          flexItem
        />
      </div>
      <div
        className="justify-center flex flex-col items-center max-w-[1920px] mx-auto pt-[41px]"
      >
        <p className="font-lato font-bold text-[32px] leading-[48px] text-[#4f4f4f] pb-[41px]">Audio Tools</p>
        <div className="grid grid-cols-12 grid-cols-5  gap-y-10 gap-x-4 px-6">
          {videoTools.filter(tool => tool.name.includes(filterBy)).map(tool => (
            <ToolCard
              key={tool.name}
              name={tool.name}
              description={tool.description}
              icon={tool.icon}
              icon_hover={tool.icon_hover}
              variant="tools"
            />
          ))}
        </div>
      </div>
    </div>
  )
}