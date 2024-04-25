import React, { ChangeEvent, useState } from "react";
import InputField from "../../features/InputField/InputField";
import TodoList from "../../features/TodoList/TodoList";

export interface ITodos {
  id: number;
  text: string;
  completed: boolean;
}

let todoId = 1;

const Todo = () => {
  const [text, setText] = useState("");


  const removeTodo = (id: number) => {
    /* setTodos(todos.filter((item) => item.id !== id)); */
  };

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
      <InputField textHandler={textHandler} text={text} addTodo={addTodo} />
      <TodoList onChange={onChange} removeTodo={removeTodo} />
    </>
  );
};

export default Todo;
