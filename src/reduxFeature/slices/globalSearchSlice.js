import { createSlice } from "@reduxjs/toolkit";

const loadItemsFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("globalSearchValue");

    if (!data) return "";

    return JSON.parse(data) || "";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const initialState = {
  value: loadItemsFromLocalStorage(),
};

export const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState,
  reducers: {
    globalSearch: (state, actions) => {
        state.value = actions.payload;
      localStorage.setItem("globalSearchValue", JSON.stringify(state.value));
    },
  },
});

export const { globalSearch } = globalSearchSlice.actions;

export default globalSearchSlice.reducer;
