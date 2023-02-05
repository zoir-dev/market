import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../components/Slices/productSlice";
import modeSlice from "../components/Slices/modeSlice";
import boughtSlice from "../components/Slices/boughtSlice";
import userSlice from "../components/Slices/userSlice";

const store = configureStore({
  reducer: {
    mode: modeSlice,
    products: productSlice,
    bought: boughtSlice,
    user: userSlice,
  },
});

export default store;
