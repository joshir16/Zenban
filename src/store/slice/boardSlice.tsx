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
        creationDate: string,
        columnId: string,
        tags: string,
      ) {
        return {
          payload: {
            boardId,
            cardId,
            cardTitle,
            description: cardDescription,
            priority,
            createdOn: new Date(creationDate).toISOString(),
            columnId,
            tags,
          },
        };
      },

      reducer(state, action: PayloadAction<Card>) {
        const currentBoardCards = state.find(
          (board: Board) => board.id === action.payload.boardId,
        )?.cards;

        if (
          currentBoardCards?.find(
            (item) => item.cardId === action.payload.cardId,
          )
        ) {
          const card = currentBoardCards?.find(
            (item) => item.cardId === action.payload.cardId,
          );
          card!.cardTitle = action.payload.cardTitle;
          card!.description = action.payload.description;
          card!.tags = action.payload.tags;
          card!.priority = action.payload.priority;
          card!.createdOn = action.payload.createdOn;
        } else {
          currentBoardCards?.push(action.payload);
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
  },
});

export const { createBoard, deleteBoard, createCard, deleteCard } =
  boardSlice.actions;
export default boardSlice.reducer;
