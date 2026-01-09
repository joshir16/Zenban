import { createSlice } from "@reduxjs/toolkit";
import type { Board } from "../../typo/type";

type BoardsState = Board[];

const loadFromLocalStorage = (): BoardsState => {
  try {
    const serializedState = localStorage.getItem("zenban-boards");
    if (serializedState === null) return []; // No data? Use defaults
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load from localStorage", e);
    return [];
  }
};

const boardSlice = createSlice({
  name: "boards",
  initialState: loadFromLocalStorage,
  reducers: {
    createBoard(state, action) {
      state.push(action.payload);
    },

    deleteBoard(state, action) {
      return state.filter((board: Board) => board.id !== action.payload);
    },
  },
});

export const { createBoard, deleteBoard } = boardSlice.actions;
export default boardSlice.reducer;
