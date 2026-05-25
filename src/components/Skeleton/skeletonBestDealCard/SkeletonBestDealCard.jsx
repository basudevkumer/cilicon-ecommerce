import React from "react";

const SkeletonBestDealCard = () => {
  return (
    <div>
      <div className="p-3 grid grid-cols-2 items-center gap-x-3 border border-gray-100 rounded-lg animate-pulse">
        {/* Left: Image Skeleton */}
        <div className="w-full h-20 bg-gray-200 rounded-md overflow-hidden relative">
          <div className="shimmer"></div>
        </div>

        {/* Right: Text Skeleton */}
        <div className="space-y-3">
          {/* Title - 2 lines */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded-full w-full shimmer"></div>
            <div className="h-3 bg-gray-200 rounded-full w-4/5 shimmer"></div>
          </div>
          {/* Price */}
          <div className="h-5 bg-gray-300 rounded w-16 shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBestDealCard;
