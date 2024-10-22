type ButtonProps = {
    label: string;
    variant: string;
    filled?: boolean;
    width?: number;
}

function ButtonStyle(variant: string, filled?: boolean, width?: number){
    if(variant === "primary") {
        return "text-neutral-500"
    } else if (variant === "secondary") {
        return `text-black text-sm border-solid border-2 border-zinc-100 py-2 rounded rounded-full ${width ? `w-${width}` :  "w-[20%]"} ${filled ? "bg-sky-500 text-white": ""}`
    }
}


export default function Button(props: ButtonProps) {
    return (
        <>
            <button className={ButtonStyle(props.variant, props.filled, props.width)}>{props.label}</button>
        </>
    )
}