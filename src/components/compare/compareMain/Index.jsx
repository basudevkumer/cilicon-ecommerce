import BreadCrumb from "@/components/commonComponent/breadcrumb/BreadCrumb";
import Container from "@/components/commonComponent/containers/Container";
import React from "react";
import CompareColumn from "../compareColumn/CompareColumn";
import { useSelector } from "react-redux";

const CompareMain = () => {
  const compareValue = useSelector((state) => state.compareItems.value);

  const labelRows = [
    "Customer feedback",
    "Price",
    "Sold by",
    "Brand",
    "Model",
    "Stock status",
    "Size",
    "Weight",
  ];

  return (
    <div>
      <BreadCrumb />
      <Container>
        <div className="my-8 sm:my-12 lg:my-[72px]">
          {!compareValue?.length ? (
            <div className="text-center py-16">
              <p className="text-3xl mb-3">⚖️</p>
              <p className="text-base font-medium text-gray_700">
                No products to compare
              </p>
              <p className="text-sm text-gray_500 mt-1">
                Add products from the shop to compare them.
              </p>
            </div>
          ) : (
            /* 
              Mobile: 2 cols (label + 1 product) — overflow-x-auto lets user scroll horizontally
              sm: 3 cols; lg: auto based on count
              Using overflow-x-auto as a safety net for compare tables
            */
            <div className="overflow-x-auto">
              <div
                className={`grid gap-0 min-w-[320px]`}
                style={{
                  gridTemplateColumns: `140px repeat(${compareValue.length}, 1fr)`,
                }}
              >
                {/* Label column */}

                <div className="border border-gray_100 flex items-stretch ">
                  <div className="w-full self-end ">
                    {labelRows.map((label, i) => (
                      <div
                        key={i}
                        className={`px-2 w-full sm:px-4 py-2 sm:py-3 ${i % 2 === 0 ? "bg-gray_50" : "bg-gray_00"}`}
                      >
                        <p className="text-gray_700 text-xs sm:text-sm font-medium whitespace-nowrap  ">
                          {label}:
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product columns */}
                {compareValue.map((items, index) => (
                  <CompareColumn passCompareVlue={items} key={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CompareMain;
