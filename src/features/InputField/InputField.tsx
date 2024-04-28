import { Button, Input } from 'antd'
import React, { ChangeEvent, FC } from 'react';

interface IInputFieldProps {
    textHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    text: string,
    handleSubmit: () => void
}

const InputField: FC<IInputFieldProps> = ({textHandler, text, handleSubmit}): JSX.Element => {
  return (

    <>
    <Input value={text} placeholder="Enter the text" onChange={textHandler} />
    <Button onClick={handleSubmit}>Add Todo</Button>
    </>
  )
}

export default InputField