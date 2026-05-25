import React from "react";

/**
 * Container — Responsive max-width wrapper
 *
 * FIXED: hardcoded w-[1320px] caused horizontal overflow on ANY screen < 1320px.
 * 
 * Now uses:
 *   - w-full: always fills parent
 *   - max-w-[1320px]: caps at design spec on large screens
 *   - mx-auto: centers it
 *   - px-4 sm:px-6 lg:px-8 xl:px-10: horizontal padding on smaller screens
 *     so content doesn't stick to the edge on mobile
 *   - box-border: ensures padding doesn't add to width
 */
const Container = ({ children }) => {
  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-0">
      {children}
    </div>
  );
};

export default Container;
