import React from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {EditTaskType} from "./App";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type AddTaskType = (event: string, todoListId: string) => void
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
    editTask: EditTaskType
    editTodoListTitle: (event: string, todoListId: string) => void
}


export function TodoList(props: TodoListProps) {


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

    const addTask = (title: string): void => {
        props.addTask(title, props.todoListId)
    }

    const onChangeTodoListTitle = (title: string): void => {
        props.editTodoListTitle(title, props.todoListId)
    }

    const tasks = props.tasks.map(elem => {
        const deleteTaskHandler = (): void => {
            props.deleteTask(elem.id, props.todoListId)
        }
        const returnIsDoneValue = (): void => {
            props.isDoneHandler(elem.id, props.todoListId)
        }

        const onChangeTitleHandler = (title: string): void => {
            props.editTask(title, props.todoListId, elem.id)
        }

        return (

            <li key={elem.id}>
                <input type="checkbox" checked={elem.isDone} onChange={returnIsDoneValue}/>
                <EditableSpan
                    className={elem.isDone ? 'isDone' : ''}
                    title={elem.title}
                    onChange={onChangeTitleHandler}
                />
                <button onClick={deleteTaskHandler}>x</button>
            </li>
        )
    })
    return (
        <div>
            <h3>
                <EditableSpan
                    className={''}
                    title={props.title}
                    onChange={onChangeTodoListTitle}
                />
                <button onClick={deleteTable}>X</button>

            </h3>
            <AddItemForm addItem={addTask}/>
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
