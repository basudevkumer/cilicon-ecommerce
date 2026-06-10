import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FilterCategoryItems = ({
  categoryData = [],
  categoryPending,
  categoryError,
  setCategoryValue,
  selectedValue,
  activeFilterValue,
}) => {
  const footerItemsValue = useSelector((state) => state.footerRtItems.value);

  // Footer থেকে value আসলে category set করো
  // কিন্তু শুধু footerItemsValue change হলেই, অন্য সময় না
  useEffect(() => {
    if (footerItemsValue) {
      setCategoryValue(footerItemsValue);
      activeFilterValue(footerItemsValue); // activeFilter ও sync করো
    }
  }, [footerItemsValue]);

  if (categoryPending) {
    return (
      <div className="flex flex-col gap-y-2 py-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (categoryError)
    return (
      <p className="text-xs text-danger_500 py-2">Failed to load categories.</p>
    );

  const handleItemsClick = (slug) => {
    const newValue = selectedValue === slug ? null : slug; // toggle
    setCategoryValue(newValue);
    activeFilterValue(newValue ?? ""); // parent কে জানাও
  };

  return (
    <div>
      <h3 className="text-sm font-bold text-gray_900 mb-3">Category</h3>
      <div className="max-h-[320px] overflow-y-auto flex flex-col gap-y-1 pr-1">
        {categoryData.map((items, index) => {
          const isActive = selectedValue === items.slug;
          return (
            <div
              key={index}
              onClick={() => handleItemsClick(items.slug)}
              className={`flex items-center gap-x-2 py-2 px-2 rounded-md cursor-pointer transition-colors duration-150
                ${isActive ? "bg-gray-200 text-gray-900" : "hover:bg-gray-100"}`}
            >
              <input
                type="radio"
                checked={isActive}
                readOnly
                className="cursor-pointer accent-primary_500"
              />
              <label className="cursor-pointer text-sm text-gray_700 select-none">
                {items.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterCategoryItems;