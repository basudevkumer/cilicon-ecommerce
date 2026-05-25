import React from "react";

const PriceRangePresets = ({ onChanged, activePrice = [0, 100000] }) => {
  const handleChange = (value) => {
    onChanged(value);
  };

  const priceRangePresets = [
    { label: "All Prices", value: [0, 100000] },
    { label: "Under $200", value: [0, 200] },
    { label: "$200 – $500", value: [200, 500] },
    { label: "$500 – $1,000", value: [500, 1000] },
    { label: "$1,000 – $2,000", value: [1000, 2000] },
    { label: "$2,000 – $5,000", value: [2000, 5000] },
    { label: "$5,000 – $10,000", value: [5000, 10000] },
    { label: "Above $10,000", value: [10001, 100000] },
  ];
  return (
    <div className="flex flex-col gap-y-3">
      {priceRangePresets.map((items, index) => {
        const isChecked =
          items.value[0] === activePrice[0] &&
          items.value[1] === activePrice[1];
        return (
          <div key={index} className="flex gap-x-2 ">
            <input
              type="radio"
              id={items.label}
              name="rangerpresets"
              className="cursor-pointer"
              onChange={() => handleChange(items.value)}
              checked={isChecked}
            />
            <label
              htmlFor={items.label}
              className="cursor-pointer sm_400 text-gray_700"
            >
              {items.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default PriceRangePresets;
