import React, {useEffect, useState} from "react";
import {Fade, Modal} from "@mui/material";
import {TbXboxX} from "react-icons/tb";
import Typography from "@/components/Typography";
import InputField from "@/components/InputField";
import {validatePassword} from "@/lib/validatePassword";
import Button from "@/components/Button";
import {useCountdownTimer} from "@/hooks/useCountdownTimer";
import {lato, montserrat, opensans} from "@/lib/fonts";
import {PasswordValidation} from "@/components/PasswordValidtion";
import Toggle from "@/components/Toggle";

export type AuthModalProps = {
  type: string;
  updatePasswordModal: boolean;
  setUpdatePasswordModal: (e: React.SetStateAction<boolean>) => void;
  setType: (e: React.SetStateAction<string>) => void;
  description?: string;
  currentPassword: string;
  setCurrentPassword: any;
  newPassword?: string;
  setNewPassword: any;
  confirmPassword: string;
  setConfirmPassword: any;
  handleUpdatePassword: any;
  isUpdatePasswordLoading: boolean;
}

export default function ChangePasswordModal(props: AuthModalProps) {
  const [isPasswordValid, setPasswordValid] = useState(false)
  const [isCurrentPasswordValid, setCurrentPasswordValid] = useState(false);
  const {timer, setTimer} = useCountdownTimer(60);
  const [hasTyped, setHasTyped] = React.useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  React.useEffect(() => {
    if (!props.updatePasswordModal) {
      props.setCurrentPassword('');
      props.setConfirmPassword('');
      props.setConfirmPassword('');
    }
  }, [props.updatePasswordModal]);

  return (
    <Modal open={props.updatePasswordModal} onClose={() => props.setUpdatePasswordModal(false)}>
      <Fade in={props.updatePasswordModal}>
        {/*@ts-ignore*/}
        <div className={`${montserrat.variable} ${lato.variable} ${opensans.variable}`}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div
            className="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center text-center sm:items-center sm:p-0 ">
            <div
              className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:w-[532px]">
              <div className="absolute right-[14px] top-[14px] cursor-pointer">
                <TbXboxX size={30} color="#000" onClick={() => props.setUpdatePasswordModal(false)}/>
              </div>
              <div className="px-[43px] pb-[34.5px]">
                <div className="pb-[8px] pt-[32px]">
                  <Typography label={props.type} center variant="h4"/>
                </div>
                <div className="w-[432px] mx-auto">
                  <Typography label={props.description} center variant="b3"/>
                </div>
                <div className="pt-[42px]">
                  <InputField
                    label="Current Password"
                    placeholder="*********"
                    onChange={(e) => {
                      const currentPassword = e.target.value;
                      if (!hasTyped) setHasTyped(true);
                      props.setCurrentPassword(currentPassword);
                      setCurrentPasswordValid(validatePassword(currentPassword))
                    }}
                    error={!isCurrentPasswordValid}
                    type="password"
                    value={props.currentPassword}
                  />
                  <div className="py-[32px]">
                    <InputField
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const passwordValue = e.target.value;
                        if (!hasTyped) setHasTyped(true);
                        props.setNewPassword(passwordValue);
                        setPasswordValid(validatePassword(passwordValue));
                      }}
                      error={!isPasswordValid}
                      label="New Password"
                      placeholder="*********"
                      type="password"
                      value={props.newPassword}
                    />
                  </div>
                  <InputField
                    onChange={(e) => {
                      if (!hasTyped) setHasTyped(true);
                      props.setConfirmPassword(e.target.value)
                    }}
                    error={props.newPassword !== props.confirmPassword}
                    label="Confirm the password"
                    placeholder="**********"
                    type="password"
                    value={props.confirmPassword}
                  />
                  <div className="py-[20px]">
                    <Toggle label="Remember me"/>
                  </div>
                  <PasswordValidation password={props.newPassword}/>
                </div>
                <div className="pt-[42px] max-w-[446px] mx-auto">
                  <Button
                    disabled={hasTyped && (!isCurrentPasswordValid || !isPasswordValid || props.newPassword !== props.confirmPassword) || props.isUpdatePasswordLoading}
                    onClick={props.handleUpdatePassword}
                    label="Reset Password"
                    variant="popup"
                    filled
                    isLoading={props.isUpdatePasswordLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}