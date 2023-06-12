import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: [],
  reducers: {
    addToBasket: (state, action) => {
      const { id, name, pictures, price, amount } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.amount += amount;
      } else {
        state.push({ id, name, pictures, price, amount });
      }
    },
    decreaseFromBasket: (state, action) => {
      const { id, amount } = action.payload;
      const existingItem = state.findIndex((item) => item.id === id);
      if (existingItem !== -1 && state[existingItem].amount > 1) {
        state[existingItem] = {
          ...state[existingItem],
          amount: state[existingItem].amount - amount,
        };
      } else if (existingItem !== -1) {
        state.splice(existingItem, 1);
      }
    },
    removeFromBasket: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.findIndex((item) => item.id === id);
      if (existingItem !== -1) {
        state.splice(existingItem, 1);
      }
    },
  },
});

export const { addToBasket, decreaseFromBasket, removeFromBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
