import {
  PayloadAction,
  UnknownAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
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

export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTodo", async function (id, { rejectWithValue }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    return rejectWithValue("Can't delete task. Server error");
  }

  return id;
});

export const toggleStatus = createAsyncThunk<
  ITodos,
  string,
  { rejectValue: string; state: { todos: ITodosInitialState } }
>("todos/toggleStatus", async function (id, { rejectWithValue, getState }) {
  const todo = getState().todos.list.find((todo) => todo.id === id);

  if (todo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      }
    );
    if (!response.ok) {
      return rejectWithValue("Can't toggle task. Server error");
    }

    return (await response.json()) as ITodos;
  }

  return rejectWithValue("No such todo in the list!");
});

export const addNewTodo = createAsyncThunk<
  ITodos,
  string,
  { rejectValue: string }
>("todos/addNewTodo", async function (title, { rejectWithValue }) {
  const todo = {
    title,
    userId: 1,
    completed: false,
  };
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    return rejectWithValue("Can't add task. Server error");
  }

  return (await response.json()) as ITodos;
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(toggleStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggledTodo = state.list.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.completed = !toggledTodo.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      // Rejected for all the cases
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;

function isError(action: UnknownAction) {
  return action.type.endsWith("rejected");
}
