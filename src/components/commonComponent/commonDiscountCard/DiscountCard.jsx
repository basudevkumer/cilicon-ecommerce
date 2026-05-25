import React from "react";
// import form  discount object
import { discountObject } from "@/helpers/DiscountDetails";
import { allImages } from "@/helpers/ImageProvider";
import Button from "@components/commonComponent/commonButton/Button"
import { Link } from "react-router-dom";

const DiscountCard = ({ className }) => {
  // discountobject destructure here
  const { homePageDiscountBannar } = discountObject;
  // discountImage destructure here
  const { discountImages } = allImages;

  return (
    <div className={`grid grid-row-2 gap-y-4  bg-warning_300 w-full  h-full  ${className} `}>
      {/* for discount text top part */}
      <div className="pt-[30px] flex flex-col items-center">
        <p className="sm_600 text-danger_600">
          {homePageDiscountBannar[0].discountTitle}
        </p>
        <h1 className="heading1 text-gray_900 pt-2 pb-3">
          {homePageDiscountBannar[1].setDiscount}
        </h1>
        <p className="md_400 text-gray_700">
          {homePageDiscountBannar[2].discountItemsName}
        </p>
        <p className="sm_500 text-gray_900 mt-4 mb-8 ">
          Offers ends in:
          <span className="py-[6px] px-3  ml-2 bg-gray_00 rounded">
            {homePageDiscountBannar[3].discountEndDate}
          </span>
        </p> 
        <Link to={"/shop"}>
        <Button children={"Shop now"} className={" !bg-primary_500 !text-gray_00"}/></Link>
      </div>
      {/* for discount text top part */}
      <div className="">
        <picture>
          <img
            src={discountImages[0].src}
            alt="discountImagesPicture"
            className="h-full w-full object-cover bg-center bg-no-repeat"
          />
        </picture>
      </div>
    </div>
  );
};

export default DiscountCard;
