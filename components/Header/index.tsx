import Image from "next/image";
import Logo from "@/assets/img/logo.svg"
import Button from "@/components/Button";
import React, {useState} from "react";
import Link from "next/link";
import AuthModal from "../modals/Auth/index";

export default function Header() {
  const [type, setType] = useState("");
  const [showAuthModal, setAuthModal] = useState(false);

  function onSignup() {
    setAuthModal(true);
    setType("Sign Up");
  }

  function onLogin() {
    setAuthModal(true);
    setType("Log In");
  }

  return (
    <div className="flex justify-between py-5 bg-white w-full max-w-[1280px] mx-auto px-8">
      <Link href="/">
        <Image src={Logo} className="w-[187px]" alt="Logo"/>
      </Link>
      <div className="flex space-x-6 justify-center items-center">
        <Link href="/tools">
          <Button label="Tools" variant="primary"/>
        </Link>
        <Link href="/pricing">
          <Button label="Pricing" variant="primary"/>
        </Link>
      </div>
      <div className="flex space-x-6 justify-center">
        <div className="w-32">
          <Button onClick={onSignup} label="Signup" variant="secondary"/>
        </div>
        <div className="w-32">
          <Button onClick={onLogin} label="Login" variant="secondary" filled/>
        </div>
      </div>
      <AuthModal type={type} setType={setType} showAuthModal={showAuthModal} setAuthModal={setAuthModal}/>
    </div>
  )
}