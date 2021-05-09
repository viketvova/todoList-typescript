import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from './AddItemForm';
import {AppBar, IconButton, Toolbar, Button, Typography, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from './state/todolists-reducer';
import {
    changeStatusAC,
    tasksReducer,
    editTaskAC,
    deleteTaskAC,
    addTaskAC,

} from "./state/tasks-reducer";

export type EditTaskType = (event: string, todoListId: string, id: string) => void
export type TasksType = {
    id: string, title: string, isDone: boolean
}[]

export type RootTasksType = {
    [key: string]: TasksType,
}

export type TodoListType = { id: string, title: string, filter: string }

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

    const [newTasks, dispatchToTodolistReducer] = useReducer(todolistReducer, [
        {id: todoListId1, title: 'What to learn?', filter: 'All'},
        {id: todoListId2, title: 'What to eat?', filter: 'All'},
    ])

    function addTask(event: string, todoListId: string): void {
        dispatchToTasksReducer(addTaskAC(event, todoListId))
    }

    function changeStatus(id: string, todoListId: string): void {
        dispatchToTasksReducer(changeStatusAC(id, todoListId))
    }

    function editTask(event: string, todoListId: string, id: string): void {
        dispatchToTasksReducer(editTaskAC(event, todoListId, id))
    }

    function deleteTask(id: string, todoListId: string): void {
        dispatchToTasksReducer(deleteTaskAC(id, todoListId))
    }

    function tasksCompleted(completed: string, todoListId: string): void {
        dispatchToTodolistReducer(ChangeTodolistFilterAC(completed, todoListId))
    }

    function editTodoListTitle(event: string, todoListId: string): void {
        dispatchToTodolistReducer(ChangeTodolistTitleAC(event, todoListId))
    }

    function addTodoList(title: string) {
        const action = AddTodolistAC(title)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }

    function removeTodolist(todoListId: string) {
        dispatchToTodolistReducer(RemoveTodolistAC(todoListId))
        dispatchToTasksReducer(RemoveTodolistAC(todoListId))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        newTasks.map(t => {

                            let todoListTasks: TasksType = tasks[t.id]
                            if (t.filter === 'Active') todoListTasks = todoListTasks.filter(elem => elem.isDone === false)
                            if (t.filter === 'Completed') todoListTasks = todoListTasks.filter(elem => elem.isDone === true)
                            return (
                                <Grid item key={t.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            key={t.id}
                                            todoListId={t.id}
                                            title={t.title}
                                            tasks={todoListTasks}
                                            deleteTask={deleteTask}
                                            tasksCompleted={tasksCompleted}
                                            addTask={addTask}
                                            isDoneHandler={changeStatus}
                                            filter={t.filter}
                                            deleteTable={removeTodolist}
                                            editTask={editTask}
                                            editTodoListTitle={editTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    )
}

export default App;
