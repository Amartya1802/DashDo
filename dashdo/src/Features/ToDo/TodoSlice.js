import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { getAuth } from "firebase/auth";
import {
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  getFirestore,
  collection,
} from "firebase/firestore";
import app from "../../Auth/firebase";

const db = getFirestore(app);

const initialState = {
  value: [{ id: 10, complete: true, task: "Loading..." }],
  saved: false,
};

export const addTodo = createAsyncThunk("Todo/addTodo", async (Todo) => {
  try {
    await setDoc(
      doc(
        db,
        `users/${getAuth().currentUser.uid}/dashdo/Todo/task/${Todo.id}`
      ),
      Todo
    );
    return Todo;
  } catch (e) {
    return Todo;
  }
});

export const fetchTodos = createAsyncThunk("Todo/fetchTodos", async () => {
  const querySnapshot = await getDocs(
    collection(
      getFirestore(app),
      `users/${getAuth().currentUser.uid}/dashdo/Todo/task`
    )
  );

  let TodoUpdateArray = [];
  querySnapshot.forEach((doc) => {
    TodoUpdateArray.push(doc.data());
  });
  return TodoUpdateArray;
});

export const deleteTask = createAsyncThunk("Todo/deleteTodo", async (id) => {
  try {
    await deleteDoc(
      doc(db, `users/${getAuth().currentUser.uid}/dashdo/Todo/task`, id)
    );
    return id;
  } catch (error) {
    return id;
  }
});

export const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.value = state.value.filter((item) => item.id !== action.payload);
      });
  },
});

export const selectTodo = (state) => state.Todo.value;

export default TodoSlice.reducer;