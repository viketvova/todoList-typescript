import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";


export type TasksType = {
    id: string, title: string, isDone: boolean
}[]
type ObjTasks = { todoListId1: TasksType, todoListId2: TasksType }
type TodoListType = { id: string, title: string, filter: string }
function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasks, setTasks] = useState<any>({
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
    )

    const [newTasks, setNewTasks] = useState<Array<TodoListType>>(
        [
            {id: todoListId1, title: 'What to learn?', filter: 'Completed'},
            {id: todoListId2, title: 'What to eat?', filter: 'All'},
        ])

    const deleteTable = (todoListId: string) => {
        let filterTasks = newTasks.filter(elem => elem.id !== todoListId)
        setNewTasks(filterTasks)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function addTask(event: string, todoListId: string, error: boolean): void {
        let b = tasks[todoListId]
        if (event.trim() !== '') {
            let newT = {id: v1(), title: event.trim(), isDone: false}
            tasks[todoListId] = [newT, ...b]
            setTasks({...tasks})
        }
    }

    function deleteTask(id: string, todoListId: string): void {
        let t = tasks[todoListId].filter((elem: any) => elem.id !== id)
        tasks[todoListId] = t
        setTasks({...tasks})
    }

    function tasksCompleted(completed: string, todoListId: string): void {
        let b = newTasks.find(elem => elem.id === todoListId)
        if (b) b.filter = completed
        setNewTasks([...newTasks])

    }

    function isDoneHandler(id: string, todoListId: string): void {
        let newT = tasks[todoListId]
        newT.map((elem: any) => {
            if (elem.id === id) elem.isDone = !elem.isDone
        })
        tasks[todoListId] = newT
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {
                newTasks.map(t => {

                    let todoListTasks: TasksType = tasks[t.id]
                    if (t.filter === 'Active') todoListTasks = todoListTasks.filter(elem => elem.isDone === false)
                    if (t.filter === 'Completed') todoListTasks = todoListTasks.filter(elem => elem.isDone === true)
                    return (
                        <TodoList
                            key={t.id}
                            todoListId={t.id}
                            title={t.title}
                            tasks={todoListTasks}
                            deleteTask={deleteTask}
                            tasksCompleted={tasksCompleted}
                            addTask={addTask}
                            isDoneHandler={isDoneHandler}
                            filter={t.filter}
                            deleteTable={deleteTable}
                        />
                    )
                })
            }


        </div>
    )
}

export default App;
