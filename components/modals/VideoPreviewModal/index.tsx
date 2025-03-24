import { SetStateAction} from "react";
import {Fade, Modal} from "@mui/material";

import {lato, montserrat, opensans} from "@/lib/fonts";
import "video.js/dist/video-js.css";

type PopUpProps = {
  open: boolean;
  setOpen: (e: SetStateAction<boolean>) => void;
  video: any;
};

export default function VideoPreviewModal(props: PopUpProps) {
  return (
    <Modal open={props.open && props.video} onClose={() => props.setOpen(false)}>
      <Fade in={props.open}>
        {/* @ts-ignore */}
        <div>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
          <div
            className="fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-end justify-center text-center sm:items-center sm:p-0"
          >
            <div
              className={`${montserrat.variable} ${lato.variable} ${opensans.variable} relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all w-[532px]`}
            >
              <video className="video-js vjs-default-skin w-[532px]" controls>
                <source src={props.video} type="video/mp4"/>
              </video>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
