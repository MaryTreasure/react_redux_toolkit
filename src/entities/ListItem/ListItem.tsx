import { Button, Checkbox, List } from "antd";
import React, { FC } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { ITodos } from "../../widgets/Todo/Todo";
import { useAppDispatch } from "../../redux/hooks";
import { removeTodo, toggleTodoComplete } from "../../redux/slices/todo-slice";

interface IListItemProps {
  id: string
  item: ITodos;
}

const ListItem: FC<IListItemProps> = ({
  item, id
}): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Checkbox onChange={() => dispatch(toggleTodoComplete(id))} checked={item.completed} />
      <List.Item>{item.text}</List.Item>{" "}
      <Button
        type="text"
        onClick={() => dispatch(removeTodo(id))}
        icon={<CloseOutlined />}
      />
    </>
  );
};

export default ListItem;
