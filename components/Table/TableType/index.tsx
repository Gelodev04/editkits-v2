import JobActiveSVG from "@/assets/img/job_white.svg";
import JobInActiveSVG from "@/assets/img/job_black.svg";
import UploadActiveSVG from "@/assets/img/upload_white.svg";
import UploadInActiveSVG from "@/assets/img/upload_black.svg";
import Image from "next/image";

export default function TableType({active, setActive}) {
  return (
    <div className="py-8 px-2 flex flex-col gap-2 bg-white w-[100%] min-h-full rounded rounded-lg">
      <button
        onClick={() => setActive("Job status")}
        className={`flex justify-start pl-4 items-center py-4 max-h-[48px] rounded rounded-lg gap-4 ${active === "Job status" ? 'bg-[#17abdb]' : ""}`}
      >
        <Image src={active === "Job status" ? JobActiveSVG : JobInActiveSVG} alt="job svg" />
        <p className={`font-montserrat font-bold text-sm ${active === "Job status" ? "#fff" : "text-[#4f4f4f]"}`}>Job status</p>
      </button>
      <button
        onClick={() => setActive("Uploaded files")}
        className={`flex justify-start pl-4 items-center py-4 max-h-[48px] rounded rounded-lg gap-4 ${active === "Uploaded files" ? 'bg-[#17abdb]' : ""}`}
      >
        <Image src={active === "Uploaded files" ? UploadActiveSVG : UploadInActiveSVG} alt="upload svg" />
        <p className={`font-montserrat font-bold text-sm ${active === "Uploaded files" ? "#fff" : "text-[#4f4f4f]"}`}>Uploaded files</p>
      </button>
    </div>
  )
}