export default function Alert({label, mode}) {
  const warn = "bg-[#ffa6004d] text-[#4f4f4f] font-lato font-normal text-base leading-[24px] pl-[53px] pr-[27px] py-[43px] rounded-[8px] relative";
  const info = 'bg-[#89c5fd4d] text-[#4f4f4f] font-lato font-normal text-base leading-[24px] pl-[53px] pr-[27px] py-[43px] rounded-[8px] relative';
  const success = 'bg-[#00ff444d] text-[#4f4f4f] font-lato font-normal text-base leading-[24px] pl-[53px] pr-[27px] py-[43px] rounded-[8px] relative';
  const error = 'bg-[#fd898b4d] text-[#4f4f4f] font-lato font-normal text-base leading-[24px] pl-[53px] pr-[27px] py-[43px] rounded-[8px] relative';

  const className = mode === "warning" ? warn : mode === "info" ? info : mode === "success" ? success : mode === "error" ? error : "";

  return (
    <div className={className}
         role="alert">
      <span className="block sm:inline ">{label}</span>
    </div>
  )
}