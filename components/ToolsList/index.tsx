import {videoTools} from "@/lib/constants";
import ToolCard from "../cards/ToolCard/index";

export default function ToolsList({tools}: {tools?: boolean}) {
  return (
    <div className="place-items-center">
      <div className={`place items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4 py-10 px-6 w-full`}>
        {videoTools.slice(0, 5).map((tool) => (
          <ToolCard
            key={tool.name}
            name={tool.name}
            icon={tool?.icon}
            tools
          />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4 pb-6 px-6">
        {videoTools.slice(5).map((tool) => (
          <ToolCard
            key={tool.name}
            name={tool.name}
            icon={tool?.icon}
            tools
          />
        ))}
      </div>
    </div>
  )
}