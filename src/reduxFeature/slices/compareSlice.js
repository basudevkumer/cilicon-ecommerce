import { createSlice } from "@reduxjs/toolkit";

const loadItemsFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("compareLocValue");

    if (!data) return [];

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const initialState = {
  value: loadItemsFromLocalStorage(),
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    storeCompareValue: (state, actions) => {
      const existValue = state.value.find(
        (items) => items.id === actions.payload.id,
      );

      if (!existValue) {
        state.value = [...state.value, actions.payload];
        localStorage.setItem("compareLocValue", JSON.stringify(state.value));
      }

    },
    removeItems: (state, actions) => {
      const getFromLocalStroage = localStorage.getItem("compareLocValue");
      const catchAvailAbleData = JSON.parse(getFromLocalStroage);

      const removeData = catchAvailAbleData.filter(
        (items) => items.id !== actions.payload,
      );
      console.log(removeData);

      state.value = removeData || [];

      localStorage.setItem("compareLocValue", JSON.stringify(removeData));
    },
  },
});

export const { storeCompareValue, removeItems } = compareSlice.actions;

export default compareSlice.reducer;
