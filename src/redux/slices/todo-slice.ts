import { createSlice } from "@reduxjs/toolkit";
import { ITodos } from "../../widgets/Todo/Todo";

let todoId = 1;

export interface ITodosInitialState {
  todos: ITodos[];
}

const initialState: ITodosInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      console.log(state);
      console.log(action);

      state.todos.push({
        id: ++todoId,
        text: action.payload.text,
        completed: false,
      });
    },
    removeTodo(state, action) {},
    toggleTodoComplete(state, action) {},
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
