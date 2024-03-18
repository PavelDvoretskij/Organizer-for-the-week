import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showEditTodoModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowEditTodoModal: (state, action) => {
      state.showEditTodoModal = action.payload;
    },
  },
});

export const { setShowEditTodoModal } = modalSlice.actions;
export default modalSlice.reducer;
