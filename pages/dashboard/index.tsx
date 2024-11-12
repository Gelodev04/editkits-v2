import Button from "@/components/Button";
import JobSVG from "@/assets/img/job.svg"
import StatCard from "@/components/cards/StatCard";
import { stats, tableData } from "@/lib/constants";
import DashboardTable from "@/components/Table";
import {useState} from "react";

export default function Dashboard() {
  const [active, setActive] = useState("Job status")

  return (
    <div className="bg-[#fafbfc] p-6">
      <div className="grid grid-cols-12 max-w-[1280px] mx-auto">
        <div className="col-span-3">
          <TableType active={active} setActive={setActive}/>
        </div>
        <div className="col-span-9">
          <div className="flex gap-4">
            {stats.map(stat => <StatCard stat={stat}/>)}
          </div>
          <div className="pt-4 w-full">
            <DashboardTable data={tableData} active={active} />
          </div>
        </div>
      </div>
    </div>
  )
}

function TableType({active, setActive}) {
  return (
    <div className="py-8 px-2 flex flex-col gap-2 bg-white w-[228px] rounded rounded-lg">
      <Button onClick={() => setActive("Job status")} label="Job status" filled={active === "Job status"} variant="outlined" leftIcon={JobSVG}/>
      <Button onClick={() => setActive("Uploaded files")} label="Uploaded files" filled={active === "Uploaded files"} variant="outlined"/>
    </div>
  )
}