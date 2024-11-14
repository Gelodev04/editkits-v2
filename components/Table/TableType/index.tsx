import Button from "@/components/Button";
import JobSVG from "@/assets/img/job.svg";

export default function TableType({active, setActive}) {
  return (
    <div className="py-8 px-2 flex flex-col gap-2 bg-white w-[228px] rounded rounded-lg">
      <Button onClick={() => setActive("Job status")} label="Job status" filled={active === "Job status"} variant="outlined" leftIcon={JobSVG}/>
      <Button onClick={() => setActive("Uploaded files")} label="Uploaded files" filled={active === "Uploaded files"} variant="outlined"/>
    </div>
  )
}