import JobActiveSVG from "@/public/images/job_white.svg";
import JobInActiveSVG from "@/public/images/job_black.svg";
import UploadActiveSVG from "@/public/images/upload_white.svg";
import UploadInActiveSVG from "@/public/images/upload_black.svg";
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
        onClick={() => props.setActive("Recent Uploads")}
        className={`flex justify-start pl-4 items-center py-4 max-h-12 rounded rounded-lg gap-4 w-[192px] mx-auto ${props.active === "Recent Uploads" ? 'bg-[#273277]' : ""}`}
      >
        <Image src={props.active === "Recent Uploads" ? UploadActiveSVG : UploadInActiveSVG} alt="upload svg" />
        <p className={`font-montserrat font-bold text-sm ${props.active === "Recent Uploads" ? "#fff" : "text-[#4f4f4f]"}`}>Recent Uploads</p>
      </button>
    </div>
  )
}