import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { Button, Checkbox, CheckboxProps, Input, List } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface ITodos {
  id: number;
  text: string;
  completed: boolean;
}

let todoId = 1;

function App() {
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

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      <Input value={text} placeholder="Enter the text" onChange={textHandler} />
      <Button onClick={addTodo}>Add Todo</Button>

      <List
        dataSource={todos}
        renderItem={(item) => (
          <div style={{ display: "flex", gap: "10px" }}>
            <Checkbox onChange={onChange}></Checkbox>
            <List.Item>{item.text}</List.Item>{" "}
            <Button
              type="text"
              onClick={() => removeTodo(item.id)}
              icon={<CloseOutlined />}
            ></Button>
          </div>
        )}
      />
    </>
  );
}

export default App;
