import { useEffect, useState } from 'react';

import './todoListComponent.scss';

import { useAppDispatch,useAppSelector } from '../../actions/hooks';

import { todoMarkAsComplete, todoMarkAsIncomplete, delTodo, delAllTodosCompleted } from '../../redux/todos/todosSlice';

const TodoList = ()=> {

    const dispatch = useAppDispatch();
    const todos = useAppSelector((state)=>state.todos.todosList);
    const todosIds = useAppSelector((state)=>state.todos.idList);
    const toggle = useAppSelector((state)=>state.toggle.toggle);
    
    const [currentIds, setCurrentIds]=useState<number[]>([]);

    const handleChange = (target:HTMLInputElement, id:number)=>{
        if(target.checked){
            dispatch(todoMarkAsComplete(id))
        }
        else{
            dispatch(todoMarkAsIncomplete(id))
        }
    }

    useEffect(()=>{
        const filteredTodosIds = todosIds
                                .filter((id)=>{
                                    if(toggle==="all"){
                                        return true
                                    }
                                    else if(toggle==="active"){
                                        return !todos[id].complete
                                    }
                                    else{
                                        return todos[id].complete
                                    }
                                })
        setCurrentIds(filteredTodosIds)

    },[toggle])


    return (
        <div className='todoListComponent'>
            {todosIds
            .map((id)=>todos[id])
            .filter((todo)=>{
                if(toggle==="all"){
                    return true
                }
                else if(toggle==="active"){
                    return !todo.complete
                }
                else{
                    return todo.complete
                }
            })
            .map((todo,index)=>{
                return(
                    <div key={index} className='todoListComponent__singleTodo'>
                        <label className={todo.complete?
                                'todoListComponent__checkbox--checked':
                                'todoListComponent__checkbox'}>
                            <i className="material-symbols-outlined">
                                check
                            </i>
                            <input type="checkbox" 
                                onChange={(e)=>handleChange(e.target, todo.id)} 
                                checked={todo.complete}/>
                            
                        </label>

                        <span className={`todoListComponent__todo 
                                        ${todo.complete?
                                        "todoListComponent__todo--complete":
                                        "todoListComponent__todo--incomplete"}`}>
                            {todo.todoMessage}
                        </span>
                        {toggle==='complete'?
                            <i
                                onClick={()=>dispatch(delTodo(todo.id))}
                                className="todoListComponent__singleTodo__deleteTodo material-symbols-outlined">
                                delete
                            </i>
                        :null}
                    </div>
                );
            })}

            {toggle==='complete'?
                <button 
                    onClick={()=>{dispatch(delAllTodosCompleted(currentIds))}}
                    className="todoListComponent__buttonDeleteAll">
                    <i
                        className="material-symbols-outlined">
                        delete
                    </i>
                    delete all
                </button>
            :null}
        </div>
    )
}


export {TodoList}