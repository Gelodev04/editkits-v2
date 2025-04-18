import PriceTableOne from '@/components/account/Subscription/PriceTableOne';
import UserInfoCard from '@/components/account/UserProfile/UserInfoCard';
import { useSidebar } from '@/context/SidebarContext';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function Account() {
  const { userInfo } = useUserInfo();
  const { isMobileOpen, isExpanded, isHovered, activeAccountTab } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
    ? 'lg:ml-[290px] 2xl:ml-[300px] lg:pr-[24px] 4xl:mx-auto'
    : 'lg:ml-[90px]';

  return (
    <div
      className={`${mainContentMargin} min-h-[100vh] transition-all duration-300 ease-in-out overflow-hidden dark:bg-gray-900 dark:border-gray-800 rounded-xl sm:max-w-[980px] lg:max-w-[1920px] p-6`}
    >
      {activeAccountTab === 'profile' && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Profile Information
          </h3>
          <div className="space-y-6">
            <UserInfoCard email={userInfo?.email || ''} />
          </div>
        </div>
      )}

      {activeAccountTab === 'subscription' && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Subscription Details
          </h3>
          <PriceTableOne />
        </div>
      )}
    </div>
  );
}
