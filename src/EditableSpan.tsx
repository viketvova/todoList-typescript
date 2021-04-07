import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    className: string
    onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanType) {

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
                ? <input value={title} onBlur={cancelEditModeHandler} autoFocus onChange={onChangeHandler}/>
                : <span className={props.className} onDoubleClick={editModeHandler}>{props.title}</span>
        )
}