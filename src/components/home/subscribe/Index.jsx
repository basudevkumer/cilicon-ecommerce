import Button from "@/components/commonComponent/commonButton/Button";
import Container from "@/components/commonComponent/containers/Container";
import { allImages } from "@/helpers/ImageProvider";
import React from "react";

const Subscribe = () => {
  const { subscribe } = allImages;

  return (
    <div className="py-10 sm:py-14 lg:py-[72px] bg-secondary_700">
      <Container>
        <div className="flex flex-col items-center px-4 sm:px-0">
          {/* Heading — responsive font */}
          <h2 className="text-gray_00 text-xl sm:text-2xl lg:text-4xl font-bold text-center">
            Subscribe to our newsletter
          </h2>

          {/* Subtext — removed hardcoded w-[536px] */}
          <p className="text-sm sm:text-base text-gray_00 text-center pt-3 pb-6 sm:pb-8 max-w-[90%] sm:max-w-[480px] lg:max-w-[536px]">
            Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
            libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.
          </p>

          {/* Email input + button — removed hardcoded w-[625px] */}
          <div className="w-full max-w-[90%] sm:max-w-[500px] lg:max-w-[625px] bg-gray_00 rounded flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-x-4 p-3 sm:p-4">
            <input
              type="email"
              className="w-full border border-gray_100 sm:border-none rounded p-2 sm:p-3 text-sm outline-none focus:ring-2 focus:ring-primary_500"
              placeholder="Email address"
            />
            <Button
              children={"Subscribe"}
              className={"!bg-primary_500 !text-gray_00 shrink-0"}
            />
          </div>

          {/* Divider */}
          <div className="w-[80%] sm:w-[400px] lg:w-[500px] h-[1px] bg-gray_400 mt-6 sm:mt-8 mb-4 sm:mb-6" />

          {/* Partner logos — removed hardcoded gap-x-12, now uses flex-wrap */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-x-12">
            {subscribe.map((items) => (
              <div key={items.id}>
                <img
                  src={items.src}
                  alt={"subscribe partner logo " + items.id}
                  className="h-[18px] sm:h-[23px] w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Subscribe;
