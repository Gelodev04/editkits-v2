import React, {useState} from 'react';
import {Select, MenuItem, FormControl} from '@mui/material';
import {CiGlobe} from "react-icons/ci";
import {FaChevronUp} from "react-icons/fa";

export default function LanguageSelector() {
  const [language, setLanguage] = useState('English');

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl>
      <div className="flex items-center gap-1 bg-[#f6f6f7] py-1 px-2">
        <CiGlobe color="#262628" size={14}/>
        <Select
          value={language}
          onChange={handleChange}
          displayEmpty
          inputProps={{'aria-label': 'Language selector'}}
          variant="standard"
          disableUnderline
          IconComponent={() => <FaChevronUp width={11} height={6}/>}
          sx={{fontSize: "13px", fontFamily: "Open Sans"}}
        >
          <MenuItem className="text-[130px]" value="English">English</MenuItem>
          <MenuItem className="text-[13px]" value="Spanish">Spanish</MenuItem>
          <MenuItem className="text-[13px]" value="French">French</MenuItem>
        </Select>
      </div>
    </FormControl>
  );
}
