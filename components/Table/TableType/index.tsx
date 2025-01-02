import JobActiveSVG from "@/assets/img/job_white.svg";
import JobInActiveSVG from "@/assets/img/job_black.svg";
import UploadActiveSVG from "@/assets/img/upload_white.svg";
import UploadInActiveSVG from "@/assets/img/upload_black.svg";
import Image from "next/image";

type TableTypeProps = {
  active: any;
  setActive: any
}

export default function TableType(props: TableTypeProps) {
  return (
    <div className="py-8 px-2 flex flex-col gap-2 bg-white w-[228px] min-h-full rounded rounded-lg">
      <button
        onClick={() => props.setActive("Job status")}
        className={`flex justify-start pl-4 items-center py-4 max-h-[48px] rounded rounded-lg gap-4 w-[192px] mx-auto ${props.active === "Job status" ? 'bg-[#17abdb]' : ""}`}
      >
        <Image src={props.active === "Job status" ? JobActiveSVG : JobInActiveSVG} alt="job svg" />
        <p className={`font-montserrat font-bold text-sm ${props.active === "Job status" ? "#fff" : "text-[#4f4f4f]"}`}>Job status</p>
      </button>
      <button
        onClick={() => props.setActive("Uploaded files")}
        className={`flex justify-start pl-4 items-center py-4 max-h-[48px] rounded rounded-lg gap-4 w-[192px] mx-auto ${props.active === "Uploaded files" ? 'bg-[#17abdb]' : ""}`}
      >
        <Image src={props.active === "Uploaded files" ? UploadActiveSVG : UploadInActiveSVG} alt="upload svg" />
        <p className={`font-montserrat font-bold text-sm ${props.active === "Uploaded files" ? "#fff" : "text-[#4f4f4f]"}`}>Uploaded files</p>
      </button>
    </div>
  )
}