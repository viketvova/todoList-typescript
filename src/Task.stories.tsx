import React from "react";
import { action } from "@storybook/addon-actions";
import {Meta} from "@storybook/react/types-6-0";
import { Task } from "./Task";

export default  {
    title: 'Task Component',
    component: Task,
    } as Meta


export const TaskExample = () => {
    return (
        <>
        <Task
            deleteTask={action('Task deleted')}
            isDoneHandler={action('Status changed')}
            editTask={action('Task was edit')}
            task={{id: '1', isDone: true, title: 'CSS'}}
            todoListId={'todolistId1'}
        />
    <Task
        deleteTask={action('Task deleted')}
        isDoneHandler={action('Status changed')}
        editTask={action('Task was edit')}
        task={{id: '2', isDone: false, title: 'JS'}}
        todoListId={'todolistId2'}
    />
        </>
    )
}