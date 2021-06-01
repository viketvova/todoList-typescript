import axios from "axios";

export const settings = {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': 'd6fa573c-41c6-4fab-93a0-f168585eaeeb'
    }
}

export const TodolistsAPI = {
    getTodolists() {
        const promise = axios.get('/todo-lists', settings)
        return promise
    },
    createTodolist(title: string){
        const promise = axios.post('/todo-lists', {title: title}, settings)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = axios.delete(`/todo-lists/${todolistId}`, settings)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(`/todo-lists/${todolistId}`, {title: title}, settings)
        return promise
    }
}