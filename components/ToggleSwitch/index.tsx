import React from "react";

export default function ToggleSwitch({monthly, setMonthly}: {monthly: boolean, setMonthly: (e: React.SetStateAction<boolean>) => void}) {

  return (
    <div className="flex rounded-full w-max border border-solid border-[1px] border-[#979797]">
      <button
        className={`py-2 rounded-full transition-all duration-300 font-montserrat text-[10px] font-semibold w-[111px] h-[44px] ${
          monthly ? 'bg-[#273266] text-white' : 'text-[#17abdb]'
        }`}
        onClick={() => setMonthly(true)}
      >
        MONTHLY
      </button>
      <button
        className={`py-2 rounded-full font-bold transition-all duration-300 font-montserrat text-[10px] font-semibold w-[111px] h-[44px] ${
          !monthly ? 'bg-[#273266] text-white' : 'text-[#17abdb]'
        }`}
        onClick={() => setMonthly(false)}
      >
        YEARLY
      </button>
    </div>
  );
}
