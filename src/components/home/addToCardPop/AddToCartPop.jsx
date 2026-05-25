import Button from "@/components/commonComponent/commonButton/Button";
import { allIcons } from "@/helpers/IconProvider";
import { removeCard } from "@/reduxFeature/slices/shopSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * AddToCartPop — Cart dropdown popup
 * 
 * FIXED:
 * - Removed broken Virtualizer (hardcoded 300px height, absolute positioned rows)
 * - Replaced with simple scrollable div — works in both desktop dropdown and mobile drawer
 * - Uses className throughout (was mixing class and className — React warning)
 * - max-w-md removed — popup width is controlled by parent dropdown positioning
 */
const AddToCartPop = ({ setIsAccountOpen }) => {
  const handleClicked = () => setIsAccountOpen(null);

  const subTotalCost = useSelector((state) => state.subTotal.value);
  const addToCardData = useSelector((state) => state.addCard.value);

  const dispatch = useDispatch();
  const handleRemove = (id) => dispatch(removeCard({ id }));

  const { plainClose } = allIcons;

  return (
    <div className="w-full bg-gray_00 shadow-md rounded-md px-4 sm:px-6 py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray_900 border-b pb-3 border-gray_200">
          Shopping Cart{" "}
          <span className="text-gray_600">({addToCardData.length})</span>
        </h2>
      </div>

      {/* Cart Items — simple scrollable list, no virtualizer */}
      {addToCardData.length === 0 ? (
        <p className="text-sm text-gray_500 py-6 text-center">Your cart is empty.</p>
      ) : (
        <div className="max-h-[280px] overflow-y-auto flex flex-col divide-y divide-gray_100">
          {addToCardData.map((items) => (
            <div key={items.id} className="flex items-center justify-between py-3 gap-x-3">
              <div className="flex items-center gap-x-3 min-w-0">
                <img
                  src={items?.thumbnail}
                  alt={items?.title}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-md shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray_900 truncate">{items.title}</p>
                  <p className="text-xs text-gray_600 pt-1">
                    {items.quantity} ×{" "}
                    <span className="text-secondary_500 font-semibold">${items.price}</span>
                  </p>
                </div>
              </div>
              <button
                className="text-gray_400 text-xl hover:text-danger_500 cursor-pointer shrink-0 transition-colors duration-150"
                onClick={() => handleRemove(items.id)}
                aria-label="Remove item"
              >
                {plainClose}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Subtotal */}
      <div className="mt-4 border-t border-gray_200 pt-3 flex justify-between items-center">
        <span className="text-sm text-gray_700">Sub-Total:</span>
        <span className="text-sm font-semibold text-gray_900">${subTotalCost.toFixed(2)} USD</span>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-col gap-y-2">
        <Link to="/checkout" onClick={handleClicked}>
          <Button
            className="!text-gray_00 !bg-primary_500 justify-center"
            children="Checkout Now"
          />
        </Link>
        <Link to="/shopping-card" onClick={handleClicked}>
          <button className="border-2 border-primary_100 text-primary_500 w-full py-2 sm:py-[10px] cursor-pointer rounded text-sm hover:bg-primary_50 transition-colors duration-150">
            View Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddToCartPop;
