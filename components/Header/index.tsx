import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";

import {FaAngleDown} from "react-icons/fa";

import Logo from "@/assets/img/logo.svg"
import Button from "@/components/Button";
import AuthModal from "../modals/Auth/index";
import User from '@/assets/img/icons/user.svg'
import Subscription from '@/assets/img/icons/subscription.svg'
import Logout from '@/assets/img/icons/logout.svg'

export default function Header() {
  const [type, setType] = useState("");
  const [showAuthModal, setAuthModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

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
        {router.pathname === "/dashboard" && (
          <Link href="/dashboard">
            <Button bold={router.pathname === "/dashboard"} label="Dashboard" variant="primary"/>
          </Link>
        )}
        <Link href="/tools">
          <Button bold={router.pathname === "/tools"} label="Tools" variant="primary"/>
        </Link>
        <Link href="/pricing">
          <Button bold={router.pathname === "/pricing"} label="Pricing" variant="primary"/>
        </Link>
      </div>
      <div className="flex space-x-6 justify-center items-center">
        {router.pathname === "/dashboard" ? (
          <div className="w-[160px] relative inline-block">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              width={1}
              variant="contained"
              label="Account"
              rightIcon={<FaAngleDown size={16}/>}
              className="bg-[#f0f0f0]"
            />
            {isOpen && (
              <div
                className="absolute right-0 w-full mt-2 bg-white rounded-lg shadow-lg p-4 flex flex-col gap-y-4 items-start"
                onMouseLeave={() => setIsOpen(false)}
              >
                <Button fontWeight="font-normal" font="font-inter" variant="primary" label="Profile" leftIcon={User}/>
                <Button fontWeight="font-normal" font="font-inter" variant="primary" label="Subscription" leftIcon={Subscription}/>
                <Button fontWeight="font-normal" font="font-inter" variant="primary" label="Log Out" leftIcon={Logout}/>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="w-32">
              <Button onClick={onSignup} label="Signup" variant="secondary"/>
            </div>
            <div className="w-32">
              <Button onClick={onLogin} label="Login" variant="secondary" filled/>
            </div>
          </>
        )}
      </div>
      <AuthModal type={type} setType={setType} showAuthModal={showAuthModal} setAuthModal={setAuthModal}/>
    </div>
  )
}
