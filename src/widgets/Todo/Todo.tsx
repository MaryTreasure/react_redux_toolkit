import React, { ChangeEvent, useState } from "react";
import InputField from "../../features/InputField/InputField";
import TodoList from "../../features/TodoList/TodoList";
import { useAppDispatch } from "../../redux/hooks";
import { addTodo } from "../../redux/slices/todo-slice";

export interface ITodos {
  id: number;
  text: string;
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

  const onChange = (id: number) => {
    /* setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          completed: !todo.completed,
        };
      })
    ); */
  };
  return (
    <>
      <InputField textHandler={textHandler} text={text} handleSubmit={addTask}/>
      <TodoList onChange={onChange} />
    </>
  );
};

export default Todo;
