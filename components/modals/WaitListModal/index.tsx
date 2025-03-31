import React from "react";

import { TbXboxX } from "react-icons/tb";
import { Fade, Modal } from "@mui/material";

import InputField from "@/components/InputField";

import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { validateEmail } from "@/lib/validateEmail";
import { lato, montserrat, opensans } from "@/lib/fonts";
import ButtonOld from "@/components/Button_Old";

type GetInTouchCardProps = {
  user: any
  firstName: string;
  setFirstName: (e: React.SetStateAction<string>) => void;
  isFirstNameValid: boolean;
  setFirstNameValid: (e: React.SetStateAction<boolean>) => void;
  lastName: string;
  setLastName: (e: React.SetStateAction<string>) => void;
  isLastNameValid: boolean;
  setLastNameValid: (e: React.SetStateAction<boolean>) => void;
  email: string;
  setEmail: (e: React.SetStateAction<string>) => void;
  isEmailValid: boolean;
  setEmailValid: (e: React.SetStateAction<boolean>) => void;
  message: string;
  setMessage: (e: React.SetStateAction<string>) => void;
  isMessageValid: boolean;
  setMessageValid: (e: React.SetStateAction<boolean>) => void;
  handleWaitlistSubmit: any;
  open: boolean
  setOpen: (e: React.SetStateAction<boolean>) => void;
  isLoading: boolean
}

export default function WaitListModal(props: GetInTouchCardProps) {

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Fade in={props.open}>
        {/*@ts-ignore*/}
        <div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
              <div
                className={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:w-[532px]`}>
                <div className="absolute right-[14px] top-[14px] cursor-pointer">
                  <TbXboxX size={30} color="#000" onClick={() => props.setOpen(false)}/>
                </div>
                <div className="bg-white pt-[32px]">
                  <div className="pb-[8px]">
                    <Typography label="Join the Waitlist" center variant="h4"/>
                  </div>
                  <div className="w-[432px] py-[20px] mx-auto">
                    <div className="w-full pt-[22px]">
                      <InputField
                        placeholder="Your first name"
                        type="text"
                        // @ts-ignore
                        label={<span>First name <span style={{color: "#ff0000"}}>*</span></span>}
                        error={!props.isFirstNameValid}
                        variant="contact-us"
                        height={40}
                        value={props.firstName}
                        onChange={(e) => {
                          props.setFirstName(e.target.value);
                          props.setFirstNameValid(e.target.value.trim().length > 0);
                        }}
                      />
                    </div>
                    <div className="w-full py-[20px]">
                      <InputField
                        type="text"
                        value={props.lastName}
                        onChange={(e) => {
                          props.setLastName(e.target.value);
                          props.setLastNameValid(e.target.value.trim().length > 0);
                        }}
                        error={!props.isLastNameValid}
                        placeholder="Your last name"
                        //@ts-ignore
                        label={<span>Last name <span style={{color: "#ff0000"}}>*</span></span>} variant="contact-us"
                        height={40}
                      />

                    </div>
                    <InputField
                      type="text"
                      value={props.email}
                      onChange={(e) => {
                        props.setEmail(e.target.value);
                        props.setEmailValid(validateEmail(e.target.value));
                      }}
                      disabled={!!props.user}
                      error={!props.isEmailValid}
                      placeholder="Example@gmail.com"
                      //@ts-ignore
                      label={<span>Email <span style={{color: "#ff0000"}}>*</span></span>} variant="contact-us"
                      height={40}
                    />
                    <div className="pt-[20px] w-full">
                      <TextField
                        type="text"
                        value={props.message}
                        onChange={(e) => {
                          props.setMessage(e.target.value)
                          props.setMessageValid(e.target.value.trim().length > 0);
                        }}
                        placeholder="Share your thoughts with us..."
                        //@ts-ignore
                        label={<span>What are you most interested in? <span style={{color: "#ff0000"}}>*</span></span>}
                        variant="fileUpload"
                        error={!props.isMessageValid}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-[6px] pt-[32px] pb-[32px] max-w-[446px] mx-auto">
                  <ButtonOld
                    onClick={props.handleWaitlistSubmit}
                    disabled={
                      !props.isFirstNameValid ||
                      !props.isLastNameValid ||
                      !props.isEmailValid ||
                      !props.isMessageValid ||
                      !props.firstName ||
                      !props.lastName ||
                      !props.email ||
                      !props.message ||
                      props.isLoading
                    }
                    label="Submit"
                    variant="popup"
                    filled
                    isLoading={props.isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
