import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filter: "",
    searchText: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setFilter, setSearchText } = filterSlice.actions;
export default filterSlice.reducer;
