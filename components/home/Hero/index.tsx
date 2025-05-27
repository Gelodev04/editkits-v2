import Image from 'next/image';

import { useRouter } from 'next/router';
import { useUserInfo } from '@/hooks/useUserInfo';

import Typography from '@/components/Typography';
import Button from '@/components/ui/button/Button';


interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const router = useRouter();
  const { userInfo } = useUserInfo();

  const handleGetStarted = () => {
    if (userInfo) {
      router.push('/dashboard/job-status');
    } else {
      onGetStarted();
    }
  };

  return (
    <div className="bg-[url(../public/images/hero_bg.png)] max-w-[1400px] mx-auto bg-center bg-cover px-8 lg:px-0">
      <div className="pb-[159.5px] max-w-[1187px] sm:px-5 xl:px-0 flex flex-col gap-24 lg:gap-0 lg:grid grid-cols-12 mx-auto sm:items-center xl:items-end">
        <div className="w-full lg:col-span-6 pt-[134.5px]">
          <h1 className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-[#2c2c2c] dark:text-white">
            The Ultimate
          </h1>
          <h1 className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-[#2c2c2c] dark:text-white">
            Online Media Platform to
          </h1>
          <h1 className="font-montserrat font-extrabold text-[40px] leading-[56px] tracking-[0.2px] text-transparent bg-clip-text bg-gradient-to-r from-[#637EFF] to-[#148cfc]">
            Edit, Process & Automate
          </h1>
          <div className="w-full lg:w-[520px] pt-[3.5px] pb-[22px]">
            <Typography
              label="Empower your creativity with powerful yet easy-to-use toolkits and APIs on the cloud. Build custom workflows by connecting tools for seamless video, image, and audio editing."
              variant="b2"
            />
          </div>
          <Button size="md" variant="primary" onClick={handleGetStarted}>
            {userInfo ? 'Go to Dashboard' : "Get Started Now, It's Free!"}
          </Button>
        </div>
        <div className="w-full lg:col-span-6 bg-[url(../public/images/hero_bg.svg)] bg-cover bg-left">
          <Image
            src="/images/home_hero.png"
            width={594}
            height={330}
            alt="hero image"
            className="animate-float"
          />
        </div>
      </div>
    </div>
  );
}
