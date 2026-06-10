import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState,
  reducers: {
    globalSearch: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { globalSearch } = globalSearchSlice.actions;

export default globalSearchSlice.reducer;