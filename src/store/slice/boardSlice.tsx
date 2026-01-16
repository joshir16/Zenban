import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Board, Card } from "../../typo/type";

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

    createCard: {
      prepare(
        boardId: string,
        cardId: string,
        cardTitle: string,
        cardDescription: string,
        priority: string,
        tags: []
      ) {
        return {
          payload: {
            boardId,
            cardId,
            cardTitle,
            description: cardDescription,
            priority,
            tags,
            createdOn: new Date().toISOString(),
          },
        };
      },

      reducer(state, action: PayloadAction<Card>) {
        const currentBoard = state.find(
          (board: Board) => board.id === action.payload.boardId
        );
        console.log(currentBoard);
        currentBoard?.cards.push(action.payload);
      },
    },
  },
});

export const { createBoard, deleteBoard, createCard } = boardSlice.actions;
export default boardSlice.reducer;
