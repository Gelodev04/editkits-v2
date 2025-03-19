import {useState} from "react";

import toast from "react-hot-toast";

import AccountType from "@/components/account/AccountType";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import ChangePasswordModal from "@/components/modals/ChnagePasswordModal";
import PopUp from "@/components/modals/Popup";

import {benefits} from "@/lib/constants";
import {Subscription} from "@/components/account/Subscription";
import {validateEmail} from "@/lib/validateEmail";
import {useUserInfo} from "@/hooks/useUserInfo";
import {useUpdatePasswordMutation} from "@/services/api/auth";

export default function Account() {
  const {userInfo} = useUserInfo();
  const [updatePassword, {isLoading: isUpdatePasswordLoading}] = useUpdatePasswordMutation();

  const [active, setActive] = useState("email");
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState("");
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);

  const [changePasswordConfirmationModal, setChangePasswordConfirmationModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")

  async function handleUpdatePassword() {
    const response = await updatePassword({current_password: currentPassword, new_password: newPassword});

    if (response.error) {
      setModalTitle("Uh-oh! Something's Off");
      //@ts-ignore
      setModalMessage(response.error.data.errorMsg);
      setUpdatePasswordModal(false);
      setChangePasswordConfirmationModal(true);
      return;
    }

    //@ts-ignore
    toast.success(response.data.message);
    setUpdatePasswordModal(false);
  }

  return (
    <div className="bg-[#fafbfc] min-h-[100vh]">
      <div className="max-w-[1920px] mx-auto p-6">
        <div className="grid grid-cols-12 w-full gap-4 mx-auto">
          <div className="col-span-2 xl:col-span-2 2xl:col-span-2">
            <AccountType active={active} setActive={setActive}/>
          </div>
          <div className="col-span-10 bg-white min-h-[780px] px-10 py-6 w-[1121px]">
            {active === "email" && (
              <div className="pt-4 max-w-[412px]">
                <InputField
                  label="Email"
                  placeholder={userInfo?.email}
                  type="email"
                  error={!isEmailValid}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // @ts-ignore
                    setEmailValid(validateEmail(e.target.value))
                  }}
                  disabled
                />
                <div className="pt-10">
                  <Button
                    onClick={() => setUpdatePasswordModal(true)}
                    className="max-w-[191px] max-h-12 border border-2 border-neutral-300 py-[13px] text-[#4f4f4f]"
                    label="Change Password"
                    variant="contained"
                    border
                  />
                </div>
              </div>
            )}
            {active === "subscription" && <Subscription benefits={benefits}/>}
          </div>
        </div>
      </div>
      <ChangePasswordModal
        type="Change Password"
        handleUpdatePassword={handleUpdatePassword}
        updatePasswordModal={updatePasswordModal}
        setUpdatePasswordModal={setUpdatePasswordModal}
        // @ts-ignore
        setType={undefined}
        // @ts-ignore
        description={<>We have sent the reset code to <span className="font-bold">abc@editkits.com</span></>}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isUpdatePasswordLoading={isUpdatePasswordLoading}
      />
      <PopUp
        open={changePasswordConfirmationModal}
        description={modalMessage}
        setOpen={setChangePasswordConfirmationModal}
        title={modalTitle}
      />
    </div>
  )
}