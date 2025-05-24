import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { DatePickerTriggerButton } from '@/components/ui/DatePickerTriggerButton';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Definir las nuevas props
interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
}

export function DatePickerWithRange({ className, date, onDateChange }: DatePickerWithRangeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localDate, setLocalDate] = useState<DateRange | undefined>(date);

  useEffect(() => {
    if (!isOpen) {
      setLocalDate(date);
    }
  }, [date, isOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      if (localDate?.from !== date?.from || localDate?.to !== date?.to) {
        onDateChange(localDate);
      }
    }
    if (open) {
      setLocalDate(date);
    }
  };

  const handleClear = () => {
    onDateChange(undefined);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <DatePickerTriggerButton
            variant="primary"
            className={cn('font-lato text-sm leading-[28px]', !date && 'text-white')}
            date={date}
            onClear={handleClear}
          >
            <CalendarIcon className="max-[590px]:mr-0 mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Select date range</span>
            )}
          </DatePickerTriggerButton>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={localDate?.from}
            selected={localDate}
            onSelect={setLocalDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
