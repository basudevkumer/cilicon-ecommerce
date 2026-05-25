import React from "react";
import BreadCrumb from "../commonComponent/breadcrumb/BreadCrumb";
import Container from "../commonComponent/containers/Container";
import { allIcons } from "@/helpers/IconProvider";
import { allImages } from "@/helpers/ImageProvider";

const OrderSuccessMain = () => {
  // icon & image provider
  const { checkMarkImage } = allImages;
  const { layer ,rightArrow } = allIcons;

  return (
    <section>
      <BreadCrumb />

      <div>
        <Container>
          <div className="flex flex-col items-center py-12 sm:py-16 lg:py-[124px]">
            <figure>
              <img src={checkMarkImage} alt="img" />
            </figure>
            <h3 className="heading3 text-gray_900 pt-6 pb-3">
              Your order is successfully place
            </h3>
            <p className="w-full max-w-[90%] sm:max-w-[424px] sm_400 text-center text-gray_600 pb-9">
              Pellentesque sed lectus nec tortor tristique accumsan quis dictum
              risus. Donec volutpat mollis nulla non facilisis.
            </p> 
            <div  className="flex flex-col sm:flex-row gap-3 sm:gap-x-3 items-center" >
              <button className="flex gap-x-3 items-center cursor-pointer heading7 text-primary_500 px-6 border-3 border-primary_100 whitespace-nowrap">
                <span className="text-xl ">{layer}</span>
                Go to Dashboard
              </button>
              <button
                className="bg-primary_500 text-white px-6 heading7 flex justify-center items-center gap-x-3 rounded cursor-pointer"
               
              >
               View Order <span className="text-xl">{rightArrow}</span>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default OrderSuccessMain;
