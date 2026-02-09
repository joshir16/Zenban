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
        status: string,
        priority: string,
        tags: string,
        creationDate: string,
      ) {
        console.log(creationDate);
        return {
          payload: {
            boardId,
            cardId,
            cardTitle,
            description: cardDescription,
            status,
            priority,
            tags,
            createdOn: new Date(creationDate).toISOString(),
          },
        };
      },

      reducer(state, action: PayloadAction<Card>) {
        const board = state.find((b) => b.id === action.payload.boardId);
        if (!board) return;

        const existingCard = board.cards.find(
          (c) => c.cardId === action.payload.cardId,
        );

        if (existingCard) {
          Object.assign(existingCard, action.payload);
        } else {
          board.cards.push(action.payload);
        }
      },
    },

    deleteCard: {
      prepare(boardId: string, cardId: string) {
        return {
          payload: {
            boardId,
            cardId,
          },
        };
      },

      reducer(
        state,
        action: PayloadAction<{ boardId: string; cardId: string }>,
      ) {
        const board = state.find(
          (board: Board) => board.id === action.payload.boardId,
        );
        if (board) {
          board.cards = board.cards.filter(
            (card) => card.cardId !== action.payload.cardId,
          );
        }
      },
    },

    updateCardStatus(state, action) {
      const board = state.find((b) => b.id === action.payload.boardId);
      const card = board?.cards.find(
        (c) => c.cardId === action.payload.card.cardId,
      );
      if (card) {
        card.status = action.payload.card.status;
      }
    },
  },
});

export const {
  createBoard,
  deleteBoard,
  createCard,
  deleteCard,
  updateCardStatus,
} = boardSlice.actions;
export default boardSlice.reducer;
