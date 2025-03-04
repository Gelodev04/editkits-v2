import React from "react";

import InputField from "@/components/InputField";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import {validateEmail} from "@/lib/validateEmail";
import Popup from "@/components/modals/Popup";

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
  handleContactUsSubmit: any

}

export default function GetInTouchCard(props: GetInTouchCardProps) {

  return (
    <div className="w-[600px] pb-[33px] pt-[30px] px-[41px] border-[1px] border-[#f0f0f0] shadow-md">
      <p className="font-montserrat font-bold text-[24px] leading-[29.26px] text-[#111111] pb-[16px]">
        Get In Touch
      </p>
      <p className="font-lato font-normal text-[13px] leading-[24px] text-[#4f4f4f]">
        Use the form below to submit a message, and one of our team members will
        get back to you promptly
      </p>
      <div className="flex pt-[24px] pb-[12px] gap-[20px]">
        <div className="w-full">
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
        <div className="w-full">
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
      <div className="pt-[16px] w-full">
        <TextField
          type="text"
          value={props.message}
          onChange={(e) => {
            props.setMessage(e.target.value)
            props.setMessageValid(e.target.value.trim().length > 0);
          }}
          placeholder="Share your thoughts with us..."
          label="How can we help?"
          variant="fileUpload"
          error={!props.isMessageValid}
        />
      </div>
      <div className="pt-[24px]">
        <Button
          onClick={props.handleContactUsSubmit}
          disabled={
            !props.isFirstNameValid ||
            !props.isLastNameValid ||
            !props.isEmailValid ||
            !props.isMessageValid ||
            (!props.firstName && !props.user) ||
            (!props.lastName && !props.user) ||
            (!props.email && !props.user)
          }
          label="Submit"
          variant="contained"
          filled
          height={48}
        />
      </div>
      <Popup
        open={props.submittedModal}
        setOpen={props.setSubmittedModal}
        title="Request Submitted"
        description="Our support team would reach out to you soon."
      />
    </div>
  );
}
