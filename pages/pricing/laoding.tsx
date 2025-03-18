import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-full max-w-sm p-6 bg-gray-100 rounded-lg animate-pulse">
      <div className="h-[400px] w-[354px] bg-gray-300 rounded mb-4" />
      <div className="h-4 w-32 bg-gray-300 rounded mb-4" />
      <ul className="space-y-3">
        {Array(2)
          .fill(0)
          .map((_, index) => (
            <li key={index} className="h-4 w-3/4 bg-gray-300 rounded" />
          ))}
      </ul>

      {/* Button */}
      <div className="h-10 w-full bg-gray-300 rounded mt-6" />
    </div>
  );
};

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white place-items-center px-[22px] py-[14px] rounded rounded-2xl max-w-[1920px]">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default Loading;
