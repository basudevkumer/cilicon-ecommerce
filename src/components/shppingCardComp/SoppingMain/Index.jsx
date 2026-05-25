import Container from "@/components/commonComponent/containers/Container";
import React from "react";
import ShoppingLeft from "../shoppingCardLeft/ShoppingLeft";
import ShoppingRight from "../shppingCardRight/ShoppingRight";

const SoppingMainComponent = () => {
  return (
    <div>
      <Container>
        {/*
          Mobile: stacked (products first, then totals)
          lg+: 3-col grid — cart left (2 cols) | totals right (1 col)
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 pt-8 sm:pt-12 lg:pt-[72px] pb-10 sm:pb-14 lg:pb-[80px] gap-y-6 lg:gap-x-6">
          <div className="lg:col-span-2">
            <ShoppingLeft />
          </div>
          <div>
            <ShoppingRight />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SoppingMainComponent;
