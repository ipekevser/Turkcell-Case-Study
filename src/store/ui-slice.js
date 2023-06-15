import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    categoriesNotification: {},
    productsNotification: {},
    productDetailNotification: {},
  },
  reducers: {
    showCategoriesNotification(state, action) {
      state.categoriesNotification = {
        status: action.payload.status,
        postStatus: action.payload.postStatus,
        message: action.payload.message,
      };
    },
    showProductsNotification(state, action) {
      state.productsNotification = {
        status: action.payload.status,
        postStatus: action.payload.postStatus,
        message: action.payload.message,
      };
    },
    showProductDetailNotification(state, action) {
      state.productDetailNotification = {
        status: action.payload.status,
        postStatus: action.payload.postStatus,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
