import { List } from "antd";
import React, { FC } from "react";
import { ITodos } from "../../widgets/Todo/Todo";
import ListItem from "../../entities/ListItem/ListItem";

interface ITodoListProps {
  todos: ITodos[];
  onChange: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList: FC<ITodoListProps> = ({
  todos,
  onChange,
  removeTodo,
}): JSX.Element => {
  return (
    <List
      dataSource={todos}
      renderItem={(item) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <ListItem item={item} onChange={onChange} removeTodo={removeTodo} />
        </div>
      )}
    />
  );
};

export default TodoList;
