import React from "react";
import Star from "@/components/commonComponent/commonStar/Star";
import { allIcons } from "@/helpers/IconProvider";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWishItems } from "@/reduxFeature/slices/wishList";
import { addTocard } from "@/reduxFeature/slices/shopSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { productInfoActivites } = allIcons;

  const handleClick = (item) => {
    dispatch(addWishItems(item));
    dispatch(addTocard(item));
  };

  return (
    <>
      {/* for desktop devices*/}

      <div className=" hidden  lg:block border  border-gray_100 relative p-3 sm:p-4 rounded w-full h-[280px] sm:h-[300px] lg:h-[320px] shadow-xl hover:-translate-y-2 transition duration-500 ease-in-out group overflow-hidden">
        {/* Badge */}
        <span className="absolute left-2 top-2 sm:left-3 sm:top-3 py-1 px-2 sm:py-[5px] sm:px-[10px] bg-danger_500 text-[10px] sm:text-xs font-semibold text-gray_00 rounded z-20">
          TAG
        </span>

        {/* Product Image */}
        <figure className="relative overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-[160px] sm:h-[180px] lg:h-[200px] bg-no-repeat bg-center object-cover"
            loading="lazy"
          />
          {/* Hover overlay with action icons */}
          <div className="bg-[#00000034] flex justify-center items-center gap-2 sm:gap-4 absolute w-full h-full left-0 top-[100%] group-hover:top-0 duration-700 ease-in-out">
            {productInfoActivites.map((items, index) => (
              <Link
                to={
                  typeof items.to === "function"
                    ? items.to(product.id)
                    : items.to
                }
                className="text-base sm:text-xl bg-gray_00 p-2 sm:p-3 h-fit rounded-full hover:bg-primary_500 cursor-pointer hover:text-gray_00 transition duration-300 ease-in-out"
                key={index}
                onClick={() => handleClick(product)}
              >
                {items.icon}
              </Link>
            ))}
          </div>
        </figure>

        <div className="pt-3 sm:pt-4 lg:pt-6">
          <div className="flex items-center gap-x-1">
            <div className="flex gap-x-1">
              <Star starsCard={product.rating} />
            </div>
            <p className="text-[10px] sm:text-xs text-gray_500">
              ({product.reviews.length})
            </p>
          </div>
          <p className="text-xs sm:text-sm font-normal text-gray_900 py-1 sm:py-2 truncate">
            {product.title}
          </p>
          <div className="flex gap-x-[5px] items-center">
            <del className="text-xs text-gray_400">
              $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2,
              )}
            </del>
            <p className="text-secondary_500 text-xs sm:text-sm font-semibold">
              ${product.price}
            </p>
          </div>
        </div>
      </div>
      {/* for mobile devices */}
      <div className=" block  lg:hidden border  border-gray_100 relative p-3 sm:p-4 rounded w-full h-[280px] sm:h-[300px] lg:h-[320px] shadow-xl hover:-translate-y-2 transition duration-500 ease-in-out group overflow-hidden">
        {/* Badge */}
        <span className="absolute left-2 top-2 sm:left-3 sm:top-3 py-1 px-2 sm:py-[5px] sm:px-[10px] bg-danger_500 text-[10px] sm:text-xs font-semibold text-gray_00 rounded z-20">
          TAG
        </span>

        {/* Product Image */}
        <figure className="relative overflow-hidden">
          <Link to={`/product-details/${product?.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-[160px] sm:h-[180px] lg:h-[200px] bg-no-repeat bg-center object-cover"
              loading="lazy"
            />
          </Link>
          {/* Hover overlay with action icons */}
          {/* <div className="bg-[#00000034] flex justify-center items-center gap-2 sm:gap-4 absolute w-full h-full left-0 top-[100%] group-hover:top-0 duration-700 ease-in-out">
            {productInfoActivites.map((items, index) => (
              <Link
                to={
                  typeof items.to === "function"
                    ? items.to(product.id)
                    : items.to
                }
                className="text-base sm:text-xl bg-gray_00 p-2 sm:p-3 h-fit rounded-full hover:bg-primary_500 cursor-pointer hover:text-gray_00 transition duration-300 ease-in-out"
                key={index}
                onClick={() => handleClick(product)}
              >
                {items.icon}
              </Link>
            ))}
          </div> */}
        </figure>

        <div className="pt-3 sm:pt-4 lg:pt-6">
          <div className="flex items-center gap-x-1">
            <div className="flex gap-x-1">
              <Star starsCard={product.rating} />
            </div>
            <p className="text-[10px] sm:text-xs text-gray_500">
              ({product.reviews.length})
            </p>
          </div>
          <Link to={`/product-details/${product?.id}`}>
            <p className="text-xs sm:text-sm font-normal text-gray_900 py-1 sm:py-2 truncate">
              {product.title}
            </p>
          </Link>
          <div className="flex gap-x-[5px] items-center">
            <del className="text-xs text-gray_400">
              $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2,
              )}
            </del>
            <p className="text-secondary_500 text-xs sm:text-sm font-semibold">
              ${product.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
