type TypographyProps = {
    label?: string;
    variant?: string;
    center?: boolean;
    className?: string;
}

function TypographyStyle(variant?: string, center?: boolean) {
    switch (variant) {
        case "h1":
            return `text-5xl font-black text-black ${center && "text-center"}`;
        case "h2":
            return `text-4xl font-black text-black font-bold ${center && "text-center"}`;
        case "h3":
            return `text-3xl font-black text-black font-bold ${center && "text-center"}`;
        case "h4":
            return `text-2xl font-black text-black ${center && "text-center"}`;
        case "h5":
            return `text-xl font-black text-black ${center && "text-center"}`;
        case "h6":
            return `text-lg font-black text-black ${center && "text-center"}`;
        case "sm":
            return `text-sm text-black ${center && "text-center"}`;
        default:
            return `text-sm font-light text-gray-900 font-normal ${center && "text-center"}`;
    }
}

export default function Typography(props: TypographyProps) {
    return (
        <>
            <p className={TypographyStyle(props.variant, props.center)}>{props.label}</p>
        </>
    )
}