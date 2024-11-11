import {GoDotFill} from "react-icons/go";
import Typography from "@/components/Typography";
import * as React from "react";

export default function StatusTag({status}) {
  return (
    <div className="flex items-center gap-1">
      <GoDotFill color={status === "Failed" ? "#d80027" : status === "Progress" ? "#ff9407" : "#0f930f"} />
      <Typography label={status}  className={status === "Failed" ? "text-[#d80027]" : status === "Progress" ? "text-[#ff9407]" : "text-[#0f930f]"} />
    </div>
  )
}