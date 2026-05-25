import React, { useEffect, useState } from "react";
import { z } from "zod";
import Container from "../commonComponent/containers/Container";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FaMoneyBillWave,
  FaCcPaypal,
  FaAmazonPay,
  FaCreditCard,
} from "react-icons/fa";
import { SiVenmo } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { subTotal } from "@/reduxFeature/slices/subtotalSlice";
import { discount } from "@/reduxFeature/slices/discountSlice";
import { tax } from "@/reduxFeature/slices/taxSlice";
import AddToCartPop from "../home/addToCardPop/AddToCartPop";
import CheckAdCart from "../commonComponent/checkAddToCard/CheckAdCart";
import BreadCrumb from "../commonComponent/breadcrumb/BreadCrumb";
import { allIcons } from "@/helpers/IconProvider";
import { useNavigate } from "react-router-dom";

/* ================= ZOD SCHEMA ================= */

const billingSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address: z.string().min(1, "Address is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(1, "Zip code is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(6, "Phone number is too short"),

    payment: z.enum(["cod", "venmo", "paypal", "amazon", "card"]),

    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvc: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.payment === "card") {
      if (!data.cardName)
        ctx.addIssue({
          path: ["cardName"],
          message: "Card name is required",
        });

      if (!data.cardNumber)
        ctx.addIssue({
          path: ["cardNumber"],
          message: "Card number is required",
        });

      if (!data.expiry)
        ctx.addIssue({
          path: ["expiry"],
          message: "Expiry date is required",
        });

      if (!data.cvc)
        ctx.addIssue({
          path: ["cvc"],
          message: "CVC is required",
        });
    }
  });

/* ================= COMPONENT ================= */

const CheckoutContainer = () => {
  // for navigate
  const navigate =  useNavigate()
  // icons
  const { rightArrow } = allIcons;
  // for readux store
  const dispatch = useDispatch();
  const catchData = useSelector((state) => state.addCard.value);
  const totalDiscountItems = useSelector((state) => state.totalDiscount.value);
  const subTotalValue = useSelector((state) => state.subTotal.value);
  const totalTax = useSelector((state) => state.allTax.value);

  useEffect(() => {
    if (catchData.length) {
      dispatch(subTotal(catchData));
      dispatch(discount({ prouctArr: catchData }));
      dispatch(tax(subTotalValue));
    }
  }, [dispatch, catchData]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(billingSchema),
    defaultValues: { payment: "card" },
  });

  const payment = watch("payment");

  const onSubmit = (data) => {
    navigate("/order-success")
  };

  const Error = ({ msg }) =>
    msg ? <p className="text-red-500 text-sm mt-1">{msg}</p> : null;

  return (
    <section className="">
      <BreadCrumb />

      <div className="py-8 sm:py-12 lg:py-[72px]">
        <Container>
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-x-6 gap-y-6 ">
            {/* LEFT */}
            <div className="col-span-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                id="bilingForm"
              >
                {/* Billing Info */}
                <section className=" rounded-lg p-6 space-y-4">
                  <h5 className="text-lg font-medium">Billing Information</h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register("firstName")}
                        placeholder="First name"
                      />
                      <Error msg={errors.firstName?.message} />
                    </div>

                    <div>
                      <input
                        {...register("lastName")}
                        placeholder="Last name"
                      />
                      <Error msg={errors.lastName?.message} />
                    </div>
                  </div>

                  <div>
                    <input
                      {...register("address")}
                      placeholder="Address"
                      className="w-full"
                    />
                    <Error msg={errors.address?.message} />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <select {...register("country")}>
                        <option value="">Country</option>
                        <option value="BD">Bangladesh</option>
                      </select>
                      <Error msg={errors.country?.message} />
                    </div>

                    <div>
                      <select {...register("state")}>
                        <option value="">State</option>
                        <option value="dhaka">Dhaka</option>
                      </select>
                      <Error msg={errors.state?.message} />
                    </div>

                    <div>
                      <select {...register("city")}>
                        <option value="">City</option>
                        <option value="dhaka">Dhaka</option>
                      </select>
                      <Error msg={errors.city?.message} />
                    </div>

                    <div>
                      <input {...register("zip")} placeholder="Zip Code" />
                      <Error msg={errors.zip?.message} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input {...register("email")} placeholder="Email" />
                      <Error msg={errors.email?.message} />
                    </div>

                    <div>
                      <input {...register("phone")} placeholder="Phone" />
                      <Error msg={errors.phone?.message} />
                    </div>
                  </div>
                </section>

                {/* Payment */}
                <section className=" rounded-lg p-6 space-y-4">
                  <h5 className="text-lg font-medium">Payment Option</h5>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 text-center">
                    {[
                      ["cod", "Cash", <FaMoneyBillWave />],
                      ["venmo", "Venmo", <SiVenmo />],
                      ["paypal", "Paypal", <FaCcPaypal />],
                      ["amazon", "Amazon", <FaAmazonPay />],
                      ["card", "Card", <FaCreditCard />],
                    ].map(([value, label, icon]) => (
                      <label
                        key={value}
                        className="cursor-pointer flex  flex-col items-center space-y-2"
                      >
                        <div className="mx-auto text-[28px] sm:text-[36px] lg:text-[45px] text-primary_500">
                          {icon}
                        </div>
                        <div>
                          <input
                            type="radio"
                            value={value}
                            {...register("payment")}
                          />
                          <p>{label}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Card Fields */}
                  {payment === "card" && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <input
                          {...register("cardName")}
                          placeholder="Name on card"
                        />
                        <Error msg={errors.cardName?.message} />
                      </div>

                      <div>
                        <input
                          {...register("cardNumber")}
                          placeholder="Card number"
                        />
                        <Error msg={errors.cardNumber?.message} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <input {...register("expiry")} placeholder="MM/YY" />
                          <Error msg={errors.expiry?.message} />
                        </div>

                        <div>
                          <input {...register("cvc")} placeholder="CVC" />
                          <Error msg={errors.cvc?.message} />
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </form>
            </div>

            {/* RIGHT */}
            <div className=" rounded-lg p-6">
              <div className="p-6 border border-gray_100 rounded">
                <h3 className="lg_500 text-gray_900 pb-3">Order Summary</h3>
                <div className="pt-2 pb-3">
                  <CheckAdCart />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="sm_400 text-gray_600">Sub-total</p>
                    <p className="sm_500 text-gray_900">
                      ${subTotalValue.toFixed(2)}
                    </p>
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
                    <p className="sm_500 text-gray_900">
                      ${totalTax?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="w-full border-1 border-gray_100 my-4"></div>
                <div className="flex justify-between  mb-6">
                  <h3 className="md_400 text-gray_900">Total</h3>
                  <h3 className="md_600 text-gray_900">
                    ${(subTotalValue + totalTax).toFixed(2)}
                  </h3>
                </div>
                <div>
                  <button
                    className="bg-primary_500 text-white w-full heading6 flex justify-center items-center gap-x-3 rounded cursor-pointer"
                    form="bilingForm"
                    type="submit"
                  >
                    Place Order <span className="text-2xl">{rightArrow}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default CheckoutContainer;
