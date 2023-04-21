import { useState } from 'react';
import './App.scss'
import type { RootState } from './redux/store';
import { useAppSelector, useAppDispatch } from './actions/hooks';
import { addTodo } from './redux/todos/todosSlice';

function App() {
  const [text, setText] = useState('');

  const dispatch = useAppDispatch();
  const todos = useAppSelector((state:RootState)=>state.todos.todosList);



  return (
    <>
      <div className='todoApp'>
        <input type="text" onChange={(e)=>setText(e.target.value)}/>
        <button onClick={()=>dispatch(addTodo(text))}>Add Todo</button>
        <div className='todoList'>
          {todos.map((todo,index)=>{
            return(
              <>
                <span>{todo.todoMessage} </span>
              </>);
          })}
        </div>
      </div>
    </>
  )
}

export default App
