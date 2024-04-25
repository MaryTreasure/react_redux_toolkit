import { Button, Input } from 'antd'
import React, { ChangeEvent, FC } from 'react';

interface IInputFieldProps {
    textHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    text: string,
    addTodo: () => void

}

const InputField: FC<IInputFieldProps> = ({textHandler, text, addTodo}): JSX.Element => {
  return (

    <>
    <Input value={text} placeholder="Enter the text" onChange={textHandler} />
    <Button onClick={addTodo}>Add Todo</Button>
    </>
  )
}

export default InputField