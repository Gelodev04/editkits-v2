import React, {useEffect, useState} from "react";
import {Fade, Modal} from "@mui/material";
import {TbXboxX} from "react-icons/tb";
import Typography from "@/components/Typography";
import TextField from "@/components/TextField";
import {validatePassword} from "@/lib/validatePassword";
import Button from "@/components/Button";
import {useCountdownTimer} from "@/hooks/useCountdownTimer";
import {lato, montserrat, opensans} from "@/lib/fonts";
import {PasswordValidation} from "@/components/PasswordValidtion";

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
  handleUpdatePassword: any
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ChangePasswordModal(props: AuthModalProps) {
  const [isPasswordValid, setPasswordValid] = useState(false)
  const [isCurrentPasswordValid, setCurrentPasswordValid] = useState(false);
  const {timer, setTimer} = useCountdownTimer(60);

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
        <div style={style} className={`${montserrat.variable} ${lato.variable} ${opensans.variable}`}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                <div className="absolute right-2 top-2 cursor-pointer">
                  <TbXboxX size={30} color="#000" onClick={() => props.setUpdatePasswordModal(false)}/>
                </div>
                <>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex justify-center">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                        <Typography
                          label={props.type}
                          center
                          variant="h5"
                        />

                        <div className="mt-2">
                          <Typography
                            label={props.description}
                            center
                            variant="b3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-10">
                    <TextField
                      label="Current Password"
                      placeholder="*********"
                      onChange={(e) => {
                        const currentPassword = e.target.value;
                        props.setCurrentPassword(currentPassword);
                        setCurrentPasswordValid(validatePassword(currentPassword))
                      }}
                      error={!isCurrentPasswordValid}
                      password={props.currentPassword}
                      type="password"
                      value={props.currentPassword}
                    />
                    <div className="py-4">
                      <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const passwordValue = e.target.value;
                          props.setNewPassword(passwordValue);
                          setPasswordValid(validatePassword(passwordValue));
                        }}
                        error={!isPasswordValid}
                        password={props.newPassword}
                        label="New Password"
                        placeholder="*********"
                        type="password"
                        value={props.newPassword}
                      />
                    </div>
                    <div className="py-4">
                      <TextField
                        onChange={(e) => props.setConfirmPassword(e.target.value)}
                        password={props.confirmPassword}
                        error={props.newPassword !== props.confirmPassword}
                        label="Confirm the password"
                        placeholder="**********"
                        type="password"
                        value={props.confirmPassword}
                      />
                    </div>
                    <div className="pt-4">
                      <PasswordValidation password={props.newPassword}/>
                    </div>
                  </div>
                  <div className="pb-[40px] pt-[47.5px] max-w-[411px] mx-auto">
                    <Button
                      disabled={!isCurrentPasswordValid || !isPasswordValid || props.newPassword !== props.confirmPassword}
                      onClick={props.handleUpdatePassword}
                      label="Reset Password"
                      variant="secondary"
                      filled
                    />
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}