import React, {ChangeEvent, useState} from "react";
import { TextField } from "@material-ui/core";

type EditableSpanType = {
    title: string
    className: string
    onChange: (value: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log('Editable span')
    let [mode, setMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>('')

    const editModeHandler = () => {
        setMode(true)
        setTitle(props.title)
    }
    const cancelEditModeHandler = () => {
        setMode(false)
        props.onChange(title)
     }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setTitle(event.target.value)
     }

    return(
            mode
                ? <TextField label="Change value" value={title} onBlur={cancelEditModeHandler} autoFocus onChange={onChangeHandler}/>
                : <span className={props.className} onDoubleClick={editModeHandler}>{props.title}</span>
        )
})