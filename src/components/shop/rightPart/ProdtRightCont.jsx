import React, { useRef, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import ProductCard from "@/components/commonComponent/commonProductCard/ProductCard";

function getColumnCount(width) {
  if (width >= 900) return 4;
  if (width >= 640) return 3;
  if (width >= 400) return 2;
  return 1;
}

const ProdtRightCont = ({ allFilteredItems = [] }) => {
  const parentRef = useRef(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const measuredRef = useCallback((node) => {
    if (!node) return;
    parentRef.current = node;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(node);
  }, []);

  const colCount = getColumnCount(containerWidth);
  const rowCount = Math.ceil(allFilteredItems.length / colCount);
  const scrollHeight = containerWidth >= 640 ? 1900 : 1000;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 360,
    overscan: 3,
  });

  if (!allFilteredItems.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-2xl mb-2">🔍</p>
        <p className="text-base font-semibold text-gray_700">No products found</p>
        <p className="text-sm text-gray_500 mt-1">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={measuredRef}
      style={{ height: `${scrollHeight}px`, overflowY: "auto" }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIdx = virtualRow.index * colCount;
          const rowProducts = allFilteredItems.slice(
            startIdx,
            startIdx + colCount
          );

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
                padding: "8px 0",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${colCount}, 1fr)`,
                  gap: "12px",
                }}
              >
                {rowProducts.map((p, i) => (
                  <ProductCard product={p} key={startIdx + i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProdtRightCont;