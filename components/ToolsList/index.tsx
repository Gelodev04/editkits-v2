import {videoTools} from "../../lib/constants";
import ToolCard from "../ToolCard/index";

export default function ToolsList({tools}) {
  return (
    <div className={`grid sm:grid-cols-2 2xl:max-w-[95%] lg:grid-cols-5 gap-y-10 py-10 2xl:w-full ${tools && "mx-20 lg:mx-10  gap-x-2"}`}>
      {videoTools.map((tool) => (
        <ToolCard
          key={tool.name}
          name={tool.name}
          icon={tool?.icon}
          tools
        />
      ))}
    </div>
  )
}