import { allIcons } from "@/helpers/IconProvider";
import { useGetSingleProduct } from "@/hooks/useCategory";
import React from "react";
import Button from "../commonButton/Button";

/**
 * BestDealProdtBannar — sidebar product banner
 * FIXED: p-8 caused overflow on mobile sidebar; whitespace-nowrap on price row clipped.
 */
const BestDealProdtBannar = () => {
  const { data, isLoading, isError } = useGetSingleProduct(78);
  const { appleIcon, productInfoActivites } = allIcons;

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 border-4 border-[#fa82325b] rounded animate-pulse">
        <div className="w-full aspect-square bg-gray-200 rounded mb-4" />
        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
        <div className="h-10 bg-gray-200 rounded mb-3" />
        <div className="h-10 bg-gray-100 rounded" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 border-4 border-[#fa82325b] rounded">
      <figure>
        <img
          src={data?.thumbnail}
          alt={data?.brand ? `${data.brand} product` : "Featured product"}
          className="w-full object-contain"
          loading="lazy"
        />
      </figure>
      <div className="py-2">
        <div className="flex justify-center items-center gap-x-2">
          <span className="text-2xl sm:text-4xl">{appleIcon}</span>
          <h3 className="text-xl sm:text-[28px] font-bold text-gray_900">{data?.brand}</h3>
        </div>
        <p className="text-center mt-2 text-base font-bold text-primary_500">SERIES 7</p>
        <h4 className="text-base sm:text-xl font-bold text-gray_900 text-center pt-3">
          Heavy on Features. Light on Price.
        </h4>
      </div>

      {/* Removed whitespace-nowrap — causes overflow in narrow sidebar */}
      <p className="text-sm text-gray_700 mt-4 flex flex-wrap items-center gap-x-1">
        Only for:{" "}
        <span className="py-1 px-2 ml-1 bg-warning_300 text-gray_900 rounded text-sm font-semibold">
          ${data?.price} USD
        </span>
      </p>

      <div className="pt-4 sm:pt-6 flex flex-col gap-y-3">
        <button className="flex items-center gap-2 text-gray_00 bg-primary_500 w-full py-3 sm:py-[14px] rounded justify-center cursor-pointer text-sm sm:text-base hover:bg-primary_600 transition-colors duration-200">
          <span>{productInfoActivites[0].icon}</span> Add to Cart
        </button>
        <Button
          children={"View Details"}
          className={"!bg-gray_00 text-primary_500 border-2 border-primary_500 text-sm"}
        />
      </div>
    </div>
  );
};

export default BestDealProdtBannar;
