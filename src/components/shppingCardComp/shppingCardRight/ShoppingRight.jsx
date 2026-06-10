import Button from "@/components/commonComponent/commonButton/Button";
import { discount } from "@/reduxFeature/slices/discountSlice";
import { subTotal } from "@/reduxFeature/slices/subtotalSlice";
import { tax } from "@/reduxFeature/slices/taxSlice";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShoppingRight = () => {
  const dispatch = useDispatch();
  const catchData = useSelector((state) => state.addCard.value);
  const totalDiscountItems = useSelector((state) => state.totalDiscount.value);
  const subTotalValue = useSelector((state) => state.subTotal.value);
  const totalTax = useSelector((state) => state.allTax.value);

  useEffect(() => {
    // ✅ if check সরিয়ে দিলাম
    // cart empty হলেও dispatch হবে — তাহলে সব 0 হয়ে যাবে
    dispatch(subTotal(catchData));
    dispatch(discount({ prouctArr: catchData }));
  }, [dispatch, catchData]);

  // ✅ subTotalValue change হলে tax আলাদা update হবে
  // এতে stale value এর সমস্যা থাকবে না
  useEffect(() => {
    dispatch(tax(subTotalValue));
  }, [dispatch, subTotalValue]);

  return (
    <div>
      <div className="p-6 border border-gray_100 rounded">
        <h3 className="lg_500 text-gray_900 pb-5">Card Totals</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="sm_400 text-gray_600">Sub-total</p>
            <p className="sm_500 text-gray_900">${subTotalValue.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="sm_400 text-gray_600">Shipping</p>
            <p className="sm_500 text-gray_900">Free</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="sm_400 text-gray_600">Discount</p>
            <p className="sm_500 text-gray_900">
              ${totalDiscountItems.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="sm_400 text-gray_600">Tax</p>
            <p className="sm_500 text-gray_900">${totalTax?.toFixed(2)}</p>
          </div>
        </div>
        <div className="w-full border-1 border-gray_100 my-4"></div>
        <div className="flex justify-between mb-6">
          <h3 className="md_400 text-gray_900">Total</h3>
          <h3 className="md_600 text-gray_900">
            ${(subTotalValue + totalTax).toFixed(2)}
          </h3>
        </div>
        <div>
          <Link to={catchData.length > 0 ? "/checkout" : "#"}>
            <Button
              children={"Proceed to Checkout"}
              disabled={catchData.length === 0}
              className={`justify-center !bg-primary_500 !text-gray_00 ${
                catchData.length === 0
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
            />
          </Link>
        </div>
      </div>
      <div className="mt-6 border border-gray_100 rounded">
        <h3 className="lg_500 text-gray_900 border-b border-gray_100 py-5 px-6">
          Coupon Code
        </h3>
        <div className="p-6">
          <input
            type="email"
            placeholder="Email address"
            className="border-gray_100 w-full pl-6 rounded"
          />
          <button className="text-gray_00 heading7 px-6 bg-secondary_500 rounded mt-4 cursor-pointer">
            Apply Coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingRight;
