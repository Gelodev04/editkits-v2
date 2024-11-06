import Typography from "@/components/Typography";

export default function Tag({label}: {label: string}) {
  return (
    <div className="border border-2 border-[#17ABDB] p-2 rounded-xl bg-[#E9FAFF80]">
      <Typography className="text-sky-500 font-lato text-xs" label={label} bold />
    </div>
  )
}