import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bought: [],
};

export const boughtSlice = createSlice({
  name: "bought",
  initialState,
  reducers: {
    setBought: (state, action) => {
      return {
        bought: [...state.bought, action.payload],
      };
    },
  },
});

export const { setBought } = boughtSlice.actions;
export default boughtSlice.reducer;
