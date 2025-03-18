import React, {useState} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";

import {FaAngleDown} from "react-icons/fa";
import { Divider } from "@mui/material";

import AuthModal from "@/components/modals/Auth";
import Button from "@/components/Button";
import PopUp from "@/components/modals/Popup";
import Typography from "@/components/Typography";
import useLogout from "@/hooks/useLogout";
import {useUserInfo} from "@/hooks/useUserInfo";
import {useLogoutMutation} from "@/services/api/auth";

import Logout from '@/public/assets/icons/logout.svg'
import Logo from "@/public/assets/img/logo.svg"
import Subscription from '@/public/assets/icons/subscription.svg'
import User from '@/public/assets/icons/user.svg'

export default function Header() {
  const router = useRouter();
  const { userInfo } = useUserInfo();
  const [logout] = useLogoutMutation();
  const handleLogout = useLogout(router, logout);

  const [type, setType] = useState("");
  const [showAuthModal, setAuthModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [authConfirmationModal, setAuthConfirmationModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("");


  function onSignup() {
    setAuthModal(true);
    setType("Sign Up");
  }

  function onLogin() {
    setAuthModal(true);
    setType("Log In");
  }

  return (
    <div className="flex justify-between py-[22px] bg-white w-full max-w-[1920px] mx-auto 2xl:px-[153px]">
      <Link href="/">
        <Image src={Logo} className="w-[187px]" alt="Logo" priority/>
      </Link>
      <div className="flex space-x-[21px] justify-center items-center">
        {userInfo && (
          <Link href="/dashboard">
            <Typography label="Dashboard" variant="link" bold={router.pathname === "/dashboard"}/>
          </Link>
        )}
        <Link href="/home">
          <Typography width={45} label="Home" variant="link" bold={router.pathname === "/home"}/>
        </Link>
        <Link href="/blog">
          <Typography width={42} label="Blogs" variant="link" bold={router.pathname === "/blogs"}/>
        </Link>
        <Link href="/contact-us">
          <Typography width={100} label="Contact Us" variant="link" bold={router.pathname === "/contact-us"}/>
        </Link>
      </div>
      <div className="flex gap-[11px] justify-center items-center">
        {userInfo && (
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
                  onClick={() => router.push('/account')}
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
                <Divider orientation="horizontal" flexItem/>
                <Button
                  onClick={handleLogout}
                  fontWeight="font-normal"
                  font="font-inter"
                  variant="primary"
                  label="Log Out" leftIcon={Logout}
                  className="font-inter font-normal gap-4 px-4"
                />
              </div>
            )}
          </div>
        )}

        {!userInfo && (
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
                variant="contained"
                filled
                width={115}
                height={48}
              />
            </div>
          </>
        )}
      </div>
      <AuthModal
        type={type}
        setType={setType}
        showAuthModal={showAuthModal}
        setAuthModal={setAuthModal}
        authConfirmationModal={authConfirmationModal}
        modalTitle={modalTitle}
        modalMessage={modalMessage}
        setAuthConfirmationModal={setAuthConfirmationModal}
        setModalTitle={setModalTitle}
        setModalMessage={setModalMessage}
      />
     <PopUp
        open={authConfirmationModal}
        setOpen={setAuthConfirmationModal}
        description={modalMessage}
        title={modalTitle}
      />
    </div>
  )
}
