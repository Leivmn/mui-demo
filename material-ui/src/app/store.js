import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import basketReducer from "../features/products/basketSlice";
import filterReducer from "../features/products/filterSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    basket: basketReducer,
    filter: filterReducer,
  },
});
