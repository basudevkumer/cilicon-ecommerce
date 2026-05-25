import { createSlice } from "@reduxjs/toolkit";

const loadItemsFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("subTotals");
    return data ? JSON.parse(data) : 0;
  } catch (error) {
    console.log("Local Stroage Error is :" + error);
    return 0;
  }
};

const initialState = {
  value: loadItemsFromLocalStorage(),
};

export const subTotals = createSlice({
  name: "subTotal",
  initialState,
  reducers: {
    subTotal: (state, action) => {
      const addToCardProduct = action.payload;

      state.value = addToCardProduct.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
      localStorage.setItem("subTotals", JSON.stringify(state.value));
    },
  },
});

export const { subTotal } = subTotals.actions;

export default subTotals.reducer;
