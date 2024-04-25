import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todo-slice'




export default configureStore({
    reducer: {
        todos: todoReducer,
    }
});


