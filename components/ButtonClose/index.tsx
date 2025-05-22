import { HiX } from 'react-icons/hi';

type ButtonCloseProps = {
  handleClose: () => void;
  disabled?: boolean;
};

export default function ButtonNew(props: ButtonCloseProps) {
  return (
    <button
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        props.handleClose();
      }}
      disabled={props.disabled}
      className={`absolute right-6 top-6 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors" ${props.disabled}
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
      aria-label="Close modal"
    >
      <HiX className="w-5 h-5" />
    </button>
  );
}
