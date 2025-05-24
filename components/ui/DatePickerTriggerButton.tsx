import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { DateRange } from 'react-day-picker';

const customButtonVariants = cva(
  'inline-flex items-center justify-center font-medium gap-2 rounded-lg transition h-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-500 text-white shadow-theme-xs hover:bg-[#1F75E6] disabled:bg-brand-300 hover:text-white',
        outline:
          'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-[#1F75E6] hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300',
      },
      size: {
        sm: 'px-4 py-3 text-sm',
        md: 'px-5 py-3.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  }
);

export interface DatePickerTriggerButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof customButtonVariants> {
  asChild?: boolean;
  date?: DateRange;
  onClear?: () => void;
}

const DatePickerTriggerButton = React.forwardRef<HTMLButtonElement, DatePickerTriggerButtonProps>(
  ({ className, children, variant, size, asChild = false, date, onClear, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const combinedClasses = cn(
      customButtonVariants({ variant, size }),
      'w-fit justify-start text-left font-normal items-center ',
      className
    );

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClear?.();
    };

    return (
      <Comp className={combinedClasses} ref={ref} {...props}>
        {children}
        {date?.from && (
          <button
            className="z-10 hover:bg-white/10 rounded-full p-1 transition-colors"
            onClick={handleClear}
            title="Clear date filter"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </Comp>
    );
  }
);
DatePickerTriggerButton.displayName = 'DatePickerTriggerButton';

export { DatePickerTriggerButton };
