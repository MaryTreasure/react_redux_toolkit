import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITodos } from "../../widgets/Todo/Todo";
import { title } from "process";

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

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Can't delete task. Server error");
      }
      dispatch(removeTodo(id));
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.list.find((todo) => todo.id === id);
    try {
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
        throw new Error("Can't toggle task. Server error");
      }
      dispatch(toggleTodoComplete(id))
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function (title, {rejectWithValue, dispatch}) {
    try {
      const todo = {
        title,
        userId: 1,
        completed: false,
      }
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify(todo),
        });

        if (!response.ok) {
          throw new Error("Can't add task. Server error");
        };

        const data = await response.json();
        dispatch(addTodo(data))
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
)

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
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
