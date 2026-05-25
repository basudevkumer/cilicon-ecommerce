import { createSlice } from "@reduxjs/toolkit";

const loadItemsFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("addCard");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Local Stroage Error is :" + error);
    return [];
  }
};

const initialState = {
  value: loadItemsFromLocalStorage() || [],
};

export const shopSlice = createSlice({
  name: "addToCard",
  initialState,
  reducers: {
    addTocard: (state, action) => {
      
      const incommingProduct = action.payload;

      const existingProduct = state.value.find(
        (items) => items.id === incommingProduct.id,
      );

      if (existingProduct) {
        existingProduct.quantity += incommingProduct.quantity || 1;
      } else {
        state.value.push({
          ...incommingProduct,
          quantity: incommingProduct.quantity || 1,
        });
      }

      localStorage.setItem("addCard", JSON.stringify(state.value));
    },

    updateQuanty: (state, action) => {
      const { id, type } = action.payload;

      const existingProduct = state.value.find((items) => items.id === id);
      if (existingProduct) {
        if (type === "increment") {
          existingProduct.quantity += 1;
        } else if (type === "decrement") {
          if (existingProduct.quantity > 1) existingProduct.quantity -= 1;
        }
      }
      localStorage.setItem("addCard", JSON.stringify(state.value));
    },
    removeCard: (state, action) => {
      const { id } = action.payload;
      state.value = state.value.filter((items, index) => items.id !== id);
      localStorage.setItem("addCard", JSON.stringify(state.value));
    },
  },
});

export const { addTocard, updateQuanty, removeCard } = shopSlice.actions;

export default shopSlice.reducer;
