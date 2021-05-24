import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {EditTaskType} from "./App";
import Delete from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {Task} from "./Task";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type AddTaskType = (event: string, todoListId: string) => void
export type TodoListProps = {
    title: string,
    tasks: Array<TaskType>
    tasksCompleted: (completed: string, todoListId: string) => void
    addTask: AddTaskType
    filter: string
    todoListId: string
    deleteTable: (todoListId: string) => void
    editTodoListTitle: (event: string, todoListId: string) => void
    deleteTask: (id: string, todoListId: string) => void
    isDoneHandler: (id: string, todoListId: string) => void
    editTask: EditTaskType
}


export const TodoList = React.memo((props: TodoListProps) => {

    console.log('Todolist is called')

    const onClickAll = useCallback((): void => {
        props.tasksCompleted('All', props.todoListId)
    }, [props.tasksCompleted, props.todoListId])

    const onClickActive = useCallback((): void => {
        props.tasksCompleted('Active', props.todoListId)
    }, [props.tasksCompleted, props.todoListId])

    const onClickCompleted = useCallback((): void => {
        props.tasksCompleted('Completed', props.todoListId)
    }, [props.tasksCompleted, props.todoListId])

    const deleteTable = (): void => {
        props.deleteTable(props.todoListId)
    }

    const addTask = useCallback((title: string): void => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const onChangeTodoListTitle = useCallback((title: string): void => {
        props.editTodoListTitle(title, props.todoListId)
    }, [props.editTodoListTitle, props.todoListId])

    let todoListTasks = props.tasks
    if (props.filter === 'Active') todoListTasks = props.tasks.filter((elem: any) => elem.isDone === false)
    if (props.filter === 'Completed') todoListTasks = props.tasks.filter((elem: any) => elem.isDone === true)

    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    onChange={onChangeTodoListTitle}
                />

                <IconButton onClick={deleteTable}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    todoListTasks.map((elem: any) => {
                        return (
                            <Task
                                key={elem.id}
                                deleteTask={props.deleteTask}
                                isDoneHandler={props.isDoneHandler}
                                editTask={props.editTask}
                                task={elem}
                                todoListId={props.todoListId}
                            />
                        )
                    })
                }
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
})

