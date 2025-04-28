/* eslint-disable object-curly-newline */
import { Divider, Grid, Typography } from '@mui/material';
import { differenceInCalendarMonths, format } from 'date-fns';
import React from 'react';
//@ts-ignore
import Button from '@/components/ui/button/Button';
import { BsArrowRight } from 'react-icons/bs';
import DefinedRanges from './DefinedRanges';
import { MARKERS } from './Markers';
import Month from './Month';
import { DateRange, DefinedRange, NavigationAction, Setter } from './types';

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    // eslint-disable-next-line no-unused-vars
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    // eslint-disable-next-line no-unused-vars
    onDayClick: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onDayHover: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  locale?: Locale;
  toggle: any;
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    locale,
    toggle,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };
  return (
    <div className="rounded-3xl pt-20 px-8 relative border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
      <Grid
        className="border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800"
        container
        direction="row"
        wrap="nowrap"
      >
        <Grid>
          <DefinedRanges selectedRange={dateRange} ranges={ranges} setRange={setDateRange} />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid>
          <Grid container sx={{ padding: '20px 70px' }} alignItems="center">
            <Grid item sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1" className="text-[#1d2939] dark:text-white/90">
                {startDate ? format(startDate, 'dd MMMM yyyy', { locale }) : 'Start Date'}
              </Typography>
            </Grid>
            <Grid item sx={{ flex: 1, textAlign: 'center' }}>
              <BsArrowRight className="hidden dark:block" color="white" />
              <BsArrowRight className="dark:hidden" color="#1d2939" />
            </Grid>
            <Grid item sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1" className="text-[#1d2939] dark:text-white/90">
                {endDate ? format(endDate, 'dd MMMM yyyy', { locale }) : 'End Date'}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              locale={locale}
            />
            <Divider orientation="vertical" flexItem />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              locale={locale}
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="flex justify-center py-[34px]">
        <Button onClick={toggle}>Apply</Button>
      </div>
    </div>
  );
};

export default Menu;
