import { createSlice } from "@reduxjs/toolkit";
const loadItemsFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("activeItems");
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const initialState = {
  value: loadItemsFromLocalStorage(),
};

export const activefilter = createSlice({
  name: "filterKeyWord",
  initialState,
  reducers: {
    activefiltered: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("activeItems", JSON.stringify(state.value));
    },
  },
});

export const { activefiltered } = activefilter.actions;

export default activefilter.reducer;
