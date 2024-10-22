import Image, {StaticImageData} from "next/image";

type ToolCardProps = {
    name: string;
    icon: StaticImageData;
}

export default function ToolCard({name, icon}: ToolCardProps) {
    return (
        <div className="flex flex-col w-[75%] items-center border-solid border-2 border-zinc-100 py-4 rounded rounded-md justify-center shadow-2xl cursor-pointer">
            <Image src={icon} alt={`${name} Icon`} width={0} height={0}/>
            <p className="text-neutral-800">{name}</p>
        </div>
    )
}