import { configureStore } from "@reduxjs/toolkit";
import { AddToCartReducer } from "./slice/AddCart.js";
import { ProductsReducer } from "./slice/ProductSlice.js";
import { CategoryReducer } from "./slice/CategorySlice.js";
import { AuthReducer } from "./slice/AuthSlice.js";
const Store = configureStore({
  reducer: {
    cart: AddToCartReducer,
    product: ProductsReducer,
    category: CategoryReducer,
    auth: AuthReducer,
  },

});
export default Store;
