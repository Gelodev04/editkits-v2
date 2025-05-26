import React from "react";

import InputField from "@/components/InputField";

import TextField from "@/components/TextField";
import {validateEmail} from "@/lib/validateEmail";
import Popup from "@/components/modals/Popup";
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
  submittedModal: boolean;
  setSubmittedModal: (e: React.SetStateAction<boolean>) => void;
  handleContactUsSubmit: any;
  modalTitle: string;
  modalMessage: string;
  isLoading: boolean;

}

export default function GetInTouchCard(props: GetInTouchCardProps) {

  return (
    <div className=" max-w-[600px] mx-auto px-3 md:px-[2rem] pb-[30px] pt-[30px]  border-[1px] border-[#bebebea6] rounded-[12px] dark:border-gray-800">
      <p className="font-montserrat font-bold text-[24px] leading-[24px] text-[#111111] dark:text-gray-200 pb-[16px]">
        Get In Touch
      </p>
      <p className="font-lato font-normal text-sm leading-[24px] text-[#4f4f4f] dark:text-gray-200">
        Use the form below to submit a message, and one of our team members will
        get back to you promptly
      </p>
      <div className="w-full pt-[24px]">
        <InputField
          placeholder="Mike"
          type="text"
          // @ts-ignore
          label={
            <span>
                First name <span style={{color: "#ff0000"}}>*</span>
              </span>
          }
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
          placeholder="Smith"
          type="text"
          // @ts-ignore
          label={
            <span>
                Last name<span style={{color: "#ff0000"}}>*</span>
              </span>
          }
          variant="contact-us"
          height={40}
          value={props.lastName}
          error={!props.isLastNameValid}
          onChange={(e) => {
            props.setLastName(e.target.value);
            props.setLastNameValid(e.target.value.trim().length > 0);
          }}
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
        label={
          <span>
            Email address<span style={{color: "#ff0000"}}>*</span>
          </span>
        }
        variant="contact-us"
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
          label={<span>How can we help? <span style={{color: "#ff0000"}}>*</span></span>}
          variant="fileUpload"
          error={!props.isMessageValid}
        />
      </div>
      <div className="pt-[20px] flex justify-center">
        <ButtonOld
          onClick={props.handleContactUsSubmit}
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
          variant="secondary"
          filled
          isLoading={props.isLoading}
        />
      </div>
      <Popup
        open={props.submittedModal}
        setOpen={props.setSubmittedModal}
        title={props.modalTitle}
        description={props.modalMessage}
      />
    </div>
  );
}
