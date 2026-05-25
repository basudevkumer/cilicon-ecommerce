import DiscountCard from "@components/commonComponent/commonDiscountCard/DiscountCard";
import ProductCard from "@/components/commonComponent/commonProductCard/ProductCard";
import Container from "@/components/commonComponent/containers/Container";
import { allIcons } from "@/helpers/IconProvider";
import { useCategory, useSingleCategoryProduct } from "@/hooks/useCategory";
import React, { useState } from "react";
import Loading from "../loading/Index";
import Error from "../error/Index";
import { Link } from "react-router-dom";

const FeatureProduct = () => {
  const [featureNavText] = useState([
    { id: 1, text: "All Product", value: "" },
    { id: 2, text: "Smart Phone", value: "smartphones" },
    { id: 3, text: "Laptop", value: "laptops" },
    { id: 4, text: "Mobile Acc", value: "mobile-accessories" },
    { id: 5, text: "Jewellery", value: "womens-jewellery" },
    { id: 6, text: "Browse All", value: "" },
  ]);

  const { rightArrow } = allIcons;

  let {
    data: allProductElement,
    isPending: allProductElementIsLoading,
    error: allProductElementIsError,
  } = useCategory();

  let [categoryValue, setCategoryValue] = useState("");

  let {
    data: singleCategoryData,
    isPending: singleCategoryLoading,
    isError: singleCategoryError,
  } = useSingleCategoryProduct(categoryValue);

  const handleClick = (value) => {
    setCategoryValue(value);
  };

  // Loading skeleton — responsive
  const SkeletonGrid = () => (
    <div className="py-10 sm:py-14 lg:py-[72px]">
      <Container>
        {/* Mobile: stacked, Desktop: grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          <div className="hidden lg:block">
            <div className="bg-gray-100 w-full h-full min-h-[300px] animate-pulse rounded-lg" />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-y-4 sm:gap-y-6">
            <div className="bg-yellow-300 opacity-75 w-full h-5 rounded-full" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[...Array(8)].map((_, i) => <Loading key={i} />)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );

  if (allProductElementIsLoading && !categoryValue) return <SkeletonGrid />;
  if (singleCategoryLoading && categoryValue) return <SkeletonGrid />;
  if (allProductElementIsError) return <Error />;
  if (singleCategoryError) return <Error />;

  let productData = categoryValue
    ? singleCategoryData || []
    : allProductElement || [];

  return (
    <div className="py-10 sm:py-14 lg:py-[72px]">
      <Container>
        {/* 
          Mobile: single column — DiscountCard hidden, full-width product grid
          lg+: 4-col grid — DiscountCard | 3-col product grid
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-x-6 gap-y-6">
          {/* Discount Card — hidden on mobile, shown lg+ */}
          <div className="hidden lg:block">
            <DiscountCard />
          </div>

          {/* Product Section */}
          <div className="lg:col-span-3 flex flex-col gap-y-4 sm:gap-y-6">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3 gap-x-4">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray_900">Featured Products</h3>

              {/* Filter nav — scrollable on mobile */}
              <div className="flex items-center gap-x-2 sm:gap-x-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                {featureNavText.map((items) => {
                  const isBrowse = items.text === "Browse All";
                  return (
                    <button
                      className={`text-xs sm:text-sm whitespace-nowrap cursor-pointer duration-300 relative shrink-0
                        ${isBrowse
                          ? "text-primary_500 flex items-center gap-x-1 after:absolute after:content-[''] after:w-0 hover:after:w-full after:h-[2px] after:bg-gray_900 after:bottom-[-6px] after:left-0 after:duration-300"
                          : "text-gray_600 hover:text-gray_900 after:absolute after:content-[''] after:w-0 hover:after:w-full after:h-[2px] after:bg-primary_500 after:bottom-[-6px] after:left-0 after:duration-300"
                        }`}
                      key={items.id}
                      onClick={() => handleClick(items.value)}
                    >
                      {isBrowse ? (
                        <Link to="/shop" className="flex items-center gap-x-1">
                          Browse All <span className="text-xs">{rightArrow}</span>
                        </Link>
                      ) : (
                        items?.text
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product grid — 2 cols mobile, 3 cols sm, 4 cols lg */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {productData?.slice(0, 8).map((items, index) => (
                <ProductCard product={items} key={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FeatureProduct;
