import Typography from "@/components/Typography";

export default function Tag({label}: {label: string}) {
  return (
    <div className="border border-2 border-[#17ABDB] p-2 rounded-xl bg-[#E9FAFF80]">
      <Typography className="text-[#17ABDB] font-lato font-bold text-xs" label={label} />
    </div>
  )
}