import React, { ChangeEvent, useEffect, useState } from "react";
import InputField from "../../features/InputField/InputField";
import TodoList from "../../features/TodoList/TodoList";
import { useAppDispatch } from "../../redux/hooks";
import { addTodo, fetchTodos } from "../../redux/slices/todo-slice";

export interface ITodos {
  id: string;
  title: string;
  completed: boolean;
}


const Todo = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const addTask = () => {dispatch(addTodo(text));
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
      <TodoList />
    </>
  );
};

export default Todo;
