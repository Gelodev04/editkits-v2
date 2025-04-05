import {FormControl, Grid, IconButton, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import React from 'react';
  import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {getMonth, getYear, setMonth, setYear} from 'date-fns';

interface HeaderProps {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  locale?: Locale;
}

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
                                                        date,
                                                        setDate,
                                                        nextDisabled,
                                                        prevDisabled,
                                                        onClickNext,
                                                        onClickPrevious,
                                                        locale
                                                      }: HeaderProps) => {
  const MONTHS = typeof locale !== 'undefined'
    ? [...Array(12).keys()].map(d => locale.localize?.month(d, {width: 'abbreviated', context: 'standalone'}))
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setDate(setMonth(date, parseInt(event.target.value as string, 10)));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, parseInt(event.target.value as string, 10)));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item sx={{ padding: '5px' }}>
        <IconButton
          sx={{
            padding: '10px',
            '&:hover': {
              background: 'none',
            },
          }}
          disabled={prevDisabled}
          onClick={onClickPrevious}
          // size="large"
        >
          <BiChevronLeft color="white" />
          <BiChevronLeft className="dark:hidden" color="#1d2939" />
        </IconButton>
      </Grid>
      <Grid item>
        <div className="dark:hidden">
          <FormControl variant="standard">
            <Select
              disableUnderline
              value={getMonth(date)}
              onChange={handleMonthChange}
              MenuProps={{disablePortal: true}}
            >
              {MONTHS.map((month, idx) => (
                <MenuItem key={month} value={idx}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="hidden dark:block">
          <FormControl variant="standard">
            <Select
              sx={{
                color: "white",
                '& .MuiSelect-icon': {
                  color: 'white',
                },
              }}
              disableUnderline
              value={getMonth(date)}
              onChange={handleMonthChange}
              MenuProps={{disablePortal: true}}
            >
              {MONTHS.map((month, idx) => (
                <MenuItem key={month} value={idx}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Grid>

      <Grid item>
        <div className="hidden dark:block">
          <FormControl variant="standard">
            <Select
              sx={{
                color: "white",
                '& .MuiSelect-icon': {
                  color: 'white',
                },
              }}
              disableUnderline
              value={getYear(date)}
              onChange={handleYearChange}
              MenuProps={{ disablePortal: true }}
            >
              {generateYears(date, 30).map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="dark:hidden">
          <FormControl variant="standard">
            <Select
              disableUnderline
              value={getYear(date)}
              onChange={handleYearChange}
              MenuProps={{ disablePortal: true }}
            >
              {generateYears(date, 30).map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid item sx={{ padding: '5px' }}>
        <IconButton
          sx={{
            padding: '10px',
            '&:hover': {
              background: 'none',
            },
          }}
          disabled={nextDisabled}
          onClick={onClickNext}
          // size="large"
        >
          <BiChevronRight color="white" />
          <BiChevronRight  className="dark:hidden" color="#1d2939" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;