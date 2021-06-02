import axios from "axios";

export const settings = {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': 'd6fa573c-41c6-4fab-93a0-f168585eaeeb'
    }
}

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

export const TodolistsAPI = {
    getTodolists() {
        const promise = axios.get<Array<TodolistType>>('/todo-lists', settings)
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post<Array<ResponseType<{item: TodolistType}>>>('/todo-lists', {title: title}, settings)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = axios.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`, settings)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title: title}, settings)
        return promise
    }
}