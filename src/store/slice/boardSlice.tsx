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
          card!.status = action.payload.status;
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

    updateCardStatus(state, action) {
      const currentBoardCards = state.find(
        (board: Board) => board.id === action.payload.boardId,
      )?.cards;
      if (
        currentBoardCards?.find(
          (item) => item.cardId === action.payload.card.cardId,
        )
      ) {
        const card = currentBoardCards?.find(
          (item) => item.cardId === action.payload.card.cardId,
        );
        card!.status = action.payload.card.status;
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
