import {TodoListType} from "../App";
import {v1} from "uuid";


export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'

export type RemoveTodolistType = { type: 'REMOVE_TODOLIST', todoListId: string }
export type AddTodolistType = { type: 'ADD_TODOLIST', title: string }
export type ChangeTodolistTitleType = { type: 'CHANGE_TODOLIST_TITLE', id: string, title: string }
export type ChangeTodolistFilterType = { type: 'CHANGE_TODOLIST_FILTER', id: string, filter: string }

export type ActionType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

export const todolistReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {

    switch (action.type) {
        case REMOVE_TODOLIST:
            return [
                ...state.filter(elem => elem.id !== action.todoListId)
            ]
        case ADD_TODOLIST:
            return [
                ...state, {id: v1(), title: action.title, filter: 'All'}
            ]
        case CHANGE_TODOLIST_TITLE:
            let newTodo = [...state]
            let newTodoList = newTodo.find(elem => elem.id === action.id)
            if (newTodoList) {
                newTodoList.title = action.title
            }
            return [...state]
        case CHANGE_TODOLIST_FILTER:
            let newState = [...state]
            newState.map(el => {
                if (el.id === action.id) el.filter = action.filter
            })
            return [...state]
        default:
            throw new Error(`I don't understand this action type`)
    }
}

export const RemoveTodolistAC = (todoListId: string): RemoveTodolistType => {
    return {
        type: REMOVE_TODOLIST,
        todoListId: todoListId
    }
}
export const AddTodolistAC = (title: string): AddTodolistType => {
    return {
        type: ADD_TODOLIST,
        title: title
    }
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        id: id,
        title: title
    }
}
export const ChangeTodolistFilterAC = (id: string, filter: string): ChangeTodolistFilterType => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        id: id,
        filter: filter
    }
}