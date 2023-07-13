import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../Features/Notes/NoteSlice";
import todoReducer from "../Features/ToDo/TodoSlice";
import websiteReducer from "../Features/WebPin/WebpinSlice";

export const data = configureStore({
  reducer: {
    note: noteReducer,
    todo: todoReducer,
    website: websiteReducer,
  },
});