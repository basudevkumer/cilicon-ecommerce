import React, { useEffect, useState } from "react";

const Ceracell = ({ img = [] }) => {
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (img?.length) setActiveImage(img[0]);
  }, [img]);

  if (!img?.length) return <p className="text-center text-sm text-gray_500">No Image Found</p>;

  return (
    <div className="w-full">
      {/* Main Image - responsive height */}
      <div className="border border-gray_200 rounded p-3 sm:p-4 mb-3 sm:mb-4">
        <img
          src={activeImage}
          alt="main-product"
          className="w-full h-[220px] sm:h-[300px] lg:h-[400px] object-contain"
          loading="lazy"
        />
      </div>

      {/* Thumbnails - responsive size */}
      <div className="flex gap-x-2 sm:gap-x-3 justify-center flex-wrap gap-y-2">
        {img.map((item, index) => (
          <figure
            key={index}
            onClick={() => setActiveImage(item)}
            className={`w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[90px] lg:h-[90px] border-2 rounded cursor-pointer p-1 transition-colors duration-150
              ${activeImage === item ? "border-primary_500" : "border-gray_200 hover:border-gray_400"}`}
          >
            <img src={item} alt={`Product thumbnail ${index + 1}`} className="w-full h-full object-cover rounded" loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Ceracell;
