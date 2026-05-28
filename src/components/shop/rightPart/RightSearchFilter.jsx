import { allIcons } from "@/helpers/IconProvider";
import { globalSearch } from "@/reduxFeature/slices/globalSearchSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const RightSideFilter = ({ onSort, sortValue }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const { searchIcon } = allIcons;

  const sortOptions = [
    { label: "Sort by", value: "" },
    { label: "Most Popular", value: "popular" },
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
  ];

  const handleChange = (e) => setValue(e.target.value);

  const handleClicked = () => {
    if (!value.trim()) return;
    dispatch(globalSearch(value.trim()));
    setValue("");
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") handleClicked();
  };

  const handleSort = (e) => onSort(e.target.value);

  return (
    /*
      Mobile: stack search + sort vertically
      sm+: side by side in a row
      Key fix: removed hardcoded w-[380px] on input — now uses flex-1
    */
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Search */}
      <label
        className="flex items-center gap-x-2 px-3 py-2 border border-gray_100 rounded w-full sm:w-auto sm:flex-1 sm:max-w-[420px]"
        htmlFor="shop-search"
      >
        <input
          type="text"
          className="w-full text-gray_900 text-sm border-0 outline-none placeholder:text-gray_500 bg-transparent"
          id="shop-search"
          placeholder="Search for anything..."
          name="search"
          onChange={handleChange}
          value={value}
          onKeyDown={handleKeyPress}
        />
        <button
          type="button"
          onClick={handleClicked}
          className="text-2xl cursor-pointer text-gray_500 hover:text-primary_500 transition-colors duration-150 shrink-0"
          aria-label="Search"
        >
          {searchIcon}
        </button>
      </label>

      {/* Sort */}
      <div className="flex items-center gap-x-2 shrink-0">
        <p className="text-sm font-normal text-gray_900 whitespace-nowrap">Sort by:</p>
        <select
          className="border border-gray_100 rounded px-2 py-2 text-sm text-gray_700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary_500  w-[160px]"
          onChange={handleSort}
          value={sortValue}
        >
          {sortOptions.map((item, index) => (
            <option value={item.value} className="text-sm text-gray_700 " key={index}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RightSideFilter;
