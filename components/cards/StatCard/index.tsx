import Typography from "@/components/Typography";

export default function StatCard({stat}) {
  return (
    <div className="w-[280px] grid grid-cols-10 shadow-md items-center bg-white px-6 py-5 gap-7">
      <div className="col-span-4">
        <Typography variant="bb1s" label={stat.label} />
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
        <Typography variant="b4" label={title} />
      </div>
      <div className="col-span-6">
        <Typography variant="bb1s" label={value} />
      </div>
    </div>
  )
}