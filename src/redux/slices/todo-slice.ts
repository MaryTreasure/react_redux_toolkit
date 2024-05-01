import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITodos } from "../../widgets/Todo/Todo";

export interface ITodosInitialState {
  list: ITodos[];
  loading: boolean;
  error: null | string;
}

const initialState: ITodosInitialState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<
  ITodos[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  if (!response.ok) {
    return rejectWithValue("Server Error");
  }
  const data = await response.json();
  return data;
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      });
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    toggleTodoComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.list.find((todo) => todo.id === action.payload);
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo?.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
