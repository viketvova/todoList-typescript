import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)


// @ts-ignore
window.store = store