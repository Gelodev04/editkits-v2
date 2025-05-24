'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button:
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 focus:outline-none focus:ring-0',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-transparent [&:has([aria-selected].day-outside)]:bg-transparent focus-within:relative focus-within:z-20',
        day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-[#dde9ff] hover:text-[#1c398e] hover:rounded-md rounded-none focus:outline-none focus:ring-0 focus:ring-offset-0',
        day_range_start: 'rounded-l-md',
        day_range_end: 'rounded-r-md',
        day_selected:
          'bg-[#148cfc] text-white hover:bg-[#eff6ff] focus:bg-[#148cfc] focus:text-white rounded-none focus:outline-none focus:ring-0 focus:ring-offset-0',
        day_today:
          'bg-[#148cfc] text-[white] focus:outline-none focus:ring-0 focus:ring-offset-0',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-[#dde9ff] aria-selected:text-muted-foreground aria-selected:opacity-30 focus:outline-none focus:ring-0 focus:ring-offset-0',
        day_disabled:
          'text-muted-foreground opacity-50 focus:outline-none focus:ring-0 focus:ring-offset-0',
        day_range_middle:
          'aria-selected:bg-[#eff6ff] dark:aria-selected:bg-[#eff6ff] aria-selected:text-[#1c398e] rounded-none focus:outline-none focus:ring-0 focus:ring-offset-0',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('h-4 w-4', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('h-4 w-4', className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
