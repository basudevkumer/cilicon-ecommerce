import { createSlice } from "@reduxjs/toolkit";

const loadItemsFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("wishItems");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const initialState = {
  value: loadItemsFromLocalStorage() || [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addWishItems: (state, actions) => {
     
      const existItems = state.value.find(
        (items) => items.id === actions.payload.id,
      );

      if (!existItems) {
        state.value = [...state.value, actions.payload];
        localStorage.setItem("wishItems", JSON.stringify(state.value));
      }
    },
    removeWishItems: (state, actions) => {
      const existItems = state.value.filter(
        (items) => items.id !== actions.payload.id,
      );

      if (existItems) {
        state.value = existItems;

        localStorage.setItem("wishItems", JSON.stringify(state.value));
      }
    },
  },
});

export const { addWishItems,removeWishItems } = wishListSlice.actions;

export default wishListSlice.reducer;
