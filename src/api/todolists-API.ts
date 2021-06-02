import axios from "axios";

export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd6fa573c-41c6-4fab-93a0-f168585eaeeb'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    ...settings
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type ResponseType<D> = {
    fieldErrors: string []
    messages: string[]
    resultCode: number
    data: D
}

export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksType = {
    error: null
    totalCount: number
    items: TasksType[]
}

export const TodolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('/todo-lists')
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<Array<ResponseType<{ item: TodolistType }>>>('/todo-lists', {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title: title})
        return promise
    }
}

export const TasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<Array<ResponseType<{ item:TasksType }>>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<TasksType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    }
}