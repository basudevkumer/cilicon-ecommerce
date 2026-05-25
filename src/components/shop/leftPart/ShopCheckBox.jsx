import React from "react";

/**
 * ShopCheckBox — Brand filter checkboxes
 * FIXED: Removed broken virtualizer with h-96 fixed height.
 * Now uses simple flex-wrap grid — works perfectly in both sidebar and mobile drawer.
 */
const ShopCheckBox = ({ availableValue = [], selected = [], onChange }) => {
  const handleChange = (item) => {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  if (!availableValue.length) return null;

  return (
    <div>
      <p className="text-sm font-bold text-gray_900 pb-3">Popular Brands</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 max-h-[240px] overflow-y-auto pr-1">
        {availableValue.map((item, index) => (
          <div key={index} className="flex items-center gap-x-2 cursor-pointer">
            <input
              type="checkbox"
              id={`brand-${index}`}
              checked={selected.includes(item)}
              onChange={() => handleChange(item)}
              className="cursor-pointer accent-primary_500"
            />
            <label
              htmlFor={`brand-${index}`}
              className="text-sm text-gray_700 cursor-pointer select-none truncate"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCheckBox;
