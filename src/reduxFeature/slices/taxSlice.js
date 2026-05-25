import { createSlice } from "@reduxjs/toolkit";

const loadItemsFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("tax");
    return data ? JSON.parse(data) : 0;
  } catch (error) {
    console.log("Local Stroage Error is :" + error);
    return 0;
  }
};

const initialState = {
  value: loadItemsFromLocalStorage(),
};

export const totalTax = createSlice({
  name: "tax",
  initialState,
  reducers: {
    tax: (state, action) => {
      const allValuePrice = action.payload;

      state.value = allValuePrice * (7 / 100);

      localStorage.setItem("tax", JSON.stringify(state.value));
    },
  },
});

export const { tax } = totalTax.actions;

export default totalTax.reducer;
