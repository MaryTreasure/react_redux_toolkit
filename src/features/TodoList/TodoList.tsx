import { Button, Checkbox, List } from 'antd'
import React, { FC } from 'react';
import { CloseOutlined } from "@ant-design/icons";
import { ITodos } from '../../pages/TodoPage/TodoPage';

interface ITodoListProps {
    todos: ITodos[];
    onChange: (id: number) => void;
    removeTodo: (id: number) => void

}

const TodoList: FC<ITodoListProps> = ({todos, onChange, removeTodo}) => {
  return (
    <List
    dataSource={todos}
    renderItem={(item) => (
      <div style={{ display: "flex", gap: "10px" }}>
        <Checkbox onChange={() => onChange(item.id)} checked={item.completed} />
        <List.Item>{item.text}</List.Item>{" "}
        <Button
          type="text"
          onClick={() => removeTodo(item.id)}
          icon={<CloseOutlined />}
        />
      </div>
    )}
  />
  )
}

export default TodoList