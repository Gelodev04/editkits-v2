import Image from "next/image";
import Logo from "@/assets/img/logo.png"
import Button from "@/components/Button";

export default function Header() {
    return (
        <div className="grid grid-cols-3 w-full px-20 py-5 bg-white">
            <Image src={Logo} className="w-[187px] h-[54px]" alt="Logo" />
            <div className="flex space-x-6 justify-center">
                <Button label="Tools" variant="primary" />
                <Button label="Pricing" variant="primary" />
            </div>
            <div className="flex space-x-6 justify-center">
                <Button label="Signup" variant="secondary" />
                <Button label="Login" variant="secondary" filled />
            </div>
        </div>
    )
}