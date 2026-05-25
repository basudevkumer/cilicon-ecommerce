import React from "react";
import Container from "../commonComponent/containers/Container";
import BreadCrumb from "../commonComponent/breadcrumb/BreadCrumb";
import { allIcons } from "@/helpers/IconProvider";
import { useDispatch, useSelector } from "react-redux";
import { addTocard } from "@/reduxFeature/slices/shopSlice";
import { Link } from "react-router-dom";
import { removeWishItems } from "@/reduxFeature/slices/wishList";

const WishListContainer = () => {
  const { navMiddleIcon, close } = allIcons;
  const dispatch = useDispatch();
  const useWishItems = useSelector((state) => state.wishList.value);

  const handleAddItems = (items) => {
    dispatch(addTocard({ ...items, quantity: 1 }));
  };

  const handleRemove = (items) => {
    dispatch(removeWishItems(items));
  };

  return (
    <div>
      <BreadCrumb />
      <Container>
        <div className="my-8 sm:my-12 lg:my-[72px] border py-4 sm:py-6 rounded border-gray_100">
          <h5 className="text-gray_900 text-base font-semibold mb-4 sm:mb-5 px-4 sm:px-6">Wishlist</h5>

          {!useWishItems?.length ? (
            <div className="text-center py-12 px-4">
              <p className="text-3xl mb-3">❤️</p>
              <p className="text-base font-medium text-gray_700">Your wishlist is empty</p>
              <Link to="/shop" className="inline-block mt-3 text-sm text-primary_500 hover:underline">Browse Products →</Link>
            </div>
          ) : (
            <div>
              {/* Desktop Table Header */}
              <div className="hidden md:grid py-[10px] px-4 sm:px-6 bg-gray_50 grid-cols-7 gap-x-3">
                <div className="col-span-3"><p className="text-gray_700 text-xs font-semibold">Products</p></div>
                <div><p className="text-gray_700 text-xs font-semibold">Price</p></div>
                <div><p className="text-gray_700 text-xs font-semibold">Stock Status</p></div>
                <div className="col-span-2"><p className="text-gray_700 text-xs font-semibold">Actions</p></div>
              </div>

              {useWishItems?.map((items, index) => (
                <div key={index}>
                  {/* Mobile card layout */}
                  <div className="md:hidden flex items-start gap-x-3 px-4 py-4 border-b border-gray_100">
                    <figure className="shrink-0">
                      <img src={items.thumbnail} alt={items.title} className="w-16 h-16 object-cover rounded" />
                    </figure>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray_700 line-clamp-2">{items.description}</p>
                      <p className="text-sm font-semibold text-gray_900 mt-1">${items.price}</p>
                      <p className="text-xs text-success_500 font-semibold">{items.availabilityStatus}</p>
                      <div className="flex items-center gap-x-3 mt-2">
                        <Link to="/shopping-card">
                          <button
                            className="px-3 py-1.5 flex items-center gap-x-2 text-gray_00 text-xs font-bold bg-primary_500 rounded cursor-pointer"
                            onClick={() => handleAddItems(items)}
                          >
                            Add to Cart <span className="text-sm">{navMiddleIcon[0].icon}</span>
                          </button>
                        </Link>
                        <button
                          className="text-xl text-gray_400 hover:text-danger_500 transition duration-300"
                          onClick={() => handleRemove(items)}
                          aria-label="Remove from wishlist"
                        >
                          {close}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop table row */}
                  <div className="hidden md:grid px-4 sm:px-6 grid-cols-7 gap-x-3 items-center py-3 border-b border-gray_100">
                    <div className="col-span-3 grid grid-cols-4 gap-x-4 items-center">
                      <figure>
                        <img src={items.thumbnail} alt={items.title} className="w-full h-[72px] object-cover" />
                      </figure>
                      <div className="col-span-3">
                        <p className="line-clamp-2 text-sm text-gray_700">{items.description}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray_900 text-sm font-semibold">${items.price}</p>
                    </div>
                    <div>
                      <p className="text-success_500 text-sm font-semibold">{items.availabilityStatus}</p>
                    </div>
                    <div className="col-span-2 flex gap-x-4 items-center">
                      <Link to="/shopping-card">
                        <button
                          className="px-4 lg:px-[55px] py-2 flex gap-x-2 items-center text-gray_00 text-xs font-bold bg-primary_500 rounded cursor-pointer whitespace-nowrap"
                          onClick={() => handleAddItems(items)}
                        >
                          Add to Cart <span className="text-sm">{navMiddleIcon[0].icon}</span>
                        </button>
                      </Link>
                      <button
                        className="text-2xl text-gray_400 hover:text-danger_500 transition duration-300 cursor-pointer"
                        onClick={() => handleRemove(items)}
                        aria-label="Remove"
                      >
                        {close}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default WishListContainer;
