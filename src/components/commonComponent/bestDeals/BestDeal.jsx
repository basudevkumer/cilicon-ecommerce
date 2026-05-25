import SkeletonBestDealCard from "@/components/Skeleton/skeletonBestDealCard/SkeletonBestDealCard";
import React from "react";
import { Link } from "react-router-dom";

const BestDeal = ({ productList, title, isPending }) => {
  if (isPending) {
    return (
      <div className="flex flex-col gap-y-[18px] mt-10">
        {/* Loading skeleton */}
        {[...new Array(3)].map((_, index) => {
          return (
            <div
              className="p-3 grid grid-cols-2 items-center gap-x-3 border border-gray-100 rounded-lg animate-pulse"
              key={index}
            >
              {/* Left: Image Skeleton */}
              <div className="w-full h-[125px] bg-gray-200 rounded-md overflow-hidden relative">
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
          );
        })}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <p className="md_600 text-gray_900 ">{title} </p>
      {productList.map((items, index) => {
        return (
          <Link to={`/product-details/${items?.id}`} key={index} className="block">
            <div className="p-3  grid grid-cols-2 items-center gap-x-3 border border-gray_100 rounded ">
              <picture>
                <img
                  src={items?.thumbnail}
                  alt={`bestdeal images no: ${index}`}
                  className=" w-full bg-center object-cover "
                />
              </picture>
              <div>
                <p className="sm_400 text-gray_900 line-clamp-2">
                  {items?.description}
                </p>
                <p className="sm_600 text-secondary_500 pt-2">${items?.price}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BestDeal;
