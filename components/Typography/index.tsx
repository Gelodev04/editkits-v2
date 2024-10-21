type TypographyProps = {
    label: string;
    variant?: string;
    center?: boolean;
    className?: string;
}

function TypographyStyle(variant?: string, center?: boolean) {
    if (variant === "h1") {
        return `text-5xl font-black text-black ${center && "text-center"}`
    } else if (variant === "h2") {
        return `text-4xl font-black text-black ${center && "text-center"}`
    } else if (variant === "h3") {
        return `text-3xl font-black text-black ${center && "text-center"}`
    } else if (variant === "h4") {
        return `text-2xl font-black text-black ${center && "text-center"}`
    } else if (variant === "h5") {
        return `text-xl font-black text-black ${center && "text-center"}`
    } else if (variant === "h6") {
        return `text-lg font-black text-black ${center && "text-center"}`
    } else {
        return `text-sm font-light text-gray-900 ${center && "text-center"}`
    }
}

export default function Typography(props: TypographyProps) {
    return (
        <>
            <p className={TypographyStyle(props.variant, props.center)}>{props.label}</p>
        </>
    )
}