import { allIcons } from "@/helpers/IconProvider";
import { activefiltered } from "@/reduxFeature/slices/activeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RightActiveFilter = ({ activeValue, countfilteredProduct, searchItems }) => {
  const dispatch = useDispatch();
  const activeITems = useSelector((state) => state.activeItems.value);
  const { plainClose } = allIcons;

  useEffect(() => {
    let newArray = [...activeITems];
    if (activeValue && typeof activeValue === "string" && !newArray.includes(activeValue)) {
      newArray.push(activeValue);
    }
    if (searchItems && searchItems.trim() !== "" && !newArray.includes(searchItems)) {
      newArray.push(searchItems);
    }
    if (newArray.length > activeITems.length) {
      dispatch(activefiltered(newArray));
    }
  }, [activeValue, searchItems]);

  const handleRemove = (itemToRemove) => {
    const updatedArray = activeITems.filter((i) => i !== itemToRemove);
    dispatch(activefiltered(updatedArray));
  };

  return (
    /*
      Mobile: stacked (active filters on top, results count below)
      sm+: flex row — filters left, count right
      Fixed hardcoded grid-cols-12 and grid-cols-6 that caused overflow on mobile
    */
    <div className="py-3 px-4 sm:px-6 bg-gray_50 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 gap-x-3">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <p className="text-gray_600 text-xs sm:text-sm whitespace-nowrap shrink-0">Active Filters:</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {activeITems?.map((items, index) => (
            <div className="flex items-center gap-x-1" key={index}>
              <span className="text-gray_900 text-xs sm:text-sm capitalize">{items}</span>
              <button
                className="text-gray_400 cursor-pointer hover:text-danger_500 transition-colors duration-150"
                onClick={() => handleRemove(items)}
                aria-label={`Remove ${items} filter`}
              >
                {plainClose}
              </button>
            </div>
          ))}
        </div>
      </div>
      <p className="text-gray_900 text-xs sm:text-sm font-semibold shrink-0">
        {countfilteredProduct?.length} <span className="text-gray_600 font-normal">Results found</span>
      </p>
    </div>
  );
};

export default RightActiveFilter;
