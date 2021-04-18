import {CHANGE_NAME, INCREMENT_AGE, INCREMENT_CHILDREN_COUNT, userReducer} from "./user-reducer";


test('user reducer should increment only age', () => {
    const startState = {age: 1, childrenCount: 1, name: 'Vitaly'}

    const endState = userReducer(startState, {type: INCREMENT_AGE})

    expect(endState.age).toBe(2)
    expect(endState.childrenCount).toBe(1)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 1, childrenCount: 1, name: 'Vitaly'}

    const endState = userReducer(startState, {type: INCREMENT_CHILDREN_COUNT})

    expect(endState.age).toBe(1)
    expect(endState.childrenCount).toBe(2)
})

test('user should change only name of user', () => {
    const startState = {age:1, childrenCount: 1, name: 'Vitaly'}
    const newName = 'Viktor'
    const endState = userReducer(startState, {type: CHANGE_NAME, newName})

    expect(endState.age).toBe(1)
    expect(endState.childrenCount).toBe(1)
    expect(endState.name).toBe('Viktor')
})