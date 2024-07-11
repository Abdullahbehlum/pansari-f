import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl.js";
const Status = Object.freeze({
  loading: "loading",
  success: "success",
  error: "error",
});
const ProductSlice = createSlice({
  name: "products",
  initialState: {
    loading: Status.loading,
    products: [],
    totalPages: 1,
    currentPage: 1,
    success: Status.success,
    error: Status.error,
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchAllProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    });
    builder.addCase(FetchAllProducts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const FetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async (page = 1, limit = 3) => {
    const { data: res } = await axios.get(
      `${BaseUrl}/api/v1/products/allproduct?${page}&${limit}`
    );
    const product = res.allproducts;
    return product;
  }
);

const ProductsReducer = ProductSlice.reducer;
export { ProductsReducer };
