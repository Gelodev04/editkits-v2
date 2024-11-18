import Typography from "@/components/Typography";

type TagProps = {
  label: string;
  variant: string
}

export default function Tag(props: TagProps) {
  return (
    <div className={`border border-2 border-[#17ABDB] ${props.variant === "md" ? "py-1 rounded-lg px-4" : "py-2 rounded-xl px-2"  }  bg-[#E9FAFF80]`}>
      <Typography className={`text-sky-500 font-lato ${props.variant === "md" ? "text-lg" : "text-xs"}`} label={props.label} bold />
    </div>
  )
}