import React, {useEffect, useState} from 'react'
import {TasksAPI, TodolistsAPI} from "../api/todolists-API";
import axios from "axios";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsAPI.getTodolists()
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = '123'
        TodolistsAPI.createTodolist(title)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b1257ce2-5cce-46b9-af04-b2a0a55466c9'
        TodolistsAPI.deleteTodolist(todolistId)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '9452313b-c839-4b1a-8462-cd406077d4de'
        const title = 'Well done!'
        TodolistsAPI.updateTodolist(todolistId, title)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [tasks, setTasks] = useState({})

    useEffect(() => {
        TasksAPI.getTasks('8dc63696-0742-432a-8756-cd0f8e9a11eb')
            .then(res => {
                setTasks(res.data)
            })
    }, [])

    return <div> {JSON.stringify(tasks)}</div>
}

export const CreateTask = () => {
    const [tasks, setTasks] = useState({})
    const todolistId = '8dc63696-0742-432a-8756-cd0f8e9a11eb'
    const taskTitle = 'New Task'
    useEffect(() => {
        TasksAPI.createTask(todolistId, taskTitle)
            .then(res => {
                setTasks(res.data)
            })
    }, [])

    return <div>{JSON.stringify(tasks)}</div>
}

export const DeleteTask = () => {
    const [tasks, setTasks] = useState({})
    const todolistId = '8dc63696-0742-432a-8756-cd0f8e9a11eb'
    const taskId = '6d9cc630-96d2-43af-9a9d-b35ddf00f0ee';

    useEffect(() => {
        TasksAPI.deleteTask(todolistId, taskId)
            .then(response => {
                setTasks(response.data)
            })
    }, [])
    return <div>{JSON.stringify(tasks)}</div>
}

export const UpdateTask = () => {
    const [tasks, setTasks] = useState({})
    const todolistId = '8dc63696-0742-432a-8756-cd0f8e9a11eb';
    const taskId = '052219fe-f35a-4c7d-be7d-ae48cb1de31d';
    const taskTitle = 'Updated title'
    useEffect(() => {
        TasksAPI.updateTask(todolistId, taskId, taskTitle)
            .then(response => {
                setTasks(response.data)
            })
    }, [])
    return <div>{JSON.stringify(tasks)}</div>
}