import React from 'react'
import { AddToDo } from './AddToDo'
import { ToDoList } from './ToDoList'
import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { fetchTodosAsync } from './store/TodoSlice'

export const App = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchTodosAsync());
  }, [dispatch])

  return (
    <div>
      <AddToDo/>
      <ToDoList/>
    </div>
  )
}