import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

const API = "http://localhost:5000/api/admin/products";

// ➕ Add product
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/add`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

// 📦 Get all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/get`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

// ✏️ Edit product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/edit/${id}`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

// ❌ Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API}/delete/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔄 GET ALL
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.productList = [];
      })

      // ➕ ADD
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.productList.push(action.payload.data);
      })

      // ✏️ EDIT
      .addCase(editProduct.fulfilled, (state, action) => {
        const updated = action.payload.data;

        const index = state.productList.findIndex((p) => p._id === updated._id);

        if (index !== -1) {
          state.productList[index] = updated;
        }
      })

      // ❌ DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.productList = state.productList.filter((p) => p._id !== id);
      });
  },
});

export default adminProductsSlice.reducer;
