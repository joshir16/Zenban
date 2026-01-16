import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slice/boardSlice";

const store = configureStore({
  reducer: {
    boards: boardReducer,
  },
});

store.subscribe(() => {
  // 2. Get the current state
  const state = store.getState();

  try {
    // 3. Save just the 'boards' slice to localStorage
    const serializedState = JSON.stringify(state.boards);
    localStorage.setItem("zenban-boards", serializedState);
    console.log("Saved to LocalStorage:", state.boards);
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
});

// ------------------------

export type RootState = ReturnType<typeof store.getState>;
export default store;
