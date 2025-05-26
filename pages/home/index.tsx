import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import FeatureCard from '@/components/cards/FeatureCard';
import ToolCard from '@/components/cards/ToolCard';
import Typography from '@/components/Typography';
import { useUserInfo } from '@/hooks/useUserInfo';

const PopUp = dynamic(() => import('@/components/modals/Popup'), {
  ssr: false,
});

const AuthModal = dynamic(() => import('@/components/modals/Auth'), {
  ssr: false,
});

import ButtonOld from '@/components/Button_Old';
import { featureCards, videoTools } from '@/lib/constants';
import { getUserInfo } from '@/services/api';
import { useContactUsUserMutation } from '@/services/api/auth';
import { useContactUsCommonMutation } from '@/services/api/public';

const Hero = dynamic(() => import('@/components/home/Hero'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const [contactUsCommon, { isLoading: isWaitlistLoading }] = useContactUsCommonMutation();
  const [contactUsUser] = useContactUsUserMutation();
  const { userInfo } = useUserInfo();

  const [user, setUser] = useState(getUserInfo());
  const [firstName, setFirstName] = useState('');
  const [isFirstNameValid, setFirstNameValid] = useState(true);
  const [lastName, setLastName] = useState('');
  const [isLastNameValid, setLastNameValid] = useState(true);
  const [email, setEmail] = useState(user?.email || '');
  const [isEmailValid, setEmailValid] = useState(true);
  const [message, setMessage] = useState('');
  const [isMessageValid, setMessageValid] = useState(true);
  const [waitlistModal, setWaitlistModal] = useState(false);
  const [submittedModalTitle, setSubmittedModalTitle] = useState('');
  const [submittedModalBody, setSubmittedModalBody] = useState('');
  const [submittedModal, setSubmittedModal] = useState(false);

  const [showAuthModal, setAuthModal] = useState(false);
  const [authType, setAuthType] = useState('');
  const [authConfirmationModal, setAuthConfirmationModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    setFirstName('');
    setLastName('');
    setMessage('');
    if (!user) {
      setEmail('');
    }
  }, [waitlistModal, user]);

  const handleGetStarted = () => {
    if (userInfo) {
      setWaitlistModal(true);
    } else {
      setAuthType('Sign Up');
      setAuthModal(true);
    }
  };

  // async function handleWaitlistSubmit() {
  //   const mutationFn = user ? contactUsUser : contactUsCommon;
  //   const payload = {
  //     first_name: firstName,
  //     last_name: lastName,
  //     email,
  //     message,
  //     ...(user ? {} : { category: 'WAITLIST' }),
  //   };

  //   const response = await mutationFn(payload);
  //   if (response.error) {
  //     // @ts-ignore
  //     setSubmittedModalTitle("Uh-oh! Something's Off");
  //     // @ts-ignore
  //     setSubmittedModalBody(response.error.data.errorMsg);
  //     setWaitlistModal(false);
  //     setSubmittedModal(true);
  //     return;
  //   }

  //   setFirstName('');
  //   setLastName('');
  //   setMessage('');
  //   if (!user) {
  //     setEmail('');
  //   }
  //   setWaitlistModal(false);
  //   setSubmittedModalTitle('Request Submitted');
  //   setSubmittedModalBody('Our support team would reach out to you soon.');
  //   setSubmittedModal(true);
  // }

  useEffect(() => {
    const checkUserInfo = () => {
      const updatedUser = getUserInfo();
      setUser(updatedUser);

      if (updatedUser) {
        setEmail(updatedUser.email || '');
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
        <meta
          name="description"
          content="EditKits is the ultimate online platform for fast, high-quality video, audio, and image processing. Edit, enhance, and optimize media effortlessly with powerful cloud-based tools and APIs."
        />
      </Head>
      <Hero setWaitlistModal={handleGetStarted} />
      <div className='px-8'>
        <div className="bg-white dark:bg-gray-900 pt-[53px] pb-[59px] border-[1px] border-solid border-[#9f9f9f] dark:border-gray-700 rounded-[40px] max-w-[1313px]  mx-auto">
          <div className="pb-[12px] ">
            <Typography label="Quick Access" variant="h4-dark" center />
          </div>
          <Typography variant="b2-dark" label="Video Tools" center />
          <div className="place-items-center max-w-[1184px] mx-auto ">
            <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4 pt-[40px] pb-[32px] gap-x-[35px] justify-center">
              {videoTools.slice(0, 10).map(tool => (
                <ToolCard
                  key={tool.name}
                  name={tool.name}
                  icon={tool?.icon}
                  icon_hover={tool?.icon_hover}
                  description={tool?.description}
                />
              ))}
            </div>
            {/* <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4 col-span-full gap-x-[35px] max-w-[1920px] justify-center">
                {videoTools.slice(5, 9).map(tool => (
                  <ToolCard
                    key={tool.name}
                    name={tool.name}
                    icon={tool?.icon}
                    icon_hover={tool?.icon_hover}
                    description={tool?.description}
                  />
                ))}
            </div> */}
          </div>
          <div className="flex justify-center pt-[42px]">
            <ButtonOld label="Show All Tools" variant="secondary" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full px-8 lg:px-0">
          <div className="lg:max-w-[1555px] mx-auto pt-[139px] sm:pl-[60px] 2lg:pl-[80px] xl:pl-[100px] mxl:pl-[120px] 2xl:pl-7">
            <Typography label="Learn more about our features" variant="h2" />
          </div>
          <div className="w-full">
            <div className="lg:max-w-[1536px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 lg:gap-x-0 2xl:grid-cols-4 gap-y-[40px] pt-[72px] pb-[116px] 2lg:pl-[80px] xl:pl-[100px] mxl:pl-[120px] 2xl:pl-5">
              {featureCards.map(card => (
                <FeatureCard
                  key={card.name}
                  name={card.name}
                  icon={card.image}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        type={authType}
        setType={setAuthType}
        showAuthModal={showAuthModal}
        setAuthModal={setAuthModal}
        authConfirmationModal={authConfirmationModal}
        modalTitle={modalTitle}
        modalMessage={modalMessage}
        setAuthConfirmationModal={setAuthConfirmationModal}
        setModalTitle={setModalTitle}
        setModalMessage={setModalMessage}
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
