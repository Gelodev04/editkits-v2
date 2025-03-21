import JobActiveSVG from "@/public/assets/img/job_white.svg";
import JobInActiveSVG from "@/public/assets/img/job_black.svg";
import UploadActiveSVG from "@/public/assets/img/upload_white.svg";
import UploadInActiveSVG from "@/public/assets/img/upload_black.svg";
import Image from "next/image";

type TableTypeProps = {
  active: any;
  setActive: any
}

export default function TableType(props: TableTypeProps) {
  return (
    <div className="pt-[32px] px-2 flex flex-col gap-2 w-[228px] min-h-full rounded rounded-lg">
      <button
        onClick={() => props.setActive("Job status")}
        className={`flex justify-start pl-[16px] items-center py-[15.5px] max-h-12 rounded rounded-lg gap-4 w-[192px] mx-auto ${props.active === "Job status" ? 'bg-[#273277]' : ""}`}
      >
        <Image src={props.active === "Job status" ? JobActiveSVG : JobInActiveSVG} alt="job svg" priority />
        <p className={`font-montserrat font-bold text-sm ${props.active === "Job status" ? "#fff" : "text-[#4f4f4f]"}`}>Job status</p>
      </button>
      <button
        onClick={() => props.setActive("Uploaded files")}
        className={`flex justify-start pl-4 items-center py-4 max-h-12 rounded rounded-lg gap-4 w-[192px] mx-auto ${props.active === "Uploaded files" ? 'bg-[#273277]' : ""}`}
      >
        <Image src={props.active === "Uploaded files" ? UploadActiveSVG : UploadInActiveSVG} alt="upload svg" />
        <p className={`font-montserrat font-bold text-sm ${props.active === "Uploaded files" ? "#fff" : "text-[#4f4f4f]"}`}>Uploaded files</p>
      </button>
    </div>
  )
}