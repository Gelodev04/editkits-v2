import { useState, MouseEvent } from "react";
import Image from "next/image";

import {Menu as MenuComponent, MenuItem} from '@mui/material';

import {BsThreeDotsVertical} from "react-icons/bs";
import {PiPlayCircleLight} from "react-icons/pi";
import {IoDownloadOutline} from "react-icons/io5";

import CopyIcon from "@/public/assets/icons/copy.svg";

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <BsThreeDotsVertical
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="#4f4f4f"
        cursor="pointer"
        onClick={handleClick}
      />
      <MenuComponent
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <div onClick={handleClose} className="flex items-center gap-[12px] cursor-pointer pb-2">
            <PiPlayCircleLight size={22}/>
            <p className="font-lato font-normal text-sm">Play</p>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div onClick={handleClose} className="flex items-center gap-[12px] cursor-pointer pb-2">
            <IoDownloadOutline size={22}/>
            <p className="font-lato font-normal text-sm">Download</p>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div onClick={handleClose} className="flex items-center gap-[12px] cursor-pointer">
            <Image src={CopyIcon} alt="copy icon" />
            <p className="font-lato font-normal text-sm">Copy File ID</p>
          </div>
        </MenuItem>
      </MenuComponent>
    </div>
  );
}
