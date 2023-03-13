import React from 'react'
import {  useDispatch } from 'react-redux'
import { doneToDoAsync, removeToDoAsync } from './store/TodoSlice'

export const ToDoItem = ({id, title, completed}) => {

  const dispatch = useDispatch()

  return (
    <div>
        <input type="checkbox" checked = {completed} onChange = {() => dispatch(doneToDoAsync(id))}/>
        <span className={completed ? 'done' : ''}>{title}</span>
        <span onClick={() => dispatch(removeToDoAsync(id))}>x</span>  
    </div>
  )
}
