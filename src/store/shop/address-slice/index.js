import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

const API = `${import.meta.env.VITE_API_URL}/api/shop/address`;

//////////////////////////////
// ADD ADDRESS
//////////////////////////////
export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(`${API}/add`, formData);
    return response.data;
  },
);

//////////////////////////////
// GET ALL ADDRESSES
//////////////////////////////
export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(`${API}/get/${userId}`);
    return response.data;
  },
);

//////////////////////////////
// EDIT ADDRESS
//////////////////////////////
export const editAddress = createAsyncThunk(
  "/addresses/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${API}/update/${userId}/${addressId}`,
      formData,
    );
    return response.data;
  },
);

//////////////////////////////
// DELETE ADDRESS
//////////////////////////////
export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(`${API}/delete/${userId}/${addressId}`);
    return response.data;
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ADD
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })

      // GET
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })

      // EDIT
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
      })

      // DELETE
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
