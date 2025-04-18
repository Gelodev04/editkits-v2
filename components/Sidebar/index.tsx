import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  CalenderIcon,
  ChevronDownIcon,
  DollarLineIcon,
  GridIcon,
  MailIcon,
  PlugInIcon,
} from '@/components/Sidebar/SidebarIcons';
import { useSidebar } from '@/context/SidebarContext';
import { usePathname } from 'next/navigation';

import Logo from '@/public/images/logo.svg';
import LogoWhite from '@/public/images/logo_white.svg';
import { PiDotsThreeOutlineBold } from 'react-icons/pi';

import SubscriptionIcon from '@/public/icons/subscription_black.svg';
import UserIcon from '@/public/icons/user_black.svg';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
  onClick?: () => void;
};

const mainNavItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: 'Dashboard',
    subItems: [
      { name: 'Job Status', path: '/dashboard/job-status' },
      { name: 'Uploaded Files', path: '/dashboard/uploaded-files' },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: 'Tools',
    path: '/tools',
  },
  {
    icon: <DollarLineIcon />,
    name: 'Pricing',
    path: '/pricing',
  },
  {
    icon: <CalenderIcon />,
    name: 'Blogs',
    path: '/blog',
  },
  {
    icon: <MailIcon />,
    name: 'Contact Us',
    path: '/contact-us',
  },
];

const Sidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    activeAccountTab,
    setActiveAccountTab,
  } = useSidebar();
  const pathname = usePathname();

  const accountNavItems: NavItem[] = [
    {
      name: 'Dashboard',
      icon: <GridIcon />,
      subItems: [
        { name: 'Job Status', path: '/dashboard/job-status' },
        { name: 'Uploaded Files', path: '/dashboard/uploaded-files' },
      ],
    },
    {
      name: 'Profile',
      icon: <Image src={UserIcon} alt="Profile" width={24} height={24} className="dark:invert" />,
      onClick: () => setActiveAccountTab('profile'),
    },
    {
      name: 'Subscription',
      icon: (
        <Image
          src={SubscriptionIcon}
          alt="Subscription"
          width={24}
          height={24}
          className="dark:invert"
        />
      ),
      onClick: () => setActiveAccountTab('subscription'),
    },
  ];

  const itemsToRender = pathname === '/account' ? accountNavItems : mainNavItems;

  const renderNavList = (items: NavItem[], menuType: string) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.onClick ? (
            <button
              onClick={nav.onClick}
              className={`menu-item group ${
                pathname === '/account' && activeAccountTab === nav.name.toLowerCase()
                  ? 'menu-item-active'
                  : 'menu-item-inactive'
              } cursor-pointer ${
                !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'
              }`}
            >
              <span
                className={`${
                  pathname === '/account' && activeAccountTab === nav.name.toLowerCase()
                    ? 'menu-item-icon-active'
                    : 'menu-item-icon-inactive'
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
            </button>
          ) : nav.path ? (
            <Link
              href={nav.path}
              className={`menu-item group ${
                isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
              }`}
            >
              <span
                className={`${
                  isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
            </Link>
          ) : nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? 'menu-item-active'
                  : 'menu-item-inactive'
              } cursor-pointer ${
                !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? 'menu-item-icon-active'
                    : 'menu-item-icon-inactive'
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <span
                  className={`ml-auto transition-transform duration-200 ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? 'rotate-180 text-[#148cfc]'
                      : ''
                  }`}
                >
                  <ChevronDownIcon />
                </span>
              )}
            </button>
          ) : null}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={el => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : '0px',
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map(subItem => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? 'menu-dropdown-item-active'
                          : 'menu-dropdown-item-inactive'
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{ type: string; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    setOpenSubmenu(null);
    if (pathname !== '/account') {
      let submenuMatched = false;
      mainNavItems.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach(subItem => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: 'main',
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
      if (!submenuMatched) {
        setOpenSubmenu(null);
      }
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight(prevHeights => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: string) => {
    setOpenSubmenu(prevOpenSubmenu => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`hidden lg:flex py-8 ${
          !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
        }`}
      >
        <Link href="/home">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image className="dark:hidden" src={Logo} alt="Logo" width={150} height={40} />
              <Image
                className="hidden dark:block"
                src={LogoWhite}
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <>
              <Image className="dark:hidden" src={Logo} alt="Logo" width={100} height={100} />
              <Image
                className="hidden dark:block"
                src={LogoWhite}
                alt="Logo"
                width={100}
                height={100}
              />
            </>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  <p className="dark:text-white/90">Menu</p>
                ) : (
                  <PiDotsThreeOutlineBold />
                )}
              </h2>
              {renderNavList(itemsToRender, pathname === '/account' ? 'account' : 'main')}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
