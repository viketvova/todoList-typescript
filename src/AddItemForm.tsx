import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
    const [value, setValue] = useState('')
    const [error, setError] = useState<boolean>(false)

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value)
    }

    function onClickHandler() {
        if (!value.trim()) setError(true)
        props.addItem(value)
        setValue('')
    }

    function onKeyPressHandler(key: KeyboardEvent<HTMLInputElement>): void {
        setError(false)
        if (key.charCode === 13) {
            props.addItem(value)
            setValue('')
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   value={value}/>
            <button onClick={onClickHandler}>+</button>
            {error ? <div className='error-message'>This is bad idea</div> : null}
        </div>
    )
}