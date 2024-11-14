import StatCard from "@/components/cards/StatCard";
import { stats, tableData } from "@/lib/constants";
import DashboardTable from "@/components/Table";
import {useState} from "react";
import TableType from "@/components/Table/TableType";

export default function Dashboard() {
  const [active, setActive] = useState("Job status")

  return (
    <div className="bg-[#fafbfc]">
      <div className="max-w-[1536px] mx-auto p-6">
        <div className="grid grid-cols-12 w-full mx-auto">
          <div className="col-span-2 xl:col-span-3 2xl:col-span-2">
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
    </div>
  )
}