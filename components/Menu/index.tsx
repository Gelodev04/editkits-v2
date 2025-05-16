import { MouseEvent, useState } from 'react';

import { Menu as MenuComponent } from '@mui/material';

import { BsThreeDotsVertical } from 'react-icons/bs';

import { DropdownItem } from '@/components/dropdown/DropdownItem';
import Copy from '@/components/icons/Copy';
import Download from '@/components/icons/Download';
import Play from '@/components/icons/Play';
import ErrorModal from '@/components/modals/ErrorModal';
import { getErrorMessage } from '@/lib/utils';

type MenuProps = {
  outputFileId: string;
  handlePreview: () => Promise<void>;
  handleCopy: () => void;
  handleDownload: (outputFileId: string) => Promise<string | undefined | null>;
};

export default function Menu(props: MenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        <ul className="flex flex-col gap-3 z-40 border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-[#1E2635]">
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
              <Play className="w-5 h-5 text-[#1C274C] dark:text-white" />
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
                  await props.handleDownload(props.outputFileId);
                } catch (error) {
                  setErrorMessage(getErrorMessage(error, 'An unexpected error occurred.'));
                  setErrorModalOpen(true);
                }
              }}
            >
              <DropdownItem
                className="flex rounded-lg px-3 py-2.5 text-sm font-medium
              text-gray-700 hover:bg-gray-100 dark:text-gray-300
              dark:hover:bg-white/5 items-center gap-[12px]"
              >
                <Download className="w-5 h-5 text-[#1C274C] dark:text-white" />
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
              <Copy className="w-5 h-5 text-[#1C274C] dark:text-white" />
              Copy File ID
            </DropdownItem>
          </li>
        </ul>
      </MenuComponent>
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errorMessage={errorMessage}
      />
    </div>
  );
}
