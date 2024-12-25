import React from "react";

export default function ToggleSwitch({monthly, setMonthly}: {monthly: boolean, setMonthly: (e: React.SetStateAction<boolean>) => void}) {

  return (
    <div className="flex bg-blue-50 p-1 rounded-full w-max px-4 py-2">
      <button
        className={`px-8 py-2 rounded-full transition-all duration-300 font-lato text-lg font-bold w-[172px] h-[48px] ${
          monthly ? 'bg-sky-500 text-white scale-105' : 'text-[#17ABDB]'
        }`}
        onClick={() => setMonthly(true)}
      >
        Monthly
      </button>
      <button
        className={`px-8 py-2 rounded-full font-bold transition-all duration-300 font-lato text-lg w-[172px] ${
          !monthly ? 'bg-sky-500 text-white scale-105' : 'text-[#17ABDB]'
        }`}
        onClick={() => setMonthly(false)}
      >
        Yearly
      </button>
    </div>
  );
}
