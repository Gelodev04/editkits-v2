import StatCard from "@/components/cards/StatCard";
import {stats, tableData, uploadedFileTableData} from "@/lib/constants";
import DashboardTable from "@/components/Table";
import {useState} from "react";
import TableType from "@/components/Table/TableType";
import Pagination from "@/components/Table/Pagination";
import * as React from "react";
import {useGetJobsQuery} from "@/services/api";

export default function Dashboard() {
  const {data: jobs} = useGetJobsQuery({status: "IN_PROGRESS"});
  console.log("====JOBS====", jobs)

  const [active, setActive] = useState("Job status");
  const [jobStatusPage, setJobStatusPage] = useState(1);
  const [uploadedFilesPage, setUploadedFilesPage] = useState(1);

  const data = active === "Job status" ? jobs : uploadedFileTableData;

  return (
    <div className="bg-[#fafbfc] min-h-[100vh]">
      <div className="max-w-[1920px] mx-auto p-6">
        <div className="grid grid-cols-12 w-full gap-4 mx-auto">
          <div className="col-span-2 xl:col-span-2 2xl:col-span-2">
            <TableType active={active} setActive={setActive}/>
          </div>
          <div className="col-span-10 xl:col-span-10 2xl:col-span-10">
            {active === "Job status" && (
              <div className="flex gap-4 ">
                {stats.map(stat => <StatCard stat={stat}/>)}
              </div>
            )}
            <div className="pt-4">
              <DashboardTable
                active={active}
                jobStatusPage={jobStatusPage}
                uploadedFilesPage={uploadedFilesPage}
                data={data}
              />
            </div>
          </div>
        </div>
        <div className="pt-10 pb-10 2xl:pr-2">
          <div className="flex justify-end">
            <Pagination
              totalPages={Math.ceil(data?.length / 8)}
              page={active === "Job status" ? jobStatusPage : uploadedFilesPage}
              setPage={active === "Job status" ? setJobStatusPage : setUploadedFilesPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}