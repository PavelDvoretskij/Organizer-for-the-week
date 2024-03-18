import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./dateSlice.js";
import todoSlice from "./todoSlice.js";
import modalSlice from "./modalSlice.js";

export const store = configureStore({
  reducer: {
    date: dateSlice,
    todos: todoSlice,
    modal: modalSlice,
  },
});
