import Container from "@/components/commonComponent/containers/Container";
import { allIcons } from "@/helpers/IconProvider";
import React, { useState } from "react";

const FeatureNav = () => {
  const { featureIcon } = allIcons;

  const [featureData] = useState([
    { id: 1, icons: featureIcon[0].icon, title: "Fastest Delivery", description: "Delivery in 24/H" },
    { id: 2, icons: featureIcon[1].icon, title: "24 Hours Return", description: "Hassle-free returns" },
    { id: 3, icons: featureIcon[2].icon, title: "Secure Payment", description: "Your money is safe" },
    { id: 4, icons: featureIcon[3].icon, title: "Support 24/7", description: "Live contact/message" },
  ]);

  return (
    <div className="pt-4 sm:pt-6">
      <Container>
        {/*
          Mobile: 2-col grid (2×2 layout)
          sm: 4-col single row
          Removed hardcoded pr-[80px] which caused overflow on mobile
        */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border items-center  border-gray_100">
          {featureData.map((items) => (
            <div
              className="border-r border-gray_100 last:border-r-0 border-b sm:border-b-0 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r"
              key={items.id}
            >
              <div className="flex items-center justify-center lg:justify-start  gap-x-3 p-3 sm:p-4 lg:p-[18px]">
                <span className="text-2xl sm:text-3xl lg:text-[35px] shrink-0">{items.icons}</span>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray_900 truncate">{items.title}</p>
                  <p className="text-[10px] sm:text-xs text-gray_600 truncate">{items.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeatureNav;
