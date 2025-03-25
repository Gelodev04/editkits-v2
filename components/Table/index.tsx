import React, {useState, useRef, useEffect} from "react";

import UploadFileModal from "@/components/modals/UploadFileModal";
import TableHeader from "@/components/Table/TableHeader";
import JobStatusTable from "@/components/Table/JobStatus";
import UploadedFilesTable from "@/components/Table/UploadedFiles";
import {usePreviewVideoQuery} from "@/services/api/file";
import VideoPreviewModal from "@/components/modals/VideoPreviewModal";
import DateFilterModal from "@/components/modals/DateFilterModal";
import FilterModal from "@/components/modals/FilterModal";

type DashboardTableProps = {
  active: any;
  jobStatusPage: any;
  uploadedFilesPage: any;
  data: any;
  dateRange: any;
  setDateRange: any;
}

export default function DashboardTable(props: DashboardTableProps) {
  const videoRef = useRef(null);
  const [fileId, setFileId] = useState(null);
  const {data: videoUrl} = usePreviewVideoQuery({fileId}, {skip: !fileId});
  const [video, setVideo] = useState(null)

  const [search, setSearch] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [videoPreviewModal, setVideoPreviewModal] = useState(false);

  const [dateFilterModal, setDateFilterModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filters, setFilters] = useState([])


  useEffect(() => {
    // @ts-ignore
    setVideo(videoUrl?.url)
  }, [videoUrl])

  const getItemsForPage = (items: any, pageNumber: any, itemsPerPage = 9) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items?.slice(startIndex, endIndex);
  };

  async function handleVideoPreview(id) {
    await setFileId(id)
  }

  const handleVideoDownload = async (id) => {
    await setFileId(id)
  };

  function applyFilter() {
    setFilters(selectedFilters)
    setFilterModal(false)
  }


  return (
    <div className="bg-white border-[1px] border-[#ebebeb] rounded-[24px]">
      <div className="px-[45px]">
        <TableHeader
          setSearch={setSearch}
          setUploadModal={setUploadModal}
          active={props.active}
          setDateFilterModal={setDateFilterModal}
          setFilterModal={setFilterModal}
          dateRange={props.dateRange}
          selectedFilters={selectedFilters}
        />
      </div>
      {props.active === "Job status" && (
        <JobStatusTable
          //@ts-ignore
          data={getItemsForPage(filters.length === 0 ? props.data : props.data.filter(item => filters.includes(item.status)), props.jobStatusPage)}
          search={search}
          handleVideoPreview={handleVideoPreview}
          handleVideoDownload={handleVideoDownload}
          setVideoPreviewModal={setVideoPreviewModal}
          videoUrl={videoUrl}
        />
      )}
      {props.active === "Recent Uploads" && (
        <UploadedFilesTable
          data={getItemsForPage(props.data, props.uploadedFilesPage)}
          search={search}
        />
      )}
      <UploadFileModal
        uploadModal={uploadModal}
        setUploadModal={setUploadModal}
        setFile={() => {
          return 1
        }}
        videoRef={videoRef}
      />
      <VideoPreviewModal
        open={videoPreviewModal}
        setOpen={setVideoPreviewModal}
        video={video}
      />
      <DateFilterModal
        open={dateFilterModal}
        setOpen={setDateFilterModal}
        setDateRange={props.setDateRange}
      />
      <FilterModal
        open={filterModal}
        setOpen={setFilterModal}
        title="Filters"
        description="Status"
        selected={selectedFilters}
        //@ts-ignore
        setSelected={setSelectedFilters}
        onClick={applyFilter}
      />
    </div>
  );
}

