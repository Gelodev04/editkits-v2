import { SetStateAction } from 'react';
import 'video.js/dist/video-js.css';

import { Modal } from '@/components/Modal';

// Actualizar FileType para incluir 'AUDIO'
type FileType = 'VIDEO' | 'IMAGE' | 'AUDIO' | null;

type PopUpProps = {
  open: boolean;
  setOpen: (e: SetStateAction<boolean>) => void;
  url: string | null;
  fileType?: FileType;
};

export default function VideoPreviewModal(props: PopUpProps) {
  const fileType = props.fileType;

  if (!props.open || !props.url) {
    return null;
  }

  return (
    <Modal
      isOpen={props.open}
      onClose={() => props.setOpen(false)}
      className="w-fit max-h-[90vh] overflow-visible flex items-center justify-center max-w-[80vw] lg:max-w-[90vw]  p-5"
    >
      <div className="p-4">
        {fileType === 'VIDEO' && (
          <video
            className="video-js vjs-default-skin max-w-full max-h-[80vh] rounded-2xl "
            controls
            preload="auto"
            key={props.url}
          >
            <source src={props.url} type="video/mp4" />
            Your browser doesn't support the video tag.
          </video>
        )}
        {fileType === 'IMAGE' && (
          <img
            src={props.url}
            alt="Preview"
            className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            key={props.url}
          />
        )}
        {fileType === 'AUDIO' && (
          <audio controls key={props.url}>
            <source src={props.url} type="audio/mpeg" />
            <source src={props.url} type="audio/wav" />
            Your browser doesn't support the audio element.
          </audio>
        )}
      </div>
    </Modal>
  );
}
