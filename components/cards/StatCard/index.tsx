import Image from 'next/image'
import { ArrowUpIcon } from "@/icons";
import Badge from "@/components/Badge";

type StatData = {
  title: string;
  value: string;
  icon: any
}

export default function StatCard(props: any) {
  return (
    <>
      {/*@ts-ignore*/}
      {props.stat.map(((s: StatData) => <Stat title={s.label} value={s.data[0].value} icon={s.icon}/>))}
    </>
  )
}


function Stat({title, value, icon}: { title: string; value: string , icon: any}) {
  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <Image className="text-gray-800 size-6 dark:text-white/90" src={icon} alt="group icon"/>
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {title}
            </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {value}
          </h4>
        </div>
        <Badge color="success">
          <Image src={ArrowUpIcon} alt="up icon"/>
          11.01%
        </Badge>
      </div>
    </div>
  )
}