import Image from 'next/image';
import { MouseEvent, useState } from 'react';

import { Menu as MenuComponent } from '@mui/material';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoDownloadOutline } from 'react-icons/io5';
import { PiPlayCircleLight } from 'react-icons/pi';

import { DropdownItem } from '@/components/dropdown/DropdownItem';
import { downloadFile } from '@/lib/utils';
import CopyIcon from '@/public/icons/copy.svg';
import CopyIconWhite from '@/public/icons/copy_white.svg';

type MenuProps = {
  outputFileId: string;
  handlePreview: () => Promise<void>;
  handleCopy: () => void;
  handleDownload: (outputFileId: string) => Promise<string | undefined | null>;
};

export default function Menu(props: MenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function closeDropdown() {
    setAnchorEl(null);
  }

  return (
    <div>
      <BsThreeDotsVertical
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="#4f4f4f"
        cursor="pointer"
        //@ts-ignore
        onClick={handleClick}
        className="relative inline-block"
      />
      <MenuComponent
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: { padding: 0, margin: 0 },
        }}
      >
        <ul className="flex flex-col gap-1 z-40 border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-[#1E2635]">
          <li>
            <DropdownItem
              onItemClick={() => {
                closeDropdown();
                props.handlePreview();
              }}
              className="flex rounded-lg px-3 py-2.5 text-sm font-medium
                text-gray-700 hover:bg-gray-100 dark:text-gray-300
                dark:hover:bg-white/5 items-center gap-[12px]"
            >
              <PiPlayCircleLight size={22} />
              Play
            </DropdownItem>
          </li>
          <li>
            <a
              href="#"
              onClick={async e => {
                e.preventDefault();
                closeDropdown();
                try {
                  const url = await props.handleDownload(props.outputFileId);
                  if (url) {
                    downloadFile(url, 'video.mp4');
                  } else {
                    console.error('Download failed: Could not get URL.');
                  }
                } catch (error) {
                  console.error('Error fetching video URL for download:', error);
                }
              }}
            >
              <DropdownItem
                className="flex rounded-lg px-3 py-2.5 text-sm font-medium
              text-gray-700 hover:bg-gray-100 dark:text-gray-300
              dark:hover:bg-white/5 items-center gap-[12px]"
              >
                <IoDownloadOutline size={22} />
                Download
              </DropdownItem>
            </a>
          </li>
          <li>
            <DropdownItem
              onItemClick={() => {
                closeDropdown();
                props.handleCopy();
              }}
              className="flex rounded-lg px-3 py-2.5 text-sm font-medium
              text-gray-700 hover:bg-gray-100 dark:text-gray-300
              dark:hover:bg-white/5 items-center gap-[12px]"
            >
              <Image className="dark:hidden" src={CopyIcon} alt="copy icon" />
              <Image className="hidden dark:block" src={CopyIconWhite} alt="copy icon" />
              Copy File ID
            </DropdownItem>
          </li>
        </ul>
      </MenuComponent>
    </div>
  );
}
