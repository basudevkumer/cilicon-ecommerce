import React from "react";
import ProductCard from "@/components/commonComponent/commonProductCard/ProductCard";

/**
 * ProdtRightCont — Responsive Product Grid
 *
 * Replaced the brittle virtualizer-with-hardcoded-height-2400px approach
 * with a simple CSS grid that is:
 *   - 2 columns on mobile (320px+)
 *   - 3 columns on sm (640px+)
 *   - 3 columns on md (768px+)
 *   - 3 columns on lg (sidebar takes 1 col, products take 4)
 *   - 4 columns on xl within the col-span-4 product area
 *
 * Virtualizer was causing a fixed 2400px height scroll box that
 * completely broke on mobile — replaced with natural document flow.
 */
const ProdtRightCont = ({ allFilteredItems = [] }) => {
  if (!allFilteredItems.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-2xl mb-2">🔍</p>
        <p className="text-base font-semibold text-gray_700">No products found</p>
        <p className="text-sm text-gray_500 mt-1">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {allFilteredItems.map((p, id) => (
        <ProductCard product={p} key={id} />
      ))}
    </div>
  );
};

export default ProdtRightCont;
