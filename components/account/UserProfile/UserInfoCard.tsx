import ChangePasswordModal from '@/components/modals/ChangePasswordModal';
import PopUp from '@/components/modals/Popup';
import { useModal } from '@/hooks/useModal';
import { useUpdatePasswordMutation } from '@/services/api/auth';
import { useState } from 'react';

interface UserInfoCardProps {
  email: string;
}

export default function UserInfoCard({ email }: UserInfoCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [updatePassword, { isLoading: isUpdatePasswordLoading }] = useUpdatePasswordMutation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [changePasswordConfirmationModal, setChangePasswordConfirmationModal] = useState(false);

  const handleUpdatePassword = async () => {
    const response = await updatePassword({
      current_password: currentPassword,
      new_password: newPassword,
    });

    if (response.error) {
      setModalTitle("Uh-oh! Something's Off");
      //@ts-ignore
      setModalMessage(response.error.data.errorMsg);
      setChangePasswordConfirmationModal(true);
      return;
    }

    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Account Settings
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{email}</p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Change Password
        </button>
      </div>

      <ChangePasswordModal
        type="Change Password"
        handleUpdatePassword={handleUpdatePassword}
        updatePasswordModal={isOpen}
        setUpdatePasswordModal={closeModal}
        // @ts-ignore
        setType={undefined}
        // @ts-ignore
        description={
          <>
            We have sent the reset code to <span className="font-bold">abc@editkits.com</span>
          </>
        }
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
  );
}
