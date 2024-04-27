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
      console.log(state);
      console.log(action);

      state.list.push({
        id: ++todoId,
        text: action.payload,
        completed: false,
      });
    },
    removeTodo(state, action) {},
    toggleTodoComplete(state, action) {},
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
