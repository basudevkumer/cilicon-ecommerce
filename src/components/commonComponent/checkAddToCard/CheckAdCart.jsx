import Button from "@/components/commonComponent/commonButton/Button";
import { allIcons } from "@/helpers/IconProvider";
import { removeCard } from "@/reduxFeature/slices/shopSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * CheckAdCart — cart summary used inside checkout page
 * FIXED: removed broken Virtualizer (hardcoded 300px), fixed class→className React warnings
 */
const CheckAdCart = () => {
  const addToCardData = useSelector((state) => state.addCard.value);
  const dispatch = useDispatch();
  const { plainClose } = allIcons;

  const handleRemove = (id) => dispatch(removeCard({ id }));

  return (
    <div className="w-full bg-gray_00 rounded-md py-4">
      {!addToCardData.length ? (
        <p className="text-sm text-gray_500 text-center py-4">Your cart is empty.</p>
      ) : (
        <div className="max-h-[300px] overflow-y-auto flex flex-col divide-y divide-gray_100">
          {addToCardData.map((items) => (
            <div key={items.id} className="flex items-center justify-between py-3 px-2 gap-x-3">
              <div className="flex items-center gap-x-3 min-w-0">
                <img
                  src={items?.thumbnail}
                  alt={items?.title}
                  className="w-14 h-14 object-cover rounded-md shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="text-sm text-gray_900 truncate">{items.title}</p>
                  <p className="text-xs text-gray_600 pt-1 flex gap-x-1 flex-wrap">
                    {items.quantity} ×
                    <span className="text-secondary_500 font-semibold">${items.price}</span>
                  </p>
                </div>
              </div>
              <button
                className="text-gray_400 text-lg hover:text-danger_500 cursor-pointer shrink-0 transition-colors duration-150"
                onClick={() => handleRemove(items.id)}
                aria-label="Remove item"
              >
                {plainClose}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckAdCart;
