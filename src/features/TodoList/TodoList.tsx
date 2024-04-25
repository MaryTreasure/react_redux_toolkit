import { List } from "antd";
import React, { FC } from "react";
import { ITodos } from "../../widgets/Todo/Todo";
import ListItem from "../../entities/ListItem/ListItem";
import { useSelector } from "react-redux";
import { ITodosInitialState } from "../../redux/slices/todo-slice";

interface ITodoListProps {
  onChange: (id: number) => void;
  removeTodo: (id: number) => void;
}
interface ITodosState {
  todos: ITodosInitialState;
}

const TodoList: FC<ITodoListProps> = ({
  onChange,
  removeTodo,
}): JSX.Element => {

  const todos = useSelector<ITodosState>(state => state.todos.todos)
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
