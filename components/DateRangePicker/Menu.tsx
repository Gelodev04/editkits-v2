/* eslint-disable object-curly-newline */
import React from 'react';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import {differenceInCalendarMonths, format} from 'date-fns';
//@ts-ignore
import {BsArrowRight} from "react-icons/bs";
import Month from './Month';
import DefinedRanges from './DefinedRanges';
import {
  DateRange,
  DefinedRange,
  Setter,
  NavigationAction,
} from './types';
import { MARKERS } from './Markers';
import {TbXboxX} from "react-icons/tb";
import Button from "@/components/Button";

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
    toggle

  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
  };
  return (
    <Paper elevation={5} square className="rounded-3xl pt-10 px-8 relative">
      <div className="absolute right-[14px] top-[14px] cursor-pointer">
        <TbXboxX size={30} color="#000" onClick={toggle} />
      </div>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
        <Divider orientation="vertical" flexItem/>
        <Grid>
          <Grid container sx={{ padding: '20px 70px' }} alignItems="center">
            <Grid item sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1">
                {startDate ? format(startDate, 'dd MMMM yyyy', {locale}) : 'Start Date'}
              </Typography>
            </Grid>
            <Grid item sx={{ flex: 1, textAlign: 'center' }}>
              <BsArrowRight color="action" />
            </Grid>
            <Grid item sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1">
                {endDate ? format(endDate, 'dd MMMM yyyy', {locale}) : 'End Date'}
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
            <Divider orientation="vertical" flexItem/>
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
        <Button
          variant="primary"
          filled
          label="Apply"
          onClick={toggle}
        />
      </div>
    </Paper>
  );
};

export default Menu;