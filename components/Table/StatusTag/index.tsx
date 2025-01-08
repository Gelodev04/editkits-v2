import * as React from "react";

import {GoDotFill} from "react-icons/go";

export default function StatusTag({status}: {status: any}) {
  return (
    <div className="flex items-center gap-1">
      <GoDotFill color={status === "Failed" ? "#d80027" : status === "Progress" ? "#ff9407" : "#0f930f"} />
      <p className={`font-lato ${status === "Failed" ? "text-[#d80027]" : status === "Progress" ? "text-[#ff9407]" : "text-[#0f930f]"}`}>{status}</p>
    </div>
  )
}