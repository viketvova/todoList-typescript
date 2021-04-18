import React from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {EditTaskType} from "./App";
import Delete from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {FormControlLabel, CheckboxProps, Checkbox, withStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type AddTaskType = (event: string, todoListId: string) => void
export type TodoListProps = {
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


const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

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

            <div key={elem.id}>
                <FormControlLabel
                    control={<GreenCheckbox checked={elem.isDone} onChange={returnIsDoneValue}/>}
                    label=''
                />
                <EditableSpan
                    className={elem.isDone ? 'isDone' : ''}
                    title={elem.title}
                    onChange={onChangeTitleHandler}
                />
                <IconButton onClick={deleteTaskHandler}>
                    <Delete/>
                </IconButton>
            </div>
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

                <IconButton onClick={deleteTable}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasks}
            </div>
            <div style={{margin: '10px'}}>
                <Button
                    variant={props.filter === 'All' ? 'contained' : 'text'}
                    onClick={onClickAll}>All</Button>
                <Button
                    color='primary' variant={props.filter === 'Active' ? 'contained' : 'text'}
                    onClick={onClickActive}>Active</Button>
                <Button
                    color='secondary'
                    variant={props.filter === 'Completed' ? 'contained' : 'text'}
                    onClick={onClickCompleted}>Completed</Button>
            </div>
        </div>
    )
}
