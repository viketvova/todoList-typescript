import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from './AddItemForm';

export type EditTaskType = (event: string, todoListId: string, id: string) => void
export type TasksType = {
    id: string, title: string, isDone: boolean
}[]

type RootTasksType = {
    [key: string]: TasksType,
}

type TodoListType = { id: string, title: string, filter: string }

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasks, setTasks] = useState<RootTasksType>({
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
            {id: todoListId1, title: 'What to learn?', filter: 'All'},
            {id: todoListId2, title: 'What to eat?', filter: 'All'},
        ])

    const deleteTable = (todoListId: string) => {
        let filterTasks = newTasks.filter(elem => elem.id !== todoListId)
        setNewTasks(filterTasks)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function addTask(event: string, todoListId: string): void {
        let b = tasks[todoListId]
        if (event.trim() !== '') {
            let newT = {id: v1(), title: event.trim(), isDone: false}
            tasks[todoListId] = [newT, ...b]
            setTasks({...tasks})
        }
    }

    function editTask(event: string, todoListId: string, id: string): void {
        let newTasks = tasks[todoListId]
        newTasks.map(elem => {
            if (elem.id === id) elem.title = event
        })
        tasks[todoListId] = newTasks
        setTasks({...tasks})
    }

    function editTodoListTitle(event: string, todoListId: string): void {
        let newTodo = [...newTasks]
        let newTodoList = newTodo.find(elem => elem.id === todoListId)
        if (newTodoList) {
            newTodoList.title = event
            setNewTasks([...newTodo])
        }


    }

    function deleteTask(id: string, todoListId: string): void {
        let task = tasks[todoListId].filter((elem: any) => elem.id !== id)
        tasks[todoListId] = task
        setTasks({...tasks})
    }

    function tasksCompleted(completed: string, todoListId: string): void {
        let newTask = newTasks.find(elem => elem.id === todoListId)
        if (newTask) newTask.filter = completed
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

    function addItem(title: string) {
        let newT = [...newTasks]
        let newTodoList = {id: v1(), title: title, filter: 'All'}
        newT.push(newTodoList)
        setNewTasks(newT)
        setTasks({
            ...tasks,
            [newTodoList.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addItem}/>
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
                            editTask={editTask}
                            editTodoListTitle={editTodoListTitle}
                        />
                    )
                })
            }


        </div>
    )
}

export default App;
