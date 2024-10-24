import Image, {StaticImageData} from "next/image";
import Logo from "@/assets/img/logo.png"
import Button from "@/components/Button";
import React from "react";

type HeaderProps = {
    type: string;
    setAuthModal: (e: React.SetStateAction<boolean>) => void;
    setType: (e: React.SetStateAction<string>) => void;
}

export default function Header(props: HeaderProps) {

    function onSignup() {
        props.setAuthModal(true);
        props.setType("Sign Up");
    }

    function onLogin() {
        props.setAuthModal(true);
        props.setType("Log In");
    }

    return (
        <div className="grid grid-cols-3 w-full px-20 py-5 bg-white">
            <Image src={Logo} className="w-[187px] h-[54px]" alt="Logo"/>
            <div className="flex space-x-6 justify-center">
                <Button label="Tools" variant="primary"/>
                <Button label="Pricing" variant="primary"/>
            </div>
            <div className="flex space-x-6 justify-center">
                <div className="w-32">
                    <Button onClick={onSignup} label="Signup" variant="secondary"/>
                </div>
                <div className="w-32">
                    <Button onClick={onLogin} label="Login" variant="secondary" filled/>
                </div>
            </div>
        </div>
    )
}