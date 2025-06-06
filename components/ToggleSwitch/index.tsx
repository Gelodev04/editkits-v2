import React from "react";

type ToggleSwitchProps = {
  monthly: boolean;
  setMonthly: (e: React.SetStateAction<boolean>) => void;
  setLoading: (e: React.SetStateAction<boolean>) => void;
}

export default function ToggleSwitch({monthly, setMonthly, setLoading}: ToggleSwitchProps) {

  return (
    <div className="flex rounded-full w-max border border-solid border-[1px] border-[#979797]">
      <button
        className={`py-2 rounded-full transition-all duration-300 font-montserrat text-[10px] font-semibold w-[111px] h-[44px] ${
          monthly ? 'bg-[#1d2939] text-white' : 'text-[#2c2c2c]'
        }`}
        onClick={() => setMonthly(true)}
      >
        MONTHLY
      </button>
      <button
        className={`py-2 rounded-full font-bold transition-all duration-300 font-montserrat text-[10px] font-semibold w-[111px] h-[44px] ${
          !monthly ? 'bg-[#1d2939] text-white' : 'text-[#2c2c2c]'
        }`}
        onClick={() => {
          setMonthly(false);
          setLoading(true)
        }}
      >
        YEARLY
      </button>
    </div>
  );
}
