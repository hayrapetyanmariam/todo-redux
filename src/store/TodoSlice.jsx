import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodosAsync = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}){
        try{

            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

            if(!response.ok) throw new Error("Can't fetch data. Server Error!")

            return await response.json();

        }catch(e){
            return rejectWithValue(e.massage)
        }
    }
);

export const removeToDoAsync = createAsyncThunk(
    'todos/removeToDoAsync',
    async function(id, {rejectWithValue, dispatch}){
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
                method: 'DELETE'
            });

            if(!response.ok) throw new Error("Can't Delete Task. Server Error!")

            dispatch(removeToDo({id}));

        }catch(e){
            return rejectWithValue(e.massage);
        }
    }
);

export const addToDoAsync = createAsyncThunk(
    'todos/addToDoAsync',
    async function(text, {rejectWithValue, dispatch}){

        const todo = {
            id: Date.now(),
            title: text,
            completed: false
        }

        try{

            const response = await fetch('https://jsonplaceholder.typicode.com/todos/', {
                method: 'POST',
                headers: {
                    'Content-Type':'aplication/json'
                },
                body: JSON.stringify(todo)
            })

            if(!response.ok) throw new Error("Can't Add New Task. Server Error!")

            dispatch(addToDo(todo));

        }catch(e){
            return rejectWithValue(e.massage);
        }
    }
);

export const doneToDoAsync = createAsyncThunk(
    'todos/doneToDoAsync',
    async function(id, {rejectWithValue, dispatch, getState}){
        const todo = getState().todos.todos.find(el => el.id === id);
        try{

            const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type':'aplication/json'
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            })

            if(!response.ok) throw new Error("Can't Toggle Task. Server Error!")

           dispatch(doneToDo({id}))

        }catch(e){
            return rejectWithValue(e.massage);
        }
    }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null
  },
  reducers: {
    addToDo(state, action){
        state.todos.push(action.payload);
    },
    removeToDo(state, action){
        state.todos = state.todos.filter(el => el.id !== action.payload.id);
    },
    doneToDo(state, action){
        state.todos = state.todos.map(el =>{
            if(el.id === action.payload.id) el.completed = !el.completed;
            return el;
        })
    }
  },

  extraReducers: {
    [fetchTodosAsync.pending]: (state)=>{
        state.error ='';
        state.status = 'pending';
    },
    [fetchTodosAsync.fulfilled]: (state, action)=>{
        state.status = 'fulfilled';
        state.todos = action.payload;
    },
    [fetchTodosAsync.rejected]: (state, action)=>{
        state.status = 'rejected';
        state.error = action.payload;
    }
  }

})

const { addToDo, removeToDo, doneToDo } = todoSlice.actions

export default todoSlice.reducer
