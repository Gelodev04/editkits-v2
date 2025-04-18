import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { Modal } from '@/components/Modal';
import PopUp from '@/components/modals/Popup';
import { PasswordValidation } from '@/components/PasswordValidtion';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { validatePassword } from '@/lib/validatePassword';
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

  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isCurrentPasswordValid, setCurrentPasswordValid] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleUpdatePassword = async () => {
    setHasTyped(true);
    const isCurrentValid = validatePassword(currentPassword);
    const isNewValid = validatePassword(newPassword);
    setCurrentPasswordValid(isCurrentValid);
    setPasswordValid(isNewValid);

    if (!isCurrentValid || !isNewValid || newPassword !== confirmPassword) {
      console.error('Validation failed');
      return;
    }

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

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setHasTyped(false);
    setCurrentPasswordValid(false);
    setPasswordValid(false);
    setFormKey(prevKey => prevKey + 1);
    closeModal();
  };

  const handleCloseModal = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setHasTyped(false);
    setCurrentPasswordValid(false);
    setPasswordValid(false);
    setFormKey(prevKey => prevKey + 1);
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
          onClick={() => {
            setFormKey(prevKey => prevKey + 1);
            openModal();
          }}
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

      <Modal isOpen={isOpen} onClose={handleCloseModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Change Password
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Enter your current password and set a new one.
            </p>
          </div>
          <div key={formKey} className="flex flex-col">
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-y-5">
                <div>
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    placeholder="*********"
                    onChange={e => {
                      const currentPass = e.target.value;
                      if (!hasTyped) setHasTyped(true);
                      setCurrentPassword(currentPass);
                      setCurrentPasswordValid(validatePassword(currentPass));
                    }}
                    error={hasTyped && !isCurrentPasswordValid}
                  />
                  {hasTyped && !isCurrentPasswordValid && (
                    <p className="mt-1 text-xs text-red-500">Invalid password format.</p>
                  )}
                </div>

                <div>
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    placeholder="*********"
                    onChange={e => {
                      const newPass = e.target.value;
                      if (!hasTyped) setHasTyped(true);
                      setNewPassword(newPass);
                      setPasswordValid(validatePassword(newPass));
                    }}
                    error={hasTyped && !isPasswordValid}
                  />
                </div>

                <div>
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    placeholder="*********"
                    onChange={e => {
                      if (!hasTyped) setHasTyped(true);
                      setConfirmPassword(e.target.value);
                    }}
                    error={hasTyped && newPassword !== confirmPassword}
                  />
                  {hasTyped && newPassword !== confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">Passwords do not match.</p>
                  )}
                </div>
                <PasswordValidation password={newPassword} />
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={handleUpdatePassword}
                disabled={
                  (hasTyped &&
                    (!isCurrentPasswordValid ||
                      !isPasswordValid ||
                      newPassword !== confirmPassword)) ||
                  isUpdatePasswordLoading ||
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword
                }
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <PopUp
        open={changePasswordConfirmationModal}
        description={modalMessage}
        setOpen={setChangePasswordConfirmationModal}
        title={modalTitle}
      />
    </div>
  );
}
