import {
    todolistReducer,
    RemoveTodolistAC,
    AddTodolistAC,
    ChangeTodolistTitleAC,
    ChangeTodolistFilterAC
} from "./todolists-reducer"
import {v1} from "uuid"
import {TodoListType} from "../App";

test('correct todolist should be removed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn?', filter: 'All'},
        {id: todoListId2, title: 'What to eat?', filter: 'All'},
    ]

    const endState = todolistReducer(startState, RemoveTodolistAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('you should add todolist', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn?', filter: 'All'},
        {id: todoListId2, title: 'What to eat?', filter: 'All'},
    ]

    const endState = todolistReducer(startState, AddTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe('All')
})

test('Todolist title should be change', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTitle = 'New'

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn?', filter: 'All'},
        {id: todoListId2, title: 'What to eat?', filter: 'All'},
    ]

    const endState = todolistReducer(startState, ChangeTodolistTitleAC(todoListId2, newTitle))

    expect(endState[0].title).toBe('What to learn?')
    expect(endState[1].title).toBe(newTitle)
})

test('Change filter of Todolist', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newFilter = 'Active'

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to learn?', filter: 'All'},
        {id: todoListId2, title: 'What to eat?', filter: 'All'},
    ]

    const action = ChangeTodolistFilterAC(todoListId2, newFilter)

    const endState = todolistReducer(startState, action)

    expect(endState[1].filter).toBe(newFilter)
    expect(endState[0].filter).toBe('All')
})
