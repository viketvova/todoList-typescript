import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@material-ui/core/Button';
import {TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<boolean>(false)
    console.log('Additemform is called')
    function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value)
    }

    function onClickHandler() {
        if (!value.trim()) setError(true)
        props.addItem(value)
        setValue('')
    }

    function onKeyPressHandler(key: KeyboardEvent<HTMLInputElement>): void {
       if(error)setError(false)
        if (key.charCode === 13) {
            props.addItem(value)
            setValue('')
        }
    }

    return (
        <div>
            <TextField
                label="Add task"
                type="search"
                variant="outlined"
                size="small"
                error={!!error}
                helperText={error && 'Title is required'}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                value={value}
            />
            <Button variant="contained" color="primary" onClick={onClickHandler}>Add</Button>

        </div>
    )
})