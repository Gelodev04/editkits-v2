import {useEffect, useState} from "react";

import ContactUsCard from "@/components/cards/ContactUsCard";
import GetInTouchCard from "@/components/cards/GetInTouchCard";
import {getUserInfo} from "@/services/api";
import {useContactUsUserMutation} from "@/services/api/auth";
import {useContactUsCommonMutation} from "@/services/api/public";

export default function ContactUs() {
  const [contactUsCommon, {isLoading: isContactUsLoading}] = useContactUsCommonMutation();
  const [contactUsUser] = useContactUsUserMutation();
  const [user, setUser] = useState(getUserInfo());
  const [firstName, setFirstName] = useState( "");
  const [isFirstNameValid, setFirstNameValid] = useState(true);
  const [lastName, setLastName] = useState( "");
  const [isLastNameValid, setLastNameValid] = useState(true);
  const [email, setEmail] = useState(user?.email || "");
  const [isEmailValid, setEmailValid] = useState(true);
  const [message, setMessage] = useState("");
  const [isMessageValid, setMessageValid] = useState(true);
  const [submittedModal, setSubmittedModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")

  useEffect(() => {
    const checkUserInfo = () => {
      const updatedUser = getUserInfo();
      setUser(updatedUser);

      if (updatedUser) {
        setEmail(updatedUser.email || "");
        setFirstNameValid(true);
        setLastNameValid(true);
        setEmailValid(true);
      }
    };

    const interval = setInterval(checkUserInfo, 2000);
    return () => clearInterval(interval);
  }, []);

  async function handleContactUsSubmit() {
    const mutationFn = user ? contactUsUser : contactUsCommon
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      message,
      ...(user ? {} : { category: 'GENERIC' })
    }

    const response = await mutationFn(payload)
    if(response.error) {
      setModalTitle("Uh-oh! Something’s Off");
      // @ts-ignore
      setModalMessage(response.error.data.errorMsg);
      setSubmittedModal(true);
      return;
    }

    setFirstName("")
    setLastName("")
    setMessage("")
    if (!user) {
      setEmail("")
    }
    setModalTitle("Request Submitted")
    setModalMessage("Our support team would reach out to you soon.")
    setSubmittedModal(true);
  }


  return (
    <div className="max-w-[1343px]  mx-auto flex flex-col xl:flex-row items-center xl:items-start xl:justify-between pt-[71px] pb-[100px]">
      <div>
        <ContactUsCard />
      </div>
      <div className="py-20 xl:py-0 md:max-w-[600px] w-full px-3 ">
        <GetInTouchCard
          firstName={firstName}
          email={email}
          isEmailValid={isEmailValid}
          isMessageValid={isMessageValid}
          user={user}
          isFirstNameValid={isFirstNameValid}
          isLastNameValid={isLastNameValid}
          lastName={lastName}
          setEmail={setEmail}
          setEmailValid={setEmailValid}
          setSubmittedModal={setSubmittedModal}
          setFirstName={setFirstName}
          submittedModal={submittedModal}
          setFirstNameValid={setFirstNameValid}
          setLastName={setLastName}
          message={message}
          setMessage={setMessage}
          setLastNameValid={setLastNameValid}
          setMessageValid={setMessageValid}
          handleContactUsSubmit={handleContactUsSubmit}
          modalMessage={modalMessage}
          modalTitle={modalTitle}
          isLoading={isContactUsLoading}
        />
      </div>
    </div>
  )
}
