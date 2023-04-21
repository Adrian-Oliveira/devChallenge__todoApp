import { ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';

import './todoListComponent.scss';

import type { TodoState } from '../../redux/todos/todosSlice';
import Todo from '../Todo';
import { useAppDispatch,useAppSelector } from '../../actions/hooks';

import { todoMarkAsComplete, todoMarkAsIncomplete } from '../../redux/todos/todosSlice';

const TodoList = ()=> {

    const dispatch = useAppDispatch();
    const todos = useAppSelector((state)=>state.todos.todosList);
    const todosIds = useAppSelector((state)=>state.todos.idList);
    const toggle = useAppSelector((state)=>state.toggle.toggle);
    
    const [todosToRender, setTodosToRender] = useState<TodoState[]>([]);

    const handleChange = (target:HTMLInputElement, id:number)=>{
        console.log(target.checked);
        if(target.checked){
            dispatch(todoMarkAsComplete(id))
        }
        else{
            dispatch(todoMarkAsIncomplete(id))
        }
    }

    useEffect(()=>{
        if(toggle==="all"){
            setTodosToRender(todos)
        }
        else if(toggle==="active"){
            setTodosToRender(todos.filter((todo)=>!todo.complete))
        }
        else{
            setTodosToRender(todos.filter((todo)=>todo.complete))
        }
    },[toggle])

    const filterTodoWithToggle = (toggle)=>{}

    return (
        <div className='todoListComponent'>
            {todos.filter((todo)=>{
                if(toggle==="all"){
                    return true
                }
                else if(toggle==="active"){
                    return !todo.complete
                }
                else{
                    return todo.complete
                }
            }).map((todo,index)=>{
                return(
                    <div key={index}>
                        <input type="checkbox" 
                               onChange={(e)=>handleChange(e.target, todo.id)} 
                               checked={todo.complete}/>

                        <span className={todo.complete?
                                        "todoListComponent__todo--complete":
                                        "todoListComponent__todo--incomplete"}>
                            {todo.todoMessage}
                        </span>
                    </div>
                );
            })}
        </div>
    )
}


export {TodoList}