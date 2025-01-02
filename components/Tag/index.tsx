import Typography from "@/components/Typography";

type TagProps = {
  label: string;
  variant?: string
}

export default function Tag(props: TagProps) {
  return (
    <div className={`border border-2 border-[#17ABDB] flex justify-center items-center  ${props.variant === "md" ? "py-1 rounded-lg  min-w-[193px] h-[32px] my-auto leading-[36px] px-2" : " rounded-lg px-1 w-[110px] h-[27px]"}  bg-[#E9FAFF80]`}>
      <Typography className={`text-sky-500 font-lato ${props.variant === "md" ? "text-[1.125em] font-bold" : "text-[10px] leading-4"}`} label={props.label} />
    </div>
  )
}