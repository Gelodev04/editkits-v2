import Logout from '@/public/icons/logout_white.svg';
import SubscriptionInActiveSVG from '@/public/icons/subscription_black.svg';
import SubscriptionActiveSVG from '@/public/icons/subscription_white.svg';
import UserInActiveSVG from '@/public/icons/user_black.svg';
import UserActiveSVG from '@/public/icons/user_white.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function AccountType({ active, setActive }: { active: any; setActive: any }) {
  return (
    <div className="min-h-full bg-white flex flex-col justify-between pt-8 pb-4 px-1">
      <div className="flex flex-col gap-2 w-[228px] rounded rounded-lg">
        <button
          onClick={() => setActive('email')}
          className={`flex justify-start pl-4 items-center py-4 w-[192px] mx-auto max-h-12 rounded rounded-lg gap-4 ${
            active === 'email' ? 'bg-[#17abdb]' : ''
          }`}
        >
          <Image
            src={active === 'email' ? UserActiveSVG : UserInActiveSVG}
            alt="job svg"
            priority
          />
          <p
            className={`font-montserrat font-bold text-sm ${
              active === 'email' ? '#fff' : 'text-[#4f4f4f]'
            }`}
          >
            Profile
          </p>
        </button>
        <button
          onClick={() => setActive('subscription')}
          className={`flex justify-start pl-4 items-center py-4 w-[192px] mx-auto max-h-12 rounded rounded-lg gap-4 ${
            active === 'subscription' ? 'bg-[#17abdb]' : ''
          }`}
        >
          <Image
            src={active === 'subscription' ? SubscriptionActiveSVG : SubscriptionInActiveSVG}
            alt="upload svg"
            priority
          />
          <p
            className={`font-montserrat font-bold text-sm ${
              active === 'subscription' ? '#fff' : 'text-[#4f4f4f]'
            }`}
          >
            Subscription
          </p>
        </button>
      </div>
      <Link
        href="/home"
        className={`flex justify-start pl-4 mx-4 items-center py-4 max-h-12 rounded rounded-lg gap-4 bg-[#4f4f4f]`}
      >
        <Image src={Logout} alt="log out" priority />
        <p className={`font-montserrat font-bold text-sm text-white`}>Log out</p>
      </Link>
    </div>
  );
}
