import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    items: [],
    categories: [],
    selectedProductId: "",
    productDetails: {},
    selectedCategory: "",
  },
  reducers: {
    replaceListItems(state, action) {
      state.items = action.payload.items;
    },
    updateListItems(state, action) {
      const _items = [...state.items.products];

      if (_items.some((item) => item.id === action.payload.newProduct.id)) {
        const index = _items.findIndex(
          (item) => item.id === action.payload.newProduct.id
        );
        _items[index] = action.payload.newProduct;
      } else {
        _items.unshift(action.payload.newProduct);
      }
      state.items.products = _items;
    },
    deleteListItems(state, action) {
      const _items = [...state.items.products];
      state.items.products = _items.filter(
        (item) => item.id !== action.payload
      );
    },
    setProductDetails(state, action) {
      state.productDetails = action.payload;
    },
    setSelectedProductId(state, action) {
      state.selectedProductId = action.payload;
    },
    replaceCategoriesList(state, action) {
      state.categories = action.payload.categories;
    },
    replaceSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

export const listActions = listSlice.actions;

export default listSlice;
