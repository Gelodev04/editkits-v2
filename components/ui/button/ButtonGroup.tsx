import clsx from 'clsx';

interface ButtonOption {
  label: string;
  value: string;
}

interface ButtonGroupProps {
  buttons: ButtonOption[];
  selected: string[];
  onClick: (value: string) => void;
}

export default function ButtonGroup({ buttons, selected, onClick }: ButtonGroupProps) {
  return (
    <div className="inline-flex items-center rounded-lg shadow-theme-xs">
      {buttons.map((button, index) => (
        <button
          key={button.value}
          type="button"
          onClick={() => onClick(button.value)}
          className={clsx(
            'inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium ring-1 ring-inset ring-gray-300 transition hover:bg-[#273266] hover:text-white dark:ring-gray-700 dark:hover:bg-white/[0.03]',
            index > 0 && '-ml-px',
            index === 0 && 'rounded-l-lg',
            index === buttons.length - 1 && 'rounded-r-lg',
            selected.includes(button.value)
              ? 'bg-[#273266] text-white'
              : 'bg-transparent text-gray-700 hover:text-gray-800 dark:bg-transparent dark:text-gray-400'
          )}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
