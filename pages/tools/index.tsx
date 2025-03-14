import React from 'react';

import ToolsList from "../../components/ToolsList/index";
import Typography from "@/components/Typography";
import Search from "@/components/Search";

export default function Tools() {
  const [filterBy, setFilterBy] = React.useState("");

  return (
    <div className="pt-[56px] max-w-[1200px] mx-auto">
      <Typography variant="h1" label="Tools" center />
      <div className="pt-[12px] pb-[40px]">
        <Typography
          variant="b2"
          label="Empower your creativity with a suite of powerful but easy to use toolkits for video, image and audio editing."
          center
        />
      </div>
      <div className="max-w-[567px] mx-auto">
        <Search
          setFilterBy={setFilterBy}
        />
      </div>

      <div
        style={{boxShadow: "0px 20px 12px #fafafa"}}
        className="border-solid border-2 border-zinc-100 py-6 rounded rounded-md justify-center mt-12 flex flex-col items-center max-w-[1920px] mx-auto"
      >
        <p className="font-lato font-bold text-[32px] leading-[48px] text-[#4f4f4f]">Video Tools</p>
        <ToolsList
          filterBy={filterBy}
        />
      </div>
    </div>
  )
}