import { configureStore, createSlice } from '@reduxjs/toolkit';
/* Redux store/actions/reducer implementation.*/
/* (True app would be more complex & separated) */

const defaultTasks= [
    {id: '1', title: 'Something', state: 'TASK_INBOX'},
    {id: '2', title: 'Something more', state: 'TASK_INBOX'},
    {id: '3', title: 'Something else', state: 'TASK_INBOX'},
    {id: '4', title: 'Something again', state: 'TASK_INBOX'},
];
/* Initial state of store when the app loads */
/* (Usually fetch from a server) */

const TaskBoxData = {
        tasks: defaultTasks,
        status: 'idle',
        error: null,
};

const TasksSlice = createSlice({
    name: 'taskbox',
    initialState: TaskBoxData,
    reducers: {
        updateTaskState: (state, action) => {
            const { id, newTaskState } = action.payload;
            const task = state.tasks.findIndex((task) => task.id === id);
            if (task >= 0) {
                state.tasks[task].state = newTaskState;
            }
        },
    },
});

export const {updateTaskState} = TasksSlice.actions;
/* The actions contained in the slice are exported for usage in furthur componenets. */

const store = configureStore({
    reducer: {
        taskbox: TasksSlice.reducer,
    },
});
/* Store configuration */

export default store;
