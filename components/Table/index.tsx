import * as React from 'react';
import { uploadedFileTableData, tableData} from "@/lib/constants";
import {useState} from "react";
import UploadFileModal from "@/components/modals/UploadFileModal";
import Pagination from "@/components/table/Pagination";
import TableHeader from "@/components/table/TableHeader";
import JobStatusTable from "@/components/table/JobStatus";
import UploadedFilesTable from "@/components/table/UploadedFiles";

export default function DashboardTable({active}) {
  const [search, setSearch] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [page, setPage] = useState(1);

  const getItemsForPage = (items, pageNumber, itemsPerPage = 9) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const data = active === "Job status" ? tableData : uploadedFileTableData

  return (
    <div className="bg-white pt-2">
      <div className="px-2">
        <TableHeader setSearch={setSearch} setUploadModal={setUploadModal} />
      </div>
      {active === "Job status" && <JobStatusTable data={getItemsForPage(tableData, page)} search={search}/>}
      {active === "Uploaded files" && <UploadedFilesTable data={getItemsForPage(uploadedFileTableData, page)} search={search}/>}
      <div className="flex justify-end pb-10 pt-16 bg-neutral-50">
        <Pagination
          dataLength={data.length}
          itemsPerPage={8}
          totalPages={Math.ceil(data.length / 8)}
          page={page}
          setPage={setPage}
        />
      </div>
      <UploadFileModal uploadModal={uploadModal} setUploadModal={setUploadModal}/>
    </div>
  );
}

