import React, { ChangeEvent, useEffect, useState } from "react";
import InputField from "../../features/InputField/InputField";
import TodoList from "../../features/TodoList/TodoList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addNewTodo, fetchTodos } from "../../redux/slices/todo-slice";

export interface ITodos {
  id: string;
  title: string;
  completed: boolean;
}


const Todo = () => {
  const [text, setText] = useState("");
  const {error, loading} = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const addTask = () => {dispatch(addNewTodo(text));
    setText('')
  }


  const textHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.log(text);
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch])

  return (
    <>
      <InputField textHandler={textHandler} text={text} handleSubmit={addTask}/>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <TodoList />
    </>
  );
};

export default Todo;
