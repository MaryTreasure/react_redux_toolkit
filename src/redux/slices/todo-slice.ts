import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodos } from "../../widgets/Todo/Todo";


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
        id: new Date().toISOString(),
        text: action.payload,
        completed: false,
      });
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    toggleTodoComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.list.find(
        (todo) => todo.id === action.payload
      );
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo?.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
