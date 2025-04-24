import { SetStateAction } from 'react';
import 'video.js/dist/video-js.css';

import { Modal } from '@/components/Modal';

// Definir tipos para claridad
type FileType = 'VIDEO' | 'IMAGE' | null;

type PopUpProps = {
  open: boolean;
  setOpen: (e: SetStateAction<boolean>) => void;
  url: string | null;
  fileType?: FileType;
};

export default function VideoPreviewModal(props: PopUpProps) {
  const fileType = props.fileType ?? 'VIDEO';

  if (!props.open || !props.url) {
    return null;
  }

  return (
    <Modal
      isOpen={props.open}
      onClose={() => props.setOpen(false)}
      className="max-w-[80vw] max-h-[90vh] overflow-auto flex items-center justify-center"
    >
      <div className="p-4">
        {fileType === 'VIDEO' && (
          <video
            className="video-js vjs-default-skin max-w-full max-h-[80vh]"
            controls
            preload="auto"
          >
            <source src={props.url} type="video/mp4" />
            Your browser doesn't allow this video tag.
          </video>
        )}
        {fileType === 'IMAGE' && (
          <img src={props.url} alt="Preview" className="max-w-full max-h-[80vh] object-contain" />
        )}
      </div>
    </Modal>
  );
}
