import React from "react";

const Loading = () => {
  return (
    <div className="border border-gray_100 relative p-3 sm:p-4 rounded w-full h-[280px] sm:h-[300px] lg:h-[320px] shadow-xl">
      <div className="animate-pulse flex flex-col h-full">
        <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
          <div className="bg-gray-300 rounded w-10 sm:w-16 h-5 sm:h-6"></div>
        </div>
        <div className="w-full h-[160px] sm:h-[180px] lg:h-[175px] bg-gray-300 rounded"></div>
        <div className="pt-3 sm:pt-6 space-y-2 sm:space-y-3 flex-1">
          <div className="flex items-center gap-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-3 h-3 sm:w-5 sm:h-5 bg-gray-300 rounded-full"></div>
            ))}
            <div className="w-10 sm:w-12 h-3 sm:h-4 bg-gray-300 rounded ml-2"></div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-4/5"></div>
          </div>
          <div className="flex gap-x-2 items-center">
            <div className="h-4 sm:h-5 bg-gray-300 rounded w-12 sm:w-16"></div>
            <div className="h-4 sm:h-6 bg-gray-300 rounded w-16 sm:w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
