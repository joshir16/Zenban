import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../store/slice/boardSlice";

const store = configureStore({
  reducer: {
    boards: boardReducer,
  },
});

export default store;
