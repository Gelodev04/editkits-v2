import Typography from "@/components/Typography";

export default function StatCard({stat}) {
  return (
    <div className="w-[254px] h-[116px] grid grid-cols-10 shadow-md items-center bg-white px-4 py-5 gap-7">
      <div className="col-span-4">
        <Typography className="font-lato font-bold text-[18px] leading-[21.6px]" label={stat.label} />
      </div>
      <div className="col-span-4">
        {stat.data.map((s => <Stat title={s.title} value={s.value} />))}
      </div>
    </div>
  )
}


function Stat({title, value}) {
  return (
    <div className="grid grid-cols-12 items-center gap-3.5">
      <div className="col-span-6">
        <Typography className="font-lato font-normal text-[#747474] text-xs" label={title} />
      </div>
      <div className="col-span-6">
        <Typography className="font-lato font-medium text-[18px] leading-[21.6px]" label={value} />
      </div>
    </div>
  )
}