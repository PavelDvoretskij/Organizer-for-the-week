import { createSlice } from "@reduxjs/toolkit";

const dayMs = 24 * 60 * 60 * 1000;
const nowMs = dayMs * new Date().getDay();

const initialState = {
  dateBeginning: Date.now() - nowMs,
  dateCell: "",
  arrDateCell: [],
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDateBeginning: (state, action) => {
      state.dateBeginning = action.payload;
    },
    setDateCell: (state, action) => {
      state.dateCell = action.payload;
    },
    setArrDateCell: (state, action) => {
      state.arrDateCell = action.payload;
    },
  },
});

export const { setDateBeginning, setDateCell, setArrDateCell } =
  dateSlice.actions;
export default dateSlice.reducer;
