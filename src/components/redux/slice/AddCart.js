import { createSlice } from "@reduxjs/toolkit";
const storedCart = JSON.parse(localStorage.getItem("add_cart")) || [];
const AddtoCartSlice = createSlice({
  name: "cart",
  initialState: {
    itemCount: storedCart.length,
    cart: storedCart,
  },
  reducers: {
    AddToCart: (state, action) => {
      state.itemCount++;
      state.cart.push(action.payload);
      localStorage.setItem("add_cart", JSON.stringify(state.cart));
    },
    RemoveCart: (state, action) => {
      const index = state.cart.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.cart.splice(index, 1);
        state.itemCount--;
      }
      localStorage.removeItem("add_cart");
    },
  },
});
export const { AddToCart, RemoveCart } = AddtoCartSlice.actions;
export const AddToCartReducer = AddtoCartSlice.reducer;
