import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";

import {FaAngleDown} from "react-icons/fa";
import {Divider} from "@mui/material";

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
  const {userInfo} = useUserInfo();
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

  useEffect(() => {
    const { login } = router.query;
    if(login) {
      setType("Log In");
      setAuthModal(true)
    }
  }, []);

  return (
    <div className="flex justify-between py-[22px] bg-white w-full max-w-[1920px] mx-auto 2xl:px-[153px]">
      <Link href="/home">
        {router.pathname !== "/dashboard" && <Image src={Logo} className="w-[187px]" alt="Logo" priority/>}
      </Link>
      <div className="flex justify-center items-center">
        {userInfo && (
          <Link className="pr-[35px]" href="/dashboard">
            <Typography label="Dashboard" variant="link" bold={router.pathname === "/dashboard"}/>
          </Link>
        )}
        {!userInfo && (
          <Link className="pr-[35px]" href="/home">
            <Typography label="Home" variant="link" bold={router.pathname === "/home"}/>
          </Link>
        )}
        <Link className="pr-[35px]" href="/tools">
          <Typography label="Tools" variant="link" bold={router.pathname === "/tools"}/>
        </Link>
        <Link className="pr-[35px]" href="/pricing">
          <Typography label="Pricing" variant="link" bold={router.pathname === "/pricing"}/>
        </Link>
        <Link className="pr-[35px]" href="/blog">
          <Typography label="Blogs" variant="link" bold={router.pathname === "/blog"}/>
        </Link>
        <Link className="pr-[35px]" href="/contact-us">
          <Typography label="Contact Us" variant="link" bold={router.pathname === "/contact-us"}/>
        </Link>
      </div>
      <div className="flex gap-[11px] justify-center items-center">
        {userInfo && (
          <div className="w-[160px] relative inline-block">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="standard_sm"
              label="Account"
              disabled
              filled
              rightIcon={<FaAngleDown size={16}
              />
              }
            />
            {isOpen && (
              <div
                className="absolute w-[235px] right-[-40px] mt-4 bg-white rounded-lg shadow-xl py-4 flex items-start justify-start flex-col gap-y-4"
                onMouseLeave={() => setIsOpen(false)}
              >
                <Link href="/account" className="flex gap-[8px] pl-[10px] items-center">
                  <Image src={User} alt="user icon"/>
                  <p className="font-inter font-normal text-sm text-[#4f4f4f]">Profile</p>
                </Link>
                <Link href="/account" className="flex gap-[8px] pl-[10px] items-center">
                  <Image src={Subscription} alt="subscription icon"/>
                  <p className="font-inter font-normal text-sm text-[#4f4f4f]">Subscription</p>
                </Link>
                <Divider orientation="horizontal" flexItem/>
                <div onClick={handleLogout} className="flex gap-[8px] pl-[10px] items-center cursor-pointer">
                  <Image src={Logout} alt="logout icon"/>
                  <p className="font-inter font-normal text-sm text-[#4f4f4f]">Logout</p>
                </div>
              </div>
            )}
          </div>
        )}

        {!userInfo && (
          <div className="flex gap-[23px]">
            <Button
              onClick={onSignup}
              label="Signup"
              variant="standard_sm"
            />
            <Button
              onClick={onLogin}
              label="Login"
              variant="standard_sm"
              filled
            />
          </div>
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
