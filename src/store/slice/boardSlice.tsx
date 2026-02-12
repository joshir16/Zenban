import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Board } from "../../typo/type";

interface CreateCardPayload {
  boardId: string;
  cardId: string;
  cardTitle: string;
  description: string;
  status: string;
  priority: string;
  tags: string[];
  createdOn: string;
}

const loadFromLocalStorage = (): Board[] => {
  try {
    const serializedState = localStorage.getItem("zenban-boards");
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load from localStorage", e);
    return [];
  }
};

const boardSlice = createSlice({
  name: "boards",
  initialState: loadFromLocalStorage(),
  reducers: {
    createBoard(state, action: PayloadAction<Board>) {
      state.push(action.payload);
    },

    deleteBoard(state, action: PayloadAction<string>) {
      return state.filter((board) => board.id !== action.payload);
    },

    createCard: {
      // PREPARE: Takes arguments, returns a flattened payload object
      prepare(
        boardId: string,
        cardId: string,
        cardTitle: string,
        cardDescription: string,
        status: string,
        priority: string,
        tags: string[], // Receiving Array from the Form
        creationDate: string,
      ) {
        return {
          payload: {
            boardId, // Needed to FIND the board
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

      // REDUCER: Handles the logic
      reducer(state, action: PayloadAction<CreateCardPayload>) {
        // 1. DESTRUCTURING MAGIC:
        // extracting 'boardId' into a variable,
        // and grouping everything else into 'cardData'.
        const { boardId, ...cardData } = action.payload;

        const board = state.find((b) => b.id === boardId);
        if (!board) return;

        const existingCard = board.cards.find(
          (c) => c.cardId === cardData.cardId,
        );

        if (existingCard) {
          // UPDATE: Merge new data into existing card
          Object.assign(existingCard, cardData);
        } else {
          // CREATE: Push the clean 'cardData' (which has NO boardId)
          board.cards.push(cardData);
        }
      },
    },

    deleteCard(
      state,
      action: PayloadAction<{ boardId: string; cardId: string }>,
    ) {
      const board = state.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.cards = board.cards.filter(
          (c) => c.cardId !== action.payload.cardId,
        );
      }
    },

    // Simple setter for Drag and Drop
    updateCardStatus(
      state,
      action: PayloadAction<{
        boardId: string;
        cardId: string;
        status: string;
      }>,
    ) {
      const board = state.find((b) => b.id === action.payload.boardId);
      const card = board?.cards.find((c) => c.cardId === action.payload.cardId);
      if (card) {
        card.status = action.payload.status;
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
