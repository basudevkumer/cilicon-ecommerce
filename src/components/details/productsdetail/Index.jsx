import Star from "@/components/commonComponent/commonStar/Star";
import Container from "@/components/commonComponent/containers/Container";
import { allIcons } from "@/helpers/IconProvider";
import { allImages } from "@/helpers/ImageProvider";
import { useGetSingleProduct } from "@/hooks/useCategory";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Ceracell from "../detailCeracell/Ceracell";
import MoreDetails from "../moreDetailProduct/MoreDetails";
import BreadCrumb from "@/components/commonComponent/breadcrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { addTocard, updateQuanty } from "@/reduxFeature/slices/shopSlice";
import { current } from "@reduxjs/toolkit";
import {
  compareSlice,
  storeCompareValue,
} from "@/reduxFeature/slices/compareSlice";
import { addWishItems } from "@/reduxFeature/slices/wishList";
import PageSkeleton from "@/components/Skeleton/skeletonBestDealCard/PageSkeleton";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const cardItems = useSelector((state) => state.addCard.value);

  //  here catch id
  const { id } = useParams();
  // here catch api data
  const { data, isPending, isError } = useGetSingleProduct(id);

  const haveCardItems = cardItems.find((items) => items.id === data?.id);

  const currentItems = haveCardItems ? haveCardItems.quantity : 0;

  //ispending
  if (isPending) {
    return <PageSkeleton />;
  }

  // get icon
  const { productInfoActivites, compareIcon, detailPageIcon } = allIcons;
  // get images
  const { pymentCardImage } = allImages;

  const handleClicked = () => {
    dispatch(
      addTocard({
        ...data,
        quantity: 1,
      }),
    );
  };

  const handleIncrement = (id) => {
    if (!haveCardItems) {
      dispatch(
        addTocard({
          ...data,
          quantity: 1,
        }),
      );
    } else {
      dispatch(updateQuanty({ id, type: "increment" }));
    }
  };
  const handleDecrement = (id) => {
    dispatch(updateQuanty({ id, type: "decrement" }));
  };

  const handleCompare = (items) => {
    dispatch(storeCompareValue(items));
  };
  const handleWishItems = (items) => {
    dispatch(addWishItems(items));
  };
  return (
    <div>
      <BreadCrumb />
      <Container>
        <div>
          <div className="mt-6 sm:mt-8 flex flex-col md:grid md:grid-cols-2 gap-y-6 md:gap-x-10 lg:gap-x-14">
            <div className="">
              <Ceracell img={data?.images || []} />
            </div>
            <div className="">
              <div className="flex  items-center gap-x-2">
                <Star starsCard={data?.rating} />
                <p className="sm_600 text-gray_900">
                  {" "}
                  {data?.rating} Star Rating
                </p>
                <p className="sm_400 text-gray_600">
                  ({data?.reviews.length} User feedback)
                </p>
              </div>
              <h1 className="xl_400 text-gray_900 mt-2 mb-4">{data?.title}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 ">
                <p className="sm_400 text-gray_600">
                  {" "}
                  Sku :
                  <span className="sm_600 text-gray_900 ml-1">{data?.sku}</span>
                </p>
                <p className="sm_400 text-gray_600">
                  Availability :{" "}
                  <span className="sm_600 text-success_500 ml-1">
                    {" "}
                    {data?.availabilityStatus}
                  </span>
                </p>
                <p className="sm_400 text-gray_600">
                  Brand :{" "}
                  <span className="sm_600 text-gray_900 ml-1">
                    {data?.brand}
                  </span>
                </p>
                <p className="sm_400 text-gray_600">
                  {" "}
                  Category :
                  <span className="sm_600 text-gray_900 ml-1">
                    {data?.category}
                  </span>
                </p>
              </div>
              <div className="py-4 sm:py-6 flex flex-wrap items-center gap-x-3 gap-y-3 border-b border-gray_100">
                <h3 className="heading3 text-secondary_500">${data?.price}</h3>
                <h5 className="lg_400 text-gray_500">
                  <del>
                    $
                    {(
                      data?.price /
                      (1 - data?.discountPercentage / 100)
                    ).toFixed(2)}
                  </del>
                </h5>
                <p className="py-[5px] px-[10px]  bg-warning_400 text-gray_900 w-fit rounded">
                  {Math.round(data?.discountPercentage)}% OFF
                </p>
              </div>
              <div className="py-4 sm:py-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4 ">
                <div>
                  <p className="sm_400 text-gray_900">Width</p>
                  <span className="sm_400 text-gray_700">
                    {data?.dimensions?.width} cm/inch/m
                  </span>
                </div>
                <div>
                  <p className="sm_400 text-gray_900">Height</p>
                  <span className="sm_400 text-gray_700">
                    {data?.dimensions?.height} cm/inch/m
                  </span>
                </div>
                <div>
                  <p className="sm_400 text-gray_900">Depth</p>
                  <span className="sm_400 text-gray_700">
                    {data?.dimensions?.depth} cm/inch/m
                  </span>
                </div>
                <div>
                  <p className="sm_400 text-gray_900">Product QR </p>
                  <figure>
                    <img
                      src={data?.meta?.qrCode}
                      alt="productQR"
                      className="w-[50px]"
                    />
                  </figure>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap  gap-x-3 gap-y-2 py-4 sm:py-6">
                  <div className="flex gap-x-4 sm:gap-x-6 md:gap-x-4 lg:gap-x-[25px] xl:gap-x-[37px] border-[2px] border-gray_100 px-4 sm:px-5 md:px-2 lg:px-5 items-center ">
                    <button
                      className="text-[30px]  text-gray_900 cursor-pointer"
                      onClick={() => handleDecrement(data.id)}
                    >
                      -
                    </button>
                    <p className="text-sm font-medium text-gray_700">
                      {currentItems > 0 ? currentItems : 1}
                    </p>
                    <button
                      className="text-[25px]  text-gray_900 cursor-pointer"
                      onClick={() => handleIncrement(data.id)}
                    >
                      +
                    </button>
                  </div>
                  <Link to={"/shopping-card"}>
                    <button
                      className="flex-1 sm:flex-none px-6 sm:px-[81px] md:px-[16px]  lg:px-[50px] xl:px-[81px] bg-primary_500 whitespace-nowrap heading6 text-gray_00 flex items-center gap-x-3 cursor-pointer"
                      onClick={handleClicked}
                    >
                      Add to card
                      <span className="text-lg">
                        {productInfoActivites[0].icon}
                      </span>
                    </button>
                  </Link>
                  <button className="uppercase whitespace-nowrap text-xs sm:text-sm font-bold border-[2px] border-primary_500 text-primary_500 rounded px-4 sm:px-8 md:px-3 lg:px-4  xl:px-8 py-2 sm:py-3 cursor-pointer hover:bg-primary_50 transition-colors  ">
                    Buy now
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
                <div className="flex items-center gap-x-6">
                  <div className="flex gap-x-[6px] items-center">
                    <span className="text-gray_700 ">
                      {productInfoActivites[1].icon}
                    </span>
                    <Link to={"/wishlist"}>
                      <p
                        className="sm_400 text-gray_700 "
                        onClick={() => handleWishItems(data)}
                      >
                        Add to Wishlist
                      </p>
                    </Link>
                  </div>
                  <div className="flex gap-x-[6px] items-center">
                    <span className="text-gray_700 ">{compareIcon}</span>
                    <p
                      className="sm_400 text-gray_700 cursor-pointer "
                      onClick={() => handleCompare(data)}
                    >
                      <Link to={"/compare"}>Add to Compare</Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <p className="sm_400 text-gray_700">Share product:</p>
                  <div className="flex gap-x-3">
                    {detailPageIcon.map((items, index) => {
                      return (
                        <span
                          key={index}
                          className="text-base hover:text-primary_500 cursor-pointer text-gray_600 duration-300 ease-in-out"
                        >
                          {items.icon}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="p-4 border  border-gray_100 mt-6 rounded">
                <p className="pb-3 sm-400 text-gray_900">
                  100% Guarantee Safe Checkout
                </p>
                <figure>
                  <img src={pymentCardImage} alt="productDetails-images" />
                </figure>
              </div>
            </div>
          </div>
          <div className="py-8 sm:py-12 lg:py-[72px]">
            <MoreDetails productInfo={data || []} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
