import React, { ChangeEvent, FC, useState } from 'react';
import { Button} from "antd";
import InputField from '../../features/InputField/InputField';
import TodoList from '../../features/TodoList/TodoList';

export interface ITodos {
    id: number;
    text: string;
    completed: boolean;
  }
  
  let todoId = 1;

const TodoPage: FC = (): JSX.Element => {
    const [todos, setTodos] = useState<ITodos[]>([]);
    const [text, setText] = useState("");
  
    const addTodo = () => {
      if (text.trim().length) {
        setTodos([
          ...todos,
          {
            id: ++todoId,
            text,
            completed: false,
          },
        ]);
        setText("");
      }
    };
  
    const removeTodo = (id: number) => {
      setTodos(todos.filter((item) => item.id !== id));
    };
  
  
  
    const textHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      console.log(text);
    };
  
    const onChange = (id: number) => {
      setTodos(
        todos.map((todo) => {
          if(todo.id !== id) return todo;
          return {
            ...todo,
            completed: !todo.completed
          }
        })
      )
    };
  
    return (
      <>
        <InputField textHandler={textHandler} text={text}/>
        <Button onClick={addTodo}>Add Todo</Button>
  
        <TodoList todos={todos} onChange={onChange} removeTodo={removeTodo}/>
      </>
    );
}

export default TodoPage