import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from './AddItemForm';
import {AppBar, IconButton, Toolbar, Button, Typography, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from './state/todolists-reducer';
import {
    changeStatusAC,
    editTaskAC,
    deleteTaskAC,
    addTaskAC,

} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type EditTaskType = (event: string, todoListId: string, id: string) => void
export type TasksType = {
    id: string, title: string, isDone: boolean
}[]

export type RootTasksType = {
    [key: string]: TasksType,
}

export type TodoListType = { id: string, title: string, filter: string }
console.log('App is called')
function AppWithRedux() {
    const dispatch = useDispatch()
    const newTasks = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, RootTasksType>(state => state.tasks)


    const addTask = useCallback((event: string, todoListId: string): void => {
        dispatch(addTaskAC(event, todoListId))
    }, [dispatch])

    const changeStatus = useCallback((id: string, todoListId: string): void => {
        dispatch(changeStatusAC(id, todoListId))
    }, [dispatch])

    const editTask = useCallback((event: string, todoListId: string, id: string): void => {
        dispatch(editTaskAC(event, todoListId, id))
    }, [dispatch])

    const deleteTask = useCallback((id: string, todoListId: string): void => {
        dispatch(deleteTaskAC(id, todoListId))
    },[dispatch])

    const tasksCompleted = useCallback((completed: string, todoListId: string): void => {
        dispatch(ChangeTodolistFilterAC(completed, todoListId))
    }, [dispatch])

    const editTodoListTitle = useCallback((event: string, todoListId: string): void => {
        dispatch(ChangeTodolistTitleAC(event, todoListId))
    }, [dispatch])

    const addTodoList = useCallback ((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    },[dispatch])

    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(RemoveTodolistAC(todoListId))
    }, [dispatch])

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

export default AppWithRedux;
