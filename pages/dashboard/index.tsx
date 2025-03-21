import dynamic from "next/dynamic";
import React, {useState} from "react";

const DashboardTable = dynamic(() => import("@/components/Table"), {
  ssr: false
})

import StatCard from "@/components/cards/StatCard";
import {stats, uploadedFileTableData} from "@/lib/constants";
import TableType from "@/components/Table/TableType";
import Pagination from "@/components/Pagination";
import {useGetJobsQuery} from "@/services/api/job";
import Loading from "@/pages/dashboard/loading";

export default function Dashboard() {
  const {data: jobs} = useGetJobsQuery({});

  const [active, setActive] = useState("Job status");
  const [currentPage, setCurrentPage] = useState(1);

  const data = active === "Job status" ? jobs : uploadedFileTableData;

  return (
    <div className="min-h-[100vh] pt-[26px]">
      <div className="max-w-[1536px] mx-auto pt-[26px] bg-[#f5f7f9] rounded-[42px] pl-[20px] py-[24px] pr-[29px]">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 xl:col-span-2 2xl:col-span-2">
            <TableType active={active} setActive={setActive}/>
          </div>
          <div className="col-span-10 xl:col-span-10 2xl:col-span-10 bg-white py-[16px] rounded-[24px] pl-[18px] pr-[13px]">
            {!jobs ? <Loading/> : (
              <>
                {active === "Job status" && (
                  <div className="flex gap-4 ">
                    {stats.map(stat => <StatCard stat={stat}/>)}
                  </div>
                )}
                <div className="pt-4">
                  <DashboardTable
                    active={active}
                    jobStatusPage={currentPage}
                    uploadedFilesPage={currentPage}
                    data={data}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end pt-[26px]">
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            //@ts-ignore
            totalPages={Math.ceil(data?.length / 8)}
          />
        </div>
      </div>
    </div>
  )
}