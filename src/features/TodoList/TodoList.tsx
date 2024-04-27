import { List } from "antd";
import React, { FC } from "react";
import { ITodos } from "../../widgets/Todo/Todo";
import ListItem from "../../entities/ListItem/ListItem";
import { useAppSelector } from "../../redux/hooks";

interface ITodoListProps {
  onChange: (id: number) => void;
  removeTodo: (id: number) => void;
}


const TodoList: FC<ITodoListProps> = ({
  onChange,
  removeTodo,
}): JSX.Element => {

  const todos = useAppSelector(state => state.todos.list)
  return (
    <List
      dataSource={todos}
      renderItem={(item: ITodos) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <ListItem item={item} onChange={onChange} removeTodo={removeTodo} />
        </div>
      )}
    />
  );
};

export default TodoList;
