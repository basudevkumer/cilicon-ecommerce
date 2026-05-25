import Container from "@/components/commonComponent/containers/Container";
import { allImages } from "@/helpers/ImageProvider";
import React from "react";

const HomeProdctAd = () => {
  const { homeAds } = allImages;
  return (
    <div className="pt-4 sm:pt-5 pb-10 sm:pb-14 lg:pb-[72px]">
      <Container>
        {/* 
          Mobile: single column stacked
          sm+: 2-column side by side
          Fixed hardcoded h-[336px] — now uses aspect-ratio so images
          scale naturally at all viewport widths.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6">
          {homeAds.map((items) => (
            <picture key={items.id} className="cursor-pointer block overflow-hidden rounded-md">
              <img
                src={items.src}
                alt="Promotional advertisement banner"
                className="w-full aspect-[16/9] sm:aspect-auto sm:h-[200px] md:h-[250px] lg:h-[336px] object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </picture>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default HomeProdctAd;
