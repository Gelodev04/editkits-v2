import Image from 'next/image'

import Typography from "@/components/Typography";

type StatData = {
  title: string;
  value: string;
}

export default function StatCard(props: any) {
  return (
    <div
      className="flex py-[23.5px] px-[33px] border-[1px] border-[#e9e9e9] rounded-[24px] items-center bg-white gap-[20px]">
      <div>
        <Image src={props.stat.icon} alt="card icon"/>
      </div>
      <div>
        <Typography variant="bb2" color="#148cfc" label={props.stat.label}/>
        <div className="pt-[12px]">
          {props.stat.data.map(((s: StatData) => <Stat title={s.title} value={s.value}/>))}
        </div>
      </div>
    </div>
  )
}


function Stat({title, value}: { title: string; value: string }) {
  return (
    <div className="w-[100px] flex items-center gap-[20px]">
      <p className="font-lato font-normal text-[#747474] text-[10px] w-[50px]">{title}</p>
      <p className="font-lato font-medium text-xs leading-[21.6px] text-[#2c2c2c] text-left">{value}</p>
    </div>
  )
}