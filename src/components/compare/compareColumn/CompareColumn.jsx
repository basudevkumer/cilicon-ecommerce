import React from "react";
import { allIcons } from "@/helpers/IconProvider";
import Star from "@/components/commonComponent/commonStar/Star";
import { useDispatch } from "react-redux";
import { removeItems } from "@/reduxFeature/slices/compareSlice";
import { Link } from "react-router-dom";
import { addTocard } from "@/reduxFeature/slices/shopSlice";

const CompareColumn = ({ passCompareVlue }) => {
  const dispatch = useDispatch();
  const { close, navMiddleIcon } = allIcons;

  const handleRemove = (id) => dispatch(removeItems(id));
  const handleAddItems = () => dispatch(addTocard({ ...passCompareVlue, quantity: 1 }));

  return (
    <div className="border border-gray_100">
      {/* Product area - responsive min-h */}
      <div className="p-3 sm:p-4 min-h-[200px] sm:min-h-[320px] lg:min-h-[480px]">
        <div className="flex justify-center">
          <button
            className="text-2xl sm:text-3xl text-gray_400 mb-3 sm:mb-4 hover:text-danger_500 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => handleRemove(passCompareVlue?.id)}
            aria-label="Remove from compare"
          >
            {close}
          </button>
        </div>
        <figure>
          <img
            src={passCompareVlue?.thumbnail}
            alt={passCompareVlue?.title || "Product image"}
            className="w-full object-contain max-h-[120px] sm:max-h-[180px]"
            loading="lazy"
          />
        </figure>
        <p className="text-xs sm:text-sm text-gray_900 line-clamp-3 my-2 sm:my-4">
          {passCompareVlue?.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-x-3 items-center">
          <Link to="/shopping-card" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto px-3 sm:px-[36px] flex gap-x-2 items-center justify-center text-gray_00 text-xs sm:text-sm font-bold bg-primary_500 rounded cursor-pointer py-2 hover:bg-primary_600 transition-colors"
              onClick={handleAddItems}
            >
              Add to cart <span className="text-base sm:text-lg">{navMiddleIcon[0].icon}</span>
            </button>
          </Link>
          <Link to={`/product-details/${passCompareVlue?.id}`} className="w-full sm:w-auto">
            <span className="block text-center p-2 sm:p-3 border border-primary_100 text-primary_500 rounded cursor-pointer text-xs sm:text-sm hover:bg-primary_50 transition-colors">
              View Details
            </span>
          </Link>
        </div>
      </div>

      {/* Spec rows */}
      <div className="bg-gray_50 px-3 sm:px-4 py-2 sm:py-3">
        <p className="text-gray_500 text-xs sm:text-sm">
          <Star starsCard={passCompareVlue?.rating} />
        </p>
      </div>
      <div className="bg-gray_00 py-2 sm:py-3 px-3 sm:px-4">
        <p className="text-secondary_500 text-xs sm:text-sm font-bold">${passCompareVlue?.price}</p>
      </div>
      <div className="bg-gray_50 px-3 sm:px-4 py-2 sm:py-3">
        <p className="text-gray_900 text-xs sm:text-sm">{passCompareVlue?.brand}</p>
      </div>
      <div className="bg-gray_00 py-2 sm:py-3 px-3 sm:px-4">
        <p className="text-gray_900 text-xs sm:text-sm">{passCompareVlue?.brand}</p>
      </div>
      <div className="bg-gray_50 px-3 sm:px-4 py-2 sm:py-3">
        <p className="text-gray_900 text-xs sm:text-sm">{passCompareVlue?.sku}</p>
      </div>
      <div className="bg-gray_00 py-2 sm:py-3 px-3 sm:px-4">
        <p className="text-gray_900 text-xs sm:text-sm">{passCompareVlue?.availabilityStatus}</p>
      </div>
      <div className="bg-gray_50 px-3 sm:px-4 py-2 sm:py-3">
        <p className="text-gray_900 text-xs sm:text-sm">{passCompareVlue?.dimensions?.width ?? "—"}</p>
      </div>
      <div className="bg-gray_00 py-2 sm:py-3 px-3 sm:px-4">
        <p className="text-gray_900 text-xs sm:text-sm">{passCompareVlue?.weight ?? "—"}</p>
      </div>
    </div>
  );
};

export default CompareColumn;
