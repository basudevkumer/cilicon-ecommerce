import React from "react";
import { allIcons } from "@/helpers/IconProvider";

const Star = ({ starsCard }) => {
  // destructure here
  let { starIcon } = allIcons;
  // get rating value
  let rating = starsCard;
  return (
    <div className="flex ">
      {[...Array(5)].map((_, index) => {
        let startValue = index + 1;
        if (rating >= startValue) {
          return <span className="text-xl  text-primary_500" key={index}>{starIcon[0].icon}</span>;
        } else if (rating >= startValue - 0.5) {
          return <span className="text-xl  text-primary_500" key={index}>{starIcon[1].icon}</span>;
        } else {
          return <span className="text-xl  text-primary_500" key={index}>{starIcon[2].icon}</span>;
        }
      })}
    </div>
  );
};

export default Star;
