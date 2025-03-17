import * as React from 'react';
import { uploadedFileTableData, tableData} from "@/lib/constants";
import {useState} from "react";
import UploadFileModal from "@/components/modals/UploadFileModal";
import TableHeader from "@/components/Table/TableHeader";
import JobStatusTable from "@/components/Table/JobStatus";
import UploadedFilesTable from "@/components/Table/UploadedFiles";

type DashboardTableProps = {
  active: any;
  jobStatusPage: any;
  uploadedFilesPage: any;
  data: any
}

export default function DashboardTable(props: DashboardTableProps) {
  const [search, setSearch] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const videoRef = React.useRef(null)

  const getItemsForPage = (items: any, pageNumber: any, itemsPerPage = 9) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items?.slice(startIndex, endIndex);
  };

  return (
    <div className="bg-white pt-2">
      <div className="px-2">
        <TableHeader setSearch={setSearch} setUploadModal={setUploadModal} active={props.active} />
      </div>
      {props.active === "Job status" && <JobStatusTable data={getItemsForPage(props.data, props.jobStatusPage)} search={search}/>}
      {props.active === "Uploaded files" && <UploadedFilesTable data={getItemsForPage(uploadedFileTableData, props.uploadedFilesPage)} search={search}/>}
      <UploadFileModal uploadModal={uploadModal} setUploadModal={setUploadModal} setFile={() => {return 1}} videoRef={videoRef} />
    </div>
  );
}

