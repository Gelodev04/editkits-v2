import * as React from "react";

import {GoDotFill} from "react-icons/go";

import Typography from "@/components/Typography";

export default function StatusTag({status}: {status: any}) {
  return (
    <div className="flex items-center gap-1">
      <GoDotFill color={status === "Failed" ? "#d80027" : status === "Progress" ? "#ff9407" : "#0f930f"} />
      <Typography label={status} variant="tag"  status={status} />
    </div>
  )
}