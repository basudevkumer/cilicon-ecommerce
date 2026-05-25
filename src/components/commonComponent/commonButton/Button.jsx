import { allIcons } from "@/helpers/IconProvider";
import React from "react";

/**
 * Button — responsive common button
 * FIXED: added py-2 sm:py-3 so buttons have proper height on mobile
 */
const Button = ({ children, className, onClick }) => {
  const { rightArrow } = allIcons;

  return (
    <button
      onClick={onClick}
      className={`
        px-4 sm:px-6 py-2 sm:py-3 bg-warning_500 rounded-md cursor-pointer text-sm sm:text-base font-semibold
        text-gray_900 flex items-center gap-x-2 w-full
        hover:bg-warning_400 transition-colors duration-200
        ${className}
      `}
    >
      <span>{children}</span>
      <span>{rightArrow}</span>
    </button>
  );
};

export default Button;
