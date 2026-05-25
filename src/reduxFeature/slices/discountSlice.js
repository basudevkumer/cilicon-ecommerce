import { createSlice } from "@reduxjs/toolkit";

const loadItemsFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("pDiscount");
    return data ? JSON.parse(data) : 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const initialState = {
  value: loadItemsFromLocalStorage(),
};

export const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    discount: (state, action) => {
      const { prouctArr } = action.payload;

      const catchAllDiscount = prouctArr.reduce((acc, curr) => {
        const singleProductDiscount =
          curr.price * (curr.discountPercentage / 100);

        const allProductPrice = curr.quantity * singleProductDiscount;

        return acc + allProductPrice;
      }, 0);

      state.value = catchAllDiscount || 0;

      localStorage.setItem("pDiscount", JSON.stringify(state.value));
    },
  },
});

export const { discount } = discountSlice.actions;

export default discountSlice.reducer;
