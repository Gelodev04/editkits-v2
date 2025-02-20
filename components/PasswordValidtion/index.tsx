import Toggle from "@/components/Toggle";
import {FaCheckCircle} from "react-icons/fa";
import Typography from "@/components/Typography";
import React from "react";

export function PasswordValidation(props) {
  return (
    <div>
      <div className="pb-[23px]">
        <Toggle label="Remember me"/>
      </div>
      <div className="grid grid-cols-2 gap-y-1">
        <div className="flex items-center gap-x-2">
          <FaCheckCircle size={20} color={/[a-z]/.test(props.password) ? "#273266" : "#d9d9d9"}/>
          <Typography variant="b4" label="One lowercase character"/>
        </div>
        <div className="flex items-center gap-x-2">
          <FaCheckCircle size={20}
                         color={/[!@#$%^&*(),.?":{}|<>\\\/~\-_=+\[\];'`]/.test(props.password) ? "#273266" : "#d9d9d9"}/>
          <Typography variant="b4" label="One special character"/>
        </div>
        <div className="flex items-center gap-x-2">
          <FaCheckCircle size={20} color={/[A-Z]/.test(props.password) ? "#273266" : "#d9d9d9"}/>
          <Typography variant="b4" label="One uppercase character"/>
        </div>
        <div className="flex items-center gap-x-2">
          <FaCheckCircle size={20} color={props.password.length >= 8 ? "#273266" : "#d9d9d9"}/>
          <Typography variant="b4" label="8 character minimum"/>
        </div>
      </div>
    </div>
  )
}