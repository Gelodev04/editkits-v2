type TagProps = {
  label: string;
  variant?: string
}

export default function Tag(props: TagProps) {
  return (
    <div className={`group-hover:border-white border border-2 border-[#7d3dde] flex justify-center items-center  ${props.variant === "md" ? "py-1 rounded-lg  min-w-[193px] h-[32px] my-auto leading-[36px] px-2" : "rounded-lg max-w-[122px] h-[27px] px-[4px]"}`}>
      <p className={`group-hover:text-white text-[#7d3dde] font-lato font-bold ${props.variant === "md" ? "text-[1.125em]" : "text-xs leading-[16px] tracking-tighter"}`}>{props.label}</p>
    </div>
  )
}