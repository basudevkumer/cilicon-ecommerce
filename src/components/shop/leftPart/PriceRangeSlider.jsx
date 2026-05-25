import React, { useRef } from "react";

/**
 * DualRangeSlider — Fully Responsive Price Range Slider
 *
 * FIXES for mobile:
 * - Removed max-w-xl / max-w-md hardcoded constraints — now uses w-full
 * - Touch events properly handled on all screen sizes
 * - Input boxes use compact layout on small screens
 * - Thumb size slightly reduced on mobile for better UX
 */
const DualRangeSlider = ({
  min = 0,
  max = 100000,
  step = 100,
  value = [0, 100000],
  onChange,
}) => {
  const [minValue, maxValue] = value;
  const trackRef = useRef(null);

  const getPercent = (val) => Math.round(((val - min) / (max - min)) * 100);

  const updateValues = (newMin, newMax) => {
    onChange([
      Math.max(min, Math.min(newMin, maxValue - step)),
      Math.min(max, Math.max(newMax, minValue + step)),
    ]);
  };

  const handleMinInput = (e) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) updateValues(val, maxValue);
  };

  const handleMaxInput = (e) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) updateValues(minValue, val);
  };

  const startDrag = (type, e) => {
    e.preventDefault();
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const trackWidth = rect.width;

    const moveHandler = (moveEvent) => {
      const clientX =
        moveEvent.clientX ?? moveEvent.touches?.[0]?.clientX;
      if (clientX == null) return;
      let percent = ((clientX - rect.left) / trackWidth) * 100;
      percent = Math.max(0, Math.min(100, percent));
      let newValue = min + (percent / 100) * (max - min);
      newValue = Math.round(newValue / step) * step;
      if (type === "min") updateValues(newValue, maxValue);
      else updateValues(minValue, newValue);
    };

    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchend", upHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
    document.addEventListener("touchmove", moveHandler, { passive: false });
    document.addEventListener("touchend", upHandler);
  };

  return (
    <div className="w-full pt-6 sm:pt-10">
      <h2 className="text-sm font-bold text-gray-900 pb-4">Price Range</h2>

      {/* Slider track — full width, no max-w constraint */}
      <div className="relative w-full px-2">
        <div className="relative w-full h-8" ref={trackRef}>
          {/* Background Track */}
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 w-full h-2 bg-gray-200 rounded-full" />

          {/* Filled Range */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-2 bg-primary_500 rounded-full"
            style={{
              left: `${getPercent(minValue)}%`,
              right: `${100 - getPercent(maxValue)}%`,
            }}
          />

          {/* Min Thumb */}
          <div
            className="absolute w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg border-4 border-primary_500 cursor-grab active:cursor-grabbing z-20 hover:scale-110 transition-transform"
            style={{
              left: `${getPercent(minValue)}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onMouseDown={(e) => startDrag("min", e)}
            onTouchStart={(e) => startDrag("min", e)}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={maxValue}
            aria-valuenow={minValue}
            aria-label="Minimum price"
            tabIndex={0}
          />

          {/* Max Thumb */}
          <div
            className="absolute w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg border-4 border-primary_500 cursor-grab active:cursor-grabbing z-20 hover:scale-110 transition-transform"
            style={{
              left: `${getPercent(maxValue)}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onMouseDown={(e) => startDrag("max", e)}
            onTouchStart={(e) => startDrag("max", e)}
            role="slider"
            aria-valuemin={minValue}
            aria-valuemax={max}
            aria-valuenow={maxValue}
            aria-label="Maximum price"
            tabIndex={0}
          />
        </div>
      </div>

      {/* Price inputs — compact on mobile */}
      <div className="flex justify-between gap-3 sm:gap-6 mt-6 sm:mt-8">
        <div className="flex-1">
          <p className="text-xs text-gray_500 text-center mb-1 sm:mb-2">Min</p>
          <input
            type="number"
            value={minValue}
            onChange={handleMinInput}
            className="w-full px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm border-2 border-gray-300 rounded-lg sm:rounded-xl font-semibold focus:border-primary_500 focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray_500 text-center mb-1 sm:mb-2">Max</p>
          <input
            type="number"
            value={maxValue}
            onChange={handleMaxInput}
            className="w-full px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm border-2 border-gray-300 rounded-lg sm:rounded-xl font-semibold focus:border-primary_500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;
