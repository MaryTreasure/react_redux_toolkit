import { Button, Input } from 'antd'
import React, { ChangeEvent, FC } from 'react';

interface IInputFieldProps {
    textHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    text: string,
}

const InputField: FC<IInputFieldProps> = ({textHandler, text}): JSX.Element => {
  return (

    <>
    <Input value={text} placeholder="Enter the text" onChange={textHandler} />
    <Button>Add Todo</Button>
    </>
  )
}

export default InputField