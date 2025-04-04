import {SetStateAction} from "react";
import "video.js/dist/video-js.css";

import { Modal } from "@/components/Modal";

type PopUpProps = {
  open: boolean;
  setOpen: (e: SetStateAction<boolean>) => void;
  video: any;
};

export default function VideoPreviewModal(props: PopUpProps) {
  return (
    <Modal isOpen={props.open && props.video} onClose={() => props.setOpen(false)} className="max-w-[756px]">
      <div
        className="relative flex inset-0 z-10 overflow-y-auto flex min-h-full justify-center text-center items-center rounded-[8px] p-20"
      >
        <video className="video-js vjs-default-skin" controls>
          <source src={props.video} type="video/mp4"/>
        </video>
      </div>
    </Modal>
  );
}
