import React from "react";

/**
 * PopularTags — Responsive tag filter buttons
 * FIXED: Removed broken virtualizer with hardcoded h-400px.
 */
const PopularTags = ({ tagItems = [], onClicked, activeTag }) => {
  const handleClicked = (item) => {
    onClicked(activeTag === item ? "" : item);
  };

  if (!tagItems?.length) return null;

  return (
    <div>
      <p className="text-sm font-bold text-gray_900 pb-3">Popular Tags</p>
      <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
        {tagItems.map((item, index) => (
          <button
            key={index}
            className={`py-1.5 px-3 text-xs font-medium capitalize cursor-pointer border rounded transition-colors duration-150
              ${item === activeTag
                ? "bg-primary_50 border-primary_500 text-primary_700"
                : "border-gray_100 text-gray_900 hover:border-primary_300"
              }`}
            onClick={() => handleClicked(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
