import {v1} from "uuid";
import {TasksType} from "../App";

export const DELETE_TASK = 'DELETE-TASK'
export const ADD_TASK = 'ADD_TASK'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const EDIT_TASK = 'EDIT_TASK'
export type DeleteTaskType = { type: 'DELETE-TASK', todoListId: string, id: string }
export type AddTaskType = { type: 'ADD_TASK', todoListId: string, title: string }
export type EditTaskType = {type: 'EDIT_TASK', todoListId: string, id: string, title: string}
export type ChangeTaskType = {type: 'CHANGE_STATUS', todoListId: string, id: string}
type ActionType = DeleteTaskType | AddTaskType | EditTaskType | ChangeTaskType


type RootTasksType = {
    [key: string]: TasksType,
}


const todoListId1 = v1()
const todoListId2 = v1()

export const initialState: RootTasksType = {
    [todoListId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: true},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [todoListId2]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: true},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
}

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
                if(el.id === action.id) el.title = action.title
            })
            return editedTask
        case CHANGE_STATUS:
            let changedTaskStatus = {...state}
            changedTaskStatus[action.todoListId].map(el => el.id === action.id ? el.isDone = !el.isDone : el.isDone)
            return changedTaskStatus
        default:
            throw new Error(`I don't understand u`)
    }
}

export const deleteTaskAC = (todoListId: string, id: string): DeleteTaskType => ({
    type: DELETE_TASK,
    todoListId,
    id
})

export const addTaskAC = (todoListId: string, title: string): AddTaskType => ({
    type: ADD_TASK,
    todoListId,
    title
})

export const editTaskAC = (todoListId: string, id: string, title: string): EditTaskType => ({
    type: EDIT_TASK,
    todoListId,
    id,
    title
})

export const changeStatusAC = (todoListId: string, id: string): ChangeTaskType => ({
    type: CHANGE_STATUS,
    todoListId,
    id
})