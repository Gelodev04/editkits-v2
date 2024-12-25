import * as React from 'react';
import { uploadedFileTableData, tableData} from "@/lib/constants";
import {useState} from "react";
import UploadFileModal from "@/components/modals/UploadFileModal";
import TableHeader from "@/components/Table/TableHeader";
import JobStatusTable from "@/components/Table/JobStatus";
import UploadedFilesTable from "@/components/Table/UploadedFiles";

export default function DashboardTable({active, jobStatusPage, uploadedFilesPage}) {
  const [search, setSearch] = useState("");
  const [uploadModal, setUploadModal] = useState(false);

  const getItemsForPage = (items, pageNumber, itemsPerPage = 9) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  return (
    <div className="bg-white pt-2">
      <div className="px-2">
        <TableHeader setSearch={setSearch} setUploadModal={setUploadModal} active={active} />
      </div>
      {active === "Job status" && <JobStatusTable data={getItemsForPage(tableData, jobStatusPage)} search={search}/>}
      {active === "Uploaded files" && <UploadedFilesTable data={getItemsForPage(uploadedFileTableData, uploadedFilesPage)} search={search}/>}
      <UploadFileModal uploadModal={uploadModal} setUploadModal={setUploadModal}/>
    </div>
  );
}

