import BestDeal from "@/components/commonComponent/bestDeals/BestDeal";
import Container from "@/components/commonComponent/containers/Container";
import { useBestDealProducts } from "@/hooks/useCategory";
import React from "react";

const BestDealContainter = () => {
  let { data: product = [], isPending, isError } = useBestDealProducts(0);

  if (isError) {
    return <div>Error........</div>;
  }

  let sections = [
    { id: 1, title: "FLASH SALE TODAY", products: product.slice(0, 3) },
    { id: 2, title: "BEST SELLERS", products: product.slice(3, 6) },
    { id: 3, title: "TOP RATED", products: product.slice(6, 9) },
    { id: 4, title: "NEW ARRIVAL", products: product.slice(9, 12) },
  ];

  return (
    <div className="pb-10 sm:pb-14 lg:pb-[70px]">
      <Container>
        {/*
          Mobile: 1 column (all 4 sections stacked)
          sm: 2 columns
          lg+: 4 columns (original design)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-x-6">
          {sections.map((items) => (
            <BestDeal
              productList={items.products}
              title={items.title}
              key={items.id}
              isPending={isPending}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BestDealContainter;
