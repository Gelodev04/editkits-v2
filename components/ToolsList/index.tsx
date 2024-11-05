import {videoTools} from "@/lib/constants";
import ToolCard from "../cards/ToolCard/index";
import "./style.css"

export default function ToolsList({tools}: {tools?: boolean}) {
  return (
    <div className={`custom-grid-container grid sm:grid-cols-2 2xl:max-w-[95%] lg:grid-cols-5 gap-y-10 py-10 2xl:w-full ${tools && "mx-20 lg:mx-10 gap-x-2"}`}>
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