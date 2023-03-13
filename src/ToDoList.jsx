import React from 'react'
import { useSelector } from 'react-redux'
import { ToDoItem } from './ToDoItem'

export const ToDoList = () => {

    const todos = useSelector(state => state.todos.todos)

  return (
    <div>
        {
            todos.map(todo => <ToDoItem key={todo.id} {...todo}/>)
        }
    </div>
  )
}
