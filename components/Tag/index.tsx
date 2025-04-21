type TagProps = {
  label: string;
  variant?: string;
};

export default function Tag(props: TagProps) {
  return (
    <div
      className={`group-hover:border-white group-hover:bg-white border border-[#7d3dde] flex justify-center items-center  ${
        props.variant === 'md'
          ? 'py-1 rounded-lg h-auto my-auto leading-none lg:px-2 text-center'
          : 'rounded-lg h-auto px-[4px] leading-none text-center'
      }`}
    >
      <p
        className={`group-hover:text-[#2c2c2c] text-[#7d3dde] font-lato font-bold ${
          props.variant === 'md' ? 'text-[1.125em]' : 'text-sm leading-[16px] tracking-[-0.42px]'
        }`}
      >
        {props.label}
      </p>
    </div>
  );
}
