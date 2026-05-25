import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const footerItemsSlice = createSlice({
  name: "footerItemsRoute",
  initialState,
  reducers: {
    addFooterItems: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const {addFooterItems} = footerItemsSlice.actions;

export default footerItemsSlice.reducer;
