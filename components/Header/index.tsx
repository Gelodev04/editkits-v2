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
import {Divider} from "@mui/material";
import Typography from "@/components/Typography";

export default function Header() {
  const [type, setType] = useState("");
  const [showAuthModal, setAuthModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
        {(router.pathname === "/dashboard" || router.pathname === "/account" || router.pathname === "/resize" || router.pathname === "/account" || router.pathname === "/trim") && (
          <Link href="/dashboard">
            <Typography label="Dashboard" variant="link" bold={router.pathname === "/dashboard"} />
          </Link>
        )}
        <Link href="/tools">
          <Typography label="Tools" variant="link" bold={router.pathname === "/tools"} />
        </Link>
        <Link href="/pricing">
          <Typography label="Pricing" variant="link" bold={router.pathname === "/pricing"} />
        </Link>
      </div>
      <div className="flex gap-[11px] justify-center items-center">
        {router.pathname === "/dashboard" || router.pathname === '/account' || router.pathname === '/trim' || router.pathname === '/resize' ? (
          <div className="w-[160px] relative inline-block">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="contained"
              label="Account"
              rightIcon={<FaAngleDown size={16}/>}
              className="bg-[#f0f0f0] py-3 w-[160px] font-montserrat"
            />
            {isOpen && (
              <div
                className="absolute w-[235px] mx-auto right-[-40px] mt-4 bg-white rounded-lg shadow-xl py-4 flex flex-col gap-y-4 items-start"
                onMouseLeave={() => setIsOpen(false)}
              >
                <Button
                  onClick={() => router.push('account')}
                  fontWeight="font-normal"
                  font="font-inter"
                  variant="primary"
                  label="Profile"
                  leftIcon={User}
                  className="font-inter font-normal gap-4 px-4"
                />
                <Button
                  onClick={() => router.push('account')}
                  fontWeight="font-normal"
                  font="font-inter"
                  variant="primary" label="Subscription"
                  leftIcon={Subscription}
                  className="font-inter font-normal gap-4 px-4"
                />
                <Divider orientation="horizontal" flexItem />
                <Button
                  onClick={() => router.push('home')}
                  fontWeight="font-normal"
                  font="font-inter"
                  variant="primary"
                  label="Log Out" leftIcon={Logout}
                  className="font-inter font-normal gap-4 px-4"
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="w-32">
              <Button
                onClick={onSignup}
                label="Signup"
                variant="secondary"
                width={112}
                height={48}
              />
            </div>
            <div className="w-32">
              <Button
                onClick={onLogin}
                label="Login"
                variant="secondary"
                filled
                width={112}
                height={48}
              />
            </div>
          </>
        )}
      </div>
      <AuthModal type={type} setType={setType} showAuthModal={showAuthModal} setAuthModal={setAuthModal}/>
    </div>
  )
}
