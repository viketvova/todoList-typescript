import {EditTaskType} from "./App";
import {Checkbox, CheckboxProps, FormControlLabel, withStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import React, {useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import {TaskType} from "./TodoList";

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
type TaskPropsType = {
    deleteTask: (id: string, todoListId: string) => void
    isDoneHandler: (id: string, todoListId: string) => void
    editTask: EditTaskType
    task: TaskType
    todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const deleteTaskHandler = useCallback((): void => {
        props.deleteTask(props.task.id, props.todoListId)
    }, [props.deleteTask, props.task.id, props.todoListId])
    const returnIsDoneValue = useCallback((): void => {
        props.isDoneHandler(props.task.id, props.todoListId)
    }, [ props.isDoneHandler, props.task.id, props.todoListId])

    const onChangeTitleHandler = useCallback((title: string): void => {
        props.editTask(title, props.todoListId, props.task.id)
    }, [props.editTask, props.todoListId, props.task.id])

    return (

        <div key={props.task.id}>
            <FormControlLabel
                control={<GreenCheckbox checked={props.task.isDone} onChange={returnIsDoneValue}/>}
                label=''
            />
            <EditableSpan
                className={props.task.isDone ? 'isDone' : ''}
                title={props.task.title}
                onChange={onChangeTitleHandler}
            />
            <IconButton onClick={deleteTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )

} )