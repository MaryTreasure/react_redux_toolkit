import { List } from "antd";
import React, { FC } from "react";
import { ITodos } from "../../widgets/Todo/Todo";
import ListItem from "../../entities/ListItem/ListItem";
import { useAppSelector } from "../../redux/hooks";




const TodoList: FC= (): JSX.Element => {

  const todos = useAppSelector(state => state.todos.list);

  return (
    <List
      dataSource={todos}
      renderItem={(item: ITodos) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <ListItem item={item} id={item.id} />
        </div>
      )}
    />
  );
};

export default TodoList;
