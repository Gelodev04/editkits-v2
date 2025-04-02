import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";

import AuthModal from "@/components/modals/Auth";
import PopUp from "@/components/modals/Popup";
import Typography from "@/components/Typography";
import useLogout from "@/hooks/useLogout";
import {useUserInfo} from "@/hooks/useUserInfo";
import {useLogoutMutation} from "@/services/api/auth";

import Logo from "@/public/images/logo.svg"

import {useSidebar} from "@/context/SidebarContext";
import ButtonOld from "@/components/Button_Old";
import {ThemeToggleButton} from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/NotificationDropdown";
import UserDropdown from "@/components/UserDropdown";

export default function Header() {
  const router = useRouter();
  const {userInfo} = useUserInfo();
  const [logout] = useLogoutMutation();
  const handleLogout = useLogout(router, logout);

  const {isMobileOpen, toggleSidebar, toggleMobileSidebar, isExpanded, isHovered} = useSidebar();

  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const [type, setType] = useState("");
  const [showAuthModal, setAuthModal] = useState(false);

  const [authConfirmationModal, setAuthConfirmationModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("");

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  }

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };


  function onSignup() {
    setAuthModal(true);
    setType("Sign Up");
  }

  function onLogin() {
    setAuthModal(true);
    setType("Log In");
  }

  useEffect(() => {
    const {login} = router.query;
    if (login) {
      setType("Log In");
      setAuthModal(true)
    }
  }, []);

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[314px]"
      : "lg:ml-[90px]";

  return (
    <>
      <div
        className={`transition-all duration-300 ease-in-out flex justify-between py-[22px] bg-white dark:bg-gray-900 dark:border-gray-800 w-full mx-auto ${!(router.pathname === "/dashboard/job-status" || router.pathname === "/dashboard/uploaded-files") && "2xl:pl-[253px]"} 2xl:pr-[24px]`}>
        {!(router.pathname === "/dashboard/job-status" || router.pathname === "/dashboard/uploaded-files") && (
          <>
            <Link href="/home">
              {!(router.pathname === "/dashboard/job-status" || router.pathname === "/dashboard/uploaded-files") &&
              <Image src={Logo} className="w-[187px]" alt="Logo" priority/>}
            </Link>
            <div className="flex justify-center items-center">
              {userInfo && (
                <Link className="pr-[35px]" href="/dashboard/uploaded-files">
                  <Typography label="Dashboard" variant="link"
                              bold={(router.pathname === "/dashboard/uploaded-files" || router.pathname === "/dashboard/job-status")}/>
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
          </>
        )}

        {(router.pathname === "/dashboard/job-status" || router.pathname === "/dashboard/uploaded-files") && (
          <button
            className={`${mainContentMargin} ml-9 items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border`}
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        )}
        <div className="flex gap-[11px] justify-center items-center">
          {userInfo && (
            <div
              className={`${
                isApplicationMenuOpen ? "flex" : "hidden" } xsm:hidden items-center justify-between gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
            >
              <div className="flex items-center gap-2 2xsm:gap-3">
                <ThemeToggleButton/>

                <NotificationDropdown/>
              </div>
              <UserDropdown handleLogout={handleLogout}/>
            </div>
          )}

          {!userInfo && (
            <div className="flex gap-[23px]">
              <ButtonOld
                onClick={onSignup}
                label="Signup"
                variant="standard_sm"
              />
              <ButtonOld
                onClick={onLogin}
                label="Login"
                variant="standard_sm"
                filled
              />
            </div>
          )}
        </div>
        {userInfo && (
          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
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
      {userInfo && (
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden" } bg-white border-t-[1px] items-center justify-between gap-4 px-5 py-4 lg:hidden shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            <ThemeToggleButton/>

            <NotificationDropdown/>
          </div>
          <UserDropdown handleLogout={handleLogout}/>
        </div>
      )}
    </>
  )
}
