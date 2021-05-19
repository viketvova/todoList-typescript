import {v1} from "uuid";
import {TasksType} from "../App";
import {ADD_TODOLIST, AddTodolistType, REMOVE_TODOLIST, RemoveTodolistType} from "./todolists-reducer";

export const DELETE_TASK = 'DELETE-TASK'
export const ADD_TASK = 'ADD_TASK'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const EDIT_TASK = 'EDIT_TASK'
export const NEW_TODOLIST_TASK = 'NEW_TODOLIST_TASK'
export type NewTodolistTaskType = { type: 'NEW_TODOLIST_TASK', title: string }
export type DeleteTaskType = { type: 'DELETE-TASK', todoListId: string, id: string }
export type AddTaskType = { type: 'ADD_TASK', todoListId: string, title: string }
export type EditTaskType = { type: 'EDIT_TASK', todoListId: string, id: string, title: string }
export type ChangeTaskType = { type: 'CHANGE_STATUS', todoListId: string, id: string }
type ActionType = DeleteTaskType | AddTaskType | EditTaskType | ChangeTaskType | NewTodolistTaskType | AddTodolistType | RemoveTodolistType


export type RootTasksType = {
    [key: string]: TasksType,
}

export const initialState: RootTasksType = {}

export let tasksReducer = (state: RootTasksType = initialState, action: ActionType): RootTasksType => {
    switch (action.type) {
        case DELETE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.id)
            }
        case ADD_TASK:
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        case EDIT_TASK:
            let editedTask = {...state}
            editedTask[action.todoListId].map(el => {
                if (el.id === action.id) el.title = action.title
            })
            return editedTask
        case CHANGE_STATUS:
            let changedTaskStatus = state[action.todoListId]
            let task = changedTaskStatus.find(el => el.id === action.id)
            if(task) {
                task.isDone = !task.isDone
            }
            state[action.todoListId] = [...changedTaskStatus]
            return {...state}
        case ADD_TODOLIST:
            return {
                ...state,
                [action.id]: []
            }
        case REMOVE_TODOLIST:
            let copyState = {...state}
            delete copyState[action.todoListId]
            return {
                ...copyState
            }
        default:
            return state
    }
}

export const deleteTaskAC = (id: string, todoListId: string): DeleteTaskType => ({
    type: DELETE_TASK,
    todoListId,
    id
})

export const addTaskAC = (title: string, todoListId: string): AddTaskType => ({
    type: ADD_TASK,
    todoListId,
    title
})

export const editTaskAC = (title: string, todoListId: string, id: string): EditTaskType => ({
    type: EDIT_TASK,
    todoListId,
    id,
    title
})

export const changeStatusAC = (id: string, todoListId: string): ChangeTaskType => ({
    type: CHANGE_STATUS,
    todoListId,
    id
})
