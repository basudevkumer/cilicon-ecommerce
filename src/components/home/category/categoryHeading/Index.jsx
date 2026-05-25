import Container from "@/components/commonComponent/containers/Container";
import React from "react";

const CategoryHeading = () => {
  return (
    <div>
      <Container>
        <div className="flex justify-center pt-4 sm:pt-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray_900 text-center">
            Shop with Categories
          </h2>
        </div>
      </Container>
    </div>
  );
};

export default CategoryHeading;
