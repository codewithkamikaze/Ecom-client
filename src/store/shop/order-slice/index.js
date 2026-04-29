import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

const API = `${import.meta.env.VITE_API_URL}/api/shop/order`;

//////////////////////////////
// CREATE ORDER
//////////////////////////////
export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(`${API}/create`, orderData);
    return response.data;
  },
);

//////////////////////////////
// CAPTURE PAYMENT
//////////////////////////////
export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(`${API}/capture`, {
      paymentId,
      payerId,
      orderId,
    });
    return response.data;
  },
);

//////////////////////////////
// GET ORDERS BY USER
//////////////////////////////
export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(`${API}/list/${userId}`);
    return response.data;
  },
);

//////////////////////////////
// ORDER DETAILS
//////////////////////////////
export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(`${API}/details/${id}`);
    return response.data;
  },
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    resetOrderState: (state) => {
      state.approvalURL = null;
      state.orderId = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE ORDER
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;

        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId),
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })

      // CAPTURE PAYMENT
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(capturePayment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(capturePayment.rejected, (state) => {
        state.isLoading = false;
      })

      // ORDERS LIST
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      // ORDER DETAILS
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails, resetOrderState } =
  shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
