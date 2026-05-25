import { allIcons } from "@/helpers/IconProvider";
import { addTocard, removeCard, updateQuanty } from "@/reduxFeature/slices/shopSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShoppingLeft = () => {
  const catchData = useSelector((state) => state.addCard.value);
  const dispatch = useDispatch();
  const { close, arrowIcon } = allIcons;

  const handleIncrement = (id) => dispatch(updateQuanty({ id, type: "increment" }));
  const handleDecrement = (id) => dispatch(updateQuanty({ id, type: "decrement" }));
  const handleRemove = (id) => dispatch(removeCard({ id }));

  if (!catchData?.length) {
    return (
      <div className="border border-gray_100 rounded p-8 text-center">
        <p className="text-4xl mb-3">🛒</p>
        <p className="text-base font-semibold text-gray_700">Your cart is empty</p>
        <Link to="/shop" className="inline-block mt-4 text-sm text-primary_500 hover:underline">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-gray_100 rounded">
      <h6 className="text-base font-semibold text-gray_900 py-4 sm:py-5 px-4 sm:px-6">Shopping Cart</h6>

      {/* Table header — hidden on mobile, shown md+ */}
      <div className="hidden md:grid md:grid-cols-6 items-center gap-x-4 py-2 px-4 sm:px-6 bg-gray_50">
        <div className="col-span-3"><p className="text-xs font-semibold text-gray_700">Products</p></div>
        <div><p className="text-xs font-semibold text-gray_700">Price</p></div>
        <div><p className="text-xs font-semibold text-gray_700">Quantity</p></div>
        <div><p className="text-xs font-semibold text-gray_700">Sub-Total</p></div>
      </div>

      <div className="py-4 sm:py-6 flex flex-col gap-y-4 px-4 sm:px-6">
        {catchData?.map((items) => (
          <div key={items.id}>
            {/* Mobile card layout */}
            <div className="flex md:hidden gap-x-3 items-start border-b border-gray_100 pb-4">
              <button
                className="text-gray_400 text-xl hover:text-danger_500 transition duration-300 mt-1 shrink-0"
                onClick={() => handleRemove(items.id)}
                aria-label="Remove item"
              >
                {close}
              </button>
              <figure className="shrink-0">
                <img src={items.thumbnail} alt={items.title} className="h-16 w-16 object-cover rounded" />
              </figure>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray_900 truncate">{items.title}</p>
                <div className="flex items-center gap-x-2 mt-1">
                  <del className="text-[11px] text-gray_400">${(items.price + (items.price * items.discountPercentage) / 100).toFixed(2)}</del>
                  <p className="text-xs font-semibold text-gray_700">${items.price}</p>
                </div>
                {/* Qty controls */}
                <div className="flex items-center gap-x-2 mt-2 border border-gray_100 rounded w-fit px-2 py-1">
                  <button
                    className="text-gray_500 hover:text-primary_500 text-lg cursor-pointer"
                    onClick={() => handleDecrement(items.id)}
                    aria-label="Decrease quantity"
                  >-</button>
                  <span className="text-sm font-medium text-gray_900 min-w-[24px] text-center">{items?.quantity || 1}</span>
                  <button
                    className="text-gray_500 hover:text-primary_500 text-lg cursor-pointer"
                    onClick={() => handleIncrement(items.id)}
                    aria-label="Increase quantity"
                  >+</button>
                </div>
                <p className="text-xs font-semibold text-secondary_500 mt-1">
                  Total: ${(items.price * (items?.quantity || 1)).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Desktop table row layout */}
            <div className="hidden md:grid md:grid-cols-6 items-center gap-x-4">
              <div className="col-span-3 flex items-center gap-x-3">
                <button
                  className="text-gray_400 text-2xl hover:text-danger_500 transition duration-300 ease-in-out shrink-0"
                  onClick={() => handleRemove(items.id)}
                  aria-label="Remove item"
                >
                  {close}
                </button>
                <figure className="shrink-0">
                  <img src={items.thumbnail} alt={items.title} className="h-[72px] w-[72px] object-cover rounded" />
                </figure>
                <p className="text-sm text-gray_900 line-clamp-2">{items.title}</p>
              </div>
              <div className="flex flex-col gap-y-1">
                <del className="text-gray_400 text-xs">${(items.price + (items.price * items.discountPercentage) / 100).toFixed(2)}</del>
                <p className="text-xs font-semibold text-gray_700">${items.price}</p>
              </div>
              <div className="flex items-center gap-x-2 border border-gray_100 rounded w-fit px-2 py-1">
                <button className="text-gray_500 hover:text-primary_500 text-lg cursor-pointer" onClick={() => handleDecrement(items.id)}>-</button>
                <span className="text-sm font-medium text-gray_900 min-w-[24px] text-center">{items?.quantity || 1}</span>
                <button className="text-gray_500 hover:text-primary_500 text-lg cursor-pointer" onClick={() => handleIncrement(items.id)}>+</button>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray_700">${(items.price * (items?.quantity || 1)).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingLeft;
