import {RootTasksType} from "../App";
import {
    tasksReducer,
    deleteTaskAC,
    addTaskAC,
    editTaskAC,
    changeStatusAC
} from "./tasks-reducer";
import {v1} from "uuid";

test('You should delete task', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const id = v1()

    let startState: RootTasksType = {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: id, title: 'JS', isDone: false},
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

    let endState = tasksReducer(startState, deleteTaskAC(todoListId1,id))

    expect(endState[todoListId1].length).toBe(4)
    expect(endState[todoListId1][0].title).toBe('HTML&CSS')
    expect(endState[todoListId1][1].title).toBe('ReactJS')
    expect(endState[todoListId2].length).toBe(5)

})

test('Task should be added', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const newTitle = 'NewTitle'

    const startState = {
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

    const endState = tasksReducer(startState, addTaskAC(todoListId2, newTitle))

    expect(endState[todoListId1].length).toBe(5)
    expect(endState[todoListId2].length).toBe(6)
    expect(endState[todoListId2][0].id).toBeDefined()
    expect(endState[todoListId2][0].title).toBe(newTitle)
    expect(endState[todoListId2][0].isDone).toBe(false)
})

test ('Task should be edit', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const test = v1()
    const newTitle = 'New Title'

    const startState = {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: true},
            {id: test, title: 'Rest API', isDone: false},
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

    const endState = tasksReducer(startState, editTaskAC(todoListId1, test, newTitle))

    expect(endState[todoListId1][3].title).toBe(newTitle)
    expect(endState[todoListId1].length).toBe(5)
    expect(endState[todoListId2].length).toBe(5)

})

test ('Task should change status', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const test = v1()

    const startState = {
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
            {id: test, title: 'GraphQL', isDone: false},
        ]
    }

    const endState = tasksReducer(startState, changeStatusAC(todoListId2, test))

    expect(endState[todoListId2][4].isDone).toBe(true)
    expect(endState[todoListId2][0].isDone).toBe(true)
    expect(endState[todoListId2][1].isDone).toBe(false)
    expect(endState[todoListId2][2].isDone).toBe(true)
    expect(endState[todoListId2][3].isDone).toBe(false)

})