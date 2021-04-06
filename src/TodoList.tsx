import React, {useState, KeyboardEvent, ChangeEvent} from "react";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
type AddTaskType = (event: string, todoListId: string, error: boolean) => void
type TodoListProps = {
    title: string,
    tasks: Array<TaskType>
    deleteTask: (id: string, todoListId: string) => void
    tasksCompleted: (completed: string, todoListId: string) => void
    addTask: AddTaskType
    isDoneHandler: (id: string, todoListId: string) => void
    filter: string
    todoListId: string
    deleteTable: (todoListId: string) => void
}


export function TodoList(props: TodoListProps) {

    const [value, setValue] = useState('')
    const [error, setError] = useState<boolean>(false)

    function onClickHandler() {
        if(!value.trim()) setError(true)
        props.addTask(value, props.todoListId, error)
        setValue('')
    }


    function onKeyPressHandler(key: KeyboardEvent<HTMLInputElement>): void {
       setError(false)
        if (key.charCode === 13) {
            props.addTask(value, props.todoListId, error)
            setValue('')
        }
    }

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
        setValue(event.target.value)
    }

    function onClickAll(): void {
        props.tasksCompleted('All', props.todoListId)
    }

    function onClickActive(): void {
        props.tasksCompleted('Active', props.todoListId)
    }

    function onClickCompleted(): void {
        props.tasksCompleted('Completed', props.todoListId)
    }

    function deleteTable(): void {
        props.deleteTable(props.todoListId)
    }

    const tasks = props.tasks.map(elem => {
        const deleteTaskHandler = (): void => {
            props.deleteTask(elem.id, props.todoListId)
        }
        const returnIsDoneValue = (): void => {
            props.isDoneHandler(elem.id, props.todoListId)
        }
        return (

            <li key={elem.id}>
                <input type="checkbox" checked={elem.isDone} onChange={returnIsDoneValue}/>
                <span className={elem.isDone ? 'isDone' : ''}>{elem.title}</span>
                <button onClick={deleteTaskHandler}>x</button>
            </li>
        )
    })
    return (
        <div>

            <h3>{props.title}
                <button onClick={deleteTable}>X</button>
            </h3>
            <div>
                <input className={error ? 'error' : ''} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       value={value}/>
                <button onClick={onClickHandler}>+</button>
                {error ? <div className='error-message'>This is bad idea</div> : null}
            </div>
            <ul>
                {tasks}

            </ul>
            <div>
                <button className={props.filter === 'All' ? 'checked' : ''} onClick={onClickAll}>All</button>
                <button className={props.filter === 'Active' ? 'checked' : ''} onClick={onClickActive}>Active</button>
                <button className={props.filter === 'Completed' ? 'checked' : ''} onClick={onClickCompleted}>Completed
                </button>
            </div>
        </div>
    )
}