import { createSlice } from "@reduxjs/toolkit";

const initialData = [
  {
    id: "board-1",
    name: "ZenBan V1",

    // 1. COLUMNS (The Containers)
    columns: [
      { id: "col-todo", title: "To Do", color: "#ef4444" },
      { id: "col-inprogress", title: "In Progress", color: "#ef4444" },
      { id: "col-done", title: "Done", color: "#10b981" },
    ],

    // 2. CARDS (The Content)
    cards: [
      // --- Card 1 ---
      {
        id: "c1",
        columnId: "col-todo", // <--- Links to "To Do"
        title: "Setup React Repo",
        priority: "high",
        tags: ["DevOps"],
      },
      // --- Card 2 ---
      {
        id: "c2",
        columnId: "col-done", // <--- Links to "Done"
        title: "Meditate",
        priority: "zen",
        tags: ["Health"],
      },
    ],
  },
];

const initialState = [];

const boardSlice = createSlice({
  name: "boards",
  initialState: initialData,
  reducers: {
    createBoard(state, action) {
      state.push(action.payload);
    },
  },
});

export const { createBoard } = boardSlice.actions;
export default boardSlice.reducer;
