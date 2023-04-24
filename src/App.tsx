import { useState } from 'react';
import './App.scss'
import { useAppSelector, useAppDispatch } from './actions/hooks';
import { changeToggle } from './redux/toggle/toggleSlice';
import { addTodo } from './redux/todos/todosSlice';
import Todo from './components/Todo';
import TodoList from './components/TodoList';

function App() {
  const [text, setText] = useState('');

  const dispatch = useAppDispatch();
  const todos = useAppSelector((state)=>state.todos.todosList);
  const ids = useAppSelector((state)=>state.todos.idList);
  const toggle = useAppSelector((state)=>state.toggle.toggle)

  const handleAddClick = ()=>{
    if(text!==''){
      dispatch(addTodo(text))
      setText('')
    }
  }

  return (
    <>
      <div className='todoApp'>
        <h1 className='todoApp__title'>#todo</h1>
        
        <ul className='todoApp__toggleRow'>

          <li onClick={()=>dispatch(changeToggle({toggle:"all"}))}>
            <div className='todoApp__toggleOption'>
              All
            </div>
            <div className={toggle==="all"?
                            "todoApp__toggleVisualIndication--on":
                            "todoApp__toggleVisualIndication--off"}>
            </div>
          </li>

          <li onClick={()=>dispatch(changeToggle({toggle:"active"}))}>
            <div className='todoApp__toggleOption'>
              Active
            </div>
            <div className={toggle==="active"?
                            "todoApp__toggleVisualIndication--on":
                            "todoApp__toggleVisualIndication--off"}>
            </div>
          </li>

          <li onClick={()=>dispatch(changeToggle({toggle:"complete"}))}>
            <div className='todoApp__toggleOption'>
              Completed
            </div>
            <div className={toggle==="complete"?
                            "todoApp__toggleVisualIndication--on":
                            "todoApp__toggleVisualIndication--off"}>
            </div>
          </li>

        </ul>

  
        <div className='todoApp__addTodo'>
          <input className='todoApp__addTodo__input'
                 type="text" 
                 placeholder='add details'
                 value={text}
                 onChange={(e)=>setText(e.target.value)}/>

          <button className='todoApp__addTodo__button' 
              onClick={handleAddClick}>
                  Add
          </button>
        </div>

        <div className='todoApp__todoList'>
          <TodoList/>
        </div>
      </div>
    </>
  )
}

export default App
