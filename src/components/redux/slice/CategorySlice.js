import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl.js";
const Status = Object.freeze({
  loading: "loading",
  success: "success",
  error: "error",
});
const CategorySlice = createSlice({
  name: "category",
  initialState: {
    loading: Status.loading,
    category: [],
    success: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAllCategory.pending, (state) => {
      state.loading = Status.loading;
    });
    builder.addCase(FetchAllCategory.fulfilled, (state, { payload }) => {
      state.loading = Status.loading;
      state.category = payload;
      state.success = Status.success;
    });
    builder.addCase(FetchAllCategory.rejected, (state) => {
      state.loading = state.error;
      state.error = Status.error;
    });
  },
});
export const FetchAllCategory = createAsyncThunk(
  "category/fetchAll",
  async () => {
    const { data: res } = await axios.get(
      `${BaseUrl}/api/v1/category/allcategories`
    );
    const Category = await res.Allcategory;
    return Category;
  }
);

const CategoryReducer = CategorySlice.reducer;
export { CategoryReducer };
