import { Button, Checkbox, List } from "antd";
import React, { FC } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { ITodos } from "../../widgets/Todo/Todo";

interface IListItemProps {
  item: ITodos;
  removeTodo: (id: number) => void;
  onChange: (id: number) => void;
}

const ListItem: FC<IListItemProps> = ({
  item,
  removeTodo,
  onChange,
}): JSX.Element => {
  return (
    <>
      <Checkbox onChange={() => onChange(item.id)} checked={item.completed} />
      <List.Item>{item.text}</List.Item>{" "}
      <Button
        type="text"
        onClick={() => removeTodo(item.id)}
        icon={<CloseOutlined />}
      />
    </>
  );
};

export default ListItem;
