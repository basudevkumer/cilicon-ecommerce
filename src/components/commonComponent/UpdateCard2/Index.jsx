import { allIcons } from "@/helpers/IconProvider";
import { addTocard, removeCard, updateQuanty } from "@/reduxFeature/slices/shopSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../containers/Container";
import BreadCrumb from "../breadcrumb/BreadCrumb";

const UpdateCard2 = () => {
  const catchData = useSelector((state) => state.addCard.value);
  const dispatch = useDispatch();
  const { close, arrowIcon } = allIcons;

  const handleIncrement = (id) => dispatch(updateQuanty({ id, type: "increment" }));
  const handleDecrement = (id) => dispatch(updateQuanty({ id, type: "decrement" }));
  const hangleRemove = (id) => dispatch(removeCard({ id }));

  return (
    <div className="my-4 sm:my-6">
      <Container>
        <BreadCrumb />
        <div className="border border-gray_100 rounded mt-4">
          <h6 className="text-base font-semibold text-gray_900 py-4 sm:py-5 px-4 sm:px-6">Updating Store</h6>

          {/* Desktop table header */}
          <div className="hidden md:grid md:grid-cols-6 items-center gap-x-4 py-[10px] px-4 sm:px-6 bg-gray_50">
            <div className="col-span-3"><p className="text-xs font-semibold text-gray_700">Products</p></div>
            <div><p className="text-xs font-semibold text-gray_700">Price</p></div>
            <div><p className="text-xs font-semibold text-gray_700">Quantity</p></div>
            <div><p className="text-xs font-semibold text-gray_700">Sub-Total</p></div>
          </div>

          <div className="py-4 sm:py-6 flex flex-col divide-y divide-gray_100">
            {catchData?.map((items) => (
              <div key={items.id}>
                {/* Mobile card */}
                <div className="md:hidden flex items-start gap-x-3 px-4 py-4">
                  <figure className="shrink-0">
                    <img src={items.thumbnail} alt={items.title} className="h-14 w-14 object-cover rounded" />
                  </figure>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray_900 truncate">{items.title}</p>
                    <div className="flex items-center gap-x-2 mt-1">
                      <del className="text-xs text-gray_400">${(items.price + (items.price * items.discountPercentage) / 100).toFixed(2)}</del>
                      <p className="text-xs font-semibold text-gray_700">${items.price}</p>
                    </div>
                    <div className="flex items-center gap-x-3 mt-2">
                      <div className="flex items-center border-2 border-gray_100 gap-x-3 px-2">
                        <button className="text-lg text-gray_900 cursor-pointer py-1" onClick={() => handleDecrement(items.id)}>-</button>
                        <p className="text-sm font-medium text-gray_700">{items.quantity}</p>
                        <button className="text-base text-gray_900 cursor-pointer py-1" onClick={() => handleIncrement(items.id)}>+</button>
                      </div>
                      <p className="text-xs font-semibold text-gray_700">${(items?.price * items?.quantity).toFixed(2)}</p>
                      <button className="text-xl text-gray_400 hover:text-danger_500 ml-auto" onClick={() => hangleRemove(items.id)}>{close}</button>
                    </div>
                  </div>
                </div>

                {/* Desktop row */}
                <div className="hidden md:grid md:grid-cols-6 items-center gap-x-4 px-4 sm:px-6 py-3">
                  <div className="col-span-3 flex items-center gap-x-3">
                    <button className="text-gray_400 text-2xl hover:text-danger_500 transition duration-300 cursor-pointer" onClick={() => hangleRemove(items.id)}>{close}</button>
                    <figure><img src={items.thumbnail} alt={items.title} className="h-[72px] w-[72px] object-cover" /></figure>
                    <p className="text-sm text-gray_900 line-clamp-2">{items.title}</p>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <del className="text-gray_400 text-xs">${(items.price + (items.price * items.discountPercentage) / 100).toFixed(2)}</del>
                    <p className="text-xs font-semibold text-gray_700">${items.price}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center border-2 border-gray_100 gap-x-4">
                      <button className="text-2xl text-gray_900 cursor-pointer" onClick={() => handleDecrement(items.id)}>-</button>
                      <p className="text-sm font-medium text-gray_700">{items.quantity}</p>
                      <button className="text-xl text-gray_900 cursor-pointer" onClick={() => handleIncrement(items.id)}>+</button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray_700">${(items?.price * items?.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            <Link to="/shopping-card">
              <button className="px-4 sm:px-6 text-sm font-semibold text-secondary_500 border-2 border-secondary_500 rounded cursor-pointer flex items-center gap-x-2 py-2 hover:bg-secondary_50 transition-colors">
                <span className="text-lg">{arrowIcon[0].icon}</span>
                Return to Cart
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UpdateCard2;
