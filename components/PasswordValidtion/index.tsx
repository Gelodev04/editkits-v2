import React from "react";

import {FaCheckCircle} from "react-icons/fa";

import Typography from "@/components/Typography";

export function PasswordValidation(props) {
  return (
    <>
      <div className="grid grid-cols-2 gap-y-[8px]">
        <div className="flex items-center gap-x-[6px]">
          <FaCheckCircle size={20} color={/[a-z]/.test(props.password) ? "#273266" : "#d9d9d9"}/>
          <Typography variant="b4" label="One lowercase character"/>
        </div>
        <div className="flex items-center gap-x-[6px]">
          <FaCheckCircle
            size={20}
            color={/[!@#$%^&*(),.?":{}|<>\\\/~\-_=+\[\];'`]/.test(props.password) ? "#273266" : "#d9d9d9"}
          />
          <Typography variant="b4" label="One special character"/>
        </div>
        <div className="flex items-center gap-x-[6px]">
          <FaCheckCircle size={20} color={/[A-Z]/.test(props.password) ? "#273266" : "#d9d9d9"}/>
          <Typography variant="b4" label="One uppercase character"/>
        </div>
        <div className="flex items-center gap-x-[6px]">
          <FaCheckCircle size={20} color={props.password?.length >= 8 ? "#273266" : "#d9d9d9"}/>
          <Typography variant="b4" label="8 character minimum"/>
        </div>
      </div>
    </>
  )
}