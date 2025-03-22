import {useState, useRef, useEffect} from "react";

import UploadFileModal from "@/components/modals/UploadFileModal";
import TableHeader from "@/components/Table/TableHeader";
import JobStatusTable from "@/components/Table/JobStatus";
import UploadedFilesTable from "@/components/Table/UploadedFiles";
import {usePreviewVideoQuery} from "@/services/api/file";
import VideoPreviewModal from "@/components/modals/VideoPreviewModal";

type DashboardTableProps = {
  active: any;
  jobStatusPage: any;
  uploadedFilesPage: any;
  data: any
}

export default function DashboardTable(props: DashboardTableProps) {
  const videoRef = useRef(null);
  const [fileId, setFileId] = useState(null);
  const {data: videoUrl} = usePreviewVideoQuery({fileId}, {skip: !fileId});
  const [video, setVideo] = useState(null)

  const [search, setSearch] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [videoPreviewModal, setVideoPreviewModal] = useState(false);


  useEffect(() => {
    setVideo(videoUrl?.url)
  },[videoUrl])

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

  return (
    <div className="bg-white border-[1px] border-[#ebebeb] rounded-[24px]">
      <div className="px-[45px]">
        <TableHeader setSearch={setSearch} setUploadModal={setUploadModal} active={props.active}/>
      </div>
      {props.active === "Job status" && (
        <JobStatusTable
          data={getItemsForPage(props.data, props.jobStatusPage)}
          search={search}
          handleVideoPreview={handleVideoPreview}
          handleVideoDownload={handleVideoDownload}
          setVideoPreviewModal={setVideoPreviewModal}
          videoUrl={videoUrl}
        />
      )}
      {props.active === "Recent Uploads" &&
      <UploadedFilesTable data={getItemsForPage(props.data, props.uploadedFilesPage)} search={search}/>}
      <UploadFileModal uploadModal={uploadModal} setUploadModal={setUploadModal} setFile={() => {
        return 1
      }} videoRef={videoRef}
      />
      <VideoPreviewModal
        open={videoPreviewModal}
        setOpen={setVideoPreviewModal}
        video={video}
      />
    </div>
  );
}

