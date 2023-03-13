import React from 'react'
import { useState } from 'react'
import {  useDispatch } from 'react-redux'
import { addToDoAsync} from './store/TodoSlice'

export const AddToDo = () => {

    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(addToDoAsync(input));
        setInput('');
    }

  return (
    <div>
        <form onSubmit={submitHandler}>
            <input type="text" onChange={(e)=> setInput(e.target.value)} value = {input} />
            <button type='submit'>Add New Task</button>
        </form>
    </div>
  )
}
