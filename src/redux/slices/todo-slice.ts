import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodos } from "../../widgets/Todo/Todo";

let todoId = 1;

export interface ITodosInitialState {
  list: ITodos[];
}

const initialState: ITodosInitialState = {
  list: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: ++todoId,
        text: action.payload,
        completed: false,
      });
    },
    removeTodo(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.list.find(
        (todo) => todo.id === action.payload.id
      );
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo?.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
