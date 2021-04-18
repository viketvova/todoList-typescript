type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const INCREMENT_AGE = 'INCREMENT-AGE'
export const CHANGE_NAME = 'CHANGE_NAME'
export const INCREMENT_CHILDREN_COUNT = 'INCREMENT-CHILDREN-COUNT'

export const userReducer = (state: StateType, action: ActionType): StateType => {

    switch (action.type) {
        case INCREMENT_AGE:
            return {
                ...state, age: state.age + 1
            }
        case INCREMENT_CHILDREN_COUNT:
            return {
                ...state, childrenCount: state.childrenCount + 1
            }
        case CHANGE_NAME:
            return {
                ...state, name: action.newName
            }
        default:
            throw new Error(`I don't understand this action type`)
    }
}