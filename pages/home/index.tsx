import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import Button from "@/components/Button";
import FeatureCard from "@/components/cards/FeatureCard";

const PopUp = dynamic(() => import ("@/components/modals/Popup"), {
  ssr: false
})
import Typography from "@/components/Typography";
import ToolCard from "@/components/cards/ToolCard";

const WaitListModal = dynamic(() => import("@/components/modals/WaitListModal"), {
  ssr: false
})

import {featureCards, videoTools} from "@/lib/constants";
import {getUserInfo} from "@/services/api";
import { useContactUsUserMutation} from "@/services/api/auth";
import {useContactUsCommonMutation} from "@/services/api/public";

const Hero = dynamic(() => import("@/components/home/Hero"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default function Home() {
  const [contactUsCommon, {isLoading: isWaitlistLoading}] = useContactUsCommonMutation();
  const [contactUsUser] = useContactUsUserMutation();

  const [user, setUser] = useState(getUserInfo());
  const [firstName, setFirstName] = useState("");
  const [isFirstNameValid, setFirstNameValid] = useState(true);
  const [lastName, setLastName] = useState("");
  const [isLastNameValid, setLastNameValid] = useState(true);
  const [email, setEmail] = useState(user?.email || "");
  const [isEmailValid, setEmailValid] = useState(true);
  const [message, setMessage] = useState("");
  const [isMessageValid, setMessageValid] = useState(true);
  const [waitlistModal, setWaitlistModal] = useState(false);
  const [submittedModalTitle, setSubmittedModalTitle] = useState("")
  const [submittedModalBody, setSubmittedModalBody] = useState("")
  const [submittedModal, setSubmittedModal] = useState(false);

  useEffect(() => {
    setFirstName("")
    setLastName("")
    setMessage("")
    if (!user) {
      setEmail("")
    }
  }, [waitlistModal])

  async function handleWaitlistSubmit() {
    const mutationFn = user ? contactUsUser : contactUsCommon
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      message,
      ...(user ? {} : {category: 'WAITLIST'})
    }

    const response = await mutationFn(payload)
    if (response.error) {
      // @ts-ignore
      setSubmittedModalTitle("Uh-oh! Something’s Off");
      // @ts-ignore
      setSubmittedModalBody(response.error.data.errorMsg);
      setWaitlistModal(false)
      setSubmittedModal(true)
      return;
    }

    setFirstName("")
    setLastName("")
    setMessage("")
    if (!user) {
      setEmail("")
    }
    setWaitlistModal(false);
    setSubmittedModalTitle("Request Submitted")
    setSubmittedModalBody("Our support team would reach out to you soon.")
    setSubmittedModal(true);
  }

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

  return (
    <>
      <Head>
        <meta name="description"
              content="EditKits is the ultimate online platform for fast, high-quality video, audio, and image processing. Edit, enhance, and optimize media effortlessly with powerful cloud-based tools and APIs."/>
      </Head>
      <Hero setWaitlistModal={setWaitlistModal} />
      <div
        className="bg-white pt-[53px] pb-[59px] border-[1px] border-solid border-[#9f9f9f] rounded-[40px] max-w-[1313px] mx-auto">
        <div className="pb-[12px]">
          <Typography
            label="Quick Access"
            variant="h4"
            center
          />
        </div>
        <Typography variant="b2" label="Video Tools" center/>
        <div className="place-items-center max-w-[1184px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 pt-[40px] pb-[32px] gap-x-[35px]">
            {videoTools.slice(0, 5).map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
                icon_hover={tool?.icon_hover}
              />
            ))}
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 col-span-full gap-x-[35px] max-w-[1920px]">
            {videoTools.slice(5, 9).map((tool) => (
              <ToolCard
                key={tool.name}
                name={tool.name}
                icon={tool?.icon}
                icon_hover={tool?.icon_hover}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center pt-[42px]">
          <Button
            label="More tools coming soon!"
            variant="secondary"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div
            className="max-w-[1555px] mx-auto pt-[139px] sm:pl-[60px] 2lg:pl-[80px] xl:pl-[100px] mxl:pl-[120px] 2xl:pl-7">
            <Typography label="Learn more about our features" variant="h2"/>
          </div>
          <div className="w-full bg-[url(../public/assets/img/inclined_bg.svg)] bg-no-repeat bg-cover">
            <div
              className="max-w-[1536px] mx-auto grid sm:grid-cols-3 2xl:grid-cols-4 gap-y-[40px] pt-[72px] pb-[116px] sm:pl-[60px] 2lg:pl-[80px] xl:pl-[100px] mxl:pl-[120px] 2xl:pl-5">
              {featureCards.map((card) => (
                <FeatureCard key={card.name} name={card.name} icon={card.image} description={card.description}/>
              ))}
            </div>
          </div>
        </div>
      </div>
      <WaitListModal
        open={waitlistModal}
        email={email}
        setEmailValid={setEmailValid}
        firstName={firstName}
        setFirstName={setFirstName}
        isFirstNameValid={isFirstNameValid}
        setFirstNameValid={setFirstNameValid}
        lastName={lastName}
        setLastName={setLastName}
        isLastNameValid={isLastNameValid}
        setLastNameValid={setLastNameValid}
        isEmailValid={isEmailValid}
        setEmail={setEmail}
        user={user}
        handleWaitlistSubmit={handleWaitlistSubmit}
        isMessageValid={isMessageValid}
        message={message}
        setOpen={setWaitlistModal}
        setMessage={setMessage}
        setMessageValid={setMessageValid}
        isLoading={isWaitlistLoading}
      />
      <PopUp
        open={submittedModal}
        setOpen={setSubmittedModal}
        title={submittedModalTitle}
        description={submittedModalBody}
      />
    </>
  );
}