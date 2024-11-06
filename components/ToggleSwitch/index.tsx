import React from "react";

export default function ToggleSwitch({monthly, setMonthly}: {monthly: boolean, setMonthly: (e: React.SetStateAction<boolean>) => void}) {

  return (
    <div className="flex bg-blue-50 p-1 rounded-full w-max">
      <button
        className={`px-8 py-2 rounded-full font-medium transition-all duration-300 ${
          monthly ? 'bg-sky-500 text-white scale-105' : 'text-blue-500'
        }`}
        onClick={() => setMonthly(true)}
      >
        Monthly
      </button>
      <button
        className={`px-8 py-2 rounded-full font-medium transition-all duration-300 ${
          !monthly ? 'bg-sky-500 text-white scale-105' : 'text-blue-500'
        }`}
        onClick={() => setMonthly(false)}
      >
        Yearly
      </button>
    </div>
  );
}
