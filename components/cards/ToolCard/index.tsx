import { Divider } from '@mui/material';
import Image, { StaticImageData } from 'next/image';

type ToolCardProps = {
  name: string;
  icon: StaticImageData;
  icon_hover: StaticImageData;
  variant?: string;
  description?: string;
};

export default function ToolCard({ name, description, icon, icon_hover, variant }: ToolCardProps) {
  return variant === 'tools' ? (
    <ForToolsPage name={name} icon={icon} icon_hover={icon_hover} description={description} />
  ) : (
    <ForHomePage name={name} icon={icon} description={description} />
  );
}

function ForToolsPage({ name, description, icon, icon_hover }) {
  return (
    <div
      key={name}
      className="group w-[208px] pt-[18.77px] h-[181px] border-solid border-[1px] border-[#e4e4e4]  rounded-md justify-center cursor-pointer hover:text-white/90 text-[#262628] hover:scale-105 hover:bg-[#1d2939] transition-transform transition-colors duration-500 relative"
    >
      <div className="max-w-[178px] mx-auto flex flex-col items-center">
        <Image
          src={icon}
          className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-500"
          alt="icon"
        />

        <Image
          src={icon_hover}
          alt={`${name} hover icon`}
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <p className="font-lato font-normal text-sm text-center pt-[48px] py-[8px]">{name}</p>
        <Divider
          sx={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#e2e4e9',
          }}
          orientation="horizontal"
          flexItem
        />
        <p className="font-lato font-bold text-[11px] leading-[20px] text-[#4f4f4f] group-hover:text-white/90 text-center pt-[8px] tracking-[0.8px]">
          {description}
        </p>
      </div>
    </div>
  );
}

function ForHomePage({ icon, name, description }) {
  return (
  //   <div
  //     key={name}
  //     className="group dark-hover:text-white/90 hover:text-white/90 text-[#262628] dark:text-gray-200 w-full max-w-xl xl:w-[208px] xl:h-[121px] px-4 flex flex-col items-start border-solid border-[1px] border-[#9f9f9f] dark:border-[#1d2939] dark:bg-[#1e2636] py-6 rounded-md justify-center cursor-pointer hover:scale-105 hover:bg-[#1d2939] transition-transform transition-colors duration-500 relative"
  //   >
  //     {/* <Image
  //         src={icon}
  //         alt={name}
  //         className="absolute  opacity-100 group-hover:opacity-0 transition-opacity duration-500 dark:invert"
  //       />
  //  */}
  //     {/* <Image
  //       src={icon_hover}
  //       alt={`${name} hover icon`}
  //       className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 "
  //     /> */}

  //     <div className="bg-[#222c4a] flex items-center justify-center size-[50px]">
  //       <Image src={icon} alt={name} className="duration-500 size-10" />
  //     </div>
  //     <p className="font-lato font-normal text-md ">{name}</p>
  //   </div>

<div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
<div>
  <div className="mb-5 flex h-14 max-w-14 items-center justify-center rounded-[10.5px] bg-brand-50 text-brand-500 dark:bg-brand-500/10">
      <Image
         src={icon}
       alt={name}
          
       />
  </div>
  <h4 className="mb-1 font-medium text-gray-800 text-theme-xl dark:text-white/90">{name}</h4>
  <p className="text-sm text-gray-500 dark:text-gray-400">
    {description}
  </p>
</div>
</div>
  );
}
