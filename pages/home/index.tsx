import Image from "next/image";

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import ToolCard from "@/components/cards/ToolCard";
import {featureCards, videoTools} from "@/lib/constants";

import HeroImg from "@/public/assets/img/home_hero.svg"
import FeatureCard from "@/components/cards/FeatureCard";
import Head from "next/head";
import WaitListModal from "@/components/modals/WaitListModal";
import {useEffect, useState} from "react";
import {getUserInfo, useContactUsCommonMutation, useContactUsUserMutation} from "@/services/api";
import PopUp from "@/components/modals/Popup";

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
        <meta name="description" content="EditKits is your next video and image processing tool"/>
      </Head>
      <div
        className="pb-[159.5px] bg-[url(../public/assets/img/hero_bg.svg)] max-w-[1187px] bg-cover sm:px-5 xl:px-0 bg-center grid grid-cols-12 mx-auto sm:items-center xl:items-end">
        <div className="sm:col-span-4 lg:col-span-6 pt-[134.5px]">
          <h1 className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-[#2c2c2c]">The
            Ultimate</h1>
          <h1
            className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-[#2c2c2c]">Online
            Media Platform to</h1>
          <h1
            className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-transparent bg-clip-text bg-gradient-to-r from-[#637EFF] to-[#148CFC]">Edit,
            Process & Automate</h1>
          <div className="w-[520px] pt-[3.5px] pb-[22px]">
            <Typography
              label="Empower your creativity with powerful yet easy-to-use toolkits and APIs on the cloud. Build custom workflows by connecting tools for seamless video, image, and audio editing."
              variant="b2"
            />
          </div>
          <Button
            label="Join the Waitlist"
            variant="outlined"
            filled
            width={226}
            onClick={() => setWaitlistModal(true)}
            height={64}
          />
        </div>
        <div className="sm:col-span-8 lg:col-span-6 bg-[url(../public/assets/img/hero_bg.svg)] bg-cover bg-left">
          <Image src={HeroImg} width={594} height={330} alt="hero image" className="animate-float"/>
        </div>
      </div>
      <div
        className="bg-white pt-[53px] pb-[59px] border-[1px] border-solid border-[#9f9f9f] rounded-[40px] max-w-[1313px] mx-auto">
        <div className="pb-[12px]">
          <Typography
            label="Sneak Peek"
            variant="h4"
            center
          />
        </div>
        <Typography variant="b2" label="Video, Audio and Image Tools" center/>
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
            {videoTools.slice(5).map((tool) => (
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
            width={268}
            height={48}
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
                <FeatureCard name={card.name} icon={card.image} description={card.description}/>
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
